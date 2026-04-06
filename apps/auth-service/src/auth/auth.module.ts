import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EncryptionService } from '../common/services/encryption.service';
import { RedisModule } from '../redis/redis.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        privateKey: config.get<string>('app.jwt.privateKey'),
        publicKey: config.get<string>('app.jwt.publicKey'),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: config.get<string>('app.jwt.accessTokenExpiresIn', '15m'),
        },
        verifyOptions: { algorithms: ['RS256'] },
      }),
    }),
    RedisModule,
    KafkaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, EncryptionService],
  exports: [AuthService, JwtModule, EncryptionService],
})
export class AuthModule {}
