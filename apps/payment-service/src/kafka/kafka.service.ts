import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka!: Kafka;
  private producer!: Producer;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: this.config.get<string>('app.kafka.clientId', 'payment-service'),
      brokers: this.config.get<string[]>('app.kafka.brokers', ['localhost:9092']),
      logLevel: logLevel.ERROR,
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
    this.logger.log('Kafka producer connected for Payment Service');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected from Payment Service');
  }

  async publish(topic: string, key: string, event: any): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            key,
            value: JSON.stringify(event),
            headers: {
              tenantId: event.tenantId,
              eventType: event.eventType,
            },
          },
        ],
      });
      this.logger.debug(`Payment event published to ${topic}: ${event.eventType}`);
    } catch (error) {
      this.logger.error(`Failed to publish Payment event to ${topic}`, error);
    }
  }
}
