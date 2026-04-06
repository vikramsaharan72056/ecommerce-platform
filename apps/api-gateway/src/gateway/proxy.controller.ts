import { Controller, All, Req, Res, UseGuards, Param, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { JwtValidationGuard } from '../guards/jwt-validation.guard';
import { v4 as uuidv4 } from 'uuid';

// Route map: path prefix → upstream service
const ROUTE_MAP: Record<string, { url: string; authRequired: boolean }> = {
  'auth': { url: 'http://auth-service:3001', authRequired: false },
  'tenants': { url: 'http://tenant-service:3002', authRequired: true },
};

// Auth endpoints that DO require auth even under /auth
const AUTH_REQUIRED_PATHS = ['/v1/auth/me', '/v1/auth/logout'];

@Controller()
export class ProxyController {
  private readonly logger = new Logger(ProxyController.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  @All('v1/auth/*')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    const requiresAuth = AUTH_REQUIRED_PATHS.some(p => req.path.startsWith(p));
    if (requiresAuth) {
      // Delegate to JwtValidationGuard via middleware
    }
    await this.proxyRequest(req, res, 'http://auth-service:3001');
  }

  @All('v1/tenants/*')
  @UseGuards(JwtValidationGuard)
  async proxyTenants(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://tenant-service:3002');
  }

  @All('health')
  async health(@Req() req: Request, @Res() res: Response) {
    const services = [
      { name: 'auth-service', url: 'http://auth-service:3001/health' },
      { name: 'tenant-service', url: 'http://tenant-service:3002/health' },
      { name: 'notification-service', url: 'http://notification-service:3003/health' },
    ];

    const results = await Promise.allSettled(
      services.map(async (s) => {
        const resp = await firstValueFrom(this.http.get(s.url, { timeout: 3000 }));
        return { name: s.name, status: 'ok', data: resp.data };
      }),
    );

    const health = results.map((result, i) => ({
      name: services[i].name,
      status: result.status === 'fulfilled' ? 'ok' : 'down',
      ...(result.status === 'fulfilled' ? { data: result.value.data } : {}),
    }));

    const isHealthy = health.every(h => h.status === 'ok');
    res.status(isHealthy ? 200 : 207).json({
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: health,
    });
  }

  private async proxyRequest(req: Request, res: Response, targetBaseUrl: string): Promise<void> {
    const traceId = (req.headers['x-trace-id'] as string) ?? uuidv4();
    
    // Strip /v1 prefix if it exists for microservice compatibility
    const upstreamPath = req.path.startsWith('/v1') ? req.path.substring(3) : req.path;
    const url = `${targetBaseUrl}${upstreamPath}`;

    this.logger.log(`[${traceId}] ${req.method} ${req.path} → ${targetBaseUrl}`);

    try {
      const response = await firstValueFrom(
        this.http.request({
          method: req.method as any,
          url,
          data: req.body,
          headers: {
            ...req.headers,
            'x-trace-id': traceId,
            host: new URL(targetBaseUrl).host,
          },
          params: req.query,
          timeout: 30000,
          validateStatus: () => true, // pass all status codes through
        }),
      );

      // Forward response headers
      Object.entries(response.headers).forEach(([key, value]) => {
        if (typeof value === 'string') res.setHeader(key, value);
      });
      res.setHeader('X-Trace-ID', traceId);

      res.status(response.status).json(response.data);
    } catch (error: any) {
      this.logger.error(`[${traceId}] Proxy error to ${url}: ${error.message}`);
      res.status(502).json({
        error: {
          code: 'BAD_GATEWAY',
          message: 'Upstream service unavailable',
          traceId,
        },
      });
    }
  }
}
