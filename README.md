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

**Data layer is hybrid, on purpose.** Home page search and listing read from Postgres via Prisma. The performer detail page still reads the static mock file. That's a scope call, not an oversight — I'd rather spend the time box proving out a real database, auth, and relational favorites than re-plumb a read path that already worked fine against mock data. Seed IDs match the mock file, so nothing breaks. Pointing the detail route at Prisma too is a small follow-up, not a rewrite.

**Prisma + Supabase.** Supabase is a managed Postgres instance with no ops overhead, which matters on a deadline. Prisma adds migration history and generated types, so a schema change breaks the build instead of production. The one wrinkle: Supabase's pooled connection doesn't support the session-level ops Prisma's migration engine needs, so the app uses two URLs — `DATABASE_URL` (pooled, runtime queries) and `DIRECT_URL` (direct, migrations only).

**Auth.js over rolling my own.** Session and cookie handling is exactly where a small mistake becomes a real vulnerability, not a cosmetic bug. The credentials provider plus the official Prisma adapter covers that without pulling in a third-party auth vendor. It's still on a v5 beta release — fine for this scope, but I'd pin a stable version before shipping to real users.

**App Router over Pages Router.** Server Components by default means less client JS on pages that don't need it — the performer detail page checks favorite status server-side, before any HTML reaches the browser. `'use client'` is scoped to only what actually needs state or browser APIs: search/filter, the booking form, the favorite button, the session-aware nav.

**TypeScript.** Union types over enums — no runtime cost, nothing extra to keep in sync. One shared `types/index.ts` keeps mock data, Prisma data, and component props all agreeing on shape. That's also what caught a real bug during development: genre filtering was checking the singular `genre` field instead of the full `genres` array.

**Styling.** Tailwind v4, mobile-first throughout. Two colors, deliberately — amber as the only accent, slate for everything else — so the UI reads as one system instead of a grab-bag of Tailwind defaults.

### Known gaps
- Bookings are mocked (logged, not saved) even though a `Booking` model already exists in the schema — the obvious next step.
- No automated tests yet.
- Production migrations are manual (`prisma migrate deploy` against `DIRECT_URL`), not wired into the deploy pipeline. Deliberate, so schema changes don't hit production unreviewed.

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