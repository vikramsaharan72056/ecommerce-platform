import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, EachMessagePayload, logLevel } from 'kafkajs';
import { AUTH_EVENT_TYPES, TENANT_EVENT_TYPES, KAFKA_TOPICS, DomainEvent } from '@ecom/event-schemas';
import { EmailDispatchService } from '../email/email-dispatch.service';
import { NotificationLogService } from '../notification-log/notification-log.service';

@Injectable()
export class NotificationConsumer implements OnModuleInit {
  private readonly logger = new Logger(NotificationConsumer.name);
  private kafka!: Kafka;
  private consumer!: Consumer;

  constructor(
    private readonly config: ConfigService,
    private readonly emailDispatch: EmailDispatchService,
    private readonly logService: NotificationLogService,
  ) {}

  async onModuleInit() {
    const env = this.config.get<string>('app.nodeEnv', 'development');

    this.kafka = new Kafka({
      clientId: 'notification-service',
      brokers: this.config.get<string[]>('app.kafka.brokers', ['localhost:9092']),
      logLevel: logLevel.WARN,
    });

    this.consumer = this.kafka.consumer({
      groupId: 'notification-service-group',
      sessionTimeout: 30000,
      heartbeatInterval: 3000,
    });

    await this.consumer.connect();

    // Subscribe to Phase 1 topics
    await this.consumer.subscribe({
      topics: [
        KAFKA_TOPICS.AUTH_USER_EVENTS(env),
        KAFKA_TOPICS.TENANT_EVENTS(env),
      ],
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await this.handleMessage(payload);
      },
    });

    this.logger.log('Notification Kafka consumer started');
  }

  private async handleMessage({ topic, partition, message }: EachMessagePayload): Promise<void> {
    if (!message.value) return;

    let event: any;
    try {
      event = JSON.parse(message.value.toString());
    } catch {
      this.logger.error(`Failed to parse message from ${topic}:${partition}`);
      return;
    }

    this.logger.log(`Processing event: ${event.eventType} for tenant ${event.tenantId}`);

    try {
      await this.dispatch(event);
    } catch (error) {
      this.logger.error(`Failed to dispatch notification for ${event.eventType}`, error);
      // In production: publish to DLQ
    }
  }

  private async dispatch(event: any): Promise<void> {
    switch (event.eventType) {

      // ── Auth Events ──

      case AUTH_EVENT_TYPES.USER_REGISTERED:
        await this.emailDispatch.send({
          tenantId: event.tenantId,
          recipientUserId: event.payload.userId,
          recipientAddress: event.payload.email,
          templateKey: 'email_verification',
          eventType: event.eventType,
          variables: {
            firstName: event.payload.firstName,
            verificationLink: `${this.getAppUrl()}/verify-email?token=PLACEHOLDER`,
            otp: '000000', // TODO: fetch actual token
            expiryMinutes: '1440',
          },
        });
        break;

      case AUTH_EVENT_TYPES.USER_EMAIL_VERIFIED:
        await this.emailDispatch.send({
          tenantId: event.tenantId,
          recipientUserId: event.payload.userId,
          recipientAddress: event.payload.email,
          templateKey: 'welcome_user',
          eventType: event.eventType,
          variables: {
            firstName: event.payload.firstName ?? 'User',
            loginUrl: `${this.getAppUrl()}/login`,
            supportEmail: this.config.get('app.email.supportEmail', 'support@platform.com'),
          },
        });
        break;

      case AUTH_EVENT_TYPES.USER_ACCOUNT_LOCKED:
        await this.emailDispatch.sendToUserId({
          tenantId: event.tenantId,
          userId: event.payload.userId,
          templateKey: 'account_locked',
          eventType: event.eventType,
          variables: {
            lockedUntil: new Date(event.payload.lockedUntil).toLocaleString('en-IN'),
            unlockUrl: `${this.getAppUrl()}/support`,
            supportEmail: this.config.get('app.email.supportEmail', 'support@platform.com'),
          },
        });
        break;

      case AUTH_EVENT_TYPES.USER_PASSWORD_RESET:
        await this.emailDispatch.sendToUserId({
          tenantId: event.tenantId,
          userId: event.payload.userId,
          templateKey: 'password_reset_confirm',
          eventType: event.eventType,
          variables: {
            timestamp: new Date().toLocaleString('en-IN'),
            securityUrl: `${this.getAppUrl()}/security`,
          },
        });
        break;

      // ── Tenant Events ──

      case TENANT_EVENT_TYPES.TENANT_CREATED:
        await this.emailDispatch.send({
          tenantId: event.tenantId,
          recipientAddress: event.payload.ownerEmail,
          templateKey: 'tenant_welcome',
          eventType: event.eventType,
          variables: {
            ownerName: event.payload.ownerName,
            tenantName: event.payload.tenantId,
            dashboardUrl: `${this.getAppUrl()}/dashboard`,
            setupGuideUrl: `${this.getAppUrl()}/docs/setup`,
            supportEmail: this.config.get('app.email.supportEmail', 'support@platform.com'),
          },
        });
        break;

      case TENANT_EVENT_TYPES.TENANT_SUSPENDED:
        await this.emailDispatch.send({
          tenantId: event.tenantId,
          recipientAddress: event.payload.ownerEmail ?? 'unknown',
          templateKey: 'tenant_suspended',
          eventType: event.eventType,
          variables: {
            ownerName: 'Account Owner',
            tenantName: event.tenantId,
            reason: event.payload.reason,
            contactEmail: this.config.get('app.email.supportEmail', 'support@platform.com'),
          },
        });
        break;

      default:
        this.logger.debug(`No handler for event type: ${event.eventType}`);
    }
  }

  private getAppUrl(): string {
    return this.config.get<string>('app.frontendUrl', 'http://localhost:3000');
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
    this.logger.log('Notification consumer disconnected');
  }
}
