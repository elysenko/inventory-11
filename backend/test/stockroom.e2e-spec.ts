import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { describeWithDb } from './database';

/**
 * Every fixture this suite creates is tagged with this run-scoped prefix, so a
 * shared database stays clean and two concurrent runs cannot collide.
 */
const TAG = `E2E${Date.now().toString(36).toUpperCase()}`;
const PASSWORD = 'e2e-password-not-a-secret';

describeWithDb('StockRoom API (e2e)', () => {
  let app: INestApplication;
  let http: ReturnType<typeof request>;
  const prisma = new PrismaClient();

  let managerToken: string;
  let clerkToken: string;
  let adminToken: string;
  let itemId: string;
  let zoneAId: string;
  let zoneBId: string;

  const login = async (email: string): Promise<string> => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email, password: PASSWORD })
      .expect(200);
    return res.body.accessToken;
  };

  const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

  /** On-hand for one item at one location, read back through the API. */
  const balanceAt = async (item: string, location: string): Promise<number> => {
    const res = await request(app.getHttpServer())
      .get(`/api/items/${item}`)
      .set(auth(managerToken))
      .expect(200);
    return (
      res.body.stockLevels.find((s: { locationId: string }) => s.locationId === location)?.qty ?? 0
    );
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    http = request(app.getHttpServer());

    const passwordHash = await bcrypt.hash(PASSWORD, 10);
    for (const role of [Role.ADMIN, Role.MANAGER, Role.USER]) {
      await prisma.user.create({
        data: { email: `${TAG}.${role}@e2e.local`.toLowerCase(), passwordHash, role, name: role },
      });
    }

    adminToken = await login(`${TAG}.ADMIN@e2e.local`.toLowerCase());
    managerToken = await login(`${TAG}.MANAGER@e2e.local`.toLowerCase());
    clerkToken = await login(`${TAG}.USER@e2e.local`.toLowerCase());
  }, 60_000);

  afterAll(async () => {
    // Movements first — Restrict FKs mean nothing else can go until they are gone.
    await prisma.movement.deleteMany({ where: { item: { sku: { startsWith: TAG } } } });
    await prisma.stockLevel.deleteMany({ where: { item: { sku: { startsWith: TAG } } } });
    await prisma.item.deleteMany({ where: { sku: { startsWith: TAG } } });
    await prisma.location.deleteMany({ where: { zone: { startsWith: TAG } } });
    await prisma.user.deleteMany({ where: { email: { contains: TAG.toLowerCase() } } });
    await prisma.$disconnect();
    await app.close();
  }, 60_000);

  describe('authentication', () => {
    it('issues a token and the user shape the SPA stores', async () => {
      const res = await http
        .post('/api/auth/login')
        .send({ email: `${TAG}.MANAGER@e2e.local`.toLowerCase(), password: PASSWORD })
        .expect(200);
      expect(typeof res.body.accessToken).toBe('string');
      expect(res.body.user).toMatchObject({ role: Role.MANAGER });
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('email');
      expect(res.body.user).toHaveProperty('name');
      expect(res.body.user).not.toHaveProperty('passwordHash');
    });

    it('rejects a wrong password with 401', () =>
      http
        .post('/api/auth/login')
        .send({ email: `${TAG}.MANAGER@e2e.local`.toLowerCase(), password: 'wrong' })
        .expect(401));

    it('registers new accounts as clerks, never elevated', async () => {
      const res = await http
        .post('/api/auth/signup')
        .send({ name: 'Clerk', email: `${TAG}.signup@e2e.local`.toLowerCase(), password: 'longenoughpassword' })
        .expect(201);
      expect(res.body.user.role).toBe(Role.USER);
    });
  });

  describe('role enforcement', () => {
    it('401s an unauthenticated data request', () => http.get('/api/items').expect(401));

    it('lets a clerk read the catalogue', () =>
      http.get('/api/items').set(auth(clerkToken)).expect(200));

    it('403s a clerk creating an item', () =>
      http
        .post('/api/items')
        .set(auth(clerkToken))
        .send({ sku: `${TAG}-DENIED`, name: 'Denied', unit: 'ea', reorderAt: 0 })
        .expect(403));

    it('403s a clerk reading the audit log', () =>
      http.get('/api/movements').set(auth(clerkToken)).expect(403));

    it('403s a clerk reading the low-stock report', () =>
      http.get('/api/reports/low-stock').set(auth(clerkToken)).expect(403));

    it('403s a manager reading admin settings', () =>
      http.get('/api/admin/settings').set(auth(managerToken)).expect(403));

    it('lets an admin read settings', () =>
      http.get('/api/admin/settings').set(auth(adminToken)).expect(200));
  });

  describe('catalogue', () => {
    it('creates an item with a zero on-hand total', async () => {
      const res = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-001`, name: 'Widget', description: '', unit: 'ea', reorderAt: 10 })
        .expect(201);
      expect(res.body).toMatchObject({ sku: `${TAG}-001`, totalQty: 0, reorderAt: 10 });
      itemId = res.body.id;
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
      const a = await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'Rack 1', zone: `${TAG}-A` })
        .expect(201);
      const b = await http
        .post('/api/locations')
        .set(auth(managerToken))
        .send({ name: 'Rack 1', zone: `${TAG}-B` })
        .expect(201);
      zoneAId = a.body.id;
      zoneBId = b.body.id;
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

  describe('stock movements', () => {
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
      const item = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-002`, name: 'Scarce', unit: 'ea', reorderAt: 0 })
        .expect(201);
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId: item.body.id, toLocId: zoneAId, qty: 5 })
        .expect(201);

      const res = await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'OUT', itemId: item.body.id, fromLocId: zoneAId, qty: 10 })
        .expect(422);
      expect(res.body.message).toContain('Insufficient stock');
      expect(res.body).toMatchObject({ available: 5, unit: 'ea', sku: `${TAG}-002` });

      // The stored balance is untouched and no audit row was written.
      expect(await balanceAt(item.body.id, zoneAId)).toBe(5);
      const log = await http
        .get(`/api/movements?itemId=${item.body.id}`)
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
      const item = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-003`, name: 'Contended', unit: 'ea', reorderAt: 0 })
        .expect(201);
      await http
        .post('/api/movements')
        .set(auth(clerkToken))
        .send({ type: 'IN', itemId: item.body.id, toLocId: zoneAId, qty: 10 })
        .expect(201);

      // Each wants 8 of the 10 on hand, so only one can be satisfied.
      const attempts = await Promise.all(
        [1, 2, 3].map(() =>
          request(app.getHttpServer())
            .post('/api/movements')
            .set(auth(clerkToken))
            .send({ type: 'OUT', itemId: item.body.id, fromLocId: zoneAId, qty: 8 }),
        ),
      );

      expect(attempts.filter((r) => r.status === 201)).toHaveLength(1);
      expect(attempts.filter((r) => r.status === 422)).toHaveLength(2);
      const remaining = await balanceAt(item.body.id, zoneAId);
      expect(remaining).toBe(2);
      expect(remaining).toBeGreaterThanOrEqual(0);
    }, 60_000);

    it('does not deadlock on transfers running in opposite directions', async () => {
      const item = await http
        .post('/api/items')
        .set(auth(managerToken))
        .send({ sku: `${TAG}-004`, name: 'Shuttled', unit: 'ea', reorderAt: 0 })
        .expect(201);
      for (const location of [zoneAId, zoneBId]) {
        await http
          .post('/api/movements')
          .set(auth(clerkToken))
          .send({ type: 'IN', itemId: item.body.id, toLocId: location, qty: 50 })
          .expect(201);
      }

      // A->B and B->A contend for the same two rows in opposite logical order;
      // the deterministic `ORDER BY id ... FOR UPDATE` is what keeps this safe.
      const transfers = Array.from({ length: 8 }, (_, i) =>
        request(app.getHttpServer())
          .post('/api/movements')
          .set(auth(clerkToken))
          .send({
            type: 'TRANSFER',
            itemId: item.body.id,
            fromLocId: i % 2 === 0 ? zoneAId : zoneBId,
            toLocId: i % 2 === 0 ? zoneBId : zoneAId,
            qty: 1,
          }),
      );
      const results = await Promise.all(transfers);
      expect(results.every((r) => r.status === 201)).toBe(true);

      const detail = await http
        .get(`/api/items/${item.body.id}`)
        .set(auth(managerToken))
        .expect(200);
      expect(detail.body.totalQty).toBe(100);
    }, 60_000);
  });

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
      await http.post('/api/movements').set(auth(clerkToken))
        .send({ type: 'IN', itemId: low.body.id, toLocId: zoneAId, qty: 12 }).expect(201);
      await http.post('/api/movements').set(auth(clerkToken))
        .send({ type: 'OUT', itemId: low.body.id, fromLocId: zoneAId, qty: 5 }).expect(201);
      // 40 on hand against the same threshold.
      await http.post('/api/movements').set(auth(clerkToken))
        .send({ type: 'IN', itemId: fine.body.id, toLocId: zoneAId, qty: 40 }).expect(201);

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
        userEmail: `${TAG}.USER@e2e.local`.toLowerCase(),
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

  describe('deletion guards', () => {
    it('409s deleting an item that has movements', () =>
      http.delete(`/api/items/${itemId}`).set(auth(managerToken)).expect(409));

    it('409s deleting a location that still holds stock', () =>
      http.delete(`/api/locations/${zoneAId}`).set(auth(managerToken)).expect(409));

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

  describe('logout', () => {
    it('204s for an authenticated caller', () =>
      http.post('/api/auth/logout').set(auth(clerkToken)).expect(204));

    it('401s anonymously', () => http.post('/api/auth/logout').expect(401));

    it('401s a garbage bearer token', () =>
      http.post('/api/auth/logout').set({ Authorization: 'Bearer garbage' }).expect(401));

    it('is idempotent, and the stateless token stays usable afterwards', async () => {
      await http.post('/api/auth/logout').set(auth(clerkToken)).expect(204);
      await http.post('/api/auth/logout').set(auth(clerkToken)).expect(204);
      // Documented decision: there is no server-side revocation list.
      await http.get('/api/auth/me').set(auth(clerkToken)).expect(200);
    });
  });

  describe('item update edge cases', () => {
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
        .send({ type: 'IN', itemId, toLocId: zoneAId, qty: 999_999_999_999 })
        .expect(400));
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

  describe('health', () => {
    it('serves an unauthenticated liveness probe', () =>
      http.get('/api/health').expect(200).expect({ status: 'ok' }));

    it('reports the database on the deep probe', () =>
      http.get('/api/health/deep').expect(200).expect({ status: 'ok', db: 'up' }));
  });
});
