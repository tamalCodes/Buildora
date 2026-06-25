---
spec: frontend-overview
layer: frontend
owns: [ "apps/web/src/App.tsx", "apps/web/src/index.tsx", "apps/web/src/routes/**", "apps/web/src/services/**", "apps/web/src/shared/**" ]
depends_on: [ shared-contracts ]
graph_source: graphify-out/graph.json#he_route_config_system
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
React 19 + Vite 6 + React Router 7 SPA. `App.tsx` boots a session (token → `/auth/me`), composes guest/private/public route arrays, and wraps everything in Toast + Search providers. Features own their UI; cross-cutting concerns live in `routes/`, `services/`, `shared/`.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `App.tsx` | Session bootstrap, route composition, provider tree, maintenance banner gate | `routes/*Routes`, `services/authService`, `shared/components/*`, `@buildora/shared` | `index.tsx` |
| `index.tsx` | Renders `<App/>`, imports `styles.css` | `App`, `styles.css` | entrypoint |
| `routes/publicRoutes.tsx` | Unguarded + `withAuthSwitch` routes (explore, hackathons, builders, projects, legal) | `lazyImport`, `routeGuards`, feature pages | `App.tsx:12` |
| `routes/privateRoutes.tsx` | `withAuthGuard` routes (application, settings, profile) | `lazyImport`, `routeGuards` | `App.tsx:11` |
| `routes/guestRoutes.tsx` | `withGuestGuard` routes (`/auth`, `/login`) | `lazyImport`, `routeGuards` | `App.tsx:10` |
| `routes/routeGuards.tsx` | `withAuthGuard`/`withGuestGuard`/`withAuthSwitch` HOCs | `react-router-dom` | all route files |
| `routes/lazyImport.ts` | `React.lazy` + chunk-error retry | `react` | all route files |
| `routes/RouteErrorBoundary.tsx`, `RouteFallbacks.tsx`, `types.ts` | Suspense/error fallbacks, `RouteContext`/`RouteConfig` types | `react` | `App.tsx`, route files |
| `services/apiClient.ts` | `apiRequest<T>` / `apiRequestOrThrow<T>` + `ApiRequestError` | `@buildora/shared`, `authService` | `profileService`, `hackathonsService` |
| `services/authService.ts` | `AuthService` (static) — `/api/auth/*` + token in localStorage | `@buildora/shared` | `App.tsx`, `apiClient`, auth feature |
| `services/profileService.ts` | `ProfileService` (object of methods) — `/api/profile/*` | `apiClient`, `services/types/profile.types` | `features/profile/hooks/useProfile` |
| `services/hackathonsService.ts` | `HackathonsService.getCatalog` — `/hackathons` + mock fallback/normalizers | `apiClient`, `features/hackathons/constants/*` | `features/hackathons/hooks/useHackathons` |
| `shared/components/*` | Button, Input, Modal, Logo, Footer, ScrollToTop, CustomToast(+context), MaintenanceBanner, SocialIcon, Theme(Provider/Toggle), `global-nav/`, `search/` | varies | features + App |

<!-- anchor:data-flow -->
## Data Flow
**Session**: `App.tsx:68` reads `AuthService.getToken()` → `AuthService.getMe()` (`:75`) → on success set `user`+`isAuthenticated`, else `clearToken`. `isCheckingSession` gates first render (returns `null`, `:111`).

**Server state (React Query)**: component → feature hook (`use*`) → service method → `apiRequestOrThrow`/`apiRequest` (`apiClient.ts`) → `fetch(${API_BASE}${path})` with `Authorization: Bearer <token>` when `withAuth` (`:50`) → backend → `ApiResponse<T>` → hook `data`. Mutations invalidate query keys (`useProfile.ts` `onSuccess`).

**Auth flow** (no apiClient): `AuthService` methods `fetch` directly and persist the JWT to `localStorage["buildora_token"]` on authenticate (`authService.ts:53`).

**Routing**: `App.tsx:122` concatenates guest+private+public route arrays → `<Routes>` maps them; guards redirect via `<Navigate to="/explore">`.

<!-- anchor:contracts -->
## Contracts
- `RouteContext = { user, isAuthenticated, onSignOut, onLoginSuccess }` (`routes/types.ts`), spread into every route element.
- `apiRequest<T>(path, {method,body,headers,withAuth})` → `ApiResponse<T>` (never throws). `apiRequestOrThrow<T>` → `T` or throws `ApiRequestError`.
- API base: `VITE_API_BASE_URL || "http://localhost:3001"`, then `/api` (`apiClient.ts:8`).
- Token key: `"buildora_token"` in localStorage (`authService.ts:19`).

<!-- anchor:conventions -->
## Conventions In Force
- Route-level code splitting: wrap every page in `lazyImport(() => import(...))` (`publicRoutes.tsx:11`).
- Guard via HOC, not inline checks: `withAuthGuard`/`withGuestGuard`/`withAuthSwitch` (`routeGuards.tsx`).
- `AuthService` uses static methods; `ProfileService` is a method object; both centralize all calls to their API namespace — components never `fetch`.
- Read/write server state through React Query hooks in `features/<f>/hooks/`, never call services directly from components.
- Path aliases: `@/* → src/*`, `@shared/* → src/shared/*`, `@buildora/shared` → shared package.
- Feature `.tsx` files must NOT declare `type`/`interface`; put them in `constants/*.ts` or `types/` (CLAUDE.md rule, followed e.g. `AuthForm.tsx:1,13`).
- Pages take `{ user, onSignOut }` and render `<GlobalNav user onSignOut/>` as the first child (every page entry).

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a new page/route:
1. Build the page under `features/<feature>/` (entry `*.Page.tsx` + `components/` + `constants/`).
2. `lazyImport` it in the correct route file (`publicRoutes` / `privateRoutes` / `guestRoutes`).
3. If protected, wrap with `withAuthGuard`; spread `{...ctx}`.
4. For server data: add a service method + a React Query hook in the feature; never fetch in the component.

<!-- anchor:invariants -->
## Invariants (self-check)
- No UI component imports `@supabase/*` or constructs API URLs directly — all network goes through `services/*`.
- Every route element is produced by `lazyImport` (grep route files for `import(` count == lazy count).
- Every protected route element is wrapped by a `with*Guard` HOC.
- `Authorization` header only attached by `apiClient`/`AuthService`, sourced from `AuthService.getToken()`.
- Exactly three route arrays composed in `App.tsx` (guest, private, public).

<!-- anchor:drift -->
## Drift
- `MAINTENANCE_MODE_ENABLED` defaults **on** unless `VITE_MAINTENANCE_MODE === "false"` (`App.tsx:25`) — the banner shows by default; not documented in CLAUDE.md/architecture.md.
- CLAUDE.md says "Tailwind via CDN"; architecture.md + actual setup use local Tailwind v4 (`@tailwindcss/vite`, `styles.css`). Local v4 is current — CLAUDE.md line is stale.
- `routeGuards` redirect target is `/explore` for both auth-required and guest-only failures (`routeGuards.tsx:14,28`).
- graphify manifest mtimes (2026-04-11) predate the June Tailwind-canonicalization commits; class strings in components may differ from the graph snapshot. Code is ground truth.
