# Buildora V2

## Tech Stack

- **Monorepo**: apps/web, apps/api, packages/shared
- **Frontend**: React 19 + Vite 6 + TypeScript 5.8 + React Router 7
- **Backend**: Express 5 + Node 22 + TypeScript (CommonJS)
- **Database**: Supabase (PostgreSQL + Auth)
- **Validation**: Zod 4 (shared schemas across frontend & backend)
- **Data Fetching**: TanStack React Query 5
- **Styling**: Tailwind CSS v4 (local via Vite plugin) with glassmorphism/neon design tokens
- **Testing**: Vitest + Testing Library
- **Icons**: Lucide React, React Icons

## Common Commands

```bash
npm run dev          # Run API + web concurrently
npm run dev:api      # API only (tsx watch, port 8000)
npm run dev:web      # Web only (vite, port 3000)
npm run build:api    # Backend build (tsc + tsc-alias)
npm run build:web    # Frontend build (vite build)
npm run test         # Frontend tests (vitest run)
npm run test:watch   # Frontend tests (vitest watch)
```

## Project Structure

```
apps/
  web/src/
    features/          # Feature modules (auth, profile, hackathons, etc.)
      <feature>/
        components/    # Feature-specific UI components
        constants/     # Enums, interfaces, types
        hooks/         # React Query hooks, custom hooks
    services/          # API clients (authService, profileService, apiClient)
    routes/            # Route definitions + guards (guest, private, public)
    shared/components/ # Global UI (Button, Modal, Toast, Nav, Footer)
    shared/utils/      # Utility functions
  api/src/
    server.ts          # Express app + middleware setup
    lib/               # supabase.ts, auth.ts helpers
    auth/              # routes.ts, controllers.ts
    profile/
      routes.ts
      controllers/     # One controller per resource (core, education, experience, etc.)
      mappers/         # DB row -> API response transformers
      validators/      # Zod schemas for request validation
      types/           # TypeScript type definitions
    health/            # Health check routes
packages/
  shared/src/          # Shared types, Zod schemas, API contracts (dual ESM/CJS build)
```

## Path Aliases

- Frontend: `@/*` -> `src/*`, `@shared/*` -> `src/shared/*`, `@buildora/shared` -> shared package
- Backend: `@/*` -> `src/*`

## Key Conventions

### Naming
- **React components**: PascalCase files (`ProfilePage.tsx`, `Button.tsx`)
- **Services/utils**: camelCase files (`authService.ts`, `apiClient.ts`)
- **Types/validators**: dot-notation (`profile.core.types.ts`, `profile.education.validators.ts`)
- **Feature folders**: lowercase (`profile/`, `auth/`, `hackathons/`)

### Frontend Patterns
- Feature module pattern: each feature owns its components, hooks, constants, types
- In feature folders, do not declare `type` / `interface` inside `.tsx` files; keep them in `.ts` files under `constants/` (or feature-level `types/`) and import into components
- Route-based code splitting via `lazyImport()` with chunk error retry
- Auth guard via `withAuthGuard()` HOC for protected routes
- React Query for server state; local React state for UI state
- JWT token stored in localStorage
- Services use static methods (e.g., `AuthService.getMe()`)
- API calls go through `apiClient.ts` -> `apiRequest<T>()` / `apiRequestOrThrow<T>()`
- All API responses use `ApiResponse<T>` envelope: `{ success, data?, error?, code? }`

### Backend Patterns
- Controller pattern: validate (Zod) -> authenticate -> query Supabase -> map -> return
- One controller file per resource (`profile.core.controller.ts`, `profile.education.controller.ts`)
- Mapper functions convert DB rows to API shapes
- Auth: Bearer token validated via `supabase.auth.getUser(token)` in `getAuthenticatedUser()`
- Error envelope: `{ success: false, error: "message" }`
- Supabase uses Service Role Key (bypasses RLS)

### Shared Package
- Single source of truth for types and Zod schemas
- Used by both frontend and backend
- Dual ESM/CJS build output

## Commit Convention

- `fix:` for bug fixes
- `feat:` for new features
- Always ask before committing

## Environment Variables

- Frontend: `VITE_API_BASE_URL`, `VITE_AUTH_RESET_REDIRECT_URL`
- Backend: `PORT`, `WEB_ORIGIN`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `SUPABASE_RESET_REDIRECT_URL`, `HEALTH_PING_SECRET`

## Important Notes

- No ESLint/Prettier config — follows IDE defaults
- Tailwind is bundled locally via `@tailwindcss/vite` + `@import "tailwindcss"` in app CSS
- A `tailwind.config.*` file is optional in Tailwind v4; default setup is CSS-first
- No Docker or CI/CD pipelines yet
- Single developer project — only one contributor

## Tailwind Migration Memory (2026-04-12)

- Goal: move from CDN Tailwind to local Tailwind v4 for production-safe builds and IntelliSense hover/tooltips.
- Steps:
  1. Install `tailwindcss` and `@tailwindcss/vite` in `apps/web`.
  2. Enable `tailwindcss()` plugin in `apps/web/vite.config.ts`.
  3. Add `apps/web/src/styles.css` with `@import "tailwindcss";` and import it in `apps/web/src/index.tsx`.
  4. Remove CDN script from `apps/web/index.html` and keep existing inline token/theme CSS.
