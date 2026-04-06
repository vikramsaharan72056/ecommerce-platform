import { IsEmail, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiPropertyOptional({ example: '123456', description: 'TOTP code if MFA is enabled' })
  @IsString()
  @IsOptional()
  @Length(6, 8)
  mfaCode?: string;
}
