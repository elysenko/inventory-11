import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MovementType, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { resolveWindow, type Paginated } from '../common/paginated';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { QueryMovementsDto } from './dto/query-movements.dto';
import { MOVEMENT_INCLUDE, toMovementView, type MovementView } from './movement.view';

/** One locked StockLevel row, as returned by the SELECT ... FOR UPDATE. */
interface LockedBalance {
  id: string;
  locationId: string;
  qty: number;
}

@Injectable()
export class MovementsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Applies a movement and writes its audit row in a single transaction.
   *
   * Concurrency contract: the affected StockLevel rows are materialised with
   * INSERT ... ON CONFLICT DO NOTHING (race-free — an upsert could abort the
   * transaction with P2002 under contention), then re-read with
   * SELECT ... FOR UPDATE ordered by id. Locking after materialising is what
   * makes the balance check authoritative: a concurrent movement against the
   * same row blocks until this transaction commits, then re-reads the new
   * balance rather than acting on a stale one. The deterministic id order means
   * two transfers touching the same pair of rows cannot deadlock.
   *
   * An overdraw throws, which rolls the whole transaction back — no balance
   * moves and no Movement row is written.
   */
  async create(dto: CreateMovementDto, userId: string): Promise<MovementView> {
    const fromLocId = dto.fromLocId ?? null;
    const toLocId = dto.toLocId ?? null;
    this.assertShape(dto.type, fromLocId, toLocId);

    const movementId = await this.prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: { id: dto.itemId },
        select: { id: true, sku: true, unit: true },
      });
      if (!item) throw new NotFoundException('Item not found.');

      // Sorted so the speculative inserts below happen in the same
      // deterministic order for every transaction. Two opposing transfers whose
      // StockLevel rows do not exist yet would otherwise insert them in
      // opposite orders and deadlock waiting on each other's uncommitted tuple.
      const locationIds = [
        ...new Set([fromLocId, toLocId].filter((id): id is string => id !== null)),
      ].sort();
      const found = await tx.location.count({ where: { id: { in: locationIds } } });
      if (found !== locationIds.length) throw new NotFoundException('Location not found.');

      for (const locationId of locationIds) {
        await tx.$executeRaw`
          INSERT INTO "StockLevel" ("id", "itemId", "locationId", "qty", "createdAt", "updatedAt")
          VALUES (${randomUUID()}, ${dto.itemId}, ${locationId}, 0, NOW(), NOW())
          ON CONFLICT ("itemId", "locationId") DO NOTHING`;
      }

      const locked = await tx.$queryRaw<LockedBalance[]>(Prisma.sql`
        SELECT "id", "locationId", "qty"
        FROM "StockLevel"
        WHERE "itemId" = ${dto.itemId}
          AND "locationId" IN (${Prisma.join(locationIds)})
        ORDER BY "id"
        FOR UPDATE`);

      const balances = new Map(locked.map((row) => [row.locationId, row]));

      if (fromLocId) {
        const source = balances.get(fromLocId);
        if (!source) throw new NotFoundException('Location not found.');
        if (source.qty < dto.qty) {
          throw new UnprocessableEntityException({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message:
              `Insufficient stock — only ${source.qty} ${item.unit} of ${item.sku} ` +
              'are held at that location. Nothing was recorded.',
            field: 'qty',
            available: source.qty,
            unit: item.unit,
            sku: item.sku,
          });
        }
        await tx.stockLevel.update({
          where: { id: source.id },
          data: { qty: { decrement: dto.qty } },
        });
      }

      if (toLocId) {
        const destination = balances.get(toLocId);
        if (!destination) throw new NotFoundException('Location not found.');
        await tx.stockLevel.update({
          where: { id: destination.id },
          data: { qty: { increment: dto.qty } },
        });
      }

      const movement = await tx.movement.create({
        data: {
          type: dto.type,
          itemId: dto.itemId,
          fromLocId,
          toLocId,
          qty: dto.qty,
          note: dto.note ?? null,
          userId,
        },
        select: { id: true },
      });
      return movement.id;
    });

    return this.findOne(movementId);
  }

  /**
   * Full audit log, newest first. Manager-gated at the controller.
   *
   * Counted and windowed in SQL rather than in memory — this is the one table
   * that grows without bound, so it must never be materialised whole.
   */
  async findAll(query: QueryMovementsDto): Promise<Paginated<MovementView>> {
    const where: Prisma.MovementWhereInput = {
      ...(query.itemId ? { itemId: query.itemId } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...this.dateRange(query.from, query.to),
    };
    const { page, pageSize, skip, take } = resolveWindow(query);

    const [movements, total] = await this.prisma.$transaction([
      this.prisma.movement.findMany({
        where,
        // id breaks ties so two movements sharing a timestamp cannot swap
        // places between pages and hide a row.
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        include: MOVEMENT_INCLUDE,
        skip,
        take,
      }),
      this.prisma.movement.count({ where }),
    ]);

    return { data: movements.map(toMovementView), total, page, pageSize };
  }

  /** History for one item — readable by clerks, unlike the full log. */
  async findForItem(itemId: string): Promise<MovementView[]> {
    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Item not found.');

    const movements = await this.prisma.movement.findMany({
      where: { itemId },
      orderBy: { createdAt: 'desc' },
      include: MOVEMENT_INCLUDE,
    });
    return movements.map(toMovementView);
  }

  async findOne(id: string): Promise<MovementView> {
    const movement = await this.prisma.movement.findUnique({
      where: { id },
      include: MOVEMENT_INCLUDE,
    });
    if (!movement) throw new NotFoundException('Movement not found.');
    return toMovementView(movement);
  }

  /**
   * `from`/`to` arrive as YYYY-MM-DD and are both inclusive, interpreted in UTC
   * so they line up with the UI's `createdAt.slice(0, 10)` comparison.
   */
  private dateRange(from?: string, to?: string): Prisma.MovementWhereInput {
    if (!from && !to) return {};
    const createdAt: Prisma.DateTimeFilter = {};
    if (from) createdAt.gte = new Date(`${from.slice(0, 10)}T00:00:00.000Z`);
    if (to) createdAt.lte = new Date(`${to.slice(0, 10)}T23:59:59.999Z`);
    return { createdAt };
  }

  /** Which location fields each movement type requires, and which it forbids. */
  private assertShape(
    type: MovementType,
    fromLocId: string | null,
    toLocId: string | null,
  ): void {
    const reject = (message: string, field: string): never => {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message,
        field,
      });
    };

    if (type === MovementType.IN) {
      if (!toLocId) reject('Choose the location the stock is arriving at.', 'toLocId');
      if (fromLocId) reject('A stock-in has no source location.', 'fromLocId');
      return;
    }

    if (type === MovementType.OUT) {
      if (!fromLocId) reject('Choose the location the stock is leaving.', 'fromLocId');
      if (toLocId) reject('A stock-out has no destination location.', 'toLocId');
      return;
    }

    if (!fromLocId) reject('Choose the location the stock is leaving.', 'fromLocId');
    if (!toLocId) reject('Choose the location the stock is arriving at.', 'toLocId');
    if (fromLocId === toLocId) {
      reject('A transfer needs two different locations.', 'toLocId');
    }
  }
}
