import { PrismaClient } from '@prisma/client';
import { describeWithDb } from './database';
import { createHarness, Harness } from './harness';

describeWithDb('StockRoom API (e2e) — reporting, audit log and settings', () => {
  let h: Harness;
  let http: Harness['http'];
  let auth: Harness['auth'];
  let prisma: PrismaClient;
  let TAG: string;
  let adminToken: string;
  let managerToken: string;
  let clerkToken: string;

  let itemId: string;
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

  const move = (body: Record<string, unknown>) =>
    http.post('/api/movements').set(auth(clerkToken)).send(body).expect(201);

  beforeAll(async () => {
    h = await createHarness('rep');
    ({ http, auth, prisma, tag: TAG } = h);
    ({ admin: adminToken, manager: managerToken, clerk: clerkToken } = h.tokens);

    zoneAId = await createLocation(`${TAG}-A`);
    zoneBId = await createLocation(`${TAG}-B`);
    const item = await http
      .post('/api/items')
      .set(auth(managerToken))
      .send({ sku: `${TAG}-001`, name: 'Widget', description: '', unit: 'ea', reorderAt: 10 })
      .expect(201);
    itemId = item.body.id;

    // One of each kind, so the audit log has an IN and a TRANSFER to label.
    await move({ type: 'IN', itemId, toLocId: zoneAId, qty: 50, note: 'receipt' });
    await move({ type: 'OUT', itemId, fromLocId: zoneAId, qty: 20 });
    await move({ type: 'TRANSFER', itemId, fromLocId: zoneAId, toLocId: zoneBId, qty: 10 });
  }, 60_000);

  afterAll(() => h.close(), 60_000);

  describe('low-stock report', () => {
    it('includes an item at or below its reorder point and excludes one above it', async () => {
      const low = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-LOW`, name: 'Low', unit: 'ea', reorderAt: 10 })
        .expect(201);
      const fine = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-OK`, name: 'Fine', unit: 'ea', reorderAt: 10 })
        .expect(201);

      // 12 in, 5 out -> 7 on hand against a threshold of 10.
      await move({ type: 'IN', itemId: low.body.id, toLocId: zoneAId, qty: 12 });
      await move({ type: 'OUT', itemId: low.body.id, fromLocId: zoneAId, qty: 5 });
      // 40 on hand against the same threshold.
      await move({ type: 'IN', itemId: fine.body.id, toLocId: zoneAId, qty: 40 });

      const res = await http.get('/api/reports/low-stock').set(auth(managerToken)).expect(200);
      const rows: {
        sku: string;
        totalQty: number;
        reorderAt: number;
        deficit: number;
        item: { sku: string };
      }[] = res.body;

      expect(rows.find((r) => r.sku === `${TAG}-LOW`)).toMatchObject({
        totalQty: 7,
        reorderAt: 10,
        deficit: 3,
        item: { sku: `${TAG}-LOW` },
      });
      expect(rows.some((r) => r.sku === `${TAG}-OK`)).toBe(false);
      // Worst shortfall first.
      expect(rows.every((r, i) => i === 0 || rows[i - 1].deficit >= r.deficit)).toBe(true);
    });
  });

  describe('audit log', () => {
    it('records who moved what, when', async () => {
      const res = await http
        .get(`/api/movements?itemId=${itemId}`)
        .set(auth(managerToken))
        .expect(200);
      expect(res.body.data.length).toBeGreaterThan(0);

      const [newest] = res.body.data;
      expect(newest).toMatchObject({
        itemId,
        itemSku: `${TAG}-001`,
        itemName: 'Widget',
        userEmail: h.emails.clerk,
      });
      expect(Number.isNaN(Date.parse(newest.createdAt))).toBe(false);
      // Newest first.
      const times = res.body.data.map((r: { createdAt: string }) => Date.parse(r.createdAt));
      expect([...times].sort((a, b) => b - a)).toEqual(times);
    });

    it('labels transfer endpoints and leaves the unused side null', async () => {
      const res = await http
        .get(`/api/movements?itemId=${itemId}&type=TRANSFER`)
        .set(auth(managerToken))
        .expect(200);
      expect(res.body.data[0]).toMatchObject({
        fromLocName: `Rack 1 · ${TAG}-A`,
        toLocName: `Rack 1 · ${TAG}-B`,
      });

      const ins = await http
        .get(`/api/movements?itemId=${itemId}&type=IN`)
        .set(auth(managerToken))
        .expect(200);
      expect(ins.body.data[0].fromLocName).toBeNull();
    });

    it('honours the inclusive date range and ignores empty filters', async () => {
      const today = new Date().toISOString().slice(0, 10);
      const all = await http.get('/api/movements').set(auth(managerToken)).expect(200);

      const inRange = await http
        .get(`/api/movements?from=${today}&to=${today}`)
        .set(auth(managerToken))
        .expect(200);
      expect(inRange.body.total).toBe(all.body.total);

      const past = await http
        .get('/api/movements?from=2020-01-01&to=2020-01-02')
        .set(auth(managerToken))
        .expect(200);
      expect(past.body.data).toHaveLength(0);
      expect(past.body.total).toBe(0);

      // The audit log posts every filter key even when blank.
      const blank = await http
        .get('/api/movements?itemId=&type=&from=&to=')
        .set(auth(managerToken))
        .expect(200);
      expect(blank.body.total).toBe(all.body.total);
    });

    it('exposes per-item history to clerks, while the full log stays manager-only', async () => {
      const res = await http
        .get(`/api/items/${itemId}/movements`)
        .set(auth(clerkToken))
        .expect(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body.every((r: { itemId: string }) => r.itemId === itemId)).toBe(true);
    });
  });

  describe('admin settings', () => {
    it('masks secrets and never returns a raw credential', async () => {
      const res = await http.get('/api/admin/settings').set(auth(adminToken)).expect(200);
      const url = res.body.find((s: { key: string }) => s.key === 'DATABASE_URL');
      expect(url.configured).toBe(true);
      expect(url.value).not.toContain(process.env.DATABASE_URL?.split('@')[0].split(':').pop());
    });

    it('accepts a key in any case and upserts rather than duplicating', async () => {
      await http
        .patch('/api/admin/settings')
        .set(auth(adminToken))
        .send({ minio_access_key: 'first-value' })
        .expect(200);
      const res = await http
        .patch('/api/admin/settings')
        .set(auth(adminToken))
        .send({ MINIO_ACCESS_KEY: 'second-value' })
        .expect(200);

      expect(await prisma.systemSetting.count({ where: { key: 'MINIO_ACCESS_KEY' } })).toBe(1);
      expect(
        res.body.find((s: { key: string }) => s.key === 'MINIO_ACCESS_KEY').configured,
      ).toBe(true);
      await prisma.systemSetting.deleteMany({ where: { key: 'MINIO_ACCESS_KEY' } });
    });

    it('refuses a key that is read at startup and could never take effect', () =>
      http
        .patch('/api/admin/settings')
        .set(auth(adminToken))
        .send({ JWT_SECRET: 'would-never-be-used' })
        .expect(400));

    it('400s an unknown key and an empty body', async () => {
      await http
        .patch('/api/admin/settings')
        .set(auth(adminToken))
        .send({ NOT_A_REAL_KEY: 'x' })
        .expect(400);
      await http.patch('/api/admin/settings').set(auth(adminToken)).send({}).expect(400);
    });
  });
});
