import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import type { Paginated } from '../common/paginated';
import { MANAGER_ROLES } from '../common/roles';
import { MovementsService } from '../movements/movements.service';
import type { MovementView } from '../movements/movement.view';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDto } from './dto/query-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
import type { ItemDetailView, ItemView } from './item.view';

@ApiTags('items')
@ApiBearerAuth()
@Controller('items')
export class ItemsController {
  constructor(
    private readonly items: ItemsService,
    private readonly movements: MovementsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Catalogue with on-hand totals (any authenticated role)' })
  findAll(@Query() query: QueryItemsDto): Promise<Paginated<ItemView>> {
    return this.items.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'One item with its per-location stock breakdown' })
  findOne(@Param('id') id: string): Promise<ItemDetailView> {
    return this.items.findOne(id);
  }

  /**
   * The item detail page's History tab is open to clerks, while the full audit
   * log at GET /api/movements is manager-only — hence this narrower, per-item
   * view rather than reusing the log endpoint.
   */
  @Get(':id/movements')
  @ApiOperation({ summary: 'Movement history for one item (any authenticated role)' })
  history(@Param('id') id: string): Promise<MovementView[]> {
    return this.movements.findForItem(id);
  }

  @Post()
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'Create an item (manager)' })
  create(@Body() dto: CreateItemDto): Promise<ItemView> {
    return this.items.create(dto);
  }

  @Patch(':id')
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'Update an item (manager)' })
  update(@Param('id') id: string, @Body() dto: UpdateItemDto): Promise<ItemView> {
    return this.items.update(id, dto);
  }

  @Delete(':id')
  @Roles(...MANAGER_ROLES)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an item with no history and no stock (manager)' })
  remove(@Param('id') id: string): Promise<void> {
    return this.items.remove(id);
  }
}
