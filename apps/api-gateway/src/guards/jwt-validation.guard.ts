import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
const jwksClient = require('jwks-rsa');
import { firstValueFrom } from 'rxjs';
import { RedisService } from '../redis/redis.service';
import { JwtPayload } from '@ecom/shared-types';

@Injectable()
export class JwtValidationGuard implements CanActivate {
  private readonly logger = new Logger(JwtValidationGuard.name);
  private jwksClientInstance: JwksClient;

  constructor(
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {
    this.jwksClientInstance = jwksClient({
      jwksUri: config.get<string>('app.jwksUri', 'http://auth-service:3001/.well-known/jwks.json'),
      cache: true,
      cacheMaxAge: 3600000,      // 1 hour
      rateLimit: true,
      jwksRequestsPerMinute: 10,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.substring(7);

    try {
      // 1. Decode header to get key ID
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded || !decoded.header.kid) {
        throw new UnauthorizedException('Invalid token structure');
      }

      // 2. Get public key from JWKS (cached in ioredis)
      const cacheKey = `jwks:key:${decoded.header.kid}`;
      let publicKey: string | null = await this.redis.get(cacheKey);

      if (!publicKey) {
        const key = await this.jwksClientInstance.getSigningKey(decoded.header.kid);
        publicKey = key.getPublicKey();
        await this.redis.setex(cacheKey, 3600, publicKey);
      }

      // 3. Verify signature + expiry
      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;

      // 4. Check JWT blacklist (logged out tokens)
      const isBlacklisted = await this.redis.exists(`auth:blacklist:jti:${payload.jti}`);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked');
      }

      // 5. Verify tenant is active (cached 5min)
      const tenantCacheKey = `tenant:status:${payload.tenantId}`;
      let tenantStatus = await this.redis.get(tenantCacheKey);
      if (!tenantStatus) {
        // In production: call tenant-service gRPC; in dev: default to 'active'
        tenantStatus = 'active';
        await this.redis.setex(tenantCacheKey, 300, tenantStatus);
      }

      if (tenantStatus === 'suspended') {
        throw new UnauthorizedException('Tenant is suspended');
      }

      // 6. Inject context headers for downstream services
      request.headers['x-tenant-id'] = payload.tenantId;
      request.headers['x-user-id'] = payload.sub;
      request.headers['x-user-role'] = payload.role;
      request.headers['x-user-plan'] = payload.plan;

      // Store on request for use in handlers
      (request as any).jwtPayload = payload;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.warn(`JWT validation failed: ${error instanceof Error ? error.message : error}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
