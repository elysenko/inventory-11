/** Shared response/entity shapes mirroring the StockRoom REST API. */

export type Role = 'ADMIN' | 'MANAGER' | 'USER';
export type MovementType = 'IN' | 'OUT' | 'TRANSFER';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

export interface Item {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  unit: string;
  reorderAt: number;
  totalQty: number;
}

export interface StockLevelRow {
  locationId: string;
  locationName: string;
  zone: string;
  qty: number;
}

export interface ItemDetail extends Item {
  stockLevels: StockLevelRow[];
}

export interface Location {
  id: string;
  name: string;
  zone: string;
  itemCount: number;
  totalQty: number;
}

export interface Movement {
  id: string;
  type: MovementType;
  itemId: string;
  itemSku: string;
  itemName: string;
  fromLocName: string | null;
  toLocName: string | null;
  qty: number;
  note: string | null;
  userEmail: string;
  createdAt: string;
}

export interface LowStockRow {
  itemId: string;
  sku: string;
  name: string;
  unit: string;
  totalQty: number;
  reorderAt: number;
  deficit: number;
}

export interface SettingEntry {
  key: string;
  service: string;
  label: string;
  value: string;
  configured: boolean;
}

export interface Paginated<T> {
  /** The current page. `total` is the size of the whole filtered set. */
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const ROLE_LABEL: Record<Role, string> = {
  ADMIN: 'Administrator',
  MANAGER: 'Manager',
  USER: 'Clerk',
};

/** ADMIN ⊃ MANAGER ⊃ USER — role precedence lives in exactly one place. */
export const ROLE_RANK: Record<Role, number> = { USER: 1, MANAGER: 2, ADMIN: 3 };
