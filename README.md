# Buildora Monorepo

This repository contains a React frontend and an Express API, split into separate apps for independent deployment.

## Structure

- `apps/web`: Vite + React frontend
- `apps/api`: Express + Supabase backend
- `packages/shared`: Shared types and schemas

## Prerequisites

- Node.js 18+

## Environment

Copy the example files and fill in your Supabase values:

- `apps/api/.env.example` -> `apps/api/.env`
- `apps/web/.env.example` -> `apps/web/.env`

## Run locally

Install dependencies at the repo root:

```
npm install
```

Start both apps:

```
npm run dev
```

Or run them separately:

```
npm run dev:api
npm run dev:web
```

## Build

```
npm run build:api
npm run build:web
```