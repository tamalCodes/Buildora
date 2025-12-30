# Profile API Architecture (Flow + Responsibilities)

## Purpose

This document explains how the Profile API is structured in the backend and how requests move through the system.

## Folder layout

- `apps/api/src/profile/routes.ts` - Express routes only (wiring).
- `apps/api/src/profile/controllers/` - HTTP handlers (request/response).
- `apps/api/src/profile/validators/` - Zod request validation schemas.
- `apps/api/src/profile/services/` - Domain logic + payload builders.
- `apps/api/src/profile/mappers/` - DB row to API response mapping.
- `apps/api/src/profile/types/` - Types/DTOs shared across layers.

&nbsp;

## Responsibility by layer

### Routes

- Own only route definitions and attach controller functions.
- No business logic, no data shaping.

### Controllers

- Authenticate the user.
- Parse and validate input.
- Call service helpers for payload transforms.
- Call Supabase queries.
- Map DB rows to API shapes using mappers.
- Return normalized API responses.

### Validators

- Validate request body (shape + bounds).
- Keep validation rules centralized.

### Services

- Convert API input into DB column payloads.
- Keep domain logic out of controllers.

### Mappers

- Convert DB rows into consistent API response shapes.
- Prevent leaking DB column names to the API.

### Types

- Define the Profile API data contracts (inputs + outputs).

&nbsp;

## Request flow (example: PATCH /api/profile/me)

1. Route: `routes.ts` sends the request to `profile.core.controller.ts`.
2. Controller: validates input with `profile.core.validators.ts`.
3. Service: builds a DB update payload (`profile.core.service.ts`).
4. Supabase: update against `profiles` table.
5. Mapper: convert DB row to API response (`profile.core.mapper.ts`).
6. Response: `{ success: true, data: ... }`.

&nbsp;

## Request flow (example: POST /api/profile/me/educations)

1. Route: `routes.ts` sends the request to `profile.education.controller.ts`.
2. Controller: validates input with `profile.education.validators.ts`.
3. Service: builds a DB payload (`profile.education.service.ts`).
4. Supabase: insert into `profile_educations`.
5. Mapper: convert DB row to API response (`profile.education.mapper.ts`).
6. Response: `{ success: true, data: ... }`.

&nbsp;

## Current controllers

- `profile.summary.controller.ts` - Summary fetch for landing view.
- `profile.core.controller.ts` - Core profile read/update.
- `profile.education.controller.ts` - Education CRUD.
- `profile.experience.controller.ts` - Experience CRUD.

&nbsp;

## Notes on growth

- Add a new controller per feature slice (links, roles, skills, resume).
- Keep controllers thin; move complex logic into services.
- Add mappers + validators for each new slice.
