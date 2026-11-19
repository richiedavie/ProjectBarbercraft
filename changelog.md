# Changelog

All notable changes to BarberCraft are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). While BarberCraft is in beta, versions use a `b` suffix (for example `0.0.1b`).

---

## [0.0.4b] - 2026-11-19

### Real authentication

The fourth beta replaces the development sign-in with real authentication. Accounts now have a password, sessions are stored in the database, and nobody can sign in as someone else by typing an email. The release also puts the database schema under proper migrations, so every future change to the data model is recorded and repeatable.

### Added

- **Email and password authentication** built on Better Auth. Passwords are stored only as salted hashes, and sessions live in the database and travel in `httpOnly` cookies. Signing out ends the session on the server, so an old cookie stops working.
- **Authentication tables** (`Session`, `Account`, and `Verification`) and an `emailVerified` field on users.
- **Safer registration.** Owner and capster sign-up now create the account through the authentication system, then create the profile and set the role in a single step. A role can only be chosen once, from unassigned to owner or capster, and the admin role can never be requested by a user.
- **Protection against guessing.** Sign-in and sign-up are rate limited, failed sign-ins show one generic message that does not reveal whether an email exists, and passwords must be between 8 and 128 characters.
- **Migration history.** The existing database was baselined as `0_init`, and the authentication tables were added as a named migration.
- **Developer tools:** a development-only script to set a password for an existing account, and the new `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` settings listed in `.env.example`.
- **Dependency:** `better-auth`.

### Changed

- **The login page signs in with a real password.** `getCurrentUser()` remains the single entry point for the current user and now reads the authentication session, so pages and actions did not need to change.
- **Seed data** uses `@example.com` addresses and properly hashed passwords, and refuses to run in production.
- **The Google sign-in button is hidden** until Google sign-in is built.
- **Database changes now go through named Prisma migrations only.**

### Removed

- The development sign-in that accepted a typed email with no password.

### Known limitations

- Email verification and "forgot password" are not available yet. Both need an email provider.
- Google sign-in is not available yet.
- Rate limiting keeps its counters in memory, which is fine for development but must move to the database before deploying on a server with more than one instance.
- The old `User.password` column is no longer used and will be removed in a later migration.
- Seed accounts share a development password and are meant for local use only.
- The Terdekat filter does not calculate real distances yet, and photo and certificate uploads are not connected to any storage.
- There is no payment provider, and withdrawals are only recorded. There is also no admin area to approve them.
- Completing a shift, reviewing the other party, and notifications are not built yet.
- Capster profiles, rates, and statistics on the home page are still placeholder content.

### Up next

- Full shift and booking lifecycle with scheduled jobs.
- Shift completion and two-way reviews.
- Wallet ledger, admin approval of withdrawals, and notifications (including email verification and password reset).
- File uploads, map location, tests, and production deployment.

---

## [0.0.3b] - 2026-11-19

### Applicants, the capster app, and polish

The third beta completes the first full loop of the product. Owners can now review the capsters who applied to their shifts and accept or reject them, and capsters can browse open shifts, apply, follow their applications, and request withdrawals from their wallet. The release also adds development seed data, loading and error states, and accessibility improvements. The sections that decide who is accepted and how many people a shift can take are now protected against double clicks and simultaneous requests. Behind the screens, the business logic was reorganized into a service layer so that later features can build on it safely.

### Added

**Owner: applicants**

- **Applicant review** at `/owner/pelamar` with Menunggu, Diterima, and Ditolak tabs and live counters.
- **Applicant cards** showing the capster's initials, name, rating, completed shifts, main skills, and the shift they applied to (title, date, and time). Capsters without reviews are labeled "Baru".
- **Accept and reject** actions. Accepting is blocked when the shift is full, has ended, or the capster already has an accepted shift at the same time. Accepted applicants show a green "Diterima" label and a WhatsApp button that opens a chat with the capster.
- **Empty state** with a shortcut to the shift list.

**Capster app**

