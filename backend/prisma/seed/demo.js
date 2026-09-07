'use strict';
/**
 * Optional demo fixture — NOT part of the essential seed.
 *
 * `prisma/seed/seed.js` stays essential-only (platform logins), per the Colossus
 * accounts contract: shipped seeds carry no sample data and every screen renders
 * its empty state on a fresh deployment. This script is the environment-guarded
 * escape hatch that contract allows, for demos and for the API fixtures the test
 * spec assumes (>25 items, three named locations, a non-empty low-stock report).
 *
 * It is inert unless SEED_DEMO_DATA is set:
 *
 *     SEED_DEMO_DATA=1 node prisma/seed/demo.js
 *
 * Idempotent: re-running upserts the same catalogue and tops balances up to
 * their target rather than stacking another round of movements.
 *
 * Requires the essential seed to have run first — movements are attributed to a
 * real platform user, never to an invented one.
 */
const { PrismaClient, MovementType, Role } = require('@prisma/client');

const GUARD_ENV = 'SEED_DEMO_DATA';
const prisma = new PrismaClient();

const LOCATIONS = [
  { name: 'Main', zone: 'Zone A' },
  { name: 'Main', zone: 'Zone B' },
  { name: 'Overflow', zone: 'Zone C' },
];

const UNITS = ['ea', 'box', 'roll', 'drum', 'pallet', 'kg', 'litre'];

/**
 * 30 items so a default page of 25 is provably a partial page.
 * `stock` is the target on-hand at Zone A; items 3 and 7 are deliberately at or
 * below `reorderAt` so the low-stock report is non-empty on first load.
 */
function buildCatalogue() {
  return Array.from({ length: 30 }, (_, index) => {
    const n = index + 1;
    const reorderAt = 5 + (n % 4) * 5;
    let stock = reorderAt + 10 + (n % 7);
    if (n === 3) stock = reorderAt;
    if (n === 7) stock = Math.max(0, reorderAt - 3);
    return {
      sku: `SKU-${String(n).padStart(3, '0')}`,
      name: `Demo item ${n}`,
      description: n % 3 === 0 ? null : `Sample catalogue entry ${n}.`,
      unit: UNITS[index % UNITS.length],
      reorderAt,
      stock,
    };
  });
}

async function main() {
  if (!process.env[GUARD_ENV]) {
    console.log(`[demo-seed] ${GUARD_ENV} is not set — skipping (no sample data written)`);
    return;
  }

  const actor = await prisma.user.findFirst({
    where: { role: { in: [Role.ADMIN, Role.MANAGER] } },
    orderBy: { createdAt: 'asc' },
  });
  if (!actor) {
    throw new Error(
      'no ADMIN or MANAGER user found — run prisma/seed/seed.js first so movements have an author',
    );
  }

  const locations = [];
  for (const location of LOCATIONS) {
    locations.push(
      await prisma.location.upsert({
        where: { name_zone: { name: location.name, zone: location.zone } },
        update: {},
        create: location,
      }),
    );
  }
  const primary = locations[0];

  let movements = 0;
  for (const entry of buildCatalogue()) {
    const item = await prisma.item.upsert({
      where: { sku: entry.sku },
      update: { name: entry.name, unit: entry.unit, reorderAt: entry.reorderAt },
      create: {
        sku: entry.sku,
        name: entry.name,
        description: entry.description,
        unit: entry.unit,
        reorderAt: entry.reorderAt,
      },
    });

    // Stock arrives through the ledger, never by writing StockLevel directly,
    // so balances and the audit log agree by construction.
    const level = await prisma.stockLevel.findUnique({
      where: { itemId_locationId: { itemId: item.id, locationId: primary.id } },
    });
    const shortfall = entry.stock - (level ? level.qty : 0);
    if (shortfall <= 0) continue;

    await prisma.$transaction(async (tx) => {
      await tx.stockLevel.upsert({
        where: { itemId_locationId: { itemId: item.id, locationId: primary.id } },
        update: { qty: { increment: shortfall } },
        create: { itemId: item.id, locationId: primary.id, qty: shortfall },
      });
      await tx.movement.create({
        data: {
          type: MovementType.IN,
          itemId: item.id,
          toLocId: primary.id,
          qty: shortfall,
          note: 'Opening stock (demo fixture)',
          userId: actor.id,
        },
      });
    });
    movements += 1;
  }

  const [items, locationCount, movementCount] = await Promise.all([
    prisma.item.count(),
    prisma.location.count(),
    prisma.movement.count(),
  ]);
  console.log(
    `[demo-seed] items=${items} locations=${locationCount} movements=${movementCount} (+${movements} this run)`,
  );
}

main()
  .catch((error) => {
    console.error(`[demo-seed] failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
