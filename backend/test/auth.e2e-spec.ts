import { Role } from '@prisma/client';
import { describeWithDb } from './database';
import { createHarness, Harness, PASSWORD } from './harness';

describeWithDb('StockRoom API (e2e) — auth, roles and health', () => {
  let h: Harness;
  let http: Harness['http'];
  let auth: Harness['auth'];
  let TAG: string;
  let adminToken: string;
  let managerToken: string;
  let clerkToken: string;

  beforeAll(async () => {
    h = await createHarness('auth');
    ({ http, auth, tag: TAG } = h);
    ({ admin: adminToken, manager: managerToken, clerk: clerkToken } = h.tokens);
  }, 60_000);

  afterAll(() => h.close(), 60_000);

  describe('authentication', () => {
    it('issues a token and the user shape the SPA stores', async () => {
      const res = await http
        .post('/api/auth/login')
        .send({ email: h.emails.manager, password: PASSWORD })
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
        .send({ email: h.emails.manager, password: 'wrong' })
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

  describe('health', () => {
    it('serves an unauthenticated liveness probe', () =>
      http.get('/api/health').expect(200).expect({ status: 'ok' }));

    it('reports the database on the deep probe', () =>
      http.get('/api/health/deep').expect(200).expect({ status: 'ok', db: 'up' }));
  });
});
