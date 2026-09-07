import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/roles.decorator';
import type { Paginated } from '../common/paginated';
import { MANAGER_ROLES } from '../common/roles';
import { CreateMovementDto } from './dto/create-movement.dto';
import { QueryMovementsDto } from './dto/query-movements.dto';
import { MovementsService } from './movements.service';
import type { AuthUser } from '../auth/auth-user';
import type { MovementView } from './movement.view';

@ApiTags('movements')
@ApiBearerAuth()
@Controller('movements')
export class MovementsController {
  constructor(private readonly movements: MovementsService) {}

  /** The audit log is manager-only; clerks record movements but do not review them. */
  @Get()
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'Filterable audit log, newest first (manager)' })
  findAll(@Query() query: QueryMovementsDto): Promise<Paginated<MovementView>> {
    return this.movements.findAll(query);
  }

  @Get(':id')
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'One movement (manager)' })
  findOne(@Param('id') id: string): Promise<MovementView> {
    return this.movements.findOne(id);
  }

  /** Recording stock is the clerk's core job, so this is open to any role. */
  @Post()
  @ApiOperation({ summary: 'Record a movement (any authenticated role)' })
  create(
    @Body() dto: CreateMovementDto,
    @CurrentUser() user: AuthUser,
  ): Promise<MovementView> {
    return this.movements.create(dto, user.id);
  }
}
