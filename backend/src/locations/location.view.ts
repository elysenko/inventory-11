/** Matches frontend core/models.ts `Location`, plus `createdAt` from the API contract. */
export interface LocationView {
  id: string;
  name: string;
  zone: string;
  /** Distinct items with a non-zero balance here. */
  itemCount: number;
  /** Units held here, summed across items. */
  totalQty: number;
  /** ISO 8601. */
  createdAt: string;
}
