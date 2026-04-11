# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## EcoAula App (`artifacts/eco-aula`)

Educational sustainability web app for a technology classroom.

### Features
- Bilingual: Catalan (default) / Spanish — custom i18n hook with localStorage persistence
- Dark/Light mode — next-themes with localStorage persistence
- GDPR cookie banner with localStorage consent tracking
- QR scanner via html5-qrcode for scanning classroom equipment
- Simulated equipment data in `src/data/equipments.ts`
- Animated CO₂ counter on Home page using Framer Motion
- Equipment dashboard with Chart.js daily consumption line chart
- Global impact page with visual equivalences and efficiency ranking

### Pages
- `/` — Home with animated CO₂ counter
- `/scanner` — QR scanner + manual ID input
- `/dashboard/:id` — Equipment detail with chart
- `/impact` — Global impact & efficiency ranking
- `/about` — Educational content + GDPR privacy section

### Key Libraries
- react-chartjs-2 + chart.js — consumption line charts
- html5-qrcode — QR code camera scanning
- framer-motion — animations and transitions
- next-themes — dark mode
- wouter — client-side routing

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
