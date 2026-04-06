import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client!: Redis;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.config.get<string>('app.redis.url');
    if (!redisUrl) {
      this.logger.error('REDIS_URL is not defined in configuration!');
      return;
    }
    
    // Extract password if present in the URL (redis://:password@host:port)
    let password: string | undefined;
    const urlMatch = redisUrl.match(/redis:\/\/:(.*)@/);
    if (urlMatch) {
      password = urlMatch[1];
    }

    this.client = new Redis(redisUrl, {
      password,
      keyPrefix: this.config.get<string>('app.redis.keyPrefix', 'gateway:'),
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    });

    this.client.on('connect', () => this.logger.log('Redis connected for API Gateway'));
    this.client.on('error', (err) => this.logger.error('Redis error @ Gateway', err));

    await this.client.ping();
  }

  async onModuleDestroy() {
    await this.client.quit();
    this.logger.log('Redis disconnected for API Gateway');
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async setex(key: string, seconds: number, value: string): Promise<void> {
    await this.client.setex(key, seconds, value);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result > 0;
  }

  async incrementRateLimit(key: string, windowSeconds: number): Promise<number> {
    const pipeline = this.client.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, windowSeconds);
    const results = await pipeline.exec();
    return results?.[0]?.[1] as number ?? 0;
  }

  getClient(): Redis {
    return this.client;
  }
}
