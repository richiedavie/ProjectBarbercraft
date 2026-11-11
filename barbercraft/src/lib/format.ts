/**
 * Currency and date formatting helpers for BarberCraft (id-ID, Asia/Jakarta).
 */

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(amount: number): string {
  // Format as "Rp 250.000" (replace non-breaking space if any)
  return rupiahFormatter.format(amount).replace(/\u00A0/, " ");
}

export function formatDateId(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function formatTimeRange(start: string, end: string): string {
  return `${start} - ${end}`;
}

export function getInitials(name: string): string {
  if (!name) return "BC";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

