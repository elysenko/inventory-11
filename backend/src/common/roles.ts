import { Role } from '@prisma/client';

/**
 * StockRoom vocabulary -> platform roles.
 * USER == "clerk"; MANAGER and ADMIN both carry manager privileges
 * (ADMIN ⊃ MANAGER ⊃ USER), matching frontend core/models.ts ROLE_RANK.
 */
export const MANAGER_ROLES: readonly Role[] = [Role.MANAGER, Role.ADMIN];
export const ADMIN_ROLES: readonly Role[] = [Role.ADMIN];
