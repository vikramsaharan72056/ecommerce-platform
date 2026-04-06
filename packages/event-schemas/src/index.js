"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// KAFKA EVENT SCHEMAS — @ecom/event-schemas
// Standard event envelope + all Phase 1 domain events
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.TENANT_EVENT_TYPES = exports.AUTH_EVENT_TYPES = exports.KAFKA_TOPICS = void 0;
exports.createEvent = createEvent;
// ────────────────── Typed Event Constructors ──────────────────
const uuid_1 = require("uuid");
function createEvent(eventType, source, tenantId, payload, options) {
    return {
        eventId: (0, uuid_1.v4)(),
        eventType,
        version: options?.version ?? '1.0',
        timestamp: new Date().toISOString(),
        tenantId,
        correlationId: options?.correlationId ?? (0, uuid_1.v4)(),
        causationId: options?.causationId ?? (0, uuid_1.v4)(),
        source,
        environment: options?.environment ?? process.env.NODE_ENV ?? 'development',
        payload,
    };
}
// ────────────────── Topic Constants ──────────────────
exports.KAFKA_TOPICS = {
    AUTH_USER_EVENTS: (env) => `${env}.auth.user-events`,
    TENANT_EVENTS: (env) => `${env}.tenant.tenant-events`,
    NOTIFICATION_DISPATCH: (env) => `${env}.notification.dispatch-events`,
};
exports.AUTH_EVENT_TYPES = {
    USER_REGISTERED: 'user.registered',
    USER_EMAIL_VERIFIED: 'user.email_verified',
    USER_LOGGED_IN: 'user.logged_in',
    USER_LOGIN_FAILED: 'user.login_failed',
    USER_ACCOUNT_LOCKED: 'user.account_locked',
    USER_PASSWORD_RESET: 'user.password_reset',
    USER_MFA_ENABLED: 'user.mfa_enabled',
    USER_PROFILE_UPDATED: 'user.profile_updated',
};
exports.TENANT_EVENT_TYPES = {
    TENANT_CREATED: 'tenant.created',
    TENANT_UPDATED: 'tenant.updated',
    TENANT_PLAN_CHANGED: 'tenant.plan_changed',
    TENANT_SUSPENDED: 'tenant.suspended',
    TENANT_REACTIVATED: 'tenant.reactivated',
    TENANT_FEATURE_FLAG_CHANGED: 'tenant.feature_flag_changed',
};
//# sourceMappingURL=index.js.map