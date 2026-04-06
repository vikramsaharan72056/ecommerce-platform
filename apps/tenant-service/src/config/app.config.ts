import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3002', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],

  database: {
    url: process.env.DATABASE_URL!,
  },

  redis: {
    url: process.env.REDIS_URL!,
    keyPrefix: 'tenant:',
  },

  kafka: {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['localhost:9092'],
    groupId: 'tenant-service-group',
    clientId: 'tenant-service',
    topic: process.env.TENANT_KAFKA_TOPIC ?? `${process.env.NODE_ENV ?? 'dev'}-tenant-tenant-events`,
  },

  lockout: {
    maxAttempts: 5,
    lockDurationMinutes: 15,
  },

  rateLimit: {
    windowMinutes: 15,
    maxPerWindow: 5,
  },

  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  internalSecret: process.env.INTERNAL_SECRET ?? 'dev-internal-secret',

  email: {
    supportEmail: process.env.SUPPORT_EMAIL ?? 'support@platform.com',
  },
}));
