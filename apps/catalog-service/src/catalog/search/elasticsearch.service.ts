import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  private readonly logger = new Logger(ElasticsearchService.name);

  constructor(
    private readonly nestElasticsearchService: NestElasticsearchService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    try {
      const health = await this.nestElasticsearchService.cluster.health();
      this.logger.log(`Elasticsearch connected: ${health.status}`);
    } catch (error) {
      this.logger.error('Elasticsearch connection failed', error);
    }
  }

  async createIndex(index: string, body: any) {
    const exists = await this.nestElasticsearchService.indices.exists({ index });
    if (!exists) {
      await this.nestElasticsearchService.indices.create({ index, body });
      this.logger.log(`Search index created: ${index}`);
    }
  }

  async indexDocument(index: string, id: string, body: any) {
    await this.nestElasticsearchService.index({
      index,
      id,
      body,
    });
  }

  async deleteDocument(index: string, id: string) {
    await this.nestElasticsearchService.delete({
      index,
      id,
    });
  }

  async search(index: string, query: any) {
    return this.nestElasticsearchService.search({
      index,
      body: query,
    });
  }
}
