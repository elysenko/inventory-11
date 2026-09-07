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
- `docker-compose.yml` — local Postgres 16 + pgadmin for development.
- `.pipeline/surface.json` — generated contract of routes, components, and `data-testid`s for the test_spec/Playwright agents. Regenerate whenever routes/components/testids change.
- `.colossus-acceptance.json` — post-deploy render-gate contract (`ready_testid: app-ready`); `expect_text` must be filled in by the coder once the real StockRoom front page replaces the template's demo "Users" list.
- `colossus.yaml` — build manifest read by deploy agents (framework: angular, backend buildDir: backend).

## What's newly scaffolded vs. present
Everything under `frontend/`, `backend/`, `docker-compose.yml`, `.gitignore`, `.dockerignore`, and `.pipeline/` is newly scaffolded from `template-enterprise`. Pre-existing files (`README.md`, `.github/workflows/colossus-deploy.yml`) were left untouched.

## Next steps for the developer / build agent
1. Implement the StockRoom domain per the plan: Prisma schema (`User`, `Item`, `Location`, `StockLevel`, `Movement`), auth module (JWT + roles guard), items/locations/movements/reports modules, and the corresponding Angular pages — replacing the template's demo `users` router/`home` component.
2. Copy env templates once they exist for this stack (none ship with `template-enterprise` today) — otherwise create `backend/.env` with `DATABASE_URL` and `JWT_SECRET` before running the backend.
3. `docker compose up -d postgres` for local Postgres, then `npx prisma migrate dev` inside `backend/` once the real schema is written.
4. Update `.pipeline/surface.json` and `.colossus-acceptance.json` (`expect_text`) as real routes/components/testids are added — these are the contract for test generation and the deploy render gate.
5. Run `npm install` in both `frontend/` and `backend/` (do not change `frontend/package.json` deps/devDependencies unless a new dependency is genuinely required — the frontend Docker build relies on the template's prebaked `node_modules` seed matching exactly).

## Template sources used
- `template-enterprise/` from the scaffold-templates repository (Angular 19 + NestJS + tRPC + Prisma, copied to project root).
