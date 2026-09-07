# Pipeline Task Decomposition

## Summary
StockRoom is a warehouse inventory tracker built on the scaffolded NestJS + Prisma/Postgres backend and Angular 20 standalone frontend. Managers maintain a catalog of items (SKU, unit, reorder threshold) and storage locations (name + zone); any authenticated user records stock movements (`IN`, `OUT`, `TRANSFER`) that are applied atomically per location inside a single Prisma transaction with deterministic row locking, so balances can never go negative or be double-spent under concurrency. Managers additionally get a filterable, paginated movement audit log and a low-stock report (`SUM(StockLevel.qty) <= Item.reorderAt`) that deep-links into a prefilled restock form. Every navigable state is URL-addressable via query params, and seed data ships enough items, locations and movements that the log and low-stock report are non-empty on first load.

## Surface contract

**Role mapping (authoritative — platform roles win over spec vocabulary).** The stack contract (`colossus.stack.json`) mints one login per role for `ADMIN`, `MANAGER`, `USER`, and the scaffolded `enum Role { USER MANAGER ADMIN }` already exists in `backend/prisma/schema.prisma`. Therefore the spec's `clerk` tier maps to `Role.USER` and the spec's `manager` tier maps to `Role.MANAGER` **or** `Role.ADMIN` (admin is a strict superset of manager, manager a strict superset of clerk). No new `CLERK` enum value is introduced. `role Role @default(USER)`; signup assigns `ADMIN` when the `User` table is empty, otherwise `USER`.

**REST API (global prefix `api`, JWT bearer, 401 is the default for every non-`@Public()` route)**

| Method | Path | Access |
|---|---|---|
| GET | `/api/health`, `/api/health/deep` | public |
| POST | `/api/auth/signup`, `/api/auth/login` | public |
| POST | `/api/auth/logout` | authed |
| GET | `/api/auth/me` | authed |
| GET | `/api/items?q=&lowStock=&page=&pageSize=` | USER+ |
| GET | `/api/items/:id` | USER+ |
| POST / PATCH / DELETE | `/api/items`, `/api/items/:id` | MANAGER+ |
| GET | `/api/locations?page=&pageSize=` | USER+ |
| POST / PATCH / DELETE | `/api/locations`, `/api/locations/:id` | MANAGER+ |
| POST | `/api/movements` | USER+ |
| GET | `/api/movements?itemId=&type=&from=&to=&page=&pageSize=` | MANAGER+ |
| GET | `/api/reports/low-stock` | MANAGER+ |
| GET | `/api/admin/settings` | ADMIN |
| PATCH | `/api/admin/settings` | ADMIN |

**Entities:** `User(id,email,name?,passwordHash,role,createdAt,updatedAt)`, `ColossusAccount` (platform-owned, unchanged), `Item(id,sku,name,description?,unit,reorderAt,createdAt,updatedAt)`, `Location(id,name,zone,createdAt)`, `StockLevel(id,itemId,locationId,qty)`, `Movement(id,type,itemId,fromLocId?,toLocId?,qty,note?,userId,createdAt)`, `SystemSetting(key,value,updatedAt)`. Enums: `Role`, `MovementType { IN OUT TRANSFER }`.

**Frontend routes**

| Route | Access | URL state |
|---|---|---|
| `/login`, `/signup` | public | `?returnUrl=` |
| `/items` | USER+ | `?q=&lowStock=&page=` |
| `/items/new`, `/items/:id/edit` | MANAGER+ | — |
| `/items/:id` | USER+ | `?tab=stock\|history` |
| `/locations` | MANAGER+ | `?page=` |
| `/locations/new`, `/locations/:id/edit` | MANAGER+ | — |
| `/movements/new` | USER+ | `?itemId=&type=` prefill |
| `/movements` | MANAGER+ | `?itemId=&type=&from=&to=&page=` |
| `/reports/low-stock` | MANAGER+ | — |
| `/admin/settings` | ADMIN | — |
| `/403` | authed | — |
| `/` | — | redirect → `/items` (guard bounces anonymous → `/login`) |

