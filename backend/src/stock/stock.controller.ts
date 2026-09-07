import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StockService, type BalanceMap } from './stock.service';

@ApiTags('stock')
@ApiBearerAuth()
@Controller('stock')
export class StockController {
  constructor(private readonly stock: StockService) {}

  @Get('balances')
  @ApiOperation({
    summary: 'Non-zero balances keyed "itemId|locationId" (any authenticated role)',
  })
  balances(): Promise<BalanceMap> {
    return this.stock.balances();
  }
}
