import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { MANAGER_ROLES } from '../common/roles';
import { ReportsService, type LowStockRow } from './reports.service';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get('low-stock')
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'Items at or below their reorder point (manager)' })
  lowStock(): Promise<LowStockRow[]> {
    return this.reports.lowStock();
  }
}
