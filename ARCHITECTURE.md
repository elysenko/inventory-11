# Architecture

## Requested stack
`enterprise` — Angular 19 (standalone components) + NestJS + Prisma + PostgreSQL.

The template ships a tRPC layer, but the approved StockRoom frontend talks plain
REST over `/api`, so the backend exposes REST controllers and the unused
`nestjs-trpc` wiring (and its dependency, which conflicts with NestJS 11) was
removed rather than left dead in the tree.

This project (StockRoom) was scaffolded from an empty repository (only `.git`, `.github/`, and a placeholder `README.md` existed). No platform was previously present, so the full `template-enterprise` template was copied in fresh.

## Platform layout
- `frontend/` — Angular 19 standalone-component app (Angular CLI project name: `frontend`). Entry: `src/app/app.component.ts`, routes in `src/app/app.routes.ts`, providers in `src/app/app.config.ts`. API response shapes are declared in `src/app/core/models.ts`, which the backend's view types match field for field. nginx proxies `/api/` to the backend; `proxy.conf.json` does the same for `ng serve`.
- `backend/` — NestJS REST API. Entry: `src/main.ts` (global `api` prefix, listens on `PORT`, default 3001 to match `colossus.yaml` `backend.port`). Feature modules: `auth`, `items`, `locations`, `movements`, `reports`, `stock`, `settings`, `health`. Prisma schema/client under `backend/prisma/`. `JwtAuthGuard` and `RolesGuard` are registered as `APP_GUARD`s, so 401 is the default for every endpoint and routes opt out with `@Public()`. Health at `GET /api/health` (liveness) and `GET /api/health/deep` (database round-trip). Swagger at `GET /api/docs`, which is also the deploy probe path.
- `docker-compose.yml` — local development topology: Postgres 16, the API on :3001, and the nginx frontend on :8080. Every credential comes from the shell environment; nothing secret is committed.
- `.pipeline/surface.json` — generated contract of routes, components, and `data-testid`s for the test_spec/Playwright agents. Regenerate whenever routes/components/testids change.
- `.colossus-acceptance.json` — post-deploy render-gate contract. `ready_testid: app-ready`; `expect_text` matches the StockRoom sign-in page, which is where an anonymous visitor to `/` lands.
- `colossus.yaml` — build manifest read by deploy agents (framework: angular, backend buildDir: backend).

## What's newly scaffolded vs. present
Everything under `frontend/`, `backend/`, `docker-compose.yml`, `.gitignore`, `.dockerignore`, and `.pipeline/` is newly scaffolded from `template-enterprise`. Pre-existing files (`README.md`, `.github/workflows/colossus-deploy.yml`) were left untouched.

## Build and verification

The StockRoom domain is implemented: Prisma schema (`User`, `ColossusAccount`, `Item`,
`Location`, `StockLevel`, `Movement`, `SystemSetting`), the auth module (JWT +
`APP_GUARD` role enforcement), the items / locations / movements / reports / settings
modules, and the Angular pages that consume them.

Local loop:
1. `npm install` in both `frontend/` and `backend/`. Do not change `frontend/package.json`
   dependencies unless genuinely required — the frontend Docker build reuses a prebaked
   `node_modules` seed that is keyed on the template's exact dependency set.
2. Export `DATABASE_URL` and `JWT_SECRET`, then `npx prisma migrate deploy` in `backend/`.
   `prisma/seed/seed.js` materialises the platform-owned logins from
   `COLOSSUS_ACCOUNTS_JSON`; there are no hardcoded accounts.
3. `npx tsc --noEmit` and `npx jest --runInBand` in `backend/`;
   `npx ng build --configuration production` in `frontend/`.
4. Keep `.pipeline/surface.json` and `.colossus-acceptance.json` in step with any new
   route, component or `data-testid`.

Note on `nest build`: a stale `tsconfig.build.tsbuildinfo` combined with
`deleteOutDir: true` can leave `dist/` without `main.js` while the build still exits 0.
`.dockerignore` excludes `*.tsbuildinfo` so images are unaffected, and the Dockerfile
asserts `dist/main.js` exists; locally, delete the file and rebuild.

## Template sources used
- `template-enterprise/` from the scaffold-templates repository (Angular 19 + NestJS + tRPC + Prisma, copied to project root).
