import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchService } from './elasticsearch.service';
import { ProductIndexerConsumer } from './product-indexer.consumer';
import { SearchController } from './search.controller';

@Module({
  imports: [
    NestElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        node: config.get<string>('app.elasticsearch.node'),
      }),
    }),
  ],
  controllers: [SearchController],
  providers: [ElasticsearchService, ProductIndexerConsumer],
  exports: [ElasticsearchService],
})
export class SearchModule {}