Delete confirmations are URL state: `?modal=confirm-delete&id=`.

**Status-code contract:** duplicate SKU / duplicate email / duplicate `(name,zone)` → **422** with a field-level error; insufficient stock → **422** `Insufficient stock`; delete of an item with movements or a location with non-zero stock → **409**; unknown item/location referenced by a movement → **404**; anonymous data access → **401**; wrong role → **403**.

**Smoke oracle:** `app-root` must keep the `data-testid="app-ready"` element, the string `StockRoom` must be in rendered content for anonymous visitors (login page `<h1>` + shell header), and the scaffold's reject signatures (`home-title">Users<`, `Loading...`, `Failed to load users.`) must be gone. Every file stays under the 400-line budget (500 hard limit) from `.pipeline/surface.json`.

## db_agent tasks
- [ ] Extend `backend/prisma/schema.prisma`: keep the existing `User`, `ColossusAccount` models and `enum Role { USER MANAGER ADMIN }` as-is (`role Role @default(USER)`); do not add a `CLERK` value.
- [ ] Add `Item` model to `schema.prisma`: `id String @id @default(uuid())`, `sku String @unique`, `name`, `description String?`, `unit`, `reorderAt Int`, `createdAt`, `updatedAt @updatedAt`.
- [ ] Add `Location` model: `id`, `name`, `zone`, `createdAt`, with `@@unique([name, zone])`.
- [ ] Add `StockLevel` model: `id`, `itemId`, `locationId`, `qty Int @default(0)`, relations to `Item`/`Location`, `@@unique([itemId, locationId])`, `@@index([locationId])`.
- [ ] Add `Movement` model: `id`, `type MovementType`, `itemId`, `fromLocId String?`, `toLocId String?`, `qty Int`, `note String?`, `userId`, `createdAt`, relations to `Item`/`Location`(from,to)/`User`, `@@index([itemId, createdAt])`, `@@index([createdAt])`; add `enum MovementType { IN OUT TRANSFER }`.
- [ ] Add `SystemSetting` model: `key String @id`, `value String`, `updatedAt DateTime @updatedAt` (backs runtime config for `postgresql` and `minio`).
- [ ] Generate the initial migration under `backend/prisma/migrations/` covering all of the above and verify `npx prisma generate` succeeds.
- [ ] Extend `backend/prisma/seed/seed.js` **without breaking** the existing `COLOSSUS_ACCOUNTS_JSON` → `ColossusAccount` + `User` materialization: idempotently upsert 3 locations (`Main / Zone A`, `Main / Zone B`, `Overflow / Zone C`) and 8 items `SKU-001`…`SKU-008` with varied `unit`/`reorderAt`.
- [ ] In the seed, create opening stock by inserting `Movement` rows and applying the same delta rules used by the movements service (never write `StockLevel` directly), so the audit log is non-empty and balances are consistent; ensure ≥2 items land at or below `reorderAt`. Attribute seeded movements to the platform ADMIN account. Keep `seed.js` under 400 lines (split into `prisma/seed/inventory.js` if needed).

