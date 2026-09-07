import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { paginateArray, type Paginated } from '../common/paginated';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDto } from './dto/query-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { toItemView, type ItemDetailView, type ItemView } from './item.view';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryItemsDto): Promise<Paginated<ItemView>> {
    const where: Prisma.ItemWhereInput = query.q
      ? {
          OR: [
            { sku: { contains: query.q, mode: 'insensitive' } },
            { name: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {};

    const items = await this.prisma.item.findMany({
      where,
      orderBy: { sku: 'asc' },
      include: { stockLevels: { select: { qty: true } } },
    });

    let views = items.map((item) => toItemView(item, item.stockLevels));

    // Low-stock is a predicate over the aggregate, so it cannot be a SQL WHERE
    // clause on Item alone — filter after the totals are known.
    if (query.lowStock) {
      views = views.filter((view) => view.totalQty <= view.reorderAt);
    }

    // The window is applied after filtering so `total` reflects the whole
    // filtered set, not just the page.
    return paginateArray(views, query);
  }

  async findOne(id: string): Promise<ItemDetailView> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: {
        stockLevels: {
          include: { location: { select: { id: true, name: true, zone: true } } },
          orderBy: [{ location: { zone: 'asc' } }, { location: { name: 'asc' } }],
        },
      },
    });
    if (!item) throw new NotFoundException('Item not found.');

    return {
      ...toItemView(item, item.stockLevels),
      stockLevels: item.stockLevels.map((level) => ({
        locationId: level.location.id,
        locationName: level.location.name,
        zone: level.location.zone,
        qty: level.qty,
      })),
    };
  }

  async create(dto: CreateItemDto): Promise<ItemView> {
    await this.assertSkuFree(dto.sku);
    const item = await this.prisma.item.create({
      data: {
        sku: dto.sku,
        name: dto.name,
        description: dto.description?.length ? dto.description : null,
        unit: dto.unit,
        reorderAt: dto.reorderAt,
      },
    });
    return toItemView(item, []);
  }

  /**
   * PartialType applies @IsOptional, which is `ValidateIf(value != null)` — an
   * explicit `null` therefore passes validation. Every required field treats
   * null as "not supplied" so a typed client cannot 500 the endpoint, while
   * `description: null` keeps its natural meaning of "clear it".
   */
  async update(id: string, dto: UpdateItemDto): Promise<ItemView> {
    await this.requireItem(id);
    if (dto.sku != null) await this.assertSkuFree(dto.sku, id);

    const item = await this.prisma.item.update({
      where: { id },
      data: {
        ...(dto.sku != null && { sku: dto.sku }),
        ...(dto.name != null && { name: dto.name }),
        ...(dto.description !== undefined && {
          description: dto.description ? dto.description : null,
        }),
        ...(dto.unit != null && { unit: dto.unit }),
        ...(dto.reorderAt != null && { reorderAt: dto.reorderAt }),
      },
      include: { stockLevels: { select: { qty: true } } },
    });
    return toItemView(item, item.stockLevels);
  }

  /**
   * Movements are immutable, so an item with history can never be deleted —
   * removing it would orphan the audit log. Stock still on hand blocks the
   * delete too, so quantities are never silently discarded.
   */
  async remove(id: string): Promise<void> {
    await this.requireItem(id);

    const [movements, stock] = await Promise.all([
      this.prisma.movement.count({ where: { itemId: id } }),
      this.prisma.stockLevel.aggregate({
        where: { itemId: id },
        _sum: { qty: true },
      }),
    ]);
    const onHand = stock._sum.qty ?? 0;

    if (movements > 0) {
      throw new ConflictException(
        'This item is referenced by recorded movements. Movements are immutable, so it cannot be deleted.',
      );
    }
    if (onHand > 0) {
      throw new ConflictException(
        `This item still holds ${onHand} on hand. Move the stock out before deleting it.`,
      );
    }

    await this.prisma.item.delete({ where: { id } });
  }

  private async requireItem(id: string): Promise<void> {
    const exists = await this.prisma.item.findUnique({ where: { id }, select: { id: true } });
    if (!exists) throw new NotFoundException('Item not found.');
  }

  /**
   * Pre-checked so the duplicate arrives as a field-scoped 422 the item form can
   * attach to the SKU input. PrismaExceptionFilter still backstops the race.
   */
  private async assertSkuFree(sku: string, exceptId?: string): Promise<void> {
    const clash = await this.prisma.item.findUnique({
      where: { sku },
      select: { id: true, name: true },
    });
    if (clash && clash.id !== exceptId) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: `${sku} is already used by “${clash.name}”. SKUs must be unique.`,
        field: 'sku',
      });
    }
  }

}
