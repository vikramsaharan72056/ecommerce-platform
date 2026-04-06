import './instrumentation';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // ── No Global prefix needed for event processor ──
  // No controllers needed in Phase 1 as it is purely Kafka driven

  app.enableShutdownHooks();

  const port = process.env.PORT || 3003;
  await app.listen(port);
  logger.log(`Notification service running on port ${port} (Kafka consumer)`);
}

bootstrap().catch((err) => {
  console.error('Failed to start notification service:', err);
  process.exit(1);
});
