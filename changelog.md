# Changelog

All notable changes to BarberCraft are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). While BarberCraft is in beta, versions use a `b` suffix (for example `0.0.1b`).

---

## [0.0.2b] - 2026-11-11

### Dashboard foundation

The second beta starts the two dashboards: one for barbershop owners and one for capsters. This release builds the structure only. It adds the navigation shell for each role, role-based access, shared interface components, and the database schema inside the app. Every dashboard page is still an empty shell, so no shifts, applicants, wallet, or profile data is shown or saved yet. The goal is to settle the layout and the data model before any screen is filled in.

### Added

- **Owner dashboard shell** at `/owner`, with sidebar navigation (Ringkasan, Shift, Pelamar, Barbershop), a top bar, and a bottom navigation bar on mobile.
- **Capster dashboard shell** at `/capster`, designed mobile-first, with bottom navigation (Shift, Lamaran, Dompet, Profil) and a sidebar on desktop.
- **Role-based access:** owners and capsters are sent to their own dashboard, and visitors without a session are sent to the login page.
- **Empty pages** for every planned dashboard screen:
    - Owner: overview, shifts, new shift, applicants, barbershop profile
    - Capster: shift feed, my shifts, wallet, profile
- **Shared components:** page shell, navigation item, stat card, empty state, tabs, and filter chips, all built on the existing design tokens.
- **Database schema in the app:** Prisma now lives in this project as the single source of truth for the data model.
- **First migration**, adding:
    - Shift requirements (skills, minimum experience, number of capsters) and notes
    - Barbershop SOP and opening hours
    - Transaction type and owner, so withdrawals can exist without a booking
    - Capster certificates
- **Dependencies:** `prisma`, `@prisma/client`, `lucide-react`, and `zod`.

### Changed

- The data model moved from the separate `barbercraft-api` project into this app. `barbercraft-api` is kept as an archive and is no longer developed.

### Known limitations

- Sessions use a temporary development cookie, not real authentication. The login form from `0.0.1b` is still a dummy.
- All dashboard pages are empty shells and are not connected to the database yet.
- Photo and certificate uploads are not connected to any storage.
- The wallet has no payment provider. Withdrawals will only be recorded, and no real money moves.

### Up next

- Owner screens: overview, shifts, creating a shift, applicants, barbershop profile.
- Capster screens: shift feed, my shifts, wallet, profile.
- Real authentication and sign-up.

---

## [0.0.1b] - 2026-11-05

### First beta

The first beta of BarberCraft sets up the project foundation and delivers the first two screens: the home (landing) page and a dummy login page. The home page presents BarberCraft as a capster outsourcing agency, where barbershops request trained and tested barbers and barbers apply to join and get placed. This release is front-end only: the capster profiles, rates, and statistics are placeholder content, and the login form does not authenticate anyone yet. The goal is to lock in the visual direction and the message of the site before any backend work begins.

### Added

- **Home (landing) page**, written in Bahasa Indonesia, with these sections:
    - Hero with the main message and two calls to action
    - Capster catalogue with sample profiles
    - Placement schemes: daily or emergency cover, dedicated contracts of 3 to 12 months, and new branch and event packages
    - Four-step workflow: request, match and brief, place, follow up
    - Reasons to choose BarberCraft
    - Separate sections for barbershop owners and for barbers who want to join
    - Statistics strip
    - Closing call to action with a WhatsApp button
    - Footer
- **Login page (UI only)** with email and password fields, a Google sign-in button, and a link to sign up. The form is a dummy and does not log anyone in.
- **Project foundation:** Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.
- **Design tokens:** color palette (cream, ink, orange, green, line) and corner radius defined in `globals.css`.
- **Typography:** Plus Jakarta Sans loaded through `next/font`.
- **Tooling:** ESLint and Prettier (with the Tailwind class-sorting plugin).

### Known limitations

- The login form is not connected to any authentication system.
- Buttons and links such as placement requests, applying as a capster, WhatsApp, sign-up, and password reset are placeholders.
- All capster profiles, rates, statistics, and guarantees shown are placeholder content and must be replaced or verified before a public launch.
- There is no backend, database, or payment system yet.

### Up next

- Sign-up page.
- Connecting login, sign-up, and placement requests to a real backend.

[0.0.2b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.2b
[0.0.1b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.1b