## backend_agent tasks
- [ ] Update `backend/src/main.ts`/`app.module.ts`: global `ValidationPipe({ whitelist: true, transform: true })`, global prefix `api`, CORS enabled, Swagger kept mounted at `/api/docs` (stack probe path).
- [ ] Add `backend/src/common/filters/prisma-exception.filter.ts` mapping P2002 → 422 with `{ field, message }`, P2003/P2014 → 409, P2025 → 404; register globally.
- [ ] Add `backend/src/common/config/config.service.ts` exporting `resolveConfig(key: string): Promise<string | null>` — reads `process.env[key]` first; if absent or equal to `PLACEHOLDER_CONFIGURE_IN_SETTINGS`, falls back to the `SystemSetting` row; returns `null` if neither is set. Add `ServiceUnconfiguredError` → HTTP 503 mapping.
- [ ] Build `backend/src/auth/`: `auth.module.ts`, `auth.service.ts`, `auth.controller.ts`, `jwt.strategy.ts`, `jwt-auth.guard.ts`, `roles.guard.ts`, `roles.decorator.ts`, `public.decorator.ts`, `current-user.decorator.ts`, `dto/login.dto.ts`, `dto/signup.dto.ts`. `POST /api/auth/login` verifies the bcryptjs hash and signs a 12h JWT `{sub,email,role}` returning `{accessToken,user}` (401 on bad credentials); `POST /api/auth/signup` returns 422 on duplicate email and assigns `ADMIN` to the first user else `USER`; `GET /api/auth/me` returns the token's user; `POST /api/auth/logout` returns 204.
- [ ] Register `JwtAuthGuard` and `RolesGuard` as `APP_GUARD`s so 401 is the default for every endpoint and `@Roles('MANAGER','ADMIN')` yields 403; mark health and auth login/signup `@Public()`. Implement role precedence ADMIN > MANAGER > USER in one place.
- [ ] Extend `backend/src/users/users.service.ts` with `findByEmail`, `createWithHashedPassword`, `countUsers`; leave the scaffolded `users.router.ts` tRPC surface working or delete it together with `src/trpc/*` if unused (see Open questions).
- [ ] Update `backend/src/health/` so `/api/health` returns `{status:'ok'}` and `/api/health/deep` runs `$queryRaw\`SELECT 1\`` returning db status, 503 on failure; both `@Public()`.
- [ ] Build `backend/src/items/` (`module`, `controller`, `service`, `dto/create-item.dto.ts`, `dto/update-item.dto.ts`, `dto/query-items.dto.ts`): `GET /api/items` returns items with aggregated `totalQty` plus `q`/`lowStock`/`page`/`pageSize` (default 25); `GET /api/items/:id` returns the item, `stockLevels[] {locationId,locationName,zone,qty}` and `totalQty`. SKU stored uppercase-trimmed; `reorderAt >= 0`.
- [ ] Add manager-only `POST/PATCH/DELETE /api/items` with `@Roles('MANAGER','ADMIN')`; DELETE returns 409 when any `Movement` references the item; duplicate SKU surfaces as 422 against the `sku` field.
- [ ] Build `backend/src/locations/` (`module`, `controller`, `service`, `create/update` DTOs): `GET /api/locations` for any authenticated role; `POST/PATCH/DELETE` manager-only; DELETE returns 409 when the location holds non-zero stock; duplicate `(name,zone)` → 422.
- [ ] Implement `backend/src/movements/movements.service.ts` transactional core: one `prisma.$transaction` that validates the item/locations exist (404), upserts the affected `StockLevel` rows, re-reads them with `SELECT … FOR UPDATE` ordered by `id`, throws `UnprocessableEntityException('Insufficient stock')` when `source.qty < qty`, applies deltas (`IN` +qty at `toLoc`, `OUT` -qty at `fromLoc`, `TRANSFER` both), then writes the `Movement` row with the JWT `userId`.
- [ ] Add `backend/src/movements/dto/create-movement.dto.ts` with per-type validation (`IN` requires `toLocId` and forbids `fromLocId`; `OUT` requires `fromLocId` only; `TRANSFER` requires both and `fromLocId !== toLocId`; `qty` `@IsInt() @Min(1)`) plus `movements.controller.ts` exposing `POST /api/movements` to any authenticated role. No update/delete endpoints — movements are immutable.
- [ ] Add `GET /api/movements` (`@Roles('MANAGER','ADMIN')`) with `dto/query-movements.dto.ts`: filters `itemId`, `type`, `from` (inclusive), `to` (end-of-day inclusive), paginated, `createdAt desc`, including `user.email`, `item.sku`/`item.name`, and both location names.
- [ ] Build `backend/src/reports/` — `GET /api/reports/low-stock` (`@Roles('MANAGER','ADMIN')`) grouping `StockLevel` by `itemId` (items with no rows count as 0), filtering `total <= reorderAt`, ordered by `(total - reorderAt)` ascending, returning `{item, totalQty, reorderAt, deficit}`.
- [ ] Build `backend/src/admin/settings/` — `GET /api/admin/settings` listing the `postgresql` and `minio` credential keys with masked values and a `configured` boolean, and `PATCH /api/admin/settings` upserting key/value pairs into `SystemSetting`; both `@Roles('ADMIN')` and reading through `resolveConfig`.
- [ ] Update `backend/Dockerfile` and root `docker-compose.yml` for the StockRoom services (postgres 16 volume, backend `:3000`, frontend nginx `:80`), and add `backend/.env.example` (`DATABASE_URL`, `JWT_SECRET`, minio keys defaulting to `PLACEHOLDER_CONFIGURE_IN_SETTINGS`). Backend entrypoint runs `prisma migrate deploy && npm run prisma:seed && node dist/main.js`.
- [ ] Add `k8s/postgres.yaml`, `k8s/backend.yaml`, `k8s/frontend.yaml` — Deployment + Service each; backend takes `DATABASE_URL`/`JWT_SECRET` from a Secret (never a code default); readiness probes hit `/api/health` and `/`; the backend Service must be named `stockroom-backend` to match `frontend/nginx.conf`.

