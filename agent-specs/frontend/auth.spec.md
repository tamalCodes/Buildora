---
spec: frontend-auth
layer: frontend
owns: [ "apps/web/src/features/auth/**", "apps/web/src/shared/utils/emailUtils.ts" ]
depends_on: [ frontend-overview, shared-contracts, backend-auth ]
graph_source: graphify-out/graph.json#he_auth_flow
generated_from_mtime: 2026-04-11
last_verified: 2026-06-25
---

<!-- anchor:purpose -->
## Purpose
Email-first login/signup UI. Two-step flow: IDENTIFY (enter email, infer personal/org) → AUTHENTICATE (password, optional org name). Guest-only routes `/auth`, `/login`.

<!-- anchor:file-map -->
## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
| `features/auth/components/AuthContainer.tsx` | Layout shell around the form | react | `guestRoutes.tsx`, `publicRoutes.tsx` |
| `features/auth/components/AuthForm.tsx` | Stateful 2-step form, validation, calls `AuthService` | `@buildora/shared` schemas+enums, `services/authService`, `shared/utils/emailUtils`, `@shared/components/{Button,Input,CustomToast}`, `../constants/{interfaces,types}` | `guestRoutes.tsx`, `publicRoutes.tsx` (via AuthContainer) |
| `features/auth/constants/interfaces.ts` | `AuthFormProps`, `AuthContainer` props | — | components |
| `features/auth/constants/types.ts` | `AuthFieldErrorKey`, `AuthFieldErrors` | — | `AuthForm` |
| `shared/utils/emailUtils.ts` | `detectUserType`, `getOrgNameFromEmail` (+ email validation) | — | `AuthForm.tsx:3` |

<!-- anchor:data-flow -->
## Data Flow
`AuthForm` local state holds `step`, `email`, `password`, `userType`, `orgName`, `fieldErrors`. On email change, `detectUserType(email)` sets `userType` (`AuthForm.tsx:28`).
- **Identify**: `IdentifyRequestSchema.safeParse` (`:38`) → `AuthService.identify(email)` → response sets `isNewUser`/`userType`/`orgSuggestion`, advances `step` to AUTHENTICATE.
- **Authenticate**: `AuthenticateRequestSchema` validation → `AuthService.authenticate(payload)` → stores token (in service) → `onLoginSuccess()` (prop from `RouteContext`) → `App.refreshSession()`.
- Errors surfaced via `useCustomToast().pushToast` + inline `fieldErrors`.

<!-- anchor:contracts -->
## Contracts
- Consumes shared `AuthStep`, `UserType`, `IdentifyRequestSchema`, `AuthenticateRequestSchema`.
- Props: `AuthForm` takes `{ onLoginSuccess }` (from `RouteContext.onLoginSuccess`).
- Calls: `AuthService.identify`, `.authenticate` → backend [[backend-auth]] `/api/auth/identify`, `/authenticate`.

<!-- anchor:conventions -->
## Conventions In Force
- Validate with the SHARED Zod schema via `safeParse` before calling the service (`AuthForm.tsx:38`); map `error.flatten().fieldErrors` to UI.
- Types/interfaces live in `constants/*.ts`, not in the `.tsx` (`AuthForm.tsx:1,13`).
- Email logic (personal/org detection, org-name extraction) lives in `shared/utils/emailUtils.ts`, reused not reimplemented.
- Toasts via `useCustomToast`, buttons/inputs from `@shared/components`.

<!-- anchor:extension-recipe -->
## Extension Recipe
To add a field to signup (e.g. referral code):
1. Extend `AuthenticateRequestSchema` in `packages/shared` ([[shared-contracts]]) + backend handling ([[backend-auth]]).
2. Add state + `<Input>` in `AuthForm.tsx`, include in the authenticate payload.
3. Add any new error key to `constants/types.ts:AuthFieldErrorKey`.

<!-- anchor:invariants -->
## Invariants (self-check)
- No direct `fetch` in auth components — only `AuthService`.
- Both forms validated by shared schemas before submit.
- Token is never read/written in components; only `AuthService` touches localStorage.
- `/auth` and `/login` are guest-guarded (`withGuestGuard`, `guestRoutes.tsx:17`).

<!-- anchor:drift -->
## Drift
None observed. (Graph `he_auth_flow` matches.)
