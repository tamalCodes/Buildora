---
spec: frontend-explore
layer: frontend
owns: [ "apps/web/src/features/explore/**" ]
depends_on: [ frontend-overview ]
graph_source: graphify-out/graph.json#he_explore_section_components
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Home/dashboard at `/explore` (and `/`). Curated showcase of featured projects, builders, and ecosystem signals. Authenticated users see `ExplorePage`; guests get the auth flow (`withAuthSwitch`). All data is static/mock.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `explore/ExplorePage.tsx` | Section composition + CTA wiring | `@shared/components/global-nav`, `./components/*`, `./constants/constants`, `./hooks/useExplorePageCta` | `publicRoutes.tsx:11` (via `withAuthSwitch`) |
| `explore/components/{ExploreHero,FeaturedProjects,EcosystemPulse,FeaturedBuilders,ExploreShowcase}Section.tsx` | Page sections (`he_explore_section_components`) | constants, CTA handler | `ExplorePage` |
| `explore/constants/{constants,types,interfaces}.ts` | `FEATURED_PROJECTS`, `Builder`/`Signal`/`ExploreCtaAction`/`ExploreSectionId`/`ExploreShowcaseIntent` types (`he_explore_types_system`) | — | page/components/hook |
| `explore/hooks/useExplorePageCta.ts` | CTA dispatcher: scroll/navigate/follow/showcase intent | `react-router-dom` | `ExplorePage` |
| `explore/components/featured-project-cards.md` | Design note (not code) | — | — |

<!-- anchor:data-flow -->
## Data Flow
`ExplorePage` (`ExplorePage.tsx:13`) calls `useExplorePageCta()` → `{ followedBuilderIds, showcaseIntent, handleCta }`. Sections receive `onCta={handleCta}` + data props (e.g. `FEATURED_PROJECTS` from `constants/constants`).
`handleCta` (`useExplorePageCta.ts:34`) switches on `action.type`: `scroll` → `scrollIntoView`/`navigate('/explore#id')`; follow/showcase → local `Set`/intent state. No network.
`FEATURED_PROJECTS` is shared with the projects feature ([[frontend-projects]] reads it for detail lookup).

<!-- anchor:contracts -->
## Contracts
- `ExploreCtaAction` discriminated union (`type: "scroll" | ...`) in `constants/types.ts`.
- `FEATURED_PROJECTS` exported from `explore/constants/constants.ts` — consumed by `projects/ProjectDetailsPage.tsx:5`.
- `ExplorePageProps` `{ user, onSignOut }`.

<!-- anchor:conventions -->
## Conventions In Force
- Section components are presentational; all CTA behavior centralized in `useExplorePageCta`.
- Mock data + all types live in `constants/`.
- Cross-feature data (`FEATURED_PROJECTS`) is imported from this feature, not duplicated.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a section: build `components/<X>Section.tsx`, add its data/types to `constants/`, render it in `ExplorePage` with `onCta={handleCta}`; add any new `ExploreSectionId`/`ExploreCtaAction` variant.
To make data live: add a service + React Query hook (mirror [[frontend-hackathons]] pattern) and replace the `constants` import.

<!-- anchor:invariants -->
## Invariants (self-check)
- No network calls in this feature (grep `fetch`/`apiRequest`/`Service` → none).
- CTA logic only in `useExplorePageCta`; sections never call `navigate` directly.
- `/explore` switches authed vs guest via `withAuthSwitch` (`publicRoutes.tsx:56`).

<!-- anchor:drift -->
## Drift
- Entirely static — no backend `/explore` resource exists. Featured content is hardcoded.
- `EcosystemPulseSection` takes no props (no follow state) while other sections take `onCta`/data — intentional, it's self-contained mock.
