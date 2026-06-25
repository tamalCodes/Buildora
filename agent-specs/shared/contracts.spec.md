---
spec: shared-contracts
layer: shared
owns: [ "packages/shared/src/types.ts" ]
depends_on: []
graph_source: graphify-out/graph.json#shared_types_contract
generated_from_mtime: 2026-04-01
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Single source of truth for cross-tier domain types, auth enums, Zod request schemas, and the `ApiResponse<T>` envelope. Imported by both `apps/web` and `apps/api` as `@buildora/shared`. Breaking a schema here forces recompilation of both consumers.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `packages/shared/src/types.ts` | All shared types + Zod schemas + `ApiResponse<T>` | `zod` | `apps/web/src/services/authService.ts`, `apps/web/src/services/apiClient.ts`, `apps/web/src/App.tsx`, `apps/web/src/features/auth/components/AuthForm.tsx`, `apps/api/src/auth/controllers.ts` |

> Single physical file. `package.json` builds dual ESM/CJS into `dist/`; consumers import the built `@buildora/shared`, not the `.ts` directly.

<!-- anchor:data-flow -->
## Data Flow
This package produces no runtime flow of its own. It is consumed in two ways:
- **Validation**: BE controllers call `<Schema>.parse(req.body)` (e.g. `IdentifyRequestSchema.parse` at `apps/api/src/auth/controllers.ts:47`). FE forms call `<Schema>.safeParse(...)` (e.g. `AuthForm.tsx:38`).
- **Typing**: FE services type their return as `ApiResponse<T>` (`apiClient.ts:42`); BE controllers hand-build the same envelope literal.

<!-- anchor:contracts -->
## Contracts
| Symbol | Kind | Shape / key fields | file:line |
|--------|------|--------------------|-----------|
| `AuthStep` | enum | `IDENTIFY`, `AUTHENTICATE` | `types.ts:3` |
| `UserType` | enum | `PERSONAL`, `ORGANIZATION`, `UNDETERMINED` | `types.ts:8` |
| `User` | interface | `id, email, userType, organizationName?, avatarUrl?, name?, createdAt?` | `types.ts:14` |
| `Hackathon` | interface | `id, title, organizer, logoUrl, bannerUrl?, location, startDate, endDate, status:"Open"\|"Closed"\|"Happening Now", prizePool?, tags[]` | `types.ts:25` |
| `Project` | interface | `id, title, description, thumbnailUrl, upvotes, authors[]` | `types.ts:39` |
| `Article` | interface | `id, title, source, sourceUrl, thumbnailUrl, description` | `types.ts:48` |
| `IdentifyRequestSchema` | zod | `{ email: email }` | `types.ts:58` |
| `AuthenticateRequestSchema` | zod | `{ email, password>=8, userType, organizationName? }` | `types.ts:62` |
| `ForgotPasswordRequestSchema` | zod | `{ email, redirectTo?:url }` | `types.ts:69` |
| `ResetPasswordRequestSchema` | zod | `{ accessToken, newPassword>=8 }` | `types.ts:74` |
| `ApiResponse<T>` | interface | `{ success, data?, error?, code? }` | `types.ts:84` |
| `UserIdentificationResponse` | interface | `{ isNewUser, userType, orgSuggestion? }` | `types.ts:91` |
| `AuthResponse` | interface | `{ user, token }` | `types.ts:97` |

Request types are `z.infer<typeof Schema>` (`types.ts:79-82`).

<!-- anchor:conventions -->
## Conventions In Force
- Every request body validated against a Zod schema defined HERE — never inline schemas in controllers/forms.
- One envelope only: `ApiResponse<T>`. Success → `{ success:true, data }`; failure → `{ success:false, error }` (+ optional `code`).
- Enums use string values matching the column values stored in Supabase (`user_type`).
- New cross-tier shape goes in this file; do not duplicate in feature/service type files.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a new shared contract:
1. Add the `interface`/`enum` and (if a request) the `<Name>RequestSchema` Zod object to `packages/shared/src/types.ts`.
2. Export the `z.infer` request type next to the schema.
3. Rebuild the package so `dist/` updates (consumers import the build).
4. Use the schema in the BE controller (`.parse`) and FE form (`.safeParse`); type service returns as `ApiResponse<NewType>`.

<!-- anchor:invariants -->
## Invariants (self-check)
- Every `*RequestSchema` has a matching `z.infer` exported type (grep `z.infer<typeof` in `types.ts`).
- `ApiResponse<T>` is the only response envelope interface in the repo (grep `success` + `data?` definitions).
- No `import` of any framework (react/express) inside `types.ts` — only `zod`.
- Password fields enforce `.min(8)` (`types.ts:65,76`).

<!-- anchor:drift -->
## Drift
- **`Hackathon`/`Project`/`Article` shared types are unused by the frontend.** FE hackathons/explore/projects features define their OWN local types (`features/hackathons/constants/types.ts` etc.) with different fields (`dates/prize/participants/coverUrl` vs shared `startDate/endDate/prizePool`). Shared `Hackathon` is only referenced by `apps/web/src/services/hackathonsService.ts:8` import name, but the service actually maps to the feature-local `Hackathon`, not this one. Treat shared `Hackathon/Project/Article` as **dead/aspirational** contracts. See [[hackathons]], [[explore-projects]].
- `code?` on `ApiResponse` is declared but never set by any backend controller (all use `error` only).
