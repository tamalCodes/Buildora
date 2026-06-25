---
spec: frontend-settings
layer: frontend
owns: [ "apps/web/src/features/settings/**" ]
depends_on: [ frontend-overview ]
graph_source: graphify-out/graph.json#settings_feature_module
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Account settings page (`/settings`, private). Sidebar-navigated sections rendered in cards, reusable form controls, and a logout-confirm modal. UI is local-state only; account fields are not yet persisted to an API.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `settings/SettingsPage.tsx` | Shell: section switch + logout modal | `@shared/components/{global-nav,Modal}`, `./components/*`, `./constants/{constants,interfaces,types}` | `privateRoutes.tsx:9` |
| `settings/components/SettingsCard.tsx` | Section card wrapper | — | `SettingsPage` |
| `settings/components/SettingsControls.tsx` | `SettingsButton/Checkbox/Input/Toggle` primitives | — | `SettingsPage` |
| `settings/components/SettingsSidebar.tsx`, `SettingsTopNav.tsx` | Section navigation | constants | `SettingsPage` |
| `settings/constants/constants.tsx` | `SETTINGS_NAV_ITEMS` (note: `.tsx` — holds JSX icons) | — | page/sidebar |
| `settings/constants/{interfaces,types}.ts` | `SettingsPageProps`, `SettingsSectionId` | — | page/components |

<!-- anchor:data-flow -->
## Data Flow
`SettingsPage` holds `activeSection: SettingsSectionId` (default `"account"`, `SettingsPage.tsx:16`) + `showLogoutModal`. Sidebar switches section; `handleLogout` opens the modal, `handleConfirmLogout` → `onSignOut?.()` (from `RouteContext`). User label/email fall back to `user` prop then placeholders (`:31`). No network.

<!-- anchor:contracts -->
## Contracts
- `SettingsSectionId` (`constants/types.ts`) enumerates sections (`account`, ...).
- `SettingsPageProps` `{ user, onSignOut }`.
- Logout goes through `onSignOut` (App's `handleSignOut` → `clearToken`).

<!-- anchor:conventions -->
## Conventions In Force
- Section nav state owned by the page; controls are dumb primitives from `SettingsControls`.
- Destructive action (logout) gated behind a `Modal` confirm.
- `constants.tsx` is `.tsx` intentionally (carries JSX icon nodes) — the only `constants` file allowed to be `.tsx`.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a settings section:
1. Add an id to `SettingsSectionId` + an entry to `SETTINGS_NAV_ITEMS` (`constants/constants.tsx`).
2. Render its card in `SettingsPage` when `activeSection` matches, using `SettingsCard` + `SettingsControls`.
3. To persist: add a `ProfileService`/new service method + mutation hook ([[frontend-profile]] pattern) — currently none.

<!-- anchor:invariants -->
## Invariants (self-check)
- Logout always passes through a confirm `Modal` before `onSignOut`.
- `activeSection` is the single nav source of truth.
- `/settings` is auth-guarded (`privateRoutes.tsx`).

<!-- anchor:drift -->
## Drift
- No persistence: settings controls are local-state only; no API writes account preferences. The profile editing that IS backed lives in [[frontend-profile]], not here.
- `/account` redirects to `/settings` (`publicRoutes.tsx:114`).
