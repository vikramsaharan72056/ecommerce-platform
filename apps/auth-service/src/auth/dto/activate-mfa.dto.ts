import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivateMfaDto {
  @ApiProperty({ example: '123456', description: '6-digit TOTP code' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code!: string;
}
