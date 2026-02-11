---
applyTo: '**'
---

Copilot / Agent Instructions for "workouts-app"

Purpose
-------
These instructions tell an automated coding agent (Copilot-style) how to work in this repository. Follow them on every change, PR, or suggestion.

Repository overview
-------------------
- Backend: Node.js + TypeScript, using Express.js. Pattern: routes -> controllers -> services.
- Auth: JWT-based authentication.
- DB: Prisma (schema and migrations in the `backend/prisma` folder).
- Validation: Zod for runtime validation and schemas.

- Frontend: Vue 3 (single-file components using `<template>`), TypeScript.
- UI: shadcn for Vue components.
- Styling: Tailwind CSS only. No inline CSS or additional styling libraries.
- Validation on frontend: Zod.
- HTTP client: Axios (frontend uses `src/lib/api/axios.ts`).

- Common package: `common/` contains shared types, utils, and Zod schemas used by both backend and frontend. Prefer reusing items from `common` over duplicating types or schemas.

Agent behavior and rules
------------------------
- Always follow existing project structure and conventions: use `routes`/`controllers`/`services` on the backend, Vue SFCs with `<template>` on the frontend.
- Use TypeScript types and shared Zod schemas from `common` when possible.
- Use Prisma for DB changes; when altering schema, update migrations and run `prisma generate` locally before proposing migrations.
- Use Zod for input validation and ensure both runtime and type-level safety where applicable.
- For authentication, use the established JWT flow; add or modify middleware consistently (e.g., `authenticateToken`).

- Styling: only Tailwind classes. Do not add custom CSS files or inline styles except very small utility classes that fit Tailwind philosophy.
- UI components: prefer shadcn-style patterns that exist in `frontend/src/components`.
- Network requests: use the existing Axios instance and patterns. Do not introduce a new HTTP client.

Code change & collaboration rules
--------------------------------
- Make minimal, focused changes. Avoid large structural rewrites without explicit approval.
- When a task is multi-step, use the repository's workflow for changes and the `manage_todo_list` pattern.
- Add/update tests when introducing new behavior. Run the project's test/build steps locally if possible before finalizing.
- Never commit secrets, credentials, or private keys. Use environment variables and .env files ignored by git.

Agent messaging & tool usage
---------------------------
- Preface any automated tool actions (file edits, tests, scaffolding) with a one-line preamble explaining the intent.
- Use the repo's edit tools (apply_patch) to make changes and the todo list mechanism to track multi-step tasks.
- Be concise in messages and list files changed when reporting back.

Respectful constraints
----------------------
- Do not introduce new frameworks or major dependencies without explicit user approval.
- Follow existing coding style and patterns across backend/frontend/common.

If unsure
--------
Ask the repo owner before making large or irreversible changes (database migrations, auth flow changes, or UI library replacements).

Thank you — follow these rules to stay consistent with the project's architecture.
