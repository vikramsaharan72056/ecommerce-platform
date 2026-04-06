// ─────────────────────────────────────────────────────────────────────────────
// SHARED TYPES — @ecom/shared-types
// All TypeScript interfaces and types shared across microservices
// ─────────────────────────────────────────────────────────────────────────────

// ────────────────── API Response Envelopes ──────────────────

export interface ApiMeta {
  traceId: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiListResponse<T> {
  data: T[];
  cursor?: string;
  hasMore: boolean;
  total: number;
  meta: ApiMeta;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
    traceId: string;
  };
}

// ────────────────── JWT / Auth Types ──────────────────

export type UserRole = 'owner' | 'admin' | 'staff' | 'customer';
export type TenantPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export interface JwtPayload {
  sub: string;           // userId UUID
  tenantId: string;      // tenantId UUID
  role: UserRole;
  plan: TenantPlan;
  jti: string;           // unique token ID for blacklisting
  sessionId?: string;
  iat: number;
  exp: number;
}

export interface JwtTokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;     // seconds
}

// ────────────────── User Types ──────────────────

export type UserStatus = 'pending' | 'active' | 'suspended' | 'deleted';

export interface UserProfile {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  isMfaEnabled: boolean;
  avatarUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ────────────────── Tenant Types ──────────────────

export type TenantStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

export interface TenantProfile {
  id: string;
  name: string;
  slug: string;
  plan: TenantPlan;
  status: TenantStatus;
  trialEndsAt?: string;
  billingEmail: string;
  billingName?: string;
  timezone: string;
  locale: string;
  currency: string;
  customDomain?: string;
  logoUrl?: string;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TenantPlanDetails {
  name: TenantPlan;
  priceMonthly: number;  // in paise (INR cents)
  priceAnnual: number;
  maxProducts: number;
  maxOrdersPerMonth: number;
  maxStaffUsers: number;
  maxWarehouses: number;
  features: Record<string, boolean | string | number>;
}

export interface TenantUsage {
  productCount: number;
  orderCountThisMonth: number;
  staffCount: number;
  warehouseCount: number;
  limits: {
    maxProducts: number;
    maxOrdersPerMonth: number;
    maxStaffUsers: number;
    maxWarehouses: number;
  };
}

export interface FeatureFlag {
  id: string;
  tenantId: string;
  flagKey: string;
  isEnabled: boolean;
  config?: Record<string, unknown>;
  updatedBy?: string;
  createdAt: string;
}

// ────────────────── Notification Types ──────────────────

export type NotificationChannel = 'email' | 'sms' | 'push';
export type NotificationStatus = 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';

export interface NotificationLog {
  id: string;
  tenantId: string;
  recipientUserId?: string;
  recipientAddress: string;
  channel: NotificationChannel;
  eventType?: string;
  templateId?: string;
  status: NotificationStatus;
  provider?: string;
  providerMessageId?: string;
  errorMessage?: string;
  sentAt?: string;
  createdAt: string;
}

// ────────────────── Service Health Types ──────────────────

export interface ServiceHealth {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  service: string;
  version?: string;
  checks?: Record<string, 'ok' | 'error'>;
}

// ────────────────── Request Context ──────────────────

export interface RequestContext {
  traceId: string;
  spanId: string;
  tenantId: string;
  userId?: string;
  role?: UserRole;
  requestId: string;
}
