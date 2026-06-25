---
spec: frontend-builders
layer: frontend
owns: [ "apps/web/src/features/builders/**" ]
depends_on: [ frontend-overview ]
graph_source: graphify-out/graph.json#builders_feature_module
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Builder directory (`/builders`) + builder profile (`/builders/:builderId`). Leaderboard with client-side sort, featured builders, highlights, and a per-builder profile (hero/about/stats/projects). Static/mock data.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `builders/BuildersPage.tsx` | Directory shell, holds `activeSort` state | `@shared/components/global-nav`, `./components/*`, `./constants/{types,interfaces}` | `publicRoutes.tsx:18` |
| `builders/BuilderDetailsPage.tsx` | Single builder profile | `./components/BuilderProfile*` | `publicRoutes.tsx:19` |
| `builders/components/Builders{Hero,SortBar,Leaderboard}.tsx`, `FeaturedBuilders.tsx`, `BuilderHighlights.tsx` | Directory sections | constants | `BuildersPage` |
| `builders/components/BuilderProfile{Hero,About,Stats,Projects}.tsx` | Profile sections (`he_builder_profile_components`) | constants | `BuilderDetailsPage` |
| `builders/constants/{profiles,constants,types,interfaces}.ts` | Mock builder data, `BuilderStatKey`, props | — | components |

<!-- anchor:data-flow -->
## Data Flow
`BuildersPage` holds `activeSort: BuilderStatKey` (default `"hackathons"`, `BuildersPage.tsx:12`), passes to `BuildersSortBar` (`onChange`) + `BuildersLeaderboard` (`activeSort`). Leaderboard sorts mock profiles client-side by the active stat. `BuilderDetailsPage` looks up a builder from `constants/profiles.ts` by route `:builderId`. No network.

<!-- anchor:contracts -->
## Contracts
- `BuilderStatKey` (sort dimension) + `BuildersPageProps`/`BuilderDetailsPageProps` `{ user, onSignOut }` in `constants/`.
- Mock dataset: `constants/profiles.ts`.

<!-- anchor:conventions -->
## Conventions In Force
- Sort state owned by the page, pushed down to bar + leaderboard.
- Types/mock in `constants/`.
- `GlobalNav` first child; glow-blob background block (shared visual idiom across pages).

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a leaderboard sort dimension: add to `BuilderStatKey` (`constants/types.ts`), add the option in `BuildersSortBar`, handle it in `BuildersLeaderboard`'s sort.
To make builders live: add a service + React Query hook (mirror [[frontend-hackathons]]); replace `constants/profiles` import.

<!-- anchor:invariants -->
## Invariants (self-check)
- No network calls (grep `fetch`/`Service` → none).
- Sort is a single source of truth in `BuildersPage` state.

<!-- anchor:drift -->
## Drift
- Entirely static — no `/api/builders` backend resource.
