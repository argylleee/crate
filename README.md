# Crate — Performer Booking Platform

A simplified version of the Crate platform for discovering, browsing, and booking live entertainers.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (optional)

## Getting Started

### Prerequisites
- Node.js 18.17+
- npm

### Installation

\```bash
git clone https://github.com/YOUR_USERNAME/crate-tech-assessment.git
cd crate-tech-assessment
npm install
npm run dev
\```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\```
src/
├── app/                    # Next.js pages and routes
│   ├── page.tsx            # Home page — performer listing with search & filters
│   └── performers/[id]/   # Dynamic performer profile pages
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── performers/         # PerformerCard, SearchFilter, BookingForm
│   └── ui/                 # Reusable generic components
├── data/                   # Mock data (performers.ts)
├── lib/                    # Utility functions
└── types/                  # TypeScript type definitions
\```

## Technical Decisions

### Architecture
- **App Router** over Pages Router for modern React Server Components support, nested layouts, and streaming capabilities.
- **File-based routing** with dynamic segments (`[id]`) for clean, predictable URL structure.

### TypeScript
- Union types over enums for zero runtime cost and better tree-shaking.
- Centralized type definitions in `types/` to prevent duplication and enforce consistency.

### Component Design
- Server Components by default, Client Components only when interactivity is needed (`'use client'`).
- Props-based data flow with TypeScript interfaces for compile-time safety.
- Controlled form inputs for predictable state management.

### Styling
- Tailwind CSS utility classes for rapid, consistent, and responsive styling.
- Mobile-first responsive design using Tailwind breakpoints.
- Minimal 2-color design system (Warm Amber Gold `#F59E0B` stage spotlight accent + Midnight Slate `#0F172A` neutral canvas) for a distinct, live-entertainment aesthetic with maximum contrast.

### Data
- Mock data in a dedicated `data/` directory, structured identically to what a real API would return. This makes it trivial to swap mock data for real API calls.

## Trade-offs

1. **No backend/database:** Assessment focuses on frontend quality. The data layer is structured so a backend could be added with minimal refactoring.
2. **No authentication:** Would add NextAuth.js in production.
3. **Static images:** Using Unsplash/placeholder images. Production would use uploaded performer images via cloud storage.