import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtPayload } from '@ecom/shared-types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const TenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'] as string;
    if (!tenantId) {
      throw new BadRequestException('Missing X-Tenant-ID header');
    }
    return tenantId;
  },
);
