---
spec: frontend-profile
layer: frontend
owns: [ "apps/web/src/features/profile/**", "apps/web/src/services/profileService.ts", "apps/web/src/services/types/profile.types.ts" ]
depends_on: [ frontend-overview, backend-profile ]
graph_source: graphify-out/graph.json#profile_query_hooks
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Authenticated profile page: header + sidebar/mobile nav + sectioned content (About, Links, Education, Experience, Contact). Reads core profile + summary via React Query; full CRUD hooks exist for every sub-resource. Private route `/profile`.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `features/profile/ProfilePage.tsx` | Page shell, section switch, consumes read hooks | `@shared/components/global-nav`, `./components/*`, `./constants/enums`, `./hooks/useProfile` | `privateRoutes.tsx:12` |
| `features/profile/components/Profile{Header,Sidebar,MobileNav}.tsx` | Nav/identity chrome | constants/enums | `ProfilePage` |
| `features/profile/components/Profile{About,Links,Education,Experience,Contact}Section.tsx` | Section UIs (display + edit) | profile hooks/types | `ProfilePage` |
| `features/profile/constants/enums.ts` | `ProfileSectionId` | — | page + nav (`he_profile_nav_system`) |
| `features/profile/constants/{interfaces,types}.ts` | `ProfilePageProps`, section types | — | components |
| `features/profile/hooks/useProfile.ts` | All React Query queries + mutations + `profileQueryKeys` | `services/profileService`, `services/types/profile.types`, `@tanstack/react-query` | section components |
| `services/profileService.ts` | `ProfileService` method object → `/api/profile/*` | `apiClient`, `services/types/profile.types` | `useProfile.ts` |
| `services/types/profile.types.ts` | FE-side profile interfaces + request types (mirror BE) | — | service + hooks |

<!-- anchor:data-flow -->
## Data Flow
`ProfilePage` calls `useProfileSummary()` + `useProfileMe()` (`ProfilePage.tsx:18`) for header/avatar/skills, falling back to `user` prop then placeholders.
Hook → service → `apiRequestOrThrow("/profile/...")` → backend [[backend-profile]] → mapped JSON.
Mutations invalidate keys in `onSuccess`: `useUpdateProfile` invalidates `me()`+`summary()` (`useProfile.ts:90`); `useReplaceSkills` invalidates `skills()`+`summary()` (`:493`); others invalidate their own key.
Query keys factory: `profileQueryKeys.{all,me,summary,educations,experiences,links,resume,roles,skills}` (`useProfile.ts:30`).
`baseOptions`: `retry:false, staleTime:0, gcTime:0, refetchOnWindowFocus:false` (`:16`).

<!-- anchor:contracts -->
## Contracts
- Queries: `useProfileSummary/Me/Educations/Experiences/Links/Resume/Roles/Skills`.
- Mutations: `useUpdateProfile`, `use{Create,Update,Delete}{Education,Experience,Link}`, `useUpsertResume`, `useDeleteResume`, `useReplaceRoles`, `useReplaceSkills`.
- Types in `services/types/profile.types.ts` (`ProfileCore`, `ProfileSummary{profile,skills}`, `Profile{Education,Experience,Link,Resume,Role,Skill}`, `*CreateRequest`/`*UpdateRequest`, `DeleteResponse`) — MUST stay aligned with BE `profile/types/*`.

<!-- anchor:conventions -->
## Conventions In Force
- Server state only via these hooks; components never call `ProfileService` directly.
- Every mutation hook returns `useMutation` and invalidates the affected query key(s) in `onSuccess` — copy `useProfile.ts:84-95`.
- Mutations that change derived summary data also invalidate `summary()` (profile core, skills).
- Update mutations take `{ id, payload }`; deletes take `id`; resume-delete takes no args.
- Section types/enums in `constants/`, not `.tsx`.

<!-- anchor:extension-recipe -->
## Extension Recipe
To wire a new sub-resource field end-to-end on the FE:
1. Mirror the BE type change in `services/types/profile.types.ts` ([[backend-profile]] recipe).
2. If a new endpoint: add a `ProfileService` method (`apiRequestOrThrow` with method/body).
3. Add the matching query/mutation hook in `useProfile.ts` with a `profileQueryKeys` entry + invalidation.
4. Consume in the relevant `Profile*Section.tsx`.

<!-- anchor:invariants -->
## Invariants (self-check)
- Every mutation in `useProfile.ts` calls `queryClient.invalidateQueries` in `onSuccess`.
- Every `ProfileService` method routes through `apiRequestOrThrow` (no raw fetch).
- `profileQueryKeys` is the only source of profile cache keys (grep raw `["profile"...` arrays elsewhere → none).
- FE `profile.types.ts` interface set matches BE `profile/types/*` field-for-field (camelCase).

<!-- anchor:drift -->
## Drift
- `ProfilePage` currently consumes only the READ hooks (`useProfileMe`, `useProfileSummary`); the create/update/delete mutation hooks exist but are wired inside section components, not the page. Verify a section actually calls a mutation before assuming it is live.
- Skills/roles use the BE bulk-replace contract; FE request types are `{ skills:string[] }` / `{ roles:string[] }` (`profile.types.ts:142,146`).
