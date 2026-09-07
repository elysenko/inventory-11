import { PrismaClient } from '@prisma/client';
import { describeWithDb } from './database';
import { createHarness, Harness } from './harness';

describeWithDb('StockRoom API (e2e) — catalogue, locations and paging', () => {
  let h: Harness;
  let http: Harness['http'];
  let auth: Harness['auth'];
  let prisma: PrismaClient;
  let TAG: string;
  let managerToken: string;
  let clerkToken: string;

  beforeAll(async () => {
    h = await createHarness('cat');
    ({ http, auth, prisma, tag: TAG } = h);
    ({ manager: managerToken, clerk: clerkToken } = h.tokens);
  }, 60_000);

  afterAll(() => h.close(), 60_000);

  describe('catalogue', () => {
    it('creates an item with a zero on-hand total', async () => {
      const res = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-001`, name: 'Widget', description: '', unit: 'ea', reorderAt: 10 })
        .expect(201);
      expect(res.body).toMatchObject({ sku: `${TAG}-001`, totalQty: 0, reorderAt: 10 });
    });

    it('rejects a duplicate SKU with 422 on the sku field, leaving the count unchanged', async () => {
      const before = await prisma.item.count();
      const res = await http
        .post('/api/items')
        .set(auth(managerToken))
        // Lower case: SKUs are normalised, so this is the same SKU.
        .send({ sku: `${TAG}-001`.toLowerCase(), name: 'Clash', unit: 'ea', reorderAt: 0 })
        .expect(422);
      expect(res.body.field).toBe('sku');
      expect(await prisma.item.count()).toBe(before);
    });
  });

  describe('locations', () => {
    it('allows the same name in a different zone', async () => {
      await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'Rack 1', zone: `${TAG}-A` })
        .expect(201);
      await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'Rack 1', zone: `${TAG}-B` })
        .expect(201);
    });

    it('rejects a duplicate (name, zone) with 422 on the zone field', async () => {
      const res = await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'rack 1', zone: `${TAG}-A`.toLowerCase() })
        .expect(422);
      expect(res.body.field).toBe('zone');
    });

    it('lets a clerk read locations, because the movement form needs them', () =>
      http.get('/api/locations').set(auth(clerkToken)).expect(200));
  });

  describe('item update edge cases', () => {
    let stockedId: string;
    let bayId: string;

    beforeAll(async () => {
      const bay = await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'Rack U', zone: `${TAG}-U` })
        .expect(201);
      bayId = bay.body.id;
      const stocked = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-UPD`, name: 'Updatable', unit: 'ea', reorderAt: 0 })
        .expect(201);
      stockedId = stocked.body.id;
    });

    it('treats an explicit null as "not supplied" rather than 500ing', async () => {
      const created = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-NULL`, name: 'Null probe', unit: 'ea', reorderAt: 4 })
        .expect(201);

      const res = await http
        .patch(`/api/items/${created.body.id}`)
        .set(auth(managerToken))
        .send({ name: null, unit: null, reorderAt: null, sku: null })
        .expect(200);

      // Every field keeps its previous value.
      expect(res.body).toMatchObject({
        sku: `${TAG}-NULL`,
        name: 'Null probe',
        unit: 'ea',
        reorderAt: 4,
      });
    });

    it('clears the description on an explicit null', async () => {
      const created = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-DESC`, name: 'Desc', description: 'text', unit: 'ea', reorderAt: 0 })
        .expect(201);

      const res = await http
        .patch(`/api/items/${created.body.id}`)
        .set(auth(managerToken))
        .send({ description: null })
        .expect(200);
      expect(res.body.description).toBeNull();
    });

    it('400s a quantity that would overflow the integer column', () =>
      http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId: stockedId, toLocId: bayId, qty: 999_999_999_999 })
        .expect(400));
  });

  describe('deletion guards', () => {
    let movedId: string;
    let holdingId: string;

    beforeAll(async () => {
      const holding = await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'Rack G', zone: `${TAG}-G` })
        .expect(201);
      holdingId = holding.body.id;
      const moved = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-GUARD`, name: 'Guarded', unit: 'ea', reorderAt: 0 })
        .expect(201);
      movedId = moved.body.id;
      // One receipt gives the item a history and leaves the location holding stock.
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId: movedId, toLocId: holdingId, qty: 5 })
        .expect(201);
    });

    it('409s deleting an item that has movements', () =>
      http.delete(`/api/items/${movedId}`).set(auth(managerToken)).expect(409));

    it('409s deleting a location that still holds stock', () =>
      http.delete(`/api/locations/${holdingId}`).set(auth(managerToken)).expect(409));

    it('204s deleting an item with no history and no stock', async () => {
      const spare = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-SPARE`, name: 'Spare', unit: 'ea', reorderAt: 0 })
        .expect(201);
      await http.delete(`/api/items/${spare.body.id}`).set(auth(managerToken)).expect(204);
    });
  });

  describe('pagination contract', () => {
    beforeAll(async () => {
      // Two rows of our own, so the page-walking assertions never depend on
      // whatever else happens to live in a shared database.
      for (const suffix of ['P1', 'P2']) {
        await http
          .post('/api/items')
          .set(auth(managerToken))
          .send({ sku: `${TAG}-${suffix}`, name: `Paged ${suffix}`, unit: 'ea', reorderAt: 0 })
          .expect(201);
      }
    });

    it('returns a { data, total, page, pageSize } envelope with a default pageSize of 25', async () => {
      const res = await http.get('/api/items').set(auth(managerToken)).expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.total).toBe('number');
      expect(res.body.page).toBe(1);
      expect(res.body.pageSize).toBe(25);
      // `total` counts the whole filtered set, not just this page.
      expect(res.body.total).toBeGreaterThanOrEqual(res.body.data.length);
    });

    it('uses the same envelope for locations and the audit log', async () => {
      for (const path of ['/api/locations', '/api/movements']) {
        const res = await http.get(path).set(auth(managerToken)).expect(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.any(Array),
            total: expect.any(Number),
            page: 1,
            pageSize: 25,
          }),
        );
      }
    });

    it('returns disjoint pages that agree on the total', async () => {
      const first = await http
        .get('/api/items?page=1&pageSize=1')
        .set(auth(managerToken))
        .expect(200);
      const second = await http
        .get('/api/items?page=2&pageSize=1')
        .set(auth(managerToken))
        .expect(200);

      expect(first.body.data).toHaveLength(1);
      expect(second.body.data).toHaveLength(1);
      expect(first.body.data[0].id).not.toBe(second.body.data[0].id);
      expect(first.body.total).toBe(second.body.total);
    });

    it('returns an empty page rather than 404 when a filter matches nothing', async () => {
      const res = await http
        .get('/api/items?q=definitely-no-such-sku-xyz')
        .set(auth(managerToken))
        .expect(200);
      expect(res.body).toMatchObject({ data: [], total: 0 });
    });

    it.each([
      ['?page=0', 'a zero page would become a negative OFFSET'],
      ['?page=abc', 'a non-numeric page'],
      ['?pageSize=-5', 'a negative page size'],
      ['?pageSize=100000', 'a page size past the documented maximum'],
      ['?lowStock=maybe', 'a non-boolean flag'],
    ])('400s %s (%s)', (query) =>
      http.get(`/api/items${query}`).set(auth(managerToken)).expect(400),
    );

    it('ignores an unknown query param instead of failing', () =>
      http.get('/api/items?bogus=1').set(auth(managerToken)).expect(200));
  });
});
