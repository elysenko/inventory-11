# Architecture

## Requested stack
`enterprise` — Angular 19 (standalone components) + NestJS + tRPC + Prisma + PostgreSQL.

This project (StockRoom) was scaffolded from an empty repository (only `.git`, `.github/`, and a placeholder `README.md` existed). No platform was previously present, so the full `template-enterprise` template was copied in fresh.

## Platform layout
- `frontend/` — Angular 19 standalone-component app (Angular CLI project name: `frontend`). Entry: `src/app/app.component.ts`, routes in `src/app/app.routes.ts`, tRPC client wiring in `src/app/app.config.ts` / `src/app/trpc-client.types.ts`. Template ships a demo `home/` component consuming `users.findAll` over tRPC.
- `backend/` — NestJS app using `nestjs-trpc` for the tRPC layer alongside REST controllers. Entry: `src/main.ts` (global prefix, listens on `PORT` env, default 3000). Prisma schema/client under `backend/prisma/`. Health check at `backend/src/health/health.controller.ts` (`GET /health`, using `@nestjs/terminus`). Demo `users` module has both a REST-less tRPC router (`users.router.ts`) and a service.
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
