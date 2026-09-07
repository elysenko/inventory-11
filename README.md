# StockRoom

Warehouse stock tracking: a catalogue of items, the locations they sit in, an
immutable ledger of every movement between them, and a low-stock report.

- **Frontend** — Angular 19 standalone components (`frontend/`)
- **Backend** — NestJS REST API (`backend/`)
- **Database** — PostgreSQL via Prisma

## Architecture

The SPA is served by nginx, which proxies `/api/` to the NestJS service. The two
therefore share an origin in every deployed environment, so the browser never
makes a cross-origin API call.

```
browser ──▶ nginx :80 ──┬─▶ static Angular bundle
                        └─▶ /api/ ──▶ NestJS :3001 ──▶ Postgres
```

The backend port is declared once, in `colossus.yaml` (`backend.port`), and
every other reference follows it: `PORT` in the backend, `proxy_pass` in
`frontend/nginx.conf`, and the dev proxy in `frontend/proxy.conf.json`.

### On-hand quantity is always derived

An item's total is never stored on the item. It is always the sum of that
item's `StockLevel` rows, so the per-location breakdown and the headline total
cannot drift apart. `Movement` rows are immutable — there is no update or delete
endpoint — and each one is written in the same transaction that moves the
balances, so the ledger and the balances can never disagree.

### Movements are transactional

`POST /api/movements` runs one transaction that:

1. validates the shape for the type (`IN` needs a destination only, `OUT` a
   source only, `TRANSFER` two different locations);
2. materialises the affected `StockLevel` rows with
   `INSERT ... ON CONFLICT DO NOTHING`;
3. re-reads them with `SELECT ... FOR UPDATE ORDER BY id`;
4. refuses an overdraw with `422 Insufficient stock`, which rolls everything
   back — no balance moves and no audit row is written;
5. applies the deltas and appends the `Movement`.

Locking after materialising is what makes the balance check authoritative: a
competing movement against the same row blocks until this transaction commits,
then re-reads the new balance. The deterministic id ordering means two transfers
touching the same pair of rows cannot deadlock. Both properties are covered by
tests in `backend/test/stockroom.e2e-spec.ts`.

## Roles

The platform mints one login per role; the app maps them onto StockRoom's
vocabulary.

| Role | StockRoom | Can |
|---|---|---|
| `USER` | Clerk | Browse the catalogue, view an item's stock and history, record movements |
| `MANAGER` | Manager | Everything a clerk can, plus manage items and locations, read the audit log and the low-stock report |
| `ADMIN` | Administrator | Everything a manager can, plus the settings panel |

Authentication is a bearer JWT held in `localStorage`. `JwtAuthGuard` is
registered globally, so **401 is the default for every endpoint** and a route
has to opt out with `@Public()`; `RolesGuard` then authorises the principal.

Self-service signup always creates a clerk. Elevated roles come only from the
platform accounts seed, never from the signup path.

## Login accounts

Logins are platform-owned. `prisma/seed/seed.js` reads `COLOSSUS_ACCOUNTS_JSON`
from the environment and upserts one `colossus_accounts` row and one `User` per
entry, hashing with bcryptjs exactly as the auth service verifies. There are no
demo accounts and no credentials in this repository.

## Running it locally

```bash
# compose reads every credential from your shell — nothing secret is committed
export POSTGRES_PASSWORD=... JWT_SECRET=...
docker compose up -d postgres          # Postgres 16 on :5432

cd backend
cp .env.example .env                   # then set DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate deploy
npx prisma generate
npm run start:dev                      # API on :3001, docs at /api/docs

cd ../frontend
npm install
npx ng serve                           # SPA on :4200, proxying /api to :3001
```

The app starts with an empty catalogue — every screen renders its empty state
until a manager adds items and locations.

## Tests

```bash
cd backend
npm test                               # unit + e2e
```

The e2e suite needs a reachable `DATABASE_URL`. Without one it skips rather than
fails, so a checkout with no database still reports honestly. It tags every
fixture it creates with a run-scoped prefix and removes them afterwards, so it
is safe against a shared database.

## API

`GET /api/docs` serves the full Swagger UI. The shape of every response matches
`frontend/src/app/core/models.ts`.

| Method | Path | Access |
|---|---|---|
| `POST` | `/api/auth/login`, `/api/auth/signup` | public |
| `GET` | `/api/auth/me` | authenticated |
| `GET` | `/api/health`, `/api/health/deep` | public |
| `GET` | `/api/items`, `/api/items/:id`, `/api/items/:id/movements` | authenticated |
| `POST` `PATCH` `DELETE` | `/api/items[/:id]` | manager |
| `GET` | `/api/locations`, `/api/locations/:id` | authenticated |
| `POST` `PATCH` `DELETE` | `/api/locations[/:id]` | manager |
| `POST` | `/api/movements` | authenticated |
| `GET` | `/api/movements`, `/api/movements/:id` | manager |
| `GET` | `/api/stock/balances` | authenticated |
| `GET` | `/api/reports/low-stock` | manager |
| `GET` `PATCH` | `/api/admin/settings` | admin |

List endpoints return a plain array, because the UI filters and paginates
client-side; they also accept optional `page`/`pageSize` for server-side
windowing.

### Error contract

| Status | Means |
|---|---|
| `401` | No or invalid bearer token |
| `403` | Authenticated, but the role is not allowed |
| `404` | Unknown item, location or movement |
| `409` | Deleting something still referenced (an item with history, a location holding stock) |
| `422` | Duplicate SKU or `(name, zone)`, duplicate email, or insufficient stock |

A `422` carries a `field` (`sku`, `zone`, `email`, `qty`) so forms can attach the
message to the offending input. An insufficient-stock `422` also carries
`available`, `unit` and `sku`.

## Configuration

`DATABASE_URL` and `JWT_SECRET` are app-owned config the platform always
provisions. Every third-party credential is optional and resolved through
`SettingsService.resolveConfig(key)`: environment variable first, then a
`SystemSetting` row an admin saved in the settings panel, then `null`. A feature
whose key is missing answers `503` at call time — a missing integration key
degrades that feature and never crash-loops the pod.

See `backend/.env.example` for the full list.
