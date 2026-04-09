import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { ElasticsearchService } from './elasticsearch.service';
import { CATALOG_EVENT_TYPES, KAFKA_TOPICS } from '@ecom/event-schemas';

@Injectable()
export class ProductIndexerConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ProductIndexerConsumer.name);
  private kafka!: Kafka;
  private consumer!: Consumer;

  constructor(
    private readonly config: ConfigService,
    private readonly elasticsearch: ElasticsearchService,
  ) {}

  async onModuleInit() {
    const brokers = this.config.get<string[]>('app.kafka.brokers', ['localhost:9092']);
    this.kafka = new Kafka({
      clientId: 'catalog-indexer',
      brokers,
    });

    this.consumer = this.kafka.consumer({ groupId: 'catalog-search-indexer' });
    await this.consumer.connect();
    
    const env = this.config.get<string>('app.nodeEnv', 'development');
    await this.consumer.subscribe({ 
      topic: KAFKA_TOPICS.CATALOG_EVENTS(env), 
      fromBeginning: true 
    });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await this.handleMessage(payload);
      },
    });

    this.logger.log('Product Indexer Consumer started');
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }

  private async handleMessage({ message }: EachMessagePayload) {
    if (!message.value) return;

    try {
      const event = JSON.parse(message.value.toString());
      const { eventType, tenantId, payload } = event;
      const index = `${this.config.get<string>('app.elasticsearch.indexPrefix', 'products_')}${tenantId.replace(/-/g, '_')}`;

      switch (eventType) {
        case CATALOG_EVENT_TYPES.PRODUCT_CREATED:
          await this.elasticsearch.indexDocument(index, payload.productId, payload);
          this.logger.debug(`Indexed product ${payload.productId} for tenant ${tenantId}`);
          break;
        
        case CATALOG_EVENT_TYPES.PRODUCT_UPDATED:
          // In a real-world scenario, you might want to fetch from DB or partial update
          await this.elasticsearch.indexDocument(index, payload.productId, payload);
          break;

        case CATALOG_EVENT_TYPES.PRODUCT_DELETED:
          await this.elasticsearch.deleteDocument(index, payload.productId);
          break;
      }
    } catch (error) {
      this.logger.error('Error processing catalog event for indexing', error);
    }
  }
}