- **Shift feed** at `/capster` with the Terdekat, Hari ini, Besok, and Gaji tertinggi filters, and a card for each open shift (barbershop, rate, location, date, and time).
- **Apply to a shift** with one button. After applying, the button becomes a disabled "Lamaran Terkirim".
- **My shifts** at `/capster/lamaran` with Diproses, Diterima, and Selesai tabs. Pending applications can be cancelled. Accepted applications show the full address, a Google Maps link, and a WhatsApp button for the owner.
- **Wallet** at `/capster/dompet` with weekly earnings, the withdrawable balance, payment history, and a withdrawal form (amount, destination bank or e-wallet, and account number). Withdrawals are recorded as pending, and the button is disabled when the balance is zero.

**Developer experience**

- **Seed script** (`prisma/seed.ts`) with realistic Indonesian sample data: owners, capsters, shifts, bookings in every status, and transactions. It runs only through its own command.
- **Loading skeletons** on pages that fetch data, and **error boundaries** for the owner and capster areas.
- **Accessibility:** clearer focus states, keyboard navigation, and accessible labels.
- **Service layer** in `src/server/services` (shifts, bookings, wallet, profiles, and sign-in), containing all business logic and database access, free of framework-specific code.
- **Authorization module** with one set of guards for signed-in users, owners, capsters, and admins, used by every dashboard page and action.
- **Typed domain errors and one result format** for all actions, so known problems are reported with clear Indonesian messages.

### Changed

- **Shift times are stored as real date and time values** (`startAt` and `endAt`, in UTC) instead of text, which allows checks for shifts that have ended and for overlapping shifts.
- **Accepting and rejecting applicants is safe against double clicks and simultaneous requests.** The shift is locked while capacity is checked, only pending applications can be processed, and the shift status is recalculated from the accepted bookings in one place.
- **Ratings are calculated with database aggregates** and only count reviews written by the barbershop owner for that booking.
- **Shifts with accepted capsters can no longer be deleted.**
- **Business logic moved out of the Server Actions into the service layer.** Actions now only check the session, validate the input, call a service, and return a result. Pages and actions no longer talk to the database directly. There is no change in how the application looks or behaves.
- **One authorization module** now guards every dashboard page and action, replacing checks that were repeated in each file.

### Known limitations

- **Sign-in is still a development shortcut.** It uses the typed email only and does not check a password. It must be replaced by real authentication, and switched off in production, before any public deployment.
- The Terdekat filter does not calculate real distances yet, because the map location picker is not available.
- Photo and certificate uploads are not connected to any storage.
- There is no payment provider. Withdrawals are only recorded, and no real money moves. There is also no admin area to approve them yet.
- Completing a shift, reviewing the other party, and notifications are not built yet, so earnings from completed shifts are only present in seed data.
- Capster profiles, rates, and statistics on the home page are still placeholder content.

### Up next

- Real authentication.
- Full shift and booking lifecycle with scheduled jobs.
- Shift completion and two-way reviews.
- Wallet ledger, admin approval of withdrawals, notifications, uploads, and production deployment.

---

## [0.0.2b] - 2026-11-13

### Dashboards, accounts, and the database

The second beta turns BarberCraft from a set of static pages into an application with data. It adds the registration flow, the two role-based dashboards (one for barbershop owners and one for capsters), and a PostgreSQL database managed with Prisma. Owners can now see live statistics, create and manage shifts, and edit their barbershop profile. Both roles have an account menu and a profile page. The applicant review, the capster shift feed, and the wallet are still to come. Everything runs in a development setup: sign-in is a development shortcut and no payment provider is connected.

### Added

**Design system and shared code**

- **Design tokens** for the color palette (cream, ink, orange, green, line) and radii in `globals.css`, with no shadows, gradients, or glass effects.
- **Interface text** kept in one place (`lib/copy.ts`), all in Bahasa Indonesia.
- **Formatters** (`lib/format.ts`) for Rupiah in the `id-ID` format and for dates and times in the Asia/Jakarta time zone.
- **Shared components:** navigation item, bottom navigation item, stat card, empty state, tabs, skill chip, filter chip, stepper, money input, and form section.

