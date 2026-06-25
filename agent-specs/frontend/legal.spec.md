---
spec: frontend-legal
layer: frontend
owns: [ "apps/web/src/features/legal/**" ]
depends_on: [ frontend-overview ]
graph_source: graphify-out/graph.json#legal_pages_shell_pattern
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Static policy pages — Privacy, Terms, Code of Conduct, Brand Assets — all rendered through one shared `LegalPageShell` with a per-page accent and centralized copy.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `legal/LegalPageShell.tsx` | Shared layout: nav + accent-themed header + content slot (`legal_pages_shell_pattern`) | `@shared/components/global-nav`, `./constants/{interfaces,types}` | all 4 pages |
| `legal/PrivacyPolicyPage.tsx` | `/privacy`, `/privacy-policy` | `LegalPageShell`, constants | `publicRoutes.tsx:25` |
| `legal/TermsOfUsePage.tsx` | `/terms`, `/terms-of-use` | `LegalPageShell`, constants | `publicRoutes.tsx:28` |
| `legal/CodeOfConductPage.tsx` | `/coc`, `/code-of-conduct` | `LegalPageShell`, constants | `publicRoutes.tsx:31` |
| `legal/BrandAssetsPage.tsx` | `/brand-assets` | `LegalPageShell`, constants | `publicRoutes.tsx:34` |
| `legal/constants/{interfaces,types}.ts` | `LegalPageShellProps`, `LegalAccent` (`indigo`/`emerald`/`amber`), copy/links | — | shell + pages |

<!-- anchor:data-flow -->
## Data Flow
Each page renders `<LegalPageShell user onSignOut eyebrow title subtitle meta accent>{copy}</LegalPageShell>`. Shell picks accent styles from the `ACCENTS` map (`LegalPageShell.tsx:6`) and wraps content. Pure presentation; no state, no network.

<!-- anchor:contracts -->
## Contracts
- `LegalPageShellProps` `{ user, onSignOut, eyebrow, title, subtitle, meta, accent?, children }` (`constants/interfaces.ts`).
- `LegalAccent = "indigo" | "emerald" | "amber"` (`constants/types.ts`); default `"indigo"` (`LegalPageShell.tsx:39`).

<!-- anchor:conventions -->
## Conventions In Force
- Every legal page composes `LegalPageShell` — do NOT build a bespoke layout.
- Accent chosen from the fixed `LegalAccent` union; add a new accent in BOTH the type and the `ACCENTS` map.
- Copy/links centralized in `constants/`, not inline JSX strings where reusable.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a legal page (e.g. Cookie Policy):
1. Create `legal/CookiePolicyPage.tsx` rendering `LegalPageShell` with an accent + copy from `constants/`.
2. Add the route(s) in `publicRoutes.tsx`.
To add an accent: extend `LegalAccent` union + add a matching entry to the `ACCENTS` record in `LegalPageShell.tsx`.

<!-- anchor:invariants -->
## Invariants (self-check)
- Every page in this feature returns a `LegalPageShell` at its root.
- `accent` prop value is always a key of the `ACCENTS` map (type-enforced by `LegalAccent`).
- No network/state.

<!-- anchor:drift -->
## Drift
None.
