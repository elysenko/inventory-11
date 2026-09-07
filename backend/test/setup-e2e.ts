import { databaseReachable } from './database';

/**
 * Probes the database once, before any suite is collected, and exports the
 * result through an env flag the specs read synchronously.
 */
module.exports = async (): Promise<void> => {
  process.env.STOCKROOM_E2E_DB = (await databaseReachable()) ? '1' : '0';
  if (process.env.STOCKROOM_E2E_DB !== '1') {
    console.warn(
      '[e2e] No reachable DATABASE_URL — database-backed suites will be skipped.',
    );
  }
};
