import type { MovementType } from '@prisma/client';

/** Matches frontend core/models.ts `Movement`. */
export interface MovementView {
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
  /** ISO 8601 — the UI parses this with `new Date(...)`. */
  createdAt: string;
}

/** The relations every movement view needs loaded. */
export const MOVEMENT_INCLUDE = {
  item: { select: { sku: true, name: true } },
  fromLoc: { select: { name: true, zone: true } },
  toLoc: { select: { name: true, zone: true } },
  user: { select: { email: true } },
} as const;

interface MovementWithRelations {
  id: string;
  type: MovementType;
  itemId: string;
  qty: number;
  note: string | null;
  createdAt: Date;
  item: { sku: string; name: string };
  fromLoc: { name: string; zone: string } | null;
  toLoc: { name: string; zone: string } | null;
  user: { email: string };
}

/** Locations are labelled "{name} · {zone}", matching the approved UI. */
const label = (location: { name: string; zone: string } | null): string | null =>
  location ? `${location.name} · ${location.zone}` : null;

export function toMovementView(movement: MovementWithRelations): MovementView {
  return {
    id: movement.id,
    type: movement.type,
    itemId: movement.itemId,
    itemSku: movement.item.sku,
    itemName: movement.item.name,
    fromLocName: label(movement.fromLoc),
    toLocName: label(movement.toLoc),
    qty: movement.qty,
    note: movement.note,
    userEmail: movement.user.email,
    createdAt: movement.createdAt.toISOString(),
  };
}
