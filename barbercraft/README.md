<div align="center">

<br />

# BarberCraft

### Capster outsourcing for barbershops across Indonesia.

*Outsourcing capster handal untuk barbershop Anda.*

<br />

![Status](https://img.shields.io/badge/status-beta-F26B21?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.0.3b-1B1B1B?style=for-the-badge)
![Language](https://img.shields.io/badge/UI-Bahasa%20Indonesia-0F5C3A?style=for-the-badge)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

<br />

[About](#about) &nbsp;·&nbsp; [Two ways in](#two-ways-in) &nbsp;·&nbsp; [How it works](#how-it-works) &nbsp;·&nbsp; [Design](#design) &nbsp;·&nbsp; [Status](#current-status) &nbsp;·&nbsp; [Tech stack](#tech-stack) &nbsp;·&nbsp; [Getting started](#getting-started)

</div>

---

## About

> **BarberCraft is a capster outsourcing agency, built as a website.**
> Barbershops request trained and tested barbers. Barbers apply to join and get placed.

Running a barbershop means keeping every chair filled, and that is harder than it sounds. A regular capster falls sick, takes leave, or the weekend rush arrives, and suddenly there is an empty chair and lost revenue. On the other side, many skilled barbers have the talent but no clear way to find steady, well-run places to work.

**BarberCraft takes the middle role.** It trains, tests, and places professional capster directly into the barbershops that need them, so owners can focus on growing their business instead of running a recruitment process, and barbers can focus on their craft and their career.

Placements come in three shapes: **daily or emergency cover**, **dedicated contracts of 3 to 12 months**, and **packages for new branches and events**.

---

## Two ways in

BarberCraft serves two groups. Which one you are decides where you start.

| | **Hire a capster** | **Become a capster** |
| :-- | :-- | :-- |
| **Who it is for** | Barbershop owners | Barbers looking for placement and a career |
| **What you do** | Describe what you need and request a placement | Apply to join BarberCraft |
| **What you get** | A matched capster who is briefed on your shop's standard operating procedures | Placement in partner barbershops, training, and room to grow |

---

## How it works

From request to a capster ready to serve your customers, in four steps:

| 1 | 2 | 3 | 4 |
| :-: | :-: | :-: | :-: |
| **Request** | **Match and brief** | **Place** | **Follow up** |
| Tell us the skills, number of chairs, location, and duration you need. | We pick the right capster and brief them on your shop's SOP. | The capster arrives on time, in uniform, and ready to work. | We review performance and arrange a replacement if the fit is wrong. |

---

## Design

The interface is warm and friendly, and written entirely in **Bahasa Indonesia**.

| Color | Hex | Role |
| :-- | :-- | :-- |
| <img src="https://placehold.co/18x18/FFF9F0/FFF9F0.png" alt="" /> Cream | `#FFF9F0` | Page background |
| <img src="https://placehold.co/18x18/1B1B1B/1B1B1B.png" alt="" /> Ink | `#1B1B1B` | Primary text |
| <img src="https://placehold.co/18x18/F26B21/F26B21.png" alt="" /> Orange | `#F26B21` | Primary actions and highlights |
| <img src="https://placehold.co/18x18/0F5C3A/0F5C3A.png" alt="" /> Green | `#0F5C3A` | Verified and success states |
| <img src="https://placehold.co/18x18/E6DFD3/E6DFD3.png" alt="" /> Line | `#E6DFD3` | Borders and dividers |

Typeface: **Plus Jakarta Sans**.

---

## Current status

| Part | State |
| :-- | :-- |
| Home (landing) page | Available, beta (with smooth entrance animations) |
| Onboarding & Role Selection | Available (`/register/role`, `/register/owner`, `/register/barber`) |
| Login page | Connected with dynamic session cookie & PostgreSQL sync |
| Owner Dashboard | Available (`/owner`, `/owner/shift`, `/owner/shift/baru`, `/owner/barbershop`) |
| Capster Dashboard | Profile & Navigation Shell available (`/capster/profil`) |
| Backend & Database | Prisma ORM & PostgreSQL integrated |

---

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

- Sign-up page.
- Connecting login, sign-up, and placement requests to a real backend.

[0.0.1b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.1b
