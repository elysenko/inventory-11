import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { paginateArray, type Paginated } from '../common/paginated';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import type { LocationView } from './location.view';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto = {}): Promise<Paginated<LocationView>> {
    const locations = await this.prisma.location.findMany({
      orderBy: [{ zone: 'asc' }, { name: 'asc' }],
      include: { stockLevels: { select: { qty: true } } },
    });

    return paginateArray(
      locations.map((location) => this.toView(location, location.stockLevels)),
      query,
    );
  }

  async findOne(id: string): Promise<LocationView> {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: { stockLevels: { select: { qty: true } } },
    });
    if (!location) throw new NotFoundException('Location not found.');
    return this.toView(location, location.stockLevels);
  }

  async create(dto: CreateLocationDto): Promise<LocationView> {
    await this.assertPairFree(dto.name, dto.zone);
    const location = await this.prisma.location.create({
      data: { name: dto.name, zone: dto.zone },
    });
    return this.toView(location, []);
  }

  async update(id: string, dto: UpdateLocationDto): Promise<LocationView> {
    const current = await this.prisma.location.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Location not found.');

    const name = dto.name ?? current.name;
    const zone = dto.zone ?? current.zone;
    if (name !== current.name || zone !== current.zone) {
      await this.assertPairFree(name, zone, id);
    }

    const location = await this.prisma.location.update({
      where: { id },
      data: { name, zone },
      include: { stockLevels: { select: { qty: true } } },
    });
    return this.toView(location, location.stockLevels);
  }

  /**
   * Deleting a location that still holds stock would silently orphan those
   * quantities, and one referenced by a movement would orphan the audit log —
   * both are refused with a 409 the UI surfaces rather than assuming success.
   */
  async remove(id: string): Promise<void> {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: { stockLevels: { select: { qty: true } } },
    });
    if (!location) throw new NotFoundException('Location not found.');

    const onHand = location.stockLevels.reduce((sum, level) => sum + level.qty, 0);
    if (onHand > 0) {
      throw new ConflictException(
        `${location.name} · ${location.zone} still holds ${onHand} units. Transfer the stock out before deleting it.`,
      );
    }

    const movements = await this.prisma.movement.count({
      where: { OR: [{ fromLocId: id }, { toLocId: id }] },
    });
    if (movements > 0) {
      throw new ConflictException(
        `${location.name} · ${location.zone} is referenced by recorded movements and cannot be deleted.`,
      );
    }

    await this.prisma.location.delete({ where: { id } });
  }

  /**
   * (name, zone) is unique. Compared case-insensitively so "Rack 1 / Zone A"
   * and "rack 1 / zone a" cannot both exist; reported against `zone`, which is
   * the input the location form attaches the duplicate message to.
   */
  private async assertPairFree(name: string, zone: string, exceptId?: string): Promise<void> {
    const clash = await this.prisma.location.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        zone: { equals: zone, mode: 'insensitive' },
        ...(exceptId ? { NOT: { id: exceptId } } : {}),
      },
      select: { id: true, name: true, zone: true },
    });
    if (clash) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: `${clash.name} · ${clash.zone} already exists. Pick a different zone.`,
        field: 'zone',
      });
    }
  }

  private toView(
    location: { id: string; name: string; zone: string; createdAt: Date },
    stockLevels: { qty: number }[],
  ): LocationView {
    return {
      id: location.id,
      name: location.name,
      zone: location.zone,
      itemCount: stockLevels.filter((level) => level.qty > 0).length,
      totalQty: stockLevels.reduce((sum, level) => sum + level.qty, 0),
      createdAt: location.createdAt.toISOString(),
    };
  }
}
