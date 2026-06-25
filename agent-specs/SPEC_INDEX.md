# SPEC_INDEX — Buildora V2 agent context router

Machine-first context for agents. Read the relevant spec(s) BEFORE touching code. Specs are grounded in real file paths; code wins over docs on conflict (see each spec's `Drift`).

Generated: 2026-06-25 · Graph snapshot: `graphify-out/` (mtime 2026-06-08, manifest file mtimes 2026-04-01 → 2026-04-11).

<!-- anchor:task-routing -->
## Task → Spec Routing
| Working on… | Read first |
|-------------|-----------|
| Login / signup / password reset (UI) | [frontend/auth](frontend/auth.spec.md) → [shared/contracts](shared/contracts.spec.md) → [backend/auth](backend/auth.spec.md) |
| Auth endpoints / token / provisioning | [backend/auth](backend/auth.spec.md) → [shared/contracts](shared/contracts.spec.md) |
| Profile page / sections / editing (UI) | [frontend/profile](frontend/profile.spec.md) → [backend/profile](backend/profile.spec.md) |
| Profile API / sub-resources / validators / mappers | [backend/profile](backend/profile.spec.md) → [backend/_overview](backend/_BACKEND_OVERVIEW.md) |
| Hackathons list / detail / application | [frontend/hackathons](frontend/hackathons.spec.md) → [frontend/_overview](frontend/_FRONTEND_OVERVIEW.md) |
| Explore home / featured content | [frontend/explore](frontend/explore.spec.md) |
| Builders directory / profile | [frontend/builders](frontend/builders.spec.md) |
| Project detail page | [frontend/projects](frontend/projects.spec.md) (depends on explore) |
| Legal / policy pages | [frontend/legal](frontend/legal.spec.md) |
| Settings page | [frontend/settings](frontend/settings.spec.md) |
| Routing / guards / lazy loading | [frontend/_overview](frontend/_FRONTEND_OVERVIEW.md) |
| Services / apiClient / React Query data flow | [frontend/_overview](frontend/_FRONTEND_OVERVIEW.md) → [shared/contracts](shared/contracts.spec.md) |
| Shared types / Zod schemas / `ApiResponse` | [shared/contracts](shared/contracts.spec.md) |
| Express setup / middleware / Supabase client | [backend/_overview](backend/_BACKEND_OVERVIEW.md) |
| Health ping / DB warm-up | [backend/health](backend/health.spec.md) |
| Any new vertical slice (UI→API→DB) | [shared/contracts](shared/contracts.spec.md) + the relevant FE + BE spec |

<!-- anchor:global-invariants -->
## Global Invariants (repo-wide)
- **Envelope**: every API response is `ApiResponse<T>` = `{ success, data?, error?, code? }` (`packages/shared/src/types.ts:84`). Success → `{success:true,data}`; failure → `{success:false,error}`.
- **Single source of truth**: cross-tier types + Zod schemas live ONLY in `packages/shared/src/types.ts`, imported as `@buildora/shared`. Don't duplicate.
- **Auth flow**: JWT from Supabase, stored in `localStorage["buildora_token"]` (`authService.ts:19`), sent as `Authorization: Bearer <token>`. Backend verifies via `supabase.auth.getUser(token)` (`lib/auth.ts:11`, `auth/controllers.ts:338`).
- **Backend pattern**: validate (Zod `.strict()`) → authenticate (`getAuthenticatedUser`) → query Supabase (Service Role, scoped by `user.id`) → map snake→camel → envelope.
- **Frontend pattern**: component → React Query hook → service (static `AuthService` / `ProfileService` object / `HackathonsService`) → `apiClient` → fetch. Components never fetch or touch Supabase/localStorage directly.
- **Path aliases**: FE `@/* → src/*`, `@shared/* → src/shared/*`, `@buildora/shared`. BE `@/* → src/*`.
- **Routing**: pages are `lazyImport`ed and guarded by `with{Auth,Guest,AuthSwitch}` HOCs; three route arrays composed in `App.tsx`.
- **Mounted API surface**: only `/api/auth/*`, `/api/profile/*`, `/health*` exist. There is NO `/api/hackathons`, `/builders`, `/projects`, `/explore` — those features are mock/static on the FE.

<!-- anchor:spec-inventory -->
## Spec Inventory
| Spec | Layer | Owns |
|------|-------|------|
| [shared/contracts](shared/contracts.spec.md) | shared | `packages/shared/src/types.ts` |
| [backend/_overview](backend/_BACKEND_OVERVIEW.md) | backend | `server.ts`, `lib/*` |
| [backend/auth](backend/auth.spec.md) | backend | `apps/api/src/auth/*` |
| [backend/profile](backend/profile.spec.md) | backend | `apps/api/src/profile/**` |
| [backend/health](backend/health.spec.md) | backend | `apps/api/src/health/*` |
| [frontend/_overview](frontend/_FRONTEND_OVERVIEW.md) | frontend | `App`, `routes/**`, `services/**`, `shared/**` |
| [frontend/auth](frontend/auth.spec.md) | frontend | `features/auth/**`, `shared/utils/emailUtils.ts` |
| [frontend/profile](frontend/profile.spec.md) | frontend | `features/profile/**`, `services/profileService.ts` |
| [frontend/hackathons](frontend/hackathons.spec.md) | frontend | `features/hackathons/**`, `services/hackathonsService.ts` |
| [frontend/explore](frontend/explore.spec.md) | frontend | `features/explore/**` |
| [frontend/builders](frontend/builders.spec.md) | frontend | `features/builders/**` |
| [frontend/projects](frontend/projects.spec.md) | frontend | `features/projects/**` |
| [frontend/legal](frontend/legal.spec.md) | frontend | `features/legal/**` |
| [frontend/settings](frontend/settings.spec.md) | frontend | `features/settings/**` |

<!-- anchor:repo-wide-drift -->
## Repo-wide Drift (read before trusting docs)
1. **Mock vs real**: hackathons/explore/builders/projects/settings have NO backend; they render static `constants/*`. `hackathonsService` calls `/hackathons` which 404s → always falls back to mock. Only auth + profile are wired end-to-end.
2. **Shared `Hackathon`/`Project`/`Article` types are unused** by the FE (features use local types with different fields). See [shared/contracts](shared/contracts.spec.md) drift.
3. **architecture.md documents only the auth backend**; the full `profile` module (8 controllers, 23 routes) is undocumented there.
4. **Tailwind**: CLAUDE.md says CDN; reality is local Tailwind v4 (`@tailwindcss/vite` + `styles.css`). architecture.md is correct.
5. **Dev port**: CLAUDE.md says API on 8000; code defaults to 3001 (`server.ts:9`, `apiClient.ts:9`).
6. **Maintenance banner** defaults ON unless `VITE_MAINTENANCE_MODE === "false"` (`App.tsx:25`).
7. **Graph staleness**: `graphify-out` manifest mtimes (Apr 2026) predate the June Tailwind-canonicalization commits. Trust code; the graph is a structural hint, not current class-string truth.

<!-- anchor:self-update -->
## Self-Update Protocol
> Specs are living. Before starting a task, an agent reads the relevant spec(s). After changing code, the agent MUST: (1) update the `File Map`, `Data Flow`, and `Contracts` sections of every spec whose `owns` globs matched a changed file; (2) bump `last_verified`; (3) append any new mismatch to `Drift`. If a change spans files no spec owns, create a new spec from the template and add it to SPEC_INDEX. A spec is stale when an owned file's mtime exceeds `generated_from_mtime` and `last_verified` predates the change — flag stale specs at task start instead of trusting them blindly.

### Regeneration protocol
- Re-run `graphify` to refresh `graphify-out/` when structure changes materially (new feature dirs, new API resources).
- Per-spec front-matter `generated_from_mtime` = newest mtime of owned files (from `manifest.json`); `graph_source` = the hyperedge id the spec maps to.
- The template lives in `agent-specs/GENERATE_SPECS.prompt.md` — reuse it for any new spec.
