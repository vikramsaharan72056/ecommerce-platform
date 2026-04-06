import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { EventPublisher } from '../kafka/event-publisher.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  AUTH_EVENT_TYPES,
  KAFKA_TOPICS,
  createEvent,
} from '@ecom/event-schemas';
import { JwtPayload, JwtTokenPair, UserProfile } from '@ecom/shared-types';
import { EncryptionService } from '../common/services/encryption.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly prisma!: PrismaService;
  private readonly jwtService!: JwtService;
  private readonly redis!: RedisService;
  private readonly events!: EventPublisher;
  private readonly config!: ConfigService;
  private readonly encryption!: EncryptionService;

  constructor(
    prisma: PrismaService,
    jwtService: JwtService,
    redis: RedisService,
    events: EventPublisher,
    config: ConfigService,
    encryption: EncryptionService,
  ) {
    this.prisma = prisma;
    this.jwtService = jwtService;
    this.redis = redis;
    this.events = events;
    this.config = config;
    this.encryption = encryption;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // REGISTRATION
  // ─────────────────────────────────────────────────────────────────────────

  async register(dto: RegisterDto, tenantId: string): Promise<{ userId: string; message: string }> {
    // Check for existing user
    const existing = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: dto.email.toLowerCase() } },
    });
    if (existing && !existing.deletedAt) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = this.config.get<number>('app.bcrypt.saltRounds', 12);
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        tenantId,
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: 'customer',
        status: 'pending',
        isVerified: false,
      },
    });

    // Create email verification token
    await this.createVerificationToken(user.id, 'email_verify');

    // Publish Kafka event
    await this.events.publish(
      KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
      createEvent(AUTH_EVENT_TYPES.USER_REGISTERED, 'auth-service', tenantId, {
        userId: user.id,
        tenantId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }),
    );

    this.logger.log(`User registered: ${user.id} in tenant ${tenantId}`);
    return { userId: user.id, message: 'Registration successful. Please verify your email.' };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────────────────────────────────

  async login(dto: LoginDto, tenantId: string, ip: string, userAgent: string): Promise<JwtTokenPair & { user: UserProfile }> {
    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: dto.email.toLowerCase() } },
    });

    // Generic error — never reveal if email exists
    const invalidCredentials = () => new UnauthorizedException('Invalid credentials');

    if (!user || user.deletedAt) throw invalidCredentials();

    // Check if locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new ForbiddenException(`Account locked until ${user.lockedUntil.toISOString()}`);
    }

    // Verify password
    const isPasswordValid = user.passwordHash
      ? await bcrypt.compare(dto.password, user.passwordHash)
      : false;

    if (!isPasswordValid) {
      await this.handleFailedLogin(user, tenantId, ip);
      throw invalidCredentials();
    }

    // Check MFA if enabled
    if (user.isMfaEnabled) {
      if (!dto.mfaCode) {
        throw new UnauthorizedException('MFA code required');
      }
      const isMfaValid = await this.verifyMfaCode(user.id, dto.mfaCode);
      if (!isMfaValid) {
        throw new UnauthorizedException('Invalid MFA code');
      }
    }

    // Check account status
    if (user.status === 'suspended') {
      throw new ForbiddenException('Account suspended. Contact support.');
    }

    // Reset failed login count
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() },
    });

    // Issue tokens
    const tokens = await this.issueTokenPair(user);

    // Publish event
    await this.events.publish(
      KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
      createEvent(AUTH_EVENT_TYPES.USER_LOGGED_IN, 'auth-service', tenantId, {
        userId: user.id,
        tenantId,
        ip,
        userAgent,
      }),
    );

    return {
      ...tokens,
      user: this.toUserProfile(user),
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // REFRESH TOKEN
  // ─────────────────────────────────────────────────────────────────────────

  async refreshTokens(dto: RefreshTokenDto, tenantId: string): Promise<JwtTokenPair> {
    const tokenHash = this.hashToken(dto.refreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (storedToken.tenantId !== tenantId) {
      throw new UnauthorizedException('Token tenant mismatch');
    }

    // Rotate — revoke old, issue new
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokenPair(storedToken.user);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────────────────────────────────

  async logout(userId: string, refreshToken: string, accessTokenJti: string, accessTokenExp: number): Promise<void> {
    const tokenHash = this.hashToken(refreshToken);

    // Revoke refresh token
    await this.prisma.refreshToken.updateMany({
      where: { userId, tokenHash },
      data: { revokedAt: new Date() },
    });

    // Blacklist access token until its expiry
    const ttlSeconds = accessTokenExp - Math.floor(Date.now() / 1000);
    if (ttlSeconds > 0) {
      await this.redis.setex(`blacklist:jti:${accessTokenJti}`, ttlSeconds, '1');
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────────────────────────────────

  async forgotPassword(dto: ForgotPasswordDto, tenantId: string): Promise<void> {
    // Always return success — prevents email enumeration
    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: dto.email.toLowerCase() } },
    });

    if (!user || user.deletedAt || !user.isVerified) return;

    await this.createVerificationToken(user.id, 'password_reset');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────────────────────────────────────

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const tokenHash = this.hashToken(dto.token);

    const verificationToken = await this.prisma.verificationToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (
      !verificationToken ||
      verificationToken.type !== 'password_reset' ||
      verificationToken.usedAt ||
      verificationToken.expiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const saltRounds = this.config.get<number>('app.bcrypt.saltRounds', 12);
    const passwordHash = await bcrypt.hash(dto.newPassword, saltRounds);

    // Update password and mark token as used
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: verificationToken.userId },
        data: { passwordHash, status: 'active' },
      }),
      this.prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { usedAt: new Date() },
      }),
      // Revoke all refresh tokens (invalidate all existing sessions)
      this.prisma.refreshToken.updateMany({
        where: { userId: verificationToken.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

    await this.events.publish(
      KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
      createEvent(
        AUTH_EVENT_TYPES.USER_PASSWORD_RESET,
        'auth-service',
        verificationToken.user.tenantId,
        {
          userId: verificationToken.userId,
          tenantId: verificationToken.user.tenantId,
          ip: 'unknown',
        },
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EMAIL VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────

  async verifyEmail(token: string): Promise<void> {
    const tokenHash = this.hashToken(token);

    const verificationToken = await this.prisma.verificationToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (
      !verificationToken ||
      verificationToken.type !== 'email_verify' ||
      verificationToken.usedAt ||
      verificationToken.expiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: verificationToken.userId },
        data: { isVerified: true, status: 'active' },
      }),
      this.prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    await this.events.publish(
      KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
      createEvent(
        AUTH_EVENT_TYPES.USER_EMAIL_VERIFIED,
        'auth-service',
        verificationToken.user.tenantId,
        {
          userId: verificationToken.userId,
          tenantId: verificationToken.user.tenantId,
          email: verificationToken.user.email,
        },
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROFILE
  // ─────────────────────────────────────────────────────────────────────────

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return this.toUserProfile(user);
  }

  async updateProfile(userId: string, tenantId: string, dto: UpdateProfileDto): Promise<UserProfile> {
    const changedFields = Object.keys(dto);

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.phone && { phone: dto.phone }),
        ...(dto.avatarUrl && { avatarUrl: dto.avatarUrl }),
      },
    });

    await this.events.publish(
      KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
      createEvent(AUTH_EVENT_TYPES.USER_PROFILE_UPDATED, 'auth-service', tenantId, {
        userId,
        tenantId,
        changedFields,
      }),
    );

    return this.toUserProfile(user);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INTERNAL — Token validation (used by API gateway via gRPC)
  // ─────────────────────────────────────────────────────────────────────────

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      // Check blacklist
      const isBlacklisted = await this.redis.exists(`blacklist:jti:${payload.jti}`);
      if (isBlacklisted) throw new UnauthorizedException('Token has been revoked');

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────────────────

  private async issueTokenPair(user: { id: string; tenantId: string; role: string }): Promise<JwtTokenPair> {
    const jti = uuidv4();
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: user.id,
      tenantId: user.tenantId,
      role: user.role as JwtPayload['role'],
      plan: 'free',      // TODO: fetch from tenant-service
      jti,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    // Refresh token: secure random bytes
    const rawRefreshToken = crypto.randomBytes(48).toString('base64url');
    const tokenHash = this.hashToken(rawRefreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        id: uuidv4(),
        userId: user.id,
        tenantId: user.tenantId,
        tokenHash,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }

  private async createVerificationToken(userId: string, type: 'email_verify' | 'password_reset'): Promise<string> {
    const rawToken = crypto.randomBytes(48).toString('base64url');
    const tokenHash = this.hashToken(rawToken);

    const expiryMinutes =
      type === 'email_verify'
        ? this.config.get<number>('app.email.verificationExpiryMinutes', 1440)
        : this.config.get<number>('app.email.passwordResetExpiryMinutes', 60);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);

    // Invalidate previous tokens of same type
    await this.prisma.verificationToken.updateMany({
      where: { userId, type, usedAt: null },
      data: { usedAt: new Date() },
    });

    await this.prisma.verificationToken.create({
      data: {
        id: uuidv4(),
        userId,
        tokenHash,
        type,
        expiresAt,
      },
    });

    return rawToken;
  }

  private async handleFailedLogin(
    user: { id: string; tenantId: string; failedLogins: number },
    tenantId: string,
    ip: string,
  ): Promise<void> {
    const newCount = user.failedLogins + 1;
    const lockoutConfig = this.config.get('app.lockout');

    let lockedUntil: Date | null = null;
    if (newCount >= lockoutConfig.manualLockAttempts) {
      lockedUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year = manual unlock
    } else if (newCount >= lockoutConfig.hardLockAttempts) {
      lockedUntil = new Date(Date.now() + lockoutConfig.hardLockDurationMinutes * 60 * 1000);
    } else if (newCount >= lockoutConfig.maxAttempts) {
      lockedUntil = new Date(Date.now() + lockoutConfig.lockDurationMinutes * 60 * 1000);
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLogins: newCount, ...(lockedUntil && { lockedUntil }) },
    });

    await this.events.publish(
      KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
      createEvent(AUTH_EVENT_TYPES.USER_LOGIN_FAILED, 'auth-service', tenantId, {
        email: user.id,
        tenantId,
        ip,
        attemptCount: newCount,
      }),
    );

    if (lockedUntil) {
      await this.events.publish(
        KAFKA_TOPICS.AUTH_USER_EVENTS(this.getEnv()),
        createEvent(AUTH_EVENT_TYPES.USER_ACCOUNT_LOCKED, 'auth-service', tenantId, {
          userId: user.id,
          tenantId,
          lockedUntil: lockedUntil.toISOString(),
          failedAttempts: newCount,
        }),
      );
    }
  }

  private async verifyMfaCode(userId: string, code: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.mfaSecret) return false;

    const speakeasy = require('speakeasy');
    const secret = this.encryption.decrypt(user.mfaSecret);

    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
  }

  // ── MFA Setup Logic ──

  async setupMfa(userId: string): Promise<{ qrCodeUrl: string; secret: string }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const speakeasy = require('speakeasy');
    const qrcode = require('qrcode');

    const secret = speakeasy.default.generateSecret({
      name: `EcomPlatform:${user.email}`,
      issuer: this.config.get<string>('app.mfa.issuer', 'EcomPlatform'),
    });

    // Store unactivated secret temporarily (encrypted)
    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: this.encryption.encrypt(secret.base32) },
    });

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);

    return { qrCodeUrl, secret: secret.base32 };
  }

  async verifyAndActivateMfa(userId: string, code: string): Promise<{ backupCodes: string[] }> {
    const isValid = await this.verifyMfaCode(userId, code);
    if (!isValid) throw new UnauthorizedException('Invalid verification code');

    // Generate 10 backup codes
    const backupCodes: string[] = [];
    for (let i = 0; i < 10; i++) {
      backupCodes.push(crypto.randomBytes(4).toString('hex')); // 8 chars
    }

    const hashedBackupCodes = await Promise.all(
      backupCodes.map(c => bcrypt.hash(c, 10))
    );

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { isMfaEnabled: true },
      }),
      ...hashedBackupCodes.map(hash =>
        this.prisma.mfaBackupCode.create({
          data: { id: uuidv4(), userId, codeHash: hash }
        })
      )
    ]);

    return { backupCodes };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private getEnv(): string {
    return this.config.get<string>('app.nodeEnv', 'development');
  }

  private toUserProfile(user: any): UserProfile {
    return {
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      isMfaEnabled: user.isMfaEnabled,
      avatarUrl: user.avatarUrl,
      lastLoginAt: user.lastLoginAt?.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
