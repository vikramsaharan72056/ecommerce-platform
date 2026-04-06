// ─────────────────────────────────────────────────────────────────────────────
// KAFKA EVENT SCHEMAS — @ecom/event-schemas
// Standard event envelope + all Phase 1 domain events
// ─────────────────────────────────────────────────────────────────────────────

// ────────────────── Standard Event Envelope ──────────────────

export interface DomainEvent<T = Record<string, unknown>> {
  eventId: string;           // uuid-v4
  eventType: string;         // e.g. "user.registered"
  version: string;           // e.g. "1.0"
  timestamp: string;         // ISO 8601
  tenantId: string;          // uuid-v4
  correlationId: string;     // uuid-v4, traces related events
  causationId: string;       // uuid-v4, the event that caused this one
  source: string;            // service name, e.g. "auth-service"
  environment: string;       // "development" | "staging" | "production"
  payload: T;
}

// ────────────────── Auth Events ──────────────────

export interface UserRegisteredPayload {
  userId: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UserEmailVerifiedPayload {
  userId: string;
  tenantId: string;
  email: string;
}

export interface UserLoggedInPayload {
  userId: string;
  tenantId: string;
  ip: string;
  userAgent: string;
}

export interface UserLoginFailedPayload {
  email: string;
  tenantId: string;
  ip: string;
  attemptCount: number;
}

export interface UserAccountLockedPayload {
  userId: string;
  tenantId: string;
  lockedUntil: string;
  failedAttempts: number;
}

export interface UserPasswordResetPayload {
  userId: string;
  tenantId: string;
  ip: string;
}

export interface UserMfaEnabledPayload {
  userId: string;
  tenantId: string;
}

export interface UserProfileUpdatedPayload {
  userId: string;
  tenantId: string;
  changedFields: string[];
}

// ────────────────── Tenant Events ──────────────────

export interface TenantCreatedPayload {
  tenantId: string;
  slug: string;
  plan: string;
  ownerEmail: string;
  ownerName: string;
}

export interface TenantUpdatedPayload {
  tenantId: string;
  changedFields: string[];
}

export interface TenantPlanChangedPayload {
  tenantId: string;
  oldPlan: string;
  newPlan: string;
  changedBy: string;
}

export interface TenantSuspendedPayload {
  tenantId: string;
  reason: string;
  suspendedBy: string;
}

export interface TenantReactivatedPayload {
  tenantId: string;
  reactivatedBy: string;
}

export interface TenantFeatureFlagChangedPayload {
  tenantId: string;
  flagKey: string;
  isEnabled: boolean;
  config?: Record<string, unknown>;
  changedBy: string;
}

// ────────────────── Typed Event Constructors ──────────────────

import { v4 as uuidv4 } from 'uuid';

export function createEvent<T>(
  eventType: string,
  source: string,
  tenantId: string,
  payload: T,
  options?: {
    correlationId?: string;
    causationId?: string;
    version?: string;
    environment?: string;
  }
): DomainEvent<T> {
  return {
    eventId: uuidv4(),
    eventType,
    version: options?.version ?? '1.0',
    timestamp: new Date().toISOString(),
    tenantId,
    correlationId: options?.correlationId ?? uuidv4(),
    causationId: options?.causationId ?? uuidv4(),
    source,
    environment: options?.environment ?? process.env.NODE_ENV ?? 'development',
    payload,
  };
}

// ────────────────── Topic Constants ──────────────────

export const KAFKA_TOPICS = {
  AUTH_USER_EVENTS: (env: string) => `${env}-auth-user-events`,
  TENANT_EVENTS: (env: string) => `${env}-tenant-tenant-events`,
  NOTIFICATION_DISPATCH: (env: string) => `${env}-notification-dispatch-events`,
} as const;

export const AUTH_EVENT_TYPES = {
  USER_REGISTERED: 'user.registered',
  USER_EMAIL_VERIFIED: 'user.email_verified',
  USER_LOGGED_IN: 'user.logged_in',
  USER_LOGIN_FAILED: 'user.login_failed',
  USER_ACCOUNT_LOCKED: 'user.account_locked',
  USER_PASSWORD_RESET: 'user.password_reset',
  USER_MFA_ENABLED: 'user.mfa_enabled',
  USER_PROFILE_UPDATED: 'user.profile_updated',
} as const;

export const TENANT_EVENT_TYPES = {
  TENANT_CREATED: 'tenant.created',
  TENANT_UPDATED: 'tenant.updated',
  TENANT_PLAN_CHANGED: 'tenant.plan_changed',
  TENANT_SUSPENDED: 'tenant.suspended',
  TENANT_REACTIVATED: 'tenant.reactivated',
  TENANT_FEATURE_FLAG_CHANGED: 'tenant.feature_flag_changed',
} as const;
