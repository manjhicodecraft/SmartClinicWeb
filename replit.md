# EliteCare Clinic

A premium AI-powered smart clinic website with glassmorphism UI, custom cursor, dark/light mode, live doctor availability, appointment booking, AI chat assistant, and scroll animations.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/elitecare-clinic run dev` — run the frontend (Vite, port varies)
- `npm run dev` — works from inside `artifacts/elitecare-clinic/` directory
- `npm run build` — works from inside `artifacts/elitecare-clinic/` directory
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion + GSAP
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/elitecare-clinic/src/` — React frontend (all sections as separate components)
- `artifacts/elitecare-clinic/src/components/` — Navbar, Hero, Stats, Services, Doctors, Testimonials, VirtualTour, Gallery, Contact, ChatWidget, WhatsApp, AppointmentModal, CustomCursor
- `artifacts/api-server/src/routes/` — doctors.ts, appointments.ts, clinic.ts
- `lib/db/src/schema/` — doctors.ts, appointments.ts, testimonials.ts
- `lib/api-spec/openapi.yaml` — API contract (source of truth)

## Architecture decisions

- Presentation-first dark theme (#020617) with glassmorphism cards (bg-white/10 backdrop-blur-xl)
- Custom cross/plus cursor (medical theme) using framer-motion
- AI Chat uses a rule-based response system server-side (no external AI API required)
- Appointment booking uses 4-step multi-page modal with real API integration
- All counters use Intersection Observer + manual JS animation (no GSAP needed)

## Product

- Hero with floating stat cards, animated blobs, Book Appointment CTA
- Stats section with animated counters (20k+ patients, 15+ years, 98% success rate)
- Services grid (10 specialties with hover animations)
- Live Doctors grid from database (8 doctors with real availability status)
- Appointment booking modal (4 steps: doctor → date/slot → patient info → confirm)
- AI chat assistant widget (floating, answers questions about booking, timings, emergencies)
- Patient testimonials from database (6 real reviews)
- Virtual clinic tour (4 animated location cards)
- Before/After gallery (drag slider comparison)
- Contact form + footer
- Floating WhatsApp button
- Dark/light mode toggle

## User preferences

- npm run dev and npm run build should work inside artifacts/elitecare-clinic/
- Premium glassmorphism dark UI with sky blue (#0EA5E9) and gold (#F59E0B) accents
- Custom medical cross cursor
- No emojis in main UI content

## Gotchas

- API server must be running for doctors, testimonials, stats, and chat to work
- Run `pnpm --filter @workspace/db run push` after any schema changes
- After OpenAPI spec changes, always run codegen before using new types

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
