import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, logLevel } from 'kafkajs';
import { DomainEvent } from '@ecom/event-schemas';

@Injectable()
export class EventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EventPublisher.name);
  private kafka!: Kafka;
  private producer!: Producer;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: this.config.get<string>('app.kafka.clientId', 'tenant-service'),
      brokers: this.config.get<string[]>('app.kafka.brokers', ['localhost:9092']),
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 8,
      },
    });

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: false,
      transactionTimeout: 30000,
    });

    await this.producer.connect();
    this.logger.log('Kafka producer connected for tenant-service');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected for tenant-service');
  }

  async publish<T>(topic: string, event: DomainEvent<T>): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            key: event.tenantId, // partition by tenantId for ordering
            value: JSON.stringify(event),
            headers: {
              tenantId: event.tenantId,
              eventType: event.eventType,
              version: event.version,
              eventId: event.eventId,
            },
          },
        ],
      });

      this.logger.log(`Event published: ${event.eventType} to ${topic}`);
    } catch (error) {
      this.logger.error(`Failed to publish event ${event.eventType} to ${topic}`, error);
    }
  }
}
