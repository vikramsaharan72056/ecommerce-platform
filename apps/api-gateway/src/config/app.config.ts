import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],

  redis: {
    url: process.env.REDIS_URL!,
    keyPrefix: 'gateway:',
  },

  jwksUri: process.env.JWKS_URI ?? 'http://auth-service:3001/v1/auth/.well-known/jwks.json',

  internalSecret: process.env.INTERNAL_SECRET ?? 'dev-internal-secret',
}));