## ui_agent tasks
- [ ] Update `frontend/src/index.html` (`<title>StockRoom</title>`) and `frontend/src/app/app.component.ts`: shell with `data-testid="app-ready"`, header rendering `StockRoom`, nav linking Items / Locations / Movements / Low stock / Admin settings with manager-only and admin-only entries hidden by role, plus the signed-in user's email and a logout control. Delete `frontend/src/app/home/home.component.ts` and its `Users`/`Loading...`/`Failed to load users.` markup.
- [ ] Rewrite `frontend/src/app/app.routes.ts` for the full route table (including `?returnUrl=` handling, `/403`, `/admin/settings`, and `/` → `/items`), wiring `authGuard`/`roleGuard` from `core/`, and confirm `app.config.ts` uses `provideRouter(routes, withComponentInputBinding())` and `provideHttpClient(withInterceptors([authInterceptor]))`.
- [ ] Build `pages/login/` and `pages/signup/` standalone components: `<h1>StockRoom</h1>` brand block above the form, email/password fields, inline error on 401 / 422, `returnUrl` redirect after success.
- [ ] Build `pages/items/item-list/`: table of `sku`, `name`, `unit`, `reorderAt`, `totalQty` with a low-stock badge when `totalQty <= reorderAt`; search box, low-stock toggle and pagination all round-tripped through `?q=&lowStock=&page=`; manager-only Create/Edit/Delete controls; loading, empty and error states.
- [ ] Build `pages/items/item-detail/` with `?tab=stock|history`: per-location breakdown table (`location`, `zone`, `qty`) with a total row, plus a "Record movement" link to `/movements/new?itemId=…`.
- [ ] Build `pages/items/item-form/` (create + edit) surfacing the 422 duplicate-SKU error against the SKU field, and the `?modal=confirm-delete&id=` confirmation dialog that surfaces the 409 "item has movements" error.
- [ ] Build `pages/locations/location-list/` (`?page=`) and `pages/locations/location-form/`, manager-only, including the `?modal=confirm-delete&id=` flow that surfaces the 409 "location still holds stock" error rather than assuming success.
- [ ] Build `pages/movements/movement-form/`: type selector that reactively shows/hides the from/to selects, item select, qty, note; prefills from `?itemId=&type=`; renders the server's 422 insufficient-stock message as a form-level error; navigates to `/items/:id` on success.
- [ ] Build `pages/movements/movement-log/` (manager-only): filterable table bound to `?itemId=&type=&from=&to=&page=` showing user email, item sku/name, type, qty, from/to location and a formatted timestamp; empty state when filters match nothing.
- [ ] Build `pages/reports/low-stock/` (manager-only): table of item, on-hand, reorderAt, deficit with a `/movements/new?itemId=…&type=IN` restock link per row, and an empty state when nothing is low.
- [ ] Build `pages/admin/settings/` (admin-only) at `/admin/settings`: one section per provisioned service (`postgresql`, `minio`) with a configured/unconfigured badge and a credential form per service; show the banner "The following need credentials to activate: …" listing any service whose value is absent or `PLACEHOLDER_CONFIGURE_IN_SETTINGS`. No integration sections — the spec declares no third-party integrations.
- [ ] Build `pages/forbidden/` (`/403`) with a message and a link back to `/items`; add shared loading/empty/error partials and `frontend/src/styles.css` table/form/badge styles so pages stay under the 400-line budget.
- [ ] Verify `frontend/nginx.conf` (SPA fallback + `proxy_pass http://stockroom-backend:3000`) and `frontend/Dockerfile` (`ng build --configuration production` → nginx serving `dist/frontend/browser`), and update root `README.md` with setup, seeded role logins and architecture.

