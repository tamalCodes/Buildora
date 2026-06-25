---
spec: frontend-projects
layer: frontend
owns: [ "apps/web/src/features/projects/**" ]
depends_on: [ frontend-overview, frontend-explore ]
graph_source: graphify-out/graph.json#he_project_detail_components
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Project detail page (`/projects/:projectId`): hero, overview, gallery, stack, team, milestones, metrics, links, updates. Static/mock; the project summary is reused from the explore feature, deep detail from local constants.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `projects/ProjectDetailsPage.tsx` | Lookup + section composition + not-found state | `@shared/components/{Button,global-nav}`, `../explore/constants/constants` (`FEATURED_PROJECTS`), `./components/Project*`, `./constants/constants` (`PROJECT_DETAILS`) | `publicRoutes.tsx:22` |
| `projects/components/Project{Hero,Overview,Gallery,Stack,Team,Milestones,Metrics,Links,Updates,Profile}.tsx` | Detail sections (`he_project_detail_components`) | constants | `ProjectDetailsPage` |
| `projects/constants/{constants,types,interfaces}.ts` | `PROJECT_DETAILS` map, `ProjectDetail` aggregate type (`he_project_detail_types`), props | — | page/components |

<!-- anchor:data-flow -->
## Data Flow
`ProjectDetailsPage` reads `:projectId` (`ProjectDetailsPage.tsx:22`) → `project = FEATURED_PROJECTS.find(id)` (from explore) + `details = PROJECT_DETAILS[projectId]` (local). If either missing → not-found view (`:27`). Else renders the section components with `project`/`details`. No network.

<!-- anchor:contracts -->
## Contracts
- `ProjectDetail` aggregate type (`constants/types.ts`) shapes the deep detail.
- Depends on explore's `FEATURED_PROJECTS` for the summary card — cross-feature import.
- `ProjectDetailsPageProps` `{ user, onSignOut }`.

<!-- anchor:conventions -->
## Conventions In Force
- Summary data sourced from [[frontend-explore]] (`FEATURED_PROJECTS`); deep data keyed by id in `PROJECT_DETAILS`.
- Always render a not-found fallback when id has no match.
- Types/mock in `constants/`.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a project: add a summary to `explore/constants/constants.ts:FEATURED_PROJECTS` AND a `PROJECT_DETAILS[id]` entry here (both needed or the page 404s).
To add a section: build `components/Project<X>.tsx`, extend `ProjectDetail`, render in the page.
To make live: add service + hook ([[frontend-hackathons]] pattern); replace both constant lookups.

<!-- anchor:invariants -->
## Invariants (self-check)
- Page renders not-found unless BOTH `FEATURED_PROJECTS` summary and `PROJECT_DETAILS` detail exist for the id.
- No network calls.

<!-- anchor:drift -->
## Drift
- Static — no `/api/projects` backend. `upvotes`, metrics etc. are mock, non-persistent.
- Couples projects→explore via `FEATURED_PROJECTS` import; renaming/moving that export breaks this page.
