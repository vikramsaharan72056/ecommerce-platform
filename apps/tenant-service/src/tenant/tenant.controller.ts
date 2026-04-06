import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new tenant' })
  async create(@Body() dto: CreateTenantDto) {
    return this.tenantService.create(dto);
  }

  @Get('validate-slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check if slug available' })
  async validateSlug(@Query('slug') slug: string) {
    return this.tenantService.validateSlug(slug);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.tenantService.update(id, dto);
  }

  @Get(':id/usage')
  @HttpCode(HttpStatus.OK)
  async getUsage(@Param('id') id: string) {
    return this.tenantService.getUsage(id);
  }

  @Get(':id/features')
  @HttpCode(HttpStatus.OK)
  async getFeatures(@Param('id') id: string) {
    return this.tenantService.getFeatureFlags(id);
  }
}
