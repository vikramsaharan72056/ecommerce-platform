import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3003', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',

  database: {
    url: process.env.DATABASE_URL!,
  },

  kafka: {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['localhost:9092'],
    groupId: 'notification-service-group',
    clientId: 'notification-service',
  },

  smtp: {
    host: process.env.SMTP_HOST ?? 'mailhog',
    port: parseInt(process.env.SMTP_PORT ?? '1025', 10),
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    } : undefined,
  },

  email: {
    fromAddress: process.env.EMAIL_FROM ?? 'noreply@platform.com',
    fromName: process.env.EMAIL_FROM_NAME ?? 'Ecom Platform Notification',
    supportEmail: process.env.SUPPORT_EMAIL ?? 'support@platform.com',
  },

  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
}));
