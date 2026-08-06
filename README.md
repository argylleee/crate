# Crate — Performer Booking Platform

A simplified version of the Crate platform for discovering, browsing, and booking live entertainers. Built as a technical assessment; the core requirements are implemented on mock data, with several optional enhancements layered on top (auth, favorites, a real database, CI/CD, and a live deployment).

**Live demo:** https://crate-ph.vercel.app/
**Repo:** https://github.com/argylleee/crate

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** Auth.js (NextAuth v5) — credentials provider + Prisma adapter
- **Database:** PostgreSQL (Supabase) via Prisma ORM 7
- **CI:** GitHub Actions (lint → typecheck → build)
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18.17+
- npm
- A Supabase (or any Postgres) project

### Installation

```bash
git clone https://github.com/argylleee/crate.git
cd crate
npm install
```

`npm install` also runs `prisma generate` automatically (via a `postinstall` hook), which is required before the app will type-check or build — the Prisma Client is generated to a custom path (`src/generated/prisma`) and is gitignored.

### Environment variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true"  # pooled, used at runtime
DIRECT_URL="postgresql://...pooler.supabase.com:5432/postgres"                    # direct, used by Prisma CLI for migrations
AUTH_SECRET="..."     # generate with: npx auth secret
AUTH_URL="http://localhost:3000"
```

Both `DATABASE_URL` and `DIRECT_URL` come from Supabase → Project Settings → Database → Connection string (Transaction pooler and Session/Direct connection respectively).

### Database setup

```bash
npx prisma migrate dev   # creates tables from prisma/schema.prisma
npx prisma db seed       # seeds mock performers into Postgres
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
prisma/
├── schema.prisma           # Performer, PricingTier, User, Booking, Favorite models
├── migrations/
└── seed.ts                 # seeds mock performer data into Postgres

src/
├── app/
│   ├── page.tsx             # Home — performer listing, search & filters (client)
│   ├── performers/[id]/     # Performer detail page + loading/error boundaries
│   ├── auth/                # Sign in / sign up pages
│   ├── api/
│   │   ├── performers/      # GET performers (DB-backed), GET one performer
│   │   ├── favorites/       # GET/POST favorites (auth-gated)
│   │   ├── bookings/        # POST booking (mock — not persisted)
│   │   └── auth/            # NextAuth handler + credentials signup
│   └── not-found.tsx
├── components/
│   ├── layout/               # Navbar (auth-aware), Footer
│   ├── performers/           # PerformerCard, SearchFilter, BookingForm, FavoriteButton
│   └── providers/            # SessionProvider
├── data/performers.ts        # Static mock data (see "Data Layer" below)
├── lib/                      # prisma.ts, auth.ts
└── types/index.ts            # Shared TypeScript types
```

## Technical Decisions & Trade-offs

### Data layer: hybrid by design, not by accident
The performer **listing and search** (`/` → `/api/performers`) reads from Postgres via Prisma — this is the path most representative of how the app would actually run in production. The performer **detail page** still reads from the static `data/performers.ts` file. This was a deliberate scope call, not an oversight: it let me prove out a real database, auth, and relational favorites end-to-end within the assessment's time box, without spending that same time re-plumbing every read path. The trade-off is explicit and small in surface area — the seed data's IDs are kept in sync with the mock file specifically so the two sources agree, and `Favorite`/`User`/`Booking` are fully relational regardless of where performer content is sourced from. Given more time, the next step is trivial: point the detail route and `/api/performers/[id]` at Prisma and drop the mock file entirely.

### Why Prisma + Supabase (optional enhancement)
Supabase gives a managed Postgres instance with zero ops burden, which matters for a time-boxed assessment. Prisma on top gives migration history, generated types matched to the schema, and a query API that reads close to plain objects — cheaper to review than hand-written SQL, and the generated types catch schema drift at compile time rather than at runtime. The cost is the connection-pooling complexity Postgres-as-a-service introduces: Supabase's pooler (PgBouncer, transaction mode) doesn't support the session-level operations Prisma's migration engine needs, so the schema deliberately splits `DATABASE_URL` (pooled, used by the app at request time) from `DIRECT_URL` (unpooled, used only by the Prisma CLI for migrations).

### Why Auth.js (NextAuth v5) over rolling my own
Session handling, CSRF protection, and cookie security are exactly the kind of code where a subtle mistake is a real vulnerability, not a cosmetic bug. Auth.js's credentials provider plus the official Prisma adapter covers that surface without adding a hosted third-party auth vendor into a small assessment app. The trade-off is a dependency on a library still in v5 beta at the time of writing — acceptable here given the scope, but I'd re-evaluate before a production launch.

### Why the App Router over Pages Router
Server Components by default meant less client-side JavaScript for pages that don't need interactivity (the performer detail page, for instance, does its favorite-status check server-side before render). `'use client'` is scoped to only the components that actually need state or browser APIs (search/filter, booking form, favorite button, session-aware nav).

### TypeScript
Union string types instead of enums (zero runtime footprint, no separate object to keep in sync). One shared `types/index.ts` so the mock data, Prisma-sourced data, and component props all agree on shape — this is what caught the `Performer.genre` vs `Performer.genres` filtering bug during development (filtering against the singular primary genre instead of the full genre list).

### Styling
Tailwind CSS v4 utility classes; mobile-first breakpoints throughout (the navbar collapses to an animated hamburger menu below `sm:`). A tight two-color system — amber as the single accent, slate as the neutral scale — chosen so the UI reads as one deliberate system rather than a grab-bag of default Tailwind colors.

### Known gaps (would address with more time)
- Booking submissions are mocked (`console.log`, no persistence) even though a `Booking` Prisma model already exists — wiring the form to `POST /api/bookings` against that model is the natural next step.
- No automated tests.
- Production database migrations are manual (`prisma migrate deploy`, run locally against `DIRECT_URL`) rather than wired into the deploy pipeline — a deliberate choice to avoid running unreviewed schema changes automatically against production within this scope.

## Optional Enhancements Implemented

- User authentication (sign in / sign up, credentials-based)
- Save/Favorite performers (optimistic UI, persisted per-user)
- Backend API using Next.js Route Handlers
- Database integration (Prisma + Supabase/PostgreSQL)
- Mobile-first responsive design
- Loading states and error handling (skeletons, `loading.tsx`, `error.tsx`, custom 404)
- CI/CD configuration (GitHub Actions — lint, typecheck, build)
- Deployment to Vercel

Not implemented (out of scope for this pass): availability calendar, image upload, email notifications, automated tests, Docker.