import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';
import { JwtValidationGuard } from '../guards/jwt-validation.guard';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [HttpModule, RedisModule],
  controllers: [ProxyController],
  providers: [JwtValidationGuard],
})
export class GatewayModule {}
