# Changelog

All notable changes to BarberCraft are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). While BarberCraft is in beta, versions use a `b` suffix (for example `0.0.1b`).

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

- **Prisma in the app** as the single source of truth for the data model, with PostgreSQL running in Docker.
- **First migration:** shift requirements (skills, minimum experience, number of capsters) and notes, barbershop SOP and opening hours, transaction type and owner so withdrawals can exist without a booking, and capster certificates.
- **Hardening migration:**
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

[0.0.2b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.2b
[0.0.1b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.1b