**Application shells and access control**

- **Owner dashboard shell** with a 240px sidebar (Ringkasan, Shift, Pelamar, Barbershop), a 72px top bar with an "OWNER" tag, and a bottom navigation bar on mobile.
- **Capster dashboard shell**, mobile-first, with a 64px top bar with a "CAPSTER" tag, bottom navigation (Shift, Lamaran, Dompet, Profil), and a sidebar on desktop.
- **Role-based access** at the layout level: owners and capsters can only open their own dashboard, and visitors without a session are sent to the login page.
- **Account menu** in the top bar: an avatar button that works with the keyboard and closes with Escape or an outside click. It shows the name, email, and role, a link to the profile, and a red "Keluar" button that ends the session and returns to the login page.

**Registration**

- **Role selection** at `/register/role`.
- **Owner registration** at `/register/owner` and **capster registration** at `/register/barber`, which save the account and profile to the database.

**Owner dashboard**

- **Overview** at `/owner` with three live statistics (active shifts, incoming applicants, spending this month), a list of upcoming shifts, and an empty state when there are none.
- **Shift list** at `/owner/shift` with Aktif, Terisi, and Selesai tabs and live counters. A shift counts as filled when its accepted bookings reach the number of capsters it needs. Each card shows the rate, hours, date, skill tags, and notes. Shifts can be deleted after a confirmation dialog.
- **Create shift form** at `/owner/shift/baru` with four sections (time, requirements, pay, notes), validated on the server with zod and saved through a Server Action.
- **Barbershop profile** at `/owner/barbershop` with three cards:
    - Profile: name, read-only email, address and city as separate fields, WhatsApp number, and a photo upload area (interface only)
    - Operations: number of chairs, opening and closing time, and open days
    - SOP for capsters

**Capster dashboard**

- **Capster profile** at `/capster/profil` with a header showing the live average rating and the number of completed shifts, a personal data form, skill selection, years of experience, daily rate, and gallery and certificate sections (interface only).
- Empty pages for the shift feed, my shifts, and the wallet.

**Database**

- **Prisma in the app** as the single source of truth for the data model, with PostgreSQL.
- **First schema changes:** shift requirements (skills, minimum experience, number of capsters) and notes, barbershop SOP and opening hours, transaction type and owner so withdrawals can exist without a booking, and capster certificates.
- **Hardening schema changes:**
    - A capster can apply to a given shift only once
    - A reviewer can review a booking only once
    - Indexes on shift status and date, and on booking status
    - Transactions belong to a user, start as pending, and are no longer removed by cascading deletes
    - Capster experience is stored as a number of years
- **Dependencies:** `prisma`, `@prisma/client`, `lucide-react`, and `zod`.

### Changed

- The data model moved from the separate `barbercraft-api` project into this app. `barbercraft-api` is kept as a read-only archive and is no longer developed.
- The login page now signs in against the database instead of being a dummy form (see the limitation below).

### Known limitations

- **Sign-in is a development shortcut.** It uses the typed email only and does not check a password. It must be replaced by real authentication, and switched off in production, before any public deployment.
- The owner applicant page, the capster shift feed, my shifts, and the wallet are not built yet.
- Photo and certificate uploads are not connected to any storage, and the map location picker is not available yet.
- There is no payment provider. Withdrawals will only be recorded, and no real money will move.
- Capster profiles, rates, and statistics on the home page are still placeholder content.

### Up next

- Owner applicant review: accept or reject capsters and contact accepted ones on WhatsApp.
- Capster shift feed and my shifts: apply to shifts, cancel, and follow the status.
- Capster wallet: balance, payment history, and withdrawal requests.
- Seed data, loading and error states, and accessibility checks.
- Real authentication.

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

[0.0.4b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.4b
[0.0.3b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.3b
[0.0.2b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.2b
[0.0.1b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.1b