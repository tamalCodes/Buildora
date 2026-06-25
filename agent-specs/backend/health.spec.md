---
spec: backend-health
layer: backend
owns: [ "apps/api/src/health/*" ]
depends_on: [ backend-overview ]
graph_source: graphify-out/graph.json#he_backend_overview
generated_from_mtime: 2026-04-01
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Liveness + a secret-protected Supabase warm-up ping (keeps the free-tier DB awake). No auth/user context.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `apps/api/src/health/routes.ts` | `GET /ping` → `pingSupabase` | `health/controllers`, `express.Router` | `server.ts:2` (mounted at `/health`) |
| `apps/api/src/health/controllers.ts` | `pingSupabase` + `isAuthorized` secret check | `lib/supabase` | `health/routes.ts` |

> Note: `GET /` and `GET /health` (plain liveness) are defined inline in `server.ts:23,33`, NOT in this module. This module owns only `/health/ping`.

<!-- anchor:data-flow -->
## Data Flow
`GET /health/ping` → `isAuthorized(req)` (`controllers.ts:6`): compares `HEALTH_PING_SECRET` against `x-health-secret` header OR `?secret=` query. Unset secret → `503`; mismatch → `401`. Authorized → `supabase.from("profiles").select("id").limit(1).maybeSingle()` (`:40`) → `{ status:"ok", checkedAt, profileIdSample }`.

<!-- anchor:contracts -->
## Contracts
- Input: `x-health-secret` header or `secret` query param.
- Output: `ApiResponse<{ status, checkedAt, profileIdSample }>` on success; `{ success:false, error }` on 401/503.
- Env: `HEALTH_PING_SECRET` (required for the ping to function).
- Intended caller: external cron/uptime monitor, not the web app.

<!-- anchor:conventions -->
## Conventions In Force
- Same `{ success, ... }` envelope as the rest of the API.
- Secret compared by exact string equality (`:13`); no timing-safe compare.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add another health probe: add controller fn + route in this module; mount under existing `/health` router in `server.ts`.

<!-- anchor:invariants -->
## Invariants (self-check)
- `pingSupabase` returns `503` when `HEALTH_PING_SECRET` is unset (`:25`) — never silently succeed unauthenticated.
- The ping query is read-only and `.limit(1)`.

<!-- anchor:drift -->
## Drift
None.
