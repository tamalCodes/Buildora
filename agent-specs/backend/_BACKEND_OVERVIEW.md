---
spec: backend-overview
layer: backend
owns: [ "apps/api/src/server.ts", "apps/api/src/lib/*" ]
depends_on: [ shared-contracts, backend-auth, backend-profile, backend-health ]
graph_source: graphify-out/graph.json#he_profile_api_layer_stack
generated_from_mtime: 2026-04-01
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Express 5 + TypeScript (CommonJS) API. Mounts three routers (`/api/auth`, `/api/profile`, `/health`) behind Helmet + CORS, talks to Supabase with the Service Role Key (RLS bypass), and returns the shared `ApiResponse` envelope.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `apps/api/src/server.ts` | App bootstrap, middleware, router mount, `listen` | `auth/routes`, `profile/routes`, `health/routes`, `cors`, `helmet`, `dotenv/config` | entrypoint |
| `apps/api/src/lib/supabase.ts` | Service-role Supabase client (singleton `supabase`) | `@supabase/supabase-js`, `dotenv` | every controller + `lib/auth.ts` |
| `apps/api/src/lib/auth.ts` | `getAuthenticatedUser(req)` Bearer-token verifier | `lib/supabase` | all profile controllers |

<!-- anchor:data-flow -->
## Data Flow
Request → Helmet (`server.ts:14`) → CORS allow `WEB_ORIGIN` (`server.ts:15`) → `express.json()` (`server.ts:21`) → router (`/api/auth` `server.ts:39`, `/api/profile` `server.ts:40`, `/health` `server.ts:37`) → controller. Controller pattern: `getAuthenticatedUser(req)` (profile) or inline Bearer check (auth `getMe`) → `<Schema>.parse(req.body)` → `supabase.from(table)...` → `mapX(row)` → `res.json({ success:true, data })`.

`getAuthenticatedUser` (`lib/auth.ts:4`): rejects missing `Bearer ` → `{user:null,error:"Unauthorized"}`; else `supabase.auth.getUser(token)`; invalid → `{user:null,error:"Session invalid."}`.

<!-- anchor:contracts -->
## Contracts
- Mounted routes (server.ts): root `GET /`, `GET /health`, router `GET /health/ping`, `/api/auth/*` (see [[backend-auth]]), `/api/profile/*` (see [[backend-profile]]).
- Success: `res.json({ success:true, data })`. Error: `res.status(4xx/5xx).json({ success:false, error })`.
- Ports: `PORT` env (default `3001`, `server.ts:9`). CORS origin: `WEB_ORIGIN` (default `http://localhost:3000`).

<!-- anchor:conventions -->
## Conventions In Force
- One controller file per resource; one mapper module per resource group; validators are Zod `.strict()` objects (`profile.core.validators.ts:25`).
- Auth before any Supabase query — copy `profile.core.controller.ts:38-41`.
- snake_case DB columns ↔ camelCase API via mappers (`profile.mappers.ts`).
- `@/*` path alias → `src/*` (resolved via `tsconfig-paths`/`tsc-alias`).
- Never import shared types from a relative path; use `@buildora/shared`.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a new API resource `foo`:
1. `apps/api/src/foo/validators/foo.validators.ts` — Zod `.strict()` schema(s).
2. `apps/api/src/foo/types/foo.types.ts` — TS interfaces for mapped output.
3. `apps/api/src/foo/mappers/foo.mappers.ts` — `mapFoo(row)` snake→camel.
4. `apps/api/src/foo/controllers/foo.controller.ts` — `getAuthenticatedUser` → parse → supabase → map → envelope.
5. `apps/api/src/foo/routes.ts` — `Router()` wiring each controller.
6. Mount in `server.ts` via `app.use("/api/foo", fooRouter)`.

<!-- anchor:invariants -->
## Invariants (self-check)
- Every protected controller calls `getAuthenticatedUser(req)` (or equivalent Bearer check) BEFORE any `supabase.from(...)` (grep each controller).
- Every controller returns the `{ success, ... }` envelope on both paths — no bare `res.json(row)`.
- `supabase` is constructed once in `lib/supabase.ts`; controllers import it, never call `createClient` themselves.
- Ownership scoped by `.eq("id", user.id)` (core) or `.eq("profile_id", user.id)` (sub-resources) on every query.
- Only routers mounted in `server.ts` exist; there is **no** `/api/hackathons`, `/api/builders`, `/api/projects` router.

<!-- anchor:drift -->
## Drift
- **No `/hackathons` (or builders/projects/explore) endpoint exists**, yet `apps/web/src/services/hackathonsService.ts:176` calls `apiRequest("/hackathons")`. Every such call 404s and the FE silently falls back to mock data. See [[hackathons]].
- `architecture.md` documents only the auth module on the backend; the full `profile` module (8 controllers, 23 routes) is undocumented there. Code is ground truth — see [[backend-profile]].
- Default port mismatch: CLAUDE.md says `dev:api` runs on **8000**; `server.ts:9` defaults `PORT` to **3001** and FE `apiClient.ts:9` defaults to `http://localhost:3001`. The 8000 figure is stale.
