import * as request from 'supertest';
import { describeWithDb } from './database';
import { createHarness, Harness } from './harness';

describeWithDb('StockRoom API (e2e) — stock movements', () => {
  let h: Harness;
  let http: Harness['http'];
  let auth: Harness['auth'];
  let balanceAt: Harness['balanceAt'];
  let TAG: string;
  let managerToken: string;
  let clerkToken: string;

  let zoneAId: string;
  let zoneBId: string;

  const createLocation = async (zone: string): Promise<string> => {
    const res = await http
      .post('/api/locations')
      .set(auth(managerToken))
      .send({ name: 'Rack 1', zone })
      .expect(201);
    return res.body.id;
  };

  const createItem = async (sku: string, name: string): Promise<string> => {
    const res = await http
      .post('/api/items')
      .set(auth(managerToken))
      .send({ sku, name, unit: 'ea', reorderAt: 0 })
      .expect(201);
    return res.body.id;
  };

  beforeAll(async () => {
    h = await createHarness('mov');
    ({ http, auth, balanceAt, tag: TAG } = h);
    ({ manager: managerToken, clerk: clerkToken } = h.tokens);
    zoneAId = await createLocation(`${TAG}-A`);
    zoneBId = await createLocation(`${TAG}-B`);
  }, 60_000);

  afterAll(() => h.close(), 60_000);

  describe('stock movements', () => {
    let itemId: string;

    beforeAll(async () => {
      const res = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-001`, name: 'Widget', description: '', unit: 'ea', reorderAt: 10 })
        .expect(201);
      itemId = res.body.id;
    });

    it('applies an IN of 50, leaving a balance of 50', async () => {
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        // fromLocId: '' is exactly what the movement form posts for an IN.
        .send({ type: 'IN', itemId, fromLocId: '', toLocId: zoneAId, qty: 50, note: 'receipt' })
        .expect(201);
      expect(await balanceAt(itemId, zoneAId)).toBe(50);
    });

    it('applies an OUT of 20, leaving a balance of 30', async () => {
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'OUT', itemId, fromLocId: zoneAId, toLocId: '', qty: 20 })
        .expect(201);
      expect(await balanceAt(itemId, zoneAId)).toBe(30);
    });

    it('applies a TRANSFER of 10, conserving the total', async () => {
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'TRANSFER', itemId, fromLocId: zoneAId, toLocId: zoneBId, qty: 10 })
        .expect(201);
      expect(await balanceAt(itemId, zoneAId)).toBe(20);
      expect(await balanceAt(itemId, zoneBId)).toBe(10);

      const detail = await http.get(`/api/items/${itemId}`).set(auth(managerToken)).expect(200);
      expect(detail.body.totalQty).toBe(30);
      // The breakdown must sum to the total, by construction.
      const summed = detail.body.stockLevels.reduce(
        (sum: number, row: { qty: number }) => sum + row.qty,
        0,
      );
      expect(summed).toBe(detail.body.totalQty);
    });

    it('refuses an overdraw with 422 and rolls the whole transaction back', async () => {
      const scarceId = await createItem(`${TAG}-002`, 'Scarce');
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId: scarceId, toLocId: zoneAId, qty: 5 })
        .expect(201);

      const res = await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'OUT', itemId: scarceId, fromLocId: zoneAId, qty: 10 })
        .expect(422);
      expect(res.body.message).toContain('Insufficient stock');
      expect(res.body).toMatchObject({ available: 5, unit: 'ea', sku: `${TAG}-002` });

      // The stored balance is untouched and no audit row was written.
      expect(await balanceAt(scarceId, zoneAId)).toBe(5);
      const log = await http
        .get(`/api/movements?itemId=${scarceId}`)
        .set(auth(managerToken))
        .expect(200);
      expect(log.body.data).toHaveLength(1);
      expect(log.body.total).toBe(1);
    });

    it.each([
      ['IN carrying a source', { type: 'IN', fromLocId: 'x', toLocId: 'y' }],
      ['OUT with no source', { type: 'OUT' }],
      ['zero quantity', { type: 'IN', toLocId: 'y', qty: 0 }],
      ['negative quantity', { type: 'IN', toLocId: 'y', qty: -5 }],
    ])('rejects %s with 400', (_label, body) =>
      http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ itemId, qty: 1, ...body })
        .expect(400),
    );

    it('refuses a transfer between the same location', async () => {
      const res = await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'TRANSFER', itemId, fromLocId: zoneAId, toLocId: zoneAId, qty: 1 })
        .expect(400);
      expect(res.body.message).toBe('A transfer needs two different locations.');
    });

    it('404s an unknown item or location', async () => {
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId: 'no-such-item', toLocId: zoneAId, qty: 1 })
        .expect(404);
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId, toLocId: 'no-such-location', qty: 1 })
        .expect(404);
    });
  });

  describe('concurrency', () => {
    it('lets exactly one of three simultaneous overdrawing OUTs through', async () => {
      const itemId = await createItem(`${TAG}-003`, 'Contended');
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId, toLocId: zoneAId, qty: 10 })
        .expect(201);

      // Each wants 8 of the 10 on hand, so only one can be satisfied.
      const attempts = await Promise.all(
        [1, 2, 3].map(() =>
          request(h.app.getHttpServer())
            .post('/api/movements')
            .set(auth(clerkToken))
            .send({ type: 'OUT', itemId, fromLocId: zoneAId, qty: 8 }),
        ),
      );

      expect(attempts.filter((r) => r.status === 201)).toHaveLength(1);
      expect(attempts.filter((r) => r.status === 422)).toHaveLength(2);
      const remaining = await balanceAt(itemId, zoneAId);
      expect(remaining).toBe(2);
      expect(remaining).toBeGreaterThanOrEqual(0);
    }, 60_000);

    it('does not deadlock on transfers running in opposite directions', async () => {
      const itemId = await createItem(`${TAG}-004`, 'Shuttled');
      for (const location of [zoneAId, zoneBId]) {
        await http
          .post('/api/movements')
          .set(auth(clerkToken))
          .send({ type: 'IN', itemId, toLocId: location, qty: 50 })
          .expect(201);
      }

      // A->B and B->A contend for the same two rows in opposite logical order;
      // the deterministic `ORDER BY id ... FOR UPDATE` is what keeps this safe.
      const transfers = Array.from({ length: 8 }, (_, i) =>
        request(h.app.getHttpServer())
          .post('/api/movements')
          .set(auth(clerkToken))
          .send({
            type: 'TRANSFER',
            itemId,
            fromLocId: i % 2 === 0 ? zoneAId : zoneBId,
            toLocId: i % 2 === 0 ? zoneBId : zoneAId,
            qty: 1,
          }),
      );
      const results = await Promise.all(transfers);
      expect(results.every((r) => r.status === 201)).toBe(true);

      const detail = await http
        .get(`/api/items/${itemId}`)
        .set(auth(managerToken))
        .expect(200);
      expect(detail.body.totalQty).toBe(100);
    }, 60_000);
  });
});
