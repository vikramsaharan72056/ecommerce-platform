import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KafkaModule } from '../kafka/kafka.module';
import { RedisModule } from '../redis/redis.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        publicKey: config.get<string>('app.jwt.publicKey'),
        verifyOptions: { algorithms: ['RS256'] },
      }),
    }),
    KafkaModule, 
    RedisModule,
    SearchModule,
  ],
  controllers: [CatalogController],
  providers: [CatalogService, JwtStrategy],
  exports: [CatalogService],
})
export class CatalogModule {}
