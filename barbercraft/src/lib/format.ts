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

export function formatTimeRange(start: string | Date, end: string | Date): string {
  if (start instanceof Date && end instanceof Date) {
    const fmt = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${fmt.format(start).replace(":", ".")} - ${fmt.format(end).replace(":", ".")}`;
  }
  return `${start} - ${end}`;
}

/**
 * Mengonversi tanggal (string/Date) dan jam WIB (format "10.00" atau "10:00")
 * menjadi objek Date UTC yang tepat (Asia/Jakarta = UTC+7).
 */
export function parseWibTimeToUtc(dateVal: Date | string, timeStr: string): Date {
  const d = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const cleanTime = (timeStr || "10.00").replace(".", ":");
  const [hours, minutes] = cleanTime.split(":");
  const hh = String(hours || "10").padStart(2, "0");
  const mm = String(minutes || "00").padStart(2, "0");

  const isoWithTz = `${year}-${month}-${day}T${hh}:${mm}:00+07:00`;
  return new Date(isoWithTz);
}

export function formatTimeFromDate(date: Date): string {
  const fmt = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return fmt.format(date).replace(":", ".");
}

export function getInitials(name: string): string {
  if (!name) return "BC";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Normalisasi nomor WhatsApp Indonesia (08..., 8..., +628..., 628...)
 * menjadi URL chat wa.me standar (https://wa.me/628...).
 */
export function formatWhatsAppLink(phone: string, message?: string): string {
  if (!phone) return "";
  const clean = phone.replace(/\D/g, "");
  let normalized = clean;

  if (clean.startsWith("0")) {
    normalized = "62" + clean.slice(1);
  } else if (clean.startsWith("8")) {
    normalized = "62" + clean;
  } else if (!clean.startsWith("62")) {
    normalized = "62" + clean;
  }

  const baseUrl = `https://wa.me/${normalized}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