## service_agent tasks
- [ ] Create `frontend/src/app/core/models.ts`: `User`, `Role`, `Item`, `ItemDetail`, `StockLevelRow`, `Location`, `Movement`, `MovementType`, `LowStockRow`, `Paginated<T>`, `SettingEntry` types matching the backend response shapes; replace/retire `frontend/src/app/trpc-client.types.ts` usage.
- [ ] Create `frontend/src/app/core/auth.service.ts`: `currentUser` signal hydrated from `localStorage`, `login`, `signup`, `logout`, `token`, `isManager()` (MANAGER or ADMIN), `isAdmin()`, calling `/api/auth/*`.
- [ ] Create `frontend/src/app/core/auth.interceptor.ts` (attaches `Authorization: Bearer`, routes 401 → `/login?returnUrl=…` and 403 → `/403`) and `core/auth.guard.ts` + `core/role.guard.ts` as functional guards (`roleGuard(['MANAGER','ADMIN'])`, `roleGuard(['ADMIN'])`).
- [ ] Create `core/api/items.service.ts` and `core/api/locations.service.ts` wrapping the list/detail/create/update/delete endpoints with typed params and pass-through of field-level 422 errors.
- [ ] Create `core/api/movements.service.ts` (create + filtered/paginated log query) and `core/api/reports.service.ts` (`getLowStock()`).
- [ ] Create `core/api/settings.service.ts` for `GET`/`PATCH /api/admin/settings`.
- [ ] Create `core/query-params.ts` helper used by all list pages to read filters from `ActivatedRoute.queryParamMap` and write them back via `router.navigate([], {queryParams, queryParamsHandling:'merge'})`, with number/boolean/date coercion.

