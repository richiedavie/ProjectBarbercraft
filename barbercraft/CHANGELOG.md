# Changelog

All notable changes to BarberCraft are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). While BarberCraft is in beta, versions use a `b` suffix (for example `0.0.1b`).

---

## [0.0.3b] - 2026-11-13

### Phase 2 & 2A: Owner Shift Management, Schema Hardening & Unified Profiles

This release completes Phase 2 and Phase 2A, integrating the PostgreSQL database via Prisma into Next.js, implementing owner shift operations, schema hardening, and unified profile management for both owner and capster roles.

### Added

- **Owner Dashboard Shift Management (`/owner/shift`)**:
  - Interactive tabs (*Aktif*, *Terisi*, *Selesai*) with real-time shift count badges.
  - Accurate calculation of "Terisi" based on accepted bookings vs. `capsterCount`.
  - Shift cards displaying rate per shift, date, operational hours, required skills, and notes.
  - **Shift Deletion**: Delete shift button with confirmation dialog and secure Server Action.
- **Create Daily Shift Form (`/owner/shift/baru`)**:
  - Structured 4-section form: Time, Requirements (stepper capster count, minimum experience, skill chips), Pay (`MoneyInput` IDR), and Notes.
  - Strict server-side input validation using **Zod** schema.
  - Server Action `createShiftAction` with automatic owner profile provisioning.
- **Top Bar Account Menu (`AccountMenu`)**:
  - Keyboard-accessible avatar button with Escape and outside-click dismissal.
  - Displays user name, email, role, divider, quick profile link, and red logout action.
  - `logoutAction` Server Action clearing session cookies and redirecting to `/login`.
- **Barbershop Profile Management (`/owner/barbershop`)**:
  - Form with 3 cards: Shop Profile (read-only email, normalized +62 WhatsApp, separated address and city, UI-only photo upload), Operations (chair stepper, open/close time, operational day picker), and Capster SOP rules.
  - `updateBarberProfileAction` with inline success and error alerts.
- **Capster Profile Management (`/capster/profil`)**:
  - Profile header showing dynamic aggregated rating from `Review` and completed shifts from `Booking`.
  - Form editing contact, experience years stepper, skill chips, daily rate, and UI-only gallery/certificates.
  - `updateCapsterProfileAction` with inline feedback.
- **Prisma Schema Hardening**:
  - Centralized single schema in `barbercraft/prisma/schema.prisma`.
  - Added unique constraint `@@unique([shiftId, capsterId])` on `Booking` and `@@unique([bookingId, reviewerId])` on `Review`.
  - Added indexes on `Shift(status, date)` and `Booking(status)`.
  - Restructured `Transaction` to be owned directly by `userId` with default status `PENDING`.
  - Normalized `experienceYears Int?` on `CapsterProfile`.

### Changed

- Updated login flow to accept dynamic email input, saving real user records in PostgreSQL.
- Removed conflicting experimental `cacheComponents` and `partialPrefetching` flags in `next.config.ts`.
- Fixed minimum experience dropdown closing prematurely by using mapped string values.

---

## [0.0.2b] - 2026-11-11

### Phase 1: Design System, Tokens, Components & Route Shells

This release lays down the complete design system and architectural foundation for role-based dashboards.

### Added

- **BarberCraft Design Tokens**: Palette variables defined in `globals.css` (`bc-bg`, `bc-card`, `bc-ink`, `bc-muted`, `bc-primary`, `bc-primary-tint`, `bc-success`, `bc-danger`, `bc-border`).
- **Smooth Animations**: `@keyframes fadeInUp`, `@keyframes fadeIn`, and scale transitions added to landing and auth pages.
- **Shared Components**:
  - `NavItem` and `BottomNavItem`
  - `StatCard`
  - `EmptyState`
  - `TabRow`
  - `SkillChip` and `FilterChip`
  - `Stepper`, `MoneyInput`, and `FormSection`
- **Application Shells & Route Guards**:
  - `OwnerShell`: 240px desktop sidebar, mobile bottom navigation, 72px top bar with `OWNER` tag.
  - `CapsterShell`: Mobile-first 390px layout, desktop sidebar support, 64px top bar with `CAPSTER` tag.
  - Layout-level route guards redirecting unauthorized roles and unassigned users.
- **UI Copy & Formatting Helpers**:
  - Centralized copy repository in `lib/copy.ts`.
  - Indonesian currency (`Intl.NumberFormat`) and date helpers in `lib/format.ts`.
- **Role Selection & Onboarding Screens**:
  - Role selection step 1 of 2 (`/register/role`).
  - Owner onboarding step 2 of 2 (`/register/owner`).
  - Capster onboarding step 2 of 2 (`/register/barber`).

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

- Phase 3: Owner Applicants Management (`/owner/pelamar`).
- Phase 4: Capster Feed Shift & Application Tracking (`/capster`, `/capster/lamaran`).
- Phase 5: Capster Wallet & Financials (`/capster/dompet`).
- Phase 6: Dev Seed Data & Polish.

