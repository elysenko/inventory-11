import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** `${itemId}|${locationId}` -> units on hand. Rows at zero are omitted. */
export type BalanceMap = Record<string, number>;

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Powers the movement form's "N units currently held there" hint, which needs
   * a balance for an arbitrary (item, location) pair before anything is chosen.
   * Advisory only — the authoritative check happens under a row lock inside the
   * movement transaction, so a stale hint can never permit an overdraw.
   */
  async balances(): Promise<BalanceMap> {
    const levels = await this.prisma.stockLevel.findMany({
      where: { qty: { not: 0 } },
      select: { itemId: true, locationId: true, qty: true },
    });

    const map: BalanceMap = {};
    for (const level of levels) {
      map[`${level.itemId}|${level.locationId}`] = level.qty;
    }
    return map;
  }
}
