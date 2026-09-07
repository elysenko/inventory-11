import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Flat fields match frontend core/models.ts `LowStockRow`, which is what the
 * report table renders. `item` carries the same values nested, for callers that
 * want the item as an object rather than spread across the row.
 */
export interface LowStockRow {
  itemId: string;
  sku: string;
  name: string;
  unit: string;
  totalQty: number;
  reorderAt: number;
  deficit: number;
  item: {
    id: string;
    sku: string;
    name: string;
    unit: string;
    reorderAt: number;
  };
}

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Items at or below their reorder point.
   *
   * The threshold is `totalQty <= reorderAt`, so an item sitting exactly on its
   * threshold is reported with a deficit of 0. Items with no StockLevel rows at
   * all count as 0 on hand and are included — that is the most urgent case, not
   * an absent one, which is why this walks every item rather than grouping the
   * StockLevel table.
   */
  async lowStock(): Promise<LowStockRow[]> {
    const items = await this.prisma.item.findMany({
      orderBy: { sku: 'asc' },
      include: { stockLevels: { select: { qty: true } } },
    });

    return items
      .map((item) => {
        const totalQty = item.stockLevels.reduce((sum, level) => sum + level.qty, 0);
        return {
          itemId: item.id,
          sku: item.sku,
          name: item.name,
          unit: item.unit,
          totalQty,
          reorderAt: item.reorderAt,
          deficit: Math.max(0, item.reorderAt - totalQty),
          item: {
            id: item.id,
            sku: item.sku,
            name: item.name,
            unit: item.unit,
            reorderAt: item.reorderAt,
          },
        };
      })
      .filter((row) => row.totalQty <= row.reorderAt)
      // Worst shortfall first; ties broken by SKU so the order is stable.
      .sort((a, b) => b.deficit - a.deficit || a.sku.localeCompare(b.sku));
  }
}
