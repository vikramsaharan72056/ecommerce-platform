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
      clientId: this.config.get<string>('app.kafka.clientId', 'auth-service'),
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
    this.logger.log('Kafka producer connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected');
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
              correlationId: event.correlationId,
              source: event.source,
            },
          },
        ],
      });

      this.logger.log(`Event published: ${event.eventType} to ${topic}`);
    } catch (error) {
      this.logger.error(`Failed to publish event ${event.eventType} to ${topic}`, error);
      // Don't throw — event publishing failure should not block the main request
      // DLQ handling would be added here in production
    }
  }

  async publishBatch<T>(topic: string, events: DomainEvent<T>[]): Promise<void> {
    const messages = events.map((event) => ({
      key: event.tenantId,
      value: JSON.stringify(event),
      headers: {
        tenantId: event.tenantId,
        eventType: event.eventType,
        version: event.version,
        eventId: event.eventId,
      },
    }));

    await this.producer.send({ topic, messages });
  }
}
