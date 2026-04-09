import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3005', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    url: process.env.DATABASE_URL,
  },
  
  redis: {
    url: process.env.REDIS_URL,
    keyPrefix: 'cart:',
  },
  
  kafka: {
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    clientId: process.env.KAFKA_CLIENT_ID || 'cart-service',
  },
  
  security: {
    jwtPublicKeyPath: process.env.JWT_PUBLIC_KEY_PATH || '../../.keys/public.pem',
  },
  
  billing: {
    freeShippingThresholdPaise: 49900,
    gstRate: 0.18,
  }
}));
