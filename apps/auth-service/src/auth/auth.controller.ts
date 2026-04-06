import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Headers,
  Ip,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { ActivateMfaDto } from './dto/activate-mfa.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { TenantId } from '../common/decorators/tenant-id.decorator';
import { JwtPayload } from '@ecom/shared-types';

@ApiTags('auth')
@ApiHeader({ name: 'X-Tenant-ID', description: 'Tenant identifier', required: true })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ── POST /v1/auth/register ──
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  register(
    @Body() dto: RegisterDto,
    @TenantId() tenantId: string,
  ) {
    return this.authService.register(dto, tenantId);
  }

  // ── POST /v1/auth/login ──
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(
    @Body() dto: LoginDto,
    @TenantId() tenantId: string,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.login(dto, tenantId, ip, userAgent ?? '');
  }

  // ── POST /v1/auth/refresh ──
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  refresh(
    @Body() dto: RefreshTokenDto,
    @TenantId() tenantId: string,
  ) {
    return this.authService.refreshTokens(dto, tenantId);
  }

  // ── POST /v1/auth/logout ──
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  async logout(
    @Body() dto: LogoutDto,
    @CurrentUser() user: JwtPayload,
  ) {
    await this.authService.logout(user.sub, dto.refreshToken, user.jti, user.exp);
    return { message: 'Logged out successfully' };
  }

  // ── POST /v1/auth/forgot-password ──
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset email' })
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @TenantId() tenantId: string,
  ) {
    await this.authService.forgotPassword(dto, tenantId);
    // Always same response — prevents email enumeration
    return { message: 'If that email exists, a reset link has been sent.' };
  }

  // ── POST /v1/auth/reset-password ──
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using reset token' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { message: 'Password reset successfully' };
  }

  // ── POST /v1/auth/verify-email ──
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email address with token' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    await this.authService.verifyEmail(dto.token);
    return { message: 'Email verified successfully' };
  }

  // ── GET /v1/auth/me ──
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile (from JWT, no DB call)' })
  getMe(@CurrentUser() user: JwtPayload) {
    // Fast path — data decoded from JWT, no DB round-trip
    return { data: user };
  }

  // ── PUT /v1/auth/me ──
  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  updateMe(
    @Body() dto: UpdateProfileDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.authService.updateProfile(user.sub, user.tenantId, dto);
  }

  // ── POST /v1/auth/mfa/setup ──
  @Post('mfa/setup')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Setup MFA (generates secret and QR code)' })
  setupMfa(@CurrentUser() user: JwtPayload) {
    return this.authService.setupMfa(user.sub);
  }

  // ── POST /v1/auth/mfa/activate ──
  @Post('mfa/activate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Activate MFA and receive backup codes' })
  activateMfa(@Body() dto: ActivateMfaDto, @CurrentUser() user: JwtPayload) {
    return this.authService.verifyAndActivateMfa(user.sub, dto.code);
  }

  // ── POST /v1/auth/validate-token (internal — API Gateway only) ──
  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate access token (internal use — API Gateway only)' })
  validateToken(@Body() dto: ValidateTokenDto) {
    return this.authService.validateToken(dto.token);
  }
}
