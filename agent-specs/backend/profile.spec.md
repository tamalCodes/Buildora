---
spec: backend-profile
layer: backend
owns: [ "apps/api/src/profile/**" ]
depends_on: [ shared-contracts, backend-overview ]
graph_source: graphify-out/graph.json#he_profile_api_layer_stack
generated_from_mtime: 2026-04-01
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Authenticated CRUD for the signed-in user's profile and its sub-resources: core fields, educations, experiences, links, resume, roles, skills, plus a compact summary. Layered Routes → Controllers → Validators → Mappers → Types over Supabase.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `profile/routes.ts` | Registers all 23 routes (`/me`, `/me/summary`, `/me/{educations,experiences,links,roles,skills,resume}`) | all 8 controllers, `express.Router` | `server.ts:3` (`/api/profile`) |
| `profile/controllers/profile.core.controller.ts` | `getProfile` (GET /me), `updateProfile` (PATCH /me) | `lib/auth`, `lib/supabase`, mappers, `profile.core.validators` | `routes.ts` |
| `profile/controllers/profile.summary.controller.ts` | `getProfileSummary` (GET /me/summary) | `lib/auth`, `lib/supabase`, mappers | `routes.ts` |
| `profile/controllers/profile.education.controller.ts` | list/create/update/delete educations | `lib/auth`, `lib/supabase`, mappers, validators | `routes.ts` |
| `profile/controllers/profile.experience.controller.ts` | list/create/update/delete experiences | same shape | `routes.ts` |
| `profile/controllers/profile.links.controller.ts` | list/create/update/delete links | same shape | `routes.ts` |
| `profile/controllers/profile.resume.controller.ts` | get/upsert/delete resume (1 per user) | same shape | `routes.ts` |
| `profile/controllers/profile.roles.controller.ts` | list / replace roles (bulk DELETE→INSERT) | `roles.validators` | `routes.ts` |
| `profile/controllers/profile.skills.controller.ts` | list / replace skills (bulk DELETE→INSERT) | `skills.validators` | `routes.ts` |
| `profile/mappers/profile.mappers.ts` | `mapProfileCore/Education/Experience/Link/Resume/Role/Skill` (snake→camel) | `profile/types/*` | all controllers |
| `profile/validators/profile.*.validators.ts` | Zod `.strict()` request schemas per sub-resource | `zod` | matching controller |
| `profile/types/profile.*.types.ts` | TS interfaces for mapped output | — | mappers, controllers |

<!-- anchor:data-flow -->
## Data Flow
Canonical (GET /me, `profile.core.controller.ts:37`):
`getAuthenticatedUser(req)` (`:38`) → 401 if no user → `supabase.from("profiles").select("*").eq("id", user.id).single()` (`:44`) → 404 if missing → `mapProfileCore(profile)` (`:56`) → `{ success:true, data }`.

Mutation (PATCH /me, `:71`): auth → `ProfileUpdateSchema.parse(req.body)` (`:78`) → `buildProfileUpdate` strips `undefined` + maps camel→snake (`:9`) → 400 if empty → `update().eq("id",user.id).select().single()` → map → envelope.

Bulk-replace (PUT /me/roles, `roles.controller.ts:53`): auth → `ProfileRolesUpdateSchema.parse` → `delete().eq("profile_id",user.id)` (`:62`) → if empty return `[]` → `insert(payload).select()` → map. Skills follow the identical pattern (`he_skills_replace_pattern`).

Sub-resource ownership scoped by `.eq("profile_id", user.id)` (e.g. `roles.controller.ts:30`). Core scoped by `.eq("id", user.id)`.

<!-- anchor:route-table -->
## Route Table (`profile/routes.ts`)
| Method+Path | Controller | Table |
|-------------|-----------|-------|
| GET `/me/summary` | getProfileSummary | profiles + profile_skills |
| GET `/me` / PATCH `/me` | getProfile / updateProfile | profiles |
| GET/POST `/me/educations`, PATCH/DELETE `/me/educations/:id` | education ctrl | profile_educations |
| GET/POST `/me/experiences`, PATCH/DELETE `/me/experiences/:id` | experience ctrl | profile_experiences |
| GET/POST `/me/links`, PATCH/DELETE `/me/links/:id` | links ctrl | profile_links |
| GET `/me/roles`, PUT `/me/roles` | roles ctrl | profile_roles (bulk replace) |
| GET `/me/skills`, PUT `/me/skills` | skills ctrl | profile_skills (bulk replace) |
| GET `/me/resume`, PUT `/me/resume`, DELETE `/me/resume` | resume ctrl | profile_resumes (upsert, 1/user) |

<!-- anchor:contracts -->
## Contracts
- Validators: `Profile{Update,Education,Experience,Link,Resume,Roles,Skills}*Schema` (each `.strict()`). Core schema fields + caps at `profile.core.validators.ts:9-25`.
- Mapped output interfaces in `profile/types/*` mirror FE `apps/web/src/services/types/profile.types.ts` (camelCase, nullable). DELETE returns `{ id }`.
- FE counterpart: `apps/web/src/services/profileService.ts` (`ProfileService.*`) + hooks `features/profile/hooks/useProfile.ts`. See [[frontend-profile]].

<!-- anchor:conventions -->
## Conventions In Force
- Auth-first: copy `profile.core.controller.ts:38-41` at the top of every handler.
- One controller file per sub-resource; controllers alias the mapper locally (`const mapProfile = mapProfileCore`, `:8`).
- camel↔snake only in `buildXUpdate` helpers (write path) and `mapX` (read path); never leak snake_case to the API.
- Roles & skills are full replacements (DELETE all → INSERT new) — never partial PATCH.
- Resume uses upsert semantics (`onConflict: profile_id`), enforced by UNIQUE in schema.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a sub-resource field (e.g. add `gpa` to education):
1. Add column in `supabase/schema.sql` + DB.
2. Add to mapped interface `profile/types/profile.education.types.ts` + FE `services/types/profile.types.ts`.
3. Map it in `profile.mappers.ts:mapProfileEducation` (snake→camel).
4. Accept it in `profile.education.validators.ts` (Zod) + the controller's `buildXUpdate`/insert payload.
5. (FE) surface in the relevant `ProfileEducationSection` form + create/update request type.

To add a whole new sub-resource: follow [[backend-overview]] recipe, then add routes to `profile/routes.ts`.

<!-- anchor:invariants -->
## Invariants (self-check)
- Every one of the 8 controllers calls `getAuthenticatedUser(req)` before any `supabase.from(...)` (graph hub `he_profile_controllers_auth_pattern`).
- Every query filters by the authenticated user (`.eq("id"|"profile_id", user.id)`) — no cross-user reads.
- Roles/skills replace path always DELETEs before INSERT and short-circuits empty arrays to `[]`.
- Every controller returns the `{ success, ... }` envelope on success and in `catch`.
- Validators are `.strict()` (reject unknown keys).

<!-- anchor:drift -->
## Drift
- `architecture.md` (lines 56-64) documents only the auth backend module and omits this entire `profile` module. Graph + code are authoritative; the layered stack is captured in `architecture/api/profile-api.md` (`he_profile_api_layer_stack`).
- Two row→`User`/`ProfileCore` mappers exist for the `profiles` table (this module's `mapProfileCore` vs auth's local `mapProfile`); keep both updated on column changes. See [[backend-auth]].
