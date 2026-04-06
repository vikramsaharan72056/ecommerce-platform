export interface DomainEvent<T = Record<string, unknown>> {
    eventId: string;
    eventType: string;
    version: string;
    timestamp: string;
    tenantId: string;
    correlationId: string;
    causationId: string;
    source: string;
    environment: string;
    payload: T;
}
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
export declare function createEvent<T>(eventType: string, source: string, tenantId: string, payload: T, options?: {
    correlationId?: string;
    causationId?: string;
    version?: string;
    environment?: string;
}): DomainEvent<T>;
export declare const KAFKA_TOPICS: {
    readonly AUTH_USER_EVENTS: (env: string) => string;
    readonly TENANT_EVENTS: (env: string) => string;
    readonly NOTIFICATION_DISPATCH: (env: string) => string;
};
export declare const AUTH_EVENT_TYPES: {
    readonly USER_REGISTERED: "user.registered";
    readonly USER_EMAIL_VERIFIED: "user.email_verified";
    readonly USER_LOGGED_IN: "user.logged_in";
    readonly USER_LOGIN_FAILED: "user.login_failed";
    readonly USER_ACCOUNT_LOCKED: "user.account_locked";
    readonly USER_PASSWORD_RESET: "user.password_reset";
    readonly USER_MFA_ENABLED: "user.mfa_enabled";
    readonly USER_PROFILE_UPDATED: "user.profile_updated";
};
export declare const TENANT_EVENT_TYPES: {
    readonly TENANT_CREATED: "tenant.created";
    readonly TENANT_UPDATED: "tenant.updated";
    readonly TENANT_PLAN_CHANGED: "tenant.plan_changed";
    readonly TENANT_SUSPENDED: "tenant.suspended";
    readonly TENANT_REACTIVATED: "tenant.reactivated";
    readonly TENANT_FEATURE_FLAG_CHANGED: "tenant.feature_flag_changed";
};
//# sourceMappingURL=index.d.ts.map