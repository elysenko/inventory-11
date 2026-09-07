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
import { PaginationDto } from '../common/dto/pagination.dto';
import type { Paginated } from '../common/paginated';
import { MANAGER_ROLES } from '../common/roles';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';
import type { LocationView } from './location.view';

@ApiTags('locations')
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locations: LocationsService) {}

  /**
   * Readable by any authenticated role: the movement form is open to clerks and
   * needs this to populate its from/to selects. Only mutation is manager-gated.
   */
  @Get()
  @ApiOperation({ summary: 'All locations with their holdings (any authenticated role)' })
  findAll(@Query() query: PaginationDto): Promise<Paginated<LocationView>> {
    return this.locations.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'One location' })
  findOne(@Param('id') id: string): Promise<LocationView> {
    return this.locations.findOne(id);
  }

  @Post()
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'Create a location (manager)' })
  create(@Body() dto: CreateLocationDto): Promise<LocationView> {
    return this.locations.create(dto);
  }

  @Patch(':id')
  @Roles(...MANAGER_ROLES)
  @ApiOperation({ summary: 'Update a location (manager)' })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto): Promise<LocationView> {
    return this.locations.update(id, dto);
  }

  @Delete(':id')
  @Roles(...MANAGER_ROLES)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an empty, unreferenced location (manager)' })
  remove(@Param('id') id: string): Promise<void> {
    return this.locations.remove(id);
  }
}
