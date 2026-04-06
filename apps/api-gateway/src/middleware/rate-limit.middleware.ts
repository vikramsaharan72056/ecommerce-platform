import { Injectable, NestMiddleware, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';

interface RateLimitConfig {
  windowSeconds: number;
  limit: number;
  burstLimit: number;
}

const PLAN_LIMITS: Record<string, RateLimitConfig> = {
  free:       { windowSeconds: 60, limit: 60,     burstLimit: 80 },
  starter:    { windowSeconds: 60, limit: 300,    burstLimit: 400 },
  pro:        { windowSeconds: 60, limit: 1000,   burstLimit: 1500 },
  enterprise: { windowSeconds: 60, limit: 10000,  burstLimit: 15000 },
  internal:   { windowSeconds: 60, limit: 999999, burstLimit: 999999 },
};

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RateLimitMiddleware.name);

  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Internal service mesh traffic is not rate limited
    const isInternalCall = req.headers['x-internal-call'] === this.config.get('app.internalSecret');
    if (isInternalCall) {
      next();
      return;
    }

    const plan = (req.headers['x-user-plan'] as string) ?? 'free';
    const userId = (req.headers['x-user-id'] as string) ?? req.ip;
    const planLimits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;

    const rateLimitKey = `ratelimit:${plan}:${userId}`;

    const currentCount = await this.redis.incrementRateLimit(rateLimitKey, planLimits.windowSeconds);
    const resetTime = Math.floor(Date.now() / 1000) + planLimits.windowSeconds;
    const remaining = Math.max(0, planLimits.limit - currentCount);

    // Always set rate limit headers
    res.setHeader('X-RateLimit-Limit', planLimits.limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetTime);

    if (currentCount > planLimits.burstLimit) {
      this.logger.warn(`Rate limit burst exceeded for ${userId} (plan: ${plan}): ${currentCount}/${planLimits.burstLimit}`);
      throw new HttpException(
        {
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please slow down.',
            retryAfter: planLimits.windowSeconds,
          },
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
