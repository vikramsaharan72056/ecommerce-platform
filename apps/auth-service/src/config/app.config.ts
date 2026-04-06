import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],

  database: {
    url: process.env.DATABASE_URL!,
  },

  redis: {
    url: process.env.REDIS_URL!,
    keyPrefix: 'auth:',
  },

  kafka: {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['localhost:9092'],
    groupId: 'auth-service-group',
    clientId: 'auth-service',
    topic: process.env.AUTH_KAFKA_TOPIC ?? `${process.env.NODE_ENV ?? 'dev'}-auth-user-events`,
  },

  jwt: {
    // RS256 key pair — private key from Vault in prod, env var in dev
    privateKey: process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    publicKey: process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n'),
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresInDays: 7,
  },

  bcrypt: {
    saltRounds: 12,
  },

  mfa: {
    issuer: process.env.MFA_ISSUER ?? 'Ecom Platform',
    stepWindow: 1,     // ±1 step tolerance
    digits: 6,
    period: 30,
  },

  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  security: {
    encryptionKey: process.env.ENCRYPTION_KEY!,
  },

  lockout: {
    maxAttempts: 5,
    lockDurationMinutes: 15,
    hardLockAttempts: 10,
    hardLockDurationMinutes: 60,
    manualLockAttempts: 20,
  },

  rateLimit: {
    windowMinutes: 15,
    maxPerWindow: 5,
  },

  email: {
    verificationExpiryMinutes: 60 * 24,   // 24 hours
    passwordResetExpiryMinutes: 60,        // 1 hour
    fromAddress: process.env.EMAIL_FROM ?? 'noreply@platform.com',
    fromName: process.env.EMAIL_FROM_NAME ?? 'Ecom Platform',
  },

  encryption: {
    key: process.env.ENCRYPTION_KEY,      // AES-256 key for PII fields
  },
}));
