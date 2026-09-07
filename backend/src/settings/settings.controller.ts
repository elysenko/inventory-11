import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { ADMIN_ROLES } from '../common/roles';
import { SettingsService, type SettingEntry } from './settings.service';

@ApiTags('settings')
@ApiBearerAuth()
@Controller('admin/settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  @Roles(...ADMIN_ROLES)
  @ApiOperation({ summary: 'Service credentials and whether each is configured (admin)' })
  findAll(): Promise<SettingEntry[]> {
    return this.settings.findAll();
  }

  @Patch()
  @Roles(...ADMIN_ROLES)
  @ApiOperation({ summary: 'Save the changed subset of settings (admin)' })
  update(@Body() patch: Record<string, unknown>): Promise<SettingEntry[]> {
    return this.settings.update(patch);
  }
}
