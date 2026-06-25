---
spec: backend-auth
layer: backend
owns: [ "apps/api/src/auth/*" ]
depends_on: [ shared-contracts, backend-overview ]
graph_source: graphify-out/graph.json#he_auth_api_contract
generated_from_mtime: 2026-04-01
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Email-first auth: identify an email (new vs existing, personal vs org), sign in / auto-provision via Supabase Auth, password reset, and `me` session lookup. Returns `User` + JWT.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `apps/api/src/auth/routes.ts` | 5 POST/GET routes → controllers | `auth/controllers`, `express.Router` | `server.ts:1` |
| `apps/api/src/auth/controllers.ts` | `identifyUser`, `authenticateUser`, `forgotPassword`, `resetPassword`, `getMe` + local `normalizeEmail`/`mapProfile`/`PUBLIC_DOMAINS` | `@buildora/shared`, `lib/supabase` | `auth/routes.ts` |

<!-- anchor:data-flow -->
## Data Flow
| Route | Controller | Key steps (file:line) |
|-------|-----------|------------------------|
| `POST /api/auth/identify` | `identifyUser` | `IdentifyRequestSchema.parse` (`:47`) → lookup `profiles` by email → domain check vs `PUBLIC_DOMAINS` (`:60`) → `{ isNewUser, userType, orgSuggestion }` |
| `POST /api/auth/authenticate` | `authenticateUser` | `AuthenticateRequestSchema.parse` (`:92`) → `signInWithPassword` (`:97`); on "Invalid login credentials" → admin `createUser` + insert profile (`:123-166`); else load/insert profile → `{ user:mapProfile, token }` |
| `POST /api/auth/forgot-password` | `forgotPassword` | parse (`:256`) → `resetPasswordForEmail(redirectTo)` (`:267`) → `{ delivered:true }` |
| `POST /api/auth/reset-password` | `resetPassword` | parse (`:292`) → `getUser(accessToken)` (`:296`) → `admin.updateUserById` (`:307`) → `{ updated:true }` |
| `GET /api/auth/me` | `getMe` | inline Bearer check (`:331`) → `getUser(token)` → load `profiles` by id → `{ user:mapProfile }` |

<!-- anchor:contracts -->
## Contracts
- Consumes: `IdentifyRequest`, `AuthenticateRequest`, `ForgotPasswordRequest`, `ResetPasswordRequest`, `UserType` from `@buildora/shared`.
- Produces: `ApiResponse<UserIdentificationResponse>`, `ApiResponse<AuthResponse>`, `ApiResponse<{delivered:boolean}>`, `ApiResponse<{updated:boolean}>`, `ApiResponse<User>`.
- FE counterpart: `apps/web/src/services/authService.ts` (`AuthService.identify/authenticate/forgotPassword/resetPassword/getMe`). See [[frontend-auth]].
- Local `mapProfile` (`controllers.ts:29`) returns ONLY core identity fields (`id,email,userType,organizationName,avatarUrl,name,createdAt`) — distinct from the richer `profile` module mapper.

<!-- anchor:conventions -->
## Conventions In Force
- `normalizeEmail` (`:26`) lowercases+trims before every email lookup/auth call.
- `PUBLIC_DOMAINS` set (`:13`) drives personal-vs-org inference; extend the set, don't hardcode in callers.
- Supabase admin APIs (`auth.admin.createUser`, `updateUserById`) used for provisioning — backend-only (service role).
- `getMe` does its OWN Bearer check inline; it does NOT use `lib/auth.ts:getAuthenticatedUser` (the profile module does).

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a new auth route:
1. Add request schema to `packages/shared/src/types.ts` ([[shared-contracts]]).
2. Add controller fn in `auth/controllers.ts` (parse → supabase → envelope).
3. Wire it in `auth/routes.ts`.
4. Add matching static method in FE `authService.ts`.

<!-- anchor:invariants -->
## Invariants (self-check)
- Every controller wraps logic in try/catch returning `{ success:false, error }` (grep `catch` count == 5).
- Every request body parsed by a `@buildora/shared` schema before use.
- `token` returned is always `session?.access_token` from Supabase, never hand-minted.
- Org name only persisted when `userType === UserType.ORGANIZATION` (`:164`, `:209`).

<!-- anchor:drift -->
## Drift
- `auth/me` and `profile/me` both load the `profiles` row but via DIFFERENT mappers (`auth/controllers.ts:29` vs `profile/mappers/profile.mappers.ts:9`). The auth one omits the extended fields. Not a bug, but two mappers for one table — keep in sync if columns change.
- Empty (no drift vs graph; `he_auth_api_contract` matches).
