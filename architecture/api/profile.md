# Profile API Architecture

## Purpose

The profile domain powers the user-facing Profile page and centralizes a builder's personal, education, experience, and contact data. This document describes the data model and the intended ownership rules so new engineers can extend or maintain the profile APIs quickly.

## Ownership and scope

- Each profile is owned by a single authenticated user.
- All child records are keyed to `profile_id` which matches `profiles.id` (and `auth.users.id`).
- Deleting a profile cascades to all child rows.

## Data model overview

Core profile data lives in `public.profiles`. Repeatable or list-style data is stored in child tables.

### Table: public.profiles

Core profile fields (one row per user).

- id (uuid, PK) - matches `auth.users.id`
- email (text) - auth email (existing)
- user_type (text) - personal or organization (existing)
- organization_name (text, nullable) (existing)
- avatar_url (text, nullable) (existing)
- name (text, nullable) (existing)
- created_at (timestamptz) (existing)

- first_name (text)
- last_name (text)
- gender (text) - "Male", "Female", "Prefer not to say"
- tshirt_size (text) - "S", "M", "L", "XL"
- city (text)
- bio (text) - short summary
- readme (text) - longer markdown body
- contact_email (text) - optional override of auth email
- phone_country (text) - country code, e.g. "IN"
- phone_number (text)
- emergency_name (text)
- emergency_phone (text)
- no_formal_education (boolean, default false)

&nbsp;

### Table: public.profile_educations

Formal education history. Optional and repeatable.

- id (uuid, PK)
- profile_id (uuid, FK -> public.profiles.id)
- degree_type (text) - "Bachelors", "Masters", "Bootcamp", "Self-taught"
- institution (text)
- field_of_study (text)
- is_current (boolean)
- graduation_month (smallint, 1-12)
- graduation_year (smallint, 4-digit year)
- created_at (timestamptz)
- updated_at (timestamptz)

&nbsp;

### Table: public.profile_experiences

Work experience history. Optional and repeatable.

- id (uuid, PK)
- profile_id (uuid, FK -> public.profiles.id)
- company (text)
- title (text)
- location (text)
- start_date (date)
- end_date (date)
- is_current (boolean)
- description (text)
- created_at (timestamptz)
- updated_at (timestamptz)

&nbsp;

### Table: public.profile_roles

Role labels for the "What describes you best?" section.

- id (uuid, PK)
- profile_id (uuid, FK -> public.profiles.id)
- role (text)
- created_at (timestamptz)

Notes:

- Unique by (profile_id, role).

&nbsp;

### Table: public.profile_skills

Top tech skills. Stored as a short list.

- id (uuid, PK)
- profile_id (uuid, FK -> public.profiles.id)
- name (text)
- rank (smallint, optional ordering)
- created_at (timestamptz)

Notes:

- Unique by (profile_id, name).
- The UI caps this at 5 items.

&nbsp;

### Table: public.profile_links

Portfolio and social links.

- id (uuid, PK)
- profile_id (uuid, FK -> public.profiles.id)
- label (text) - "GitHub", "LinkedIn", "X", or custom
- url (text) - full URL
- created_at (timestamptz)

&nbsp;

### Table: public.profile_resumes

Resume link (Google Drive or any URL).

- id (uuid, PK)
- profile_id (uuid, FK -> public.profiles.id)
- url (text)
- label (text, optional display name)
- created_at (timestamptz)
- updated_at (timestamptz)

Notes:

- Unique by (profile_id) so only one resume is stored at a time.

&nbsp;

## Relationship summary

- profiles 1 -> N profile_educations
- profiles 1 -> N profile_experiences
- profiles 1 -> N profile_links
- profiles 1 -> N profile_roles
- profiles 1 -> N profile_skills
- profiles 1 -> 1 profile_resumes

## API usage expectations

- All queries are scoped by the authenticated user.
- Each child table uses `profile_id = auth.uid()` for access checks.
- Service role is allowed for backend actions; RLS policies should be added if client access is enabled.

## API surface

Landing/summary
- `GET /api/profile/me/summary` - header + About section fields (core profile + skills + avatar/name).

Core profile (About + Contact)
- `GET /api/profile/me`
- `PATCH /api/profile/me`

Education
- `GET /api/profile/me/educations`
- `POST /api/profile/me/educations`
- `PATCH /api/profile/me/educations/:id`
- `DELETE /api/profile/me/educations/:id`

Experience (work history)
- `GET /api/profile/me/experiences`
- `POST /api/profile/me/experiences`
- `PATCH /api/profile/me/experiences/:id`
- `DELETE /api/profile/me/experiences/:id`

Roles (what describes you best)
- `GET /api/profile/me/roles`
- `PUT /api/profile/me/roles` - replace full set

Skills (top tech skills)
- `GET /api/profile/me/skills`
- `PUT /api/profile/me/skills` - replace full set (max 5)

Links
- `GET /api/profile/me/links`
- `POST /api/profile/me/links`
- `PATCH /api/profile/me/links/:id`
- `DELETE /api/profile/me/links/:id`

Resume (single URL)
- `GET /api/profile/me/resume`
- `PUT /api/profile/me/resume`
- `DELETE /api/profile/me/resume`

## API payload notes

Summary response
- `GET /api/profile/me/summary` returns `{ profile, skills }`.
- `profile` includes core fields used by the About view and header.
- `skills` is an ordered list from `profile_skills` (max 5).

Core profile response
- `GET /api/profile/me` returns the full core profile record (no child lists).
- `PATCH /api/profile/me` accepts partial updates for core fields only.

## Validation rules (recommended)

- Links: valid URL, non-empty label.
- Skills: max 5 items.
- Education: graduation_month in 1..12, graduation_year in a sane range (1900..2100).
- Experience: if is_current is true, end_date should be null.

## Migrations and updates

- Add columns to `public.profiles` as listed above.
- Create the child tables and indexes.
- Add constraints for month/year.
- Add unique indexes for role/skill/resume.

## Future extensions

- Add multiple resumes or resume versions.
- Add certifications and awards tables.
- Add verification workflows for email and phone.
