## [0.0.3b] - 2026-11-19

### Applicants, the capster app, and polish

The third beta completes the first full loop of the product. Owners can now review the capsters who applied to their shifts and accept or reject them, and capsters can browse open shifts, apply, follow their applications, and request withdrawals from their wallet. The release also adds development seed data, loading and error states, and accessibility improvements. The sections that decide who is accepted and how many people a shift can take are now protected against double clicks and simultaneous requests.

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

### Changed

- **Shift times are stored as real date and time values** (`startAt` and `endAt`, in UTC) instead of text, which allows checks for shifts that have ended and for overlapping shifts.
- **Accepting and rejecting applicants is safe against double clicks and simultaneous requests.** The shift is locked while capacity is checked, only pending applications can be processed, and the shift status is recalculated from the accepted bookings in one place.
- **Ratings are calculated with database aggregates** and only count reviews written by the barbershop owner for that booking.
- **Shifts with accepted capsters can no longer be deleted.**

### Known limitations

- **Sign-in is still a development shortcut.** It uses the typed email only and does not check a password. It must be replaced by real authentication, and switched off in production, before any public deployment.
- The Terdekat filter does not calculate real distances yet, because the map location picker is not available.
- Photo and certificate uploads are not connected to any storage.
- There is no payment provider. Withdrawals are only recorded, and no real money moves. There is also no admin area to approve them yet.
- Completing a shift, reviewing the other party, and notifications are not built yet, so earnings from completed shifts are only present in seed data.
- Capster profiles, rates, and statistics on the home page are still placeholder content.

### Up next

- Foundation cleanup: move business logic into a service layer with one authorization module.
- Real authentication.
- Full shift and booking lifecycle with scheduled jobs.
- Shift completion and two-way reviews.
- Wallet ledger, admin approval of withdrawals, notifications, uploads, and production deployment.

[0.0.3b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.3b
[0.0.2b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.2b
[0.0.1b]: https://github.com/richiedavie/barbercraft/releases/tag/v0.0.1b
