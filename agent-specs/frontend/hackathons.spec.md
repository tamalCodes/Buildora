---
spec: frontend-hackathons
layer: frontend
owns: [ "apps/web/src/features/hackathons/**", "apps/web/src/services/hackathonsService.ts" ]
depends_on: [ frontend-overview ]
graph_source: graphify-out/graph.json#hackathon_page_components
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Largest feature. Three flows: list (`/hackathons`), detail (`/hackathons/:id/:tab`, hero+tabs+schedule+prizes+sponsors+FAQs), and a multi-section application form (`/hackathons/:id/application`, private). Catalog data comes from `HackathonsService` with a hardcoded mock fallback.

<!-- anchor:file-map -->
## File Map
| File / Group | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `HackathonsPage.tsx` | List view shell | `@shared/components/global-nav`, `components/Hackathons*Section`, `hooks/useHackathons` | `publicRoutes.tsx:12` |
| `HackathonDetailsPage.tsx` | Tabbed detail view | `components/Hackathon*` | `publicRoutes.tsx:15` |
| `HackathonApplicationPage.tsx` | Application form page (private) | `application/components/*`, `application/constants/*` | `privateRoutes.tsx:6` |
| `components/Hackathons{Hero,Featured,Open,Grid,Compact}*Section/Card.tsx`, `HackathonsSponsorCtaSection`, `HackathonsPageBackground` | List sections + cards (`hackathon_page_components`) | constants | list page |
| `components/Hackathon{Hero,Tabs,Overview,Schedule,Prizes,Sponsors,Faqs,More,InfoCard}.tsx` | Detail sections (`hackathon_detail_components`) | constants/tabs | detail page |
| `application/components/Application*Form/Hero/Sidebar/Notice/SectionCard.tsx` | Application form sections (`application_form_components`) | `application/constants/{classes,themes,data}` | application page |
| `constants/types.ts` | Feature-local `Hackathon`, `HackathonsCatalog` (`hackathon_core_types`) | — | service, components |
| `constants/{constants,tabs,openFilters,utils,interfaces}.ts` | Mock catalogs, tab defs, open-list filter semantics | — | components/service |
| `application/constants/{classes,themes,data,types,interfaces}.ts` | Style tokens (`applicationClasses`/`applicationTheme`), seed data | — | application components |
| `hooks/useHackathons.ts` | `useHackathonsCatalog` query + keys | `services/hackathonsService` | list page |
| `services/hackathonsService.ts` | `HackathonsService.getCatalog` + normalizers + `FALLBACK_CATALOG` | `apiClient`, `constants/{constants,types}` | hook |

<!-- anchor:data-flow -->
## Data Flow
List: `HackathonsPage` → `useHackathonsCatalog()` → `HackathonsService.getCatalog()` → `apiRequest("/hackathons", { withAuth:false })` (`hackathonsService.ts:176`). On `!success`/no data → `FALLBACK_CATALOG` (mock from `constants/constants.ts`). On array → `normalizeHackathonArray` + `splitByStatus`; on object → `normalizeCatalogFromObject` (accepts many key aliases: `featured/open/upcoming/past`, `hackathons/items`). Output `HackathonsCatalog { featured, open, upcoming, pastHackathons }`.
Query opts: `retry:false, staleTime:30_000` (`useHackathons.ts:5`).
Open-list filter semantics (`constants/openFilters.ts`): `open-now` keeps open; `ending-soon` sorts by nearest end; `highest-prize` sorts by prize desc — client-side today.
Detail/application: static — render from `constants/*` + route params; no service calls.

<!-- anchor:contracts -->
## Contracts
- Feature-local `Hackathon` (`constants/types.ts`): `{ id, title, organizer, location, dates, status:"Open"|"Upcoming"|"Past", tags[], prize, participants, coverUrl, logoUrl, sponsor? }` — NOT the shared `Hackathon`.
- `HackathonsCatalog`: `{ featuredHackathons, openHackathons, upcomingHackathons, pastHackathons }`.
- Application form: typed by `application/constants/types.ts` + `interfaces.ts`; styles centralized in `classes.ts`/`themes.ts`.

<!-- anchor:conventions -->
## Conventions In Force
- Catalog normalization is defensive: every external field passes through `readString/readOptionalString/readStringArray` with fallbacks (`hackathonsService.ts:47-59`). Add new fields the same way.
- Application styling uses the shared `applicationClasses`/`applicationTheme` token objects, not ad-hoc class strings (`applicationclasses_consumers`/`applicationtheme_consumers`).
- Types/tab/filter config in `constants/`, never inline in `.tsx`.
- This catalog is a PUBLIC fetch (`withAuth:false`).

<!-- anchor:extension-recipe -->
## Extension Recipe
To make the catalog real (remove mock fallback):
1. Add a `/api/hackathons` resource on the backend ([[backend-overview]] recipe) returning either a categorized object or flat list — the normalizer already handles both shapes.
2. Ensure response fields match the feature-local `Hackathon` keys (or extend `normalizeHackathon`).
3. Remove/keep `FALLBACK_CATALOG` as the offline default.
To add a detail tab: add to `constants/tabs.ts` + a `Hackathon*` component, render in `HackathonDetailsPage`.

<!-- anchor:invariants -->
## Invariants (self-check)
- `getCatalog` never throws — it always returns a `HackathonsCatalog` (fallback on any failure).
- The catalog call uses `withAuth:false`.
- No component imports the shared `@buildora/shared` `Hackathon`; all use `constants/types.ts`.
- Application page is auth-guarded (`privateRoutes.tsx`).

<!-- anchor:drift -->
## Drift
- **`/hackathons` endpoint does not exist** on the backend ([[backend-overview]] drift). Every catalog fetch 404s → list view is ALWAYS rendering `FALLBACK_CATALOG` mock data today.
- Detail + application flows are 100% static/mock (`constants/*`); no persistence — submitting an application does not hit any API.
- Shared `Hackathon` type (`packages/shared`) is unused here — see [[shared-contracts]] drift.
- Route note: `publicRoutes.tsx:71` also maps `"/:hackathonId/:tabId"` (catch-all detail) in addition to `/hackathons/:hackathonId/:tabId`.