## tester tasks
- [ ] `backend/test/auth.e2e-spec.ts` — USER-tier and MANAGER-tier logins both succeed and return a role-bearing token; bad password → 401; duplicate signup email → 422; `GET /api/auth/me` reflects the token.
- [ ] `backend/test/authz.e2e-spec.ts` — anonymous `GET /api/items` → 401; USER `POST /api/items` → 403; USER `GET /api/movements` → 403; MANAGER succeeds on all three.
- [ ] `backend/test/items.e2e-spec.ts` — create/list/detail/update; duplicate SKU → 422 with the item count unchanged; DELETE of an item with movements → 409.
- [ ] `backend/test/locations.e2e-spec.ts` — create/list/update; duplicate `(name,zone)` → 422; DELETE of a location holding stock → 409.
- [ ] `backend/test/movements.e2e-spec.ts` — `IN` 50 → balance 50; `OUT` 20 → 30; `TRANSFER` 10 → 20/10 with the total conserved; per-type DTO validation rejects missing/extra location ids and `qty <= 0`; unknown item or location → 404.
- [ ] `backend/test/movements-insufficient.e2e-spec.ts` — `OUT` 10 against a balance of 5 → 422 `Insufficient stock` and the stored balance is still 5 (transaction rolled back, no `Movement` row written).
- [ ] `backend/test/movements-concurrency.e2e-spec.ts` — two simultaneous `OUT` movements that would jointly overdraw one location: exactly one succeeds, the other 422s, and the final balance is never negative.
- [ ] `backend/test/audit-log.e2e-spec.ts` — `GET /api/movements` lists user email, item, type, qty and timestamp, is ordered `createdAt desc`, paginates, and honours the `itemId`, `type` and inclusive `from`/`to` date-range filters.
- [ ] `backend/test/reports.e2e-spec.ts` — reorderAt 10 with 12 on hand then `OUT` 5 → the item appears in low-stock with the right `deficit`; reorderAt 10 with 40 on hand → absent; an item with no stock rows counts as 0 and appears.
- [ ] `backend/test/admin-settings.e2e-spec.ts` — `GET /api/admin/settings` as ADMIN masks values and flags `postgresql`/`minio` configured state; MANAGER → 403; `PATCH` upserts and `resolveConfig` then prefers env over the `SystemSetting` row, treating `PLACEHOLDER_CONFIGURE_IN_SETTINGS` as unset.
- [ ] `backend/test/health.e2e-spec.ts` — `/api/health` → `{status:'ok'}` unauthenticated and `/api/health/deep` reports db status.
- [ ] Frontend unit tests — `authGuard`/`roleGuard` redirect behaviour (anonymous → `/login?returnUrl=`, wrong role → `/403`) and query-param round-tripping for the item list and audit-log filters.
- [ ] Verification pass — `npx tsc --noEmit` and `npm test -- --maxWorkers=2` in `backend/`, `ng build --configuration production` in `frontend/`, then a smoke check that anonymous `/` renders `StockRoom`, `data-testid="app-ready"` is present, and none of the reject signatures (`home-title">Users<`, `Loading...`, `Failed to load users.`) remain.

## Open questions
- **tRPC vs REST.** The scaffold ships `backend/src/trpc/{trpc.module,trpc.router}.ts`, `users.router.ts` and `frontend/src/app/trpc-client.types.ts`, and `.pipeline/surface.json` advertises `/trpc/users.*`. The spec specifies plain REST controllers under `/api`. These tasks follow the spec (REST); backend_agent must decide whether to delete the tRPC module or keep it inert, and `surface.json` routes/testIds should be refreshed to match the real surface.
- **Role vocabulary.** The spec asks for `enum Role { clerk manager }`, but the platform contract mints `ADMIN`/`MANAGER`/`USER` accounts and the scaffolded schema already uses them. Tasks assume `clerk → USER`, `manager → MANAGER|ADMIN`. Confirm before any UI copy says "clerk".
- **Demo credentials.** The spec seeds hardcoded `manager@demo` / `clerk@demo` with `Demo1234!`, but the scaffold seeds platform accounts from `COLOSSUS_ACCOUNTS_JSON`. Tasks keep the platform accounts authoritative and drop the hardcoded demo logins; confirm whether the README should still document fixed demo credentials.
- **minio.** `minio` is provisioned as a backing service but the spec describes no file/object storage feature. It is wired only through admin settings + `resolveConfig`; no upload surface is built.
- **Integrations.** `<spec_integrations>` contains the sentinel entry `None` / `NONE_API_KEY`, and the spec's `## Integrations` section says "None". No `lib/integrations/*` client modules are created and no integration credential fields appear in admin settings.
- **`GET /api/locations` access.** Step 6 grants any role read access (needed by the movement form) while the route table marks `/locations` manager-only; tasks keep the API readable by USER and gate only the management UI.
- **Signup exposure.** The spec ships a public `/signup` page that grants `ADMIN` to the first user; with the platform already seeding an ADMIN, real signups become `USER`. Confirm signup should remain publicly reachable.
