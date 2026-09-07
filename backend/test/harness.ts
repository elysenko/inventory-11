import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

/** Not a credential: a fixed literal so seeded fixtures can log themselves in. */
export const PASSWORD = 'e2e-password-not-a-secret';

export interface Harness {
  app: INestApplication;
  http: ReturnType<typeof request>;
  prisma: PrismaClient;
  tokens: { admin: string; manager: string; clerk: string };
  emails: { admin: string; manager: string; clerk: string };
  /** Run-scoped prefix stamped onto every fixture this harness owns. */
  tag: string;
  auth(token: string): { Authorization: string };
  /** On-hand for one item at one location, read back through the API. */
  balanceAt(itemId: string, locationId: string): Promise<number>;
  close(): Promise<void>;
}

/**
 * Every fixture a harness creates is tagged with a run-scoped prefix, so a
 * shared database stays clean, two concurrent runs cannot collide, and spec
 * files can run in any order without seeing each other's rows.
 */
const newTag = (label: string): string =>
  `E2E${label.toUpperCase()}${Date.now().toString(36).toUpperCase()}`;

const roleEmail = (tag: string, role: Role): string => `${tag}.${role}@e2e.local`.toLowerCase();

/**
 * Boots the API, seeds one ADMIN/MANAGER/USER account, logs each in and hands
 * back the handles a spec needs. `label` keeps each spec file's tag distinct.
 */
export async function createHarness(label: string): Promise<Harness> {
  const tag = newTag(label);
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();

  const http = request(app.getHttpServer());
  const prisma = new PrismaClient();
  const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  for (const role of [Role.ADMIN, Role.MANAGER, Role.USER]) {
    await prisma.user.create({
      data: { email: roleEmail(tag, role), passwordHash, role, name: role },
    });
  }

  const login = async (email: string): Promise<string> => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email, password: PASSWORD })
      .expect(200);
    return res.body.accessToken;
  };

  const emails = {
    admin: roleEmail(tag, Role.ADMIN),
    manager: roleEmail(tag, Role.MANAGER),
    clerk: roleEmail(tag, Role.USER),
  };
  const tokens = {
    admin: await login(emails.admin),
    manager: await login(emails.manager),
    clerk: await login(emails.clerk),
  };

  const balanceAt = async (itemId: string, locationId: string): Promise<number> => {
    const res = await request(app.getHttpServer())
      .get(`/api/items/${itemId}`)
      .set(auth(tokens.manager))
      .expect(200);
    return (
      res.body.stockLevels.find((s: { locationId: string }) => s.locationId === locationId)?.qty ?? 0
    );
  };

  const close = async (): Promise<void> => {
    // Movements first — Restrict FKs mean nothing else can go until they are gone.
    await prisma.movement.deleteMany({ where: { item: { sku: { startsWith: tag } } } });
    await prisma.stockLevel.deleteMany({ where: { item: { sku: { startsWith: tag } } } });
    await prisma.item.deleteMany({ where: { sku: { startsWith: tag } } });
    await prisma.location.deleteMany({ where: { zone: { startsWith: tag } } });
    await prisma.user.deleteMany({ where: { email: { contains: tag.toLowerCase() } } });
    await prisma.$disconnect();
    await app.close();
  };

  return { app, http, prisma, tokens, emails, tag, auth, balanceAt, close };
}
