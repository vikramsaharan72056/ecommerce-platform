# Ecom Platform — Phase 1: Foundation

> **Flipkart-grade multi-tenant SaaS ecommerce platform**
> Phase 1 of 5 — Architecture, Infra & Core Identity

---

## Architecture Overview

```
                    ┌─────────────────────────────────┐
                    │         API Gateway :3000         │
                    │  JWT validation • Rate limiting   │
                    │  Route proxying • Health agg.     │
                    └──────────────┬──────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
     ┌────────▼──────┐   ┌────────▼──────┐   ┌────────▼──────────┐
     │ auth-service  │   │tenant-service │   │notification-svc   │
     │    :3001      │   │    :3002      │   │     :3003         │
     │               │   │               │   │  (Kafka consumer) │
     └───────┬───────┘   └───────┬───────┘   └────────────────────┘
             │                   │
        [auth_db]          [tenant_db]         [notification_db]
        PostgreSQL          PostgreSQL           PostgreSQL
             │                   │
             └─────────┬─────────┘
                       │
              ┌────────▼────────┐
              │  Apache Kafka   │  ← All state mutations
              │  Schema Registry│
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Redis 7      Grafana Stack   MailHog
    (sessions,   (Prometheus +    (dev email)
    rate limits,  Loki + Tempo)
    JWKS cache)
```

## Phase 1 Services

| Service | Port | Tech | DB |
|---|---|---|---|
| api-gateway | 3000 | NestJS 10 | Redis |
| auth-service | 3001 | NestJS 10 + Prisma | PostgreSQL (auth_db) |
| tenant-service | 3002 | NestJS 10 + Prisma | PostgreSQL (tenant_db) |
| notification-service | 3003 | NestJS 10 + Handlebars | PostgreSQL (notification_db) |

## Quick Start

```bash
# One-command setup (generates keys, starts infra, runs migrations)
bash scripts/setup-dev.sh

# Start all services (Turborepo)
npm run dev

# OR start infra only, then services manually
npm run docker:up
```

## Service URLs

| Service | URL |
|---|---|
| API Gateway | http://localhost:3000 |
| Auth Service | http://localhost:3001 |
| Auth Swagger | http://localhost:3001/docs |
| Tenant Service | http://localhost:3002 |
| Kafka UI | http://localhost:8080 |
| MailHog (emails) | http://localhost:8025 |
| Grafana | http://localhost:3300 (admin/admin_dev) |
| Prometheus | http://localhost:9090 |

## Auth Service Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/v1/auth/register` | — | Register user |
| POST | `/v1/auth/login` | — | Login + get JWT |
| POST | `/v1/auth/refresh` | Refresh token | Rotate tokens |
| POST | `/v1/auth/logout` | JWT | Revoke session |
| POST | `/v1/auth/forgot-password` | — | Request reset link |
| POST | `/v1/auth/reset-password` | — | Reset with token |
| POST | `/v1/auth/verify-email` | — | Verify email |
| GET | `/v1/auth/me` | JWT | Get profile |
| PUT | `/v1/auth/me` | JWT | Update profile |
| POST | `/v1/auth/mfa/setup` | JWT | Setup TOTP MFA |
| POST | `/v1/auth/mfa/verify` | JWT | Activate MFA |
| POST | `/v1/auth/mfa/disable` | JWT | Disable MFA |
| POST | `/v1/auth/oauth/:provider` | — | OAuth2 login |
| POST | `/v1/auth/validate-token` | Internal | Gateway validation |

## Security Features

- **RS256 JWT** — private key signing, public key via JWKS endpoint
- **bcrypt cost 12** for password hashing
- **Account lockout** — 5 failures → 15min, 10 → 1hr, 20+ → manual unlock
- **Refresh token rotation** — old token revoked on every refresh
- **JWT blacklist** — Redis-based on logout
- **MFA** — TOTP (speakeasy, ±1 step tolerance)
- **Email enumeration prevention** — `/forgot-password` always returns 200
- **Rate limiting** — Free: 60/min, Starter: 300, Pro: 1000, Enterprise: 10000
- **Multi-tenancy** — tenant_id on all tables, Postgres RLS

## Kafka Events (Phase 1)

### Auth Events → `{env}.auth.user-events`
- `user.registered` → Email verification sent
- `user.email_verified` → Welcome email sent
- `user.login_failed` → Security alert (3+ attempts)
- `user.account_locked` → Lock notification
- `user.password_reset` → Reset confirmation
- `user.mfa_enabled`
- `user.profile_updated`

### Tenant Events → `{env}.tenant.tenant-events`
- `tenant.created` → Welcome email to owner
- `tenant.plan_changed`
- `tenant.suspended` → Suspension notice
- `tenant.reactivated`
- `tenant.feature_flag_changed`

## Observability

All services emit:
- **Prometheus metrics** at `/metrics`
- **Structured JSON logs** with traceId, tenantId, serviceId
- **OpenTelemetry traces** → Grafana Tempo
- **Health** at `/health` (liveness), `/ready` (readiness)

## Multi-Tenancy

All data scoped by `tenant_id`:
- PostgreSQL: Row-Level Security on all tables
- Redis: All keys prefixed `tenant:{tenantId}:`
- Kafka: `tenantId` in message headers AND payload
- JWT: Contains `{ sub, tenantId, role, plan }`
- API: Gateway injects `X-Tenant-ID` header from JWT

## Development Commands

```bash
npm run dev              # Start all services (hot reload)
npm run build            # Build all packages
npm run test             # Run all tests
npm run lint             # Lint all packages
npm run docker:up        # Start infrastructure
npm run docker:down      # Stop infrastructure
npm run docker:logs      # Tail all service logs

# Per-service
cd apps/auth-service
npm run db:migrate:dev   # Run new migrations
npm run db:studio        # Open Prisma Studio
npm test -- --watch      # Watch mode tests
```

## Phase 1 Exit Gate

> A tenant is created via API → a user registers & receives a JWT → user makes an authenticated call → system emits a Kafka event → a downstream consumer processes it — all with full distributed tracing visible in Grafana.

**→ Phase 2: Transactional Core** (Catalog, Cart, Checkout, Orders, Payments, Inventory)
