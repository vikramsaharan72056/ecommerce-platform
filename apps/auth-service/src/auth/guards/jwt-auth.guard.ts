import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly redis: RedisService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    if (!result) return false;

    // Check token blacklist
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user?.jti) {
      const isBlacklisted = await this.redis.exists(`blacklist:jti:${user.jti}`);
      if (isBlacklisted) throw new UnauthorizedException('Token has been revoked');
    }

    return true;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Authentication required');
    }
    return user;
  }
}
