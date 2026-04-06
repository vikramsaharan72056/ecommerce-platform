// ─────────────────────────────────────────────────────────────────────────────
// AUTH SERVICE — main.ts
// Bootstrap with OpenTelemetry tracing, global pipes, interceptors
// ─────────────────────────────────────────────────────────────────────────────

// OpenTelemetry MUST be initialized before any other imports
import './instrumentation';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TraceInterceptor } from './common/interceptors/trace.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });

  // ── Global prefix ──
  app.setGlobalPrefix('v1');

  // ── Validation ──
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Interceptors & Filters ──
  app.useGlobalInterceptors(new TraceInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ── CORS ──
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID', 'X-Trace-ID'],
  });

  // ── Swagger (dev only) ──
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Auth Service API')
      .setDescription('Authentication & Identity Management — Phase 1')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Authentication endpoints')
      .addTag('mfa', 'Multi-factor authentication')
      .addTag('oauth', 'OAuth2 social login')
      .addTag('health', 'Service health checks')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    logger.log('Swagger UI available at /docs');
  }

  // ── Graceful shutdown ──
  app.enableShutdownHooks();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Auth service running on port ${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start auth service:', err);
  process.exit(1);
});
