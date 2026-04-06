import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    // Inject trace ID if not already present
    const traceId = (req.headers['x-trace-id'] as string) ?? uuidv4();
    req.headers['x-trace-id'] = traceId;
    res.setHeader('X-Trace-ID', traceId);

    const now = Date.now();
    const { method, url } = req;
    const tenantId = req.headers['x-tenant-id'] ?? 'unknown';

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - now;
          this.logger.log(
            JSON.stringify({
              traceId,
              tenantId,
              serviceId: 'tenant-service',
              level: 'info',
              message: `${method} ${url} ${res.statusCode} ${duration}ms`,
              timestamp: new Date().toISOString(),
              duration,
            }),
          );
        },
        error: (err) => {
          const duration = Date.now() - now;
          this.logger.error(
            JSON.stringify({
              traceId,
              tenantId,
              serviceId: 'tenant-service',
              level: 'error',
              message: `${method} ${url} ERROR ${duration}ms: ${err.message}`,
              timestamp: new Date().toISOString(),
              duration,
            }),
          );
        },
      }),
    );
  }
}
