import { PrismaClient } from '@prisma/client';

/**
 * e2e specs need a real Postgres. Where one is not reachable (a checkout with
 * no DATABASE_URL, an offline CI box) the suites skip rather than fail — a
 * missing database is an environment gap, not a regression in the code.
 */
export async function databaseReachable(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

/** `describe` that becomes `describe.skip` when there is no database. */
export const describeWithDb = (name: string, suite: () => void): void => {
  const enabled = process.env.STOCKROOM_E2E_DB === '1';
  (enabled ? describe : describe.skip)(name, suite);
};
