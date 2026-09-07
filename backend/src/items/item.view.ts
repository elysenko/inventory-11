import type { Item } from '@prisma/client';

/** Matches frontend core/models.ts `Item`. */
export interface ItemView {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  unit: string;
  reorderAt: number;
  totalQty: number;
}

/** Matches frontend core/models.ts `StockLevelRow`. */
export interface StockLevelRowView {
  locationId: string;
  locationName: string;
  zone: string;
  qty: number;
}

/** Matches frontend core/models.ts `ItemDetail`. */
export interface ItemDetailView extends ItemView {
  stockLevels: StockLevelRowView[];
}

/**
 * On-hand is never stored on the item — it is always the sum of the item's
 * StockLevel rows, so the per-location breakdown and the total cannot disagree.
 */
export function toItemView(
  item: Item,
  stockLevels: { qty: number }[],
): ItemView {
  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    description: item.description,
    unit: item.unit,
    reorderAt: item.reorderAt,
    totalQty: stockLevels.reduce((sum, level) => sum + level.qty, 0),
  };
}
