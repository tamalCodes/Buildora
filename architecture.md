# Architecture

## Monorepo layout

- **Workspaces** - The root `package.json` (see root scripts) orchestrates `apps/api`, `apps/web`, and `packages/shared` via workspace-style `npm run` commands. `npm run dev` brings up both services with `concurrently`, while `build:web/api` and `install:all` keep each workspace in sync.
- **Code separation** - Each workspace owns its own `package.json`, `tsconfig`, and node modules so the backend, frontend, and shared types evolve independently while pulling from the local `@buildora/shared` package.
- **Environment** - `apps/api` and `apps/web` ship `.env.example` files in their own folders. The API expects `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and optional `WEB_ORIGIN`/`PORT`, whereas the frontend looks for `VITE_API_BASE_URL` to point at the Express server.

## Frontend (`apps/web`)

- **Build stack** - Vite + React (with the React plugin) is configured through `apps/web/vite.config.ts`, targeting the `src` directory. `src/index.tsx` bootstraps the tree by rendering `<App />` inside the `root` DOM node.
- **Global shell (`src/App.tsx`)** - Routes are declared with `react-router-dom`, guarding most pages behind authentication by checking `AuthService.getToken()` and the `/api/auth/me` response. Shared helpers such as `CustomToastProvider`, `SearchOverlayProvider`, `ScrollToTop`, and `GlobalSearchModal` wrap the router to maintain consistent UX. `Footer` and `GlobalNav` live in the shared components, so they persist across page contexts.
- **Feature modules (`src/features`)** - Each area (listed alphabetically below) owns its own folder of pages, components, and constants to keep concerns isolated:

  - `auth`: UI for the login flow split into `AuthContainer` + `AuthForm`, plus request/response shapes in `constants`. Uses `@buildora/shared` enums/schemas to match the API.
  - `builders`: `BuildersPage` and `BuilderDetailsPage` surface builder data and rely on shared UI cards defined in `components` alongside `constants`.
  - `explore`: `ExplorePage` curates hackathons, projects, and articles; configuration points live in the `constants` subfolder.
  - `hackathons`: Pages for the list, details, and application flows (`HackathonsPage`, `HackathonDetailsPage`, `HackathonApplicationPage`) plus reusable sections (`Hero`, `Tabs`, `Faqs`, application fields, etc.) under `components`/`application`.
  - `legal`: Static policy pages (`Privacy`, `Terms`, `Code of Conduct`, `Brand Assets`) share `LegalPageShell` and centralized copy/links in `constants`.
  - `profile`: `ProfilePage` plus small `components`/`constants` used to render authenticated user info and CTA tiles.
  - `projects`: `ProjectDetailsPage` with view-specific cards living under `components`.
  - `settings`: `SettingsPage` and helper components/constants for managing account-level options.

- **Shared UI + utilities (`src/shared`)** - Design primitives are reused across features:

  - `components`: Buttons, Inputs, Modal, Logo, ScrollToTop, CustomToast, and social icons, plus higher-level pieces such as `Footer`, `GlobalNav`, and the `search` overlay (command center modal, search bar, mock data, overlay context).
  - `utils`: `emailUtils` centralizes anything email-specific (formatting/validation) that might be reused by features.

- **Services (`src/services/authService.ts`)** - The single service class centralizes all calls to `/api/auth/*` (identify, authenticate, forgot/reset password, `getMe`). It also manages storing the access token in `localStorage`, clearing it on sign out, and reloading the page to reset client state.

- **Static assets** - `public/index.html` hosts the root template and metadata; Vite copies everything from `public` into the build output.

- **Feature routes** - Every entry point defined in `src/App.tsx` maps to one of the modules above, giving us a route-to-feature reference we can share with customers:

  - `/` & `/explore` → `ExplorePage` from the `explore` feature. This guarded home/dashboard surfaces curated hackathons, projects, and articles or upgrades to the `auth` flow when unauthenticated.
  - `/hackathons` → `HackathonsPage` (list view) plus connected components such as `HackathonTabs` and `HackathonHero` defined under `features/hackathons/components`.
  - `/hackathons/:hackathonId` → Redirects to `/hackathons/:hackathonId/overview` via `HackathonDetailsRedirect`, landing users inside the `hackathons` details experience.
  - `/hackathons/:hackathonId/:tabId` → `HackathonDetailsPage` renders hero, tabbed content, schedule, prizes, sponsors, FAQs, and more from `features/hackathons/components`.
  - `/hackathons/:hackathonId/application`, `/hackathons/:hackathonId/apply`, and `/:hackathonId/application` → `HackathonApplicationPage` along with the form components/constants inside `features/hackathons/application`.
  - `/builders` → `BuildersPage` from the `builders` feature, listing builders with summary cards and stats.
  - `/builders/:builderId` → `BuilderDetailsPage`, showcasing builder-specific information via the `builders/components` helpers.
  - `/projects/:projectId` → `ProjectDetailsPage` (projects feature) to spotlight project details and creators.
  - `/privacy-policy` & `/privacy` → `PrivacyPolicyPage` (legal feature).
  - `/terms` & `/terms-of-use` → `TermsOfUsePage` (legal feature).
  - `/coc` & `/code-of-conduct` → `CodeOfConductPage` (legal feature).
  - `/brand-assets` → `BrandAssetsPage` (legal feature).
  - `/settings` → `SettingsPage` (settings feature).
  - `/profile` → `ProfilePage` (profile feature).
  - `/account` → Redirects to `/settings` for legacy pattern compatibility.
  - `*` (wildcard) → Redirects back to `/` so unknown paths land on the explore/auth experience.

## Backend (`apps/api`)

- **Build stack** - Express + TypeScript. `tsconfig.json` + `tsconfig-paths` let `@/...` aliases resolve to `src`. The backend runs in dev mode via `tsx watch` and builds to `dist` with `tsc`/`tsc-alias`.
- **Entry point (`src/server.ts`)** - Sets up middleware (Helmet, CORS, JSON parsing), health routes (`/`, `/health`), and wires `/api/auth` to `authRouter`. CORS is configured to allow the frontend origin defined via `WEB_ORIGIN`.
- **Auth module** - Split into:

  - `routes.ts`: Defines `/identify`, `/authenticate`, `/forgot-password`, `/reset-password`, `/me` endpoints.
  - `controllers.ts`: Implements the logic for each route using the `@buildora/shared` schemas and `User` shape. Demo flows include:
    - `identifyUser`: Checks Supabase profiles to suggest whether the email belongs to a personal or organization account.
    - `authenticateUser`: Signs users in via Supabase auth, auto-provisions profiles when necessary, and returns `User` plus token data.
    - `forgotPassword` / `resetPassword`: Trigger Supabase password reset workflows.
    - `getMe`: Validates the Bearer token and fetches the profile record before returning `User`.
  - Shared helpers like `normalizeEmail`, `mapProfile`, and `PUBLIC_DOMAINS` live alongside the controllers to enforce consistent logic.

- **Supabase client (`src/lib/supabase.ts`)** - Wraps `@supabase/supabase-js` with the service-role key (RLS bypass) for backend operations. Falls back to a mock warning when env vars are missing.

- **Environment files** - `.env.example` lists the values needed, and `.env` contains the current local secrets. The API also relies on `SUPABASE_RESET_REDIRECT_URL` for password reset callbacks.

## Shared Types (`packages/shared`)

- **Source (`src/types.ts`)** - Defines shared TypeScript types and Zod schemas consumed by both frontend and backend:

  - Domain models: `User`, `Hackathon`, `Project`, `Article`.
  - Auth enums: `AuthStep`, `UserType`.
  - API contracts: `IdentifyRequest`, `AuthenticateRequest`, `ForgotPasswordRequest`, `ResetPasswordRequest`, plus their schemas.
  - Generic `ApiResponse<T>` plus specialized responses like `UserIdentificationResponse` and `AuthResponse`.

- **Distribution** - `package.json` scripts build the package into `dist`, so `apps/api` and `apps/web` can import `@buildora/shared` instead of duplicating validation or response shapes.

## How the pieces talk

- The frontend `AuthService` hits `https://<api>/api/auth/*` and stores the returned JWT; the backend controllers validate that token via Supabase before returning user/profile data. Environment variables ensure the frontend points to the correct backend origin while the backend can reach Supabase's admin APIs.
- Both workspaces compile against the shared types, so breaking an API schema in `packages/shared` forces recompilation of the consumer workspaces.
