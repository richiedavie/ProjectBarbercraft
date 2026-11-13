import { z } from "zod";

/**
 * Normalisasi dan validasi nomor WhatsApp Indonesia (+62)
 * Menerima format: "08123456789", "8123456789", "+628123456789", "628123456789"
 * Menyimpan sebagai format: "628123456789"
 */
export const normalizeWhatsApp = (val: string): string => {
  let cleaned = val.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned;
  }
  return cleaned;
};

export const whatsAppSchema = z
  .string()
  .min(8, "Nomor WhatsApp terlalu pendek")
  .max(16, "Nomor WhatsApp terlalu panjang")
  .refine((val) => {
    const cleaned = val.replace(/\D/g, "");
    return (
      (cleaned.startsWith("08") && cleaned.length >= 10 && cleaned.length <= 14) ||
      (cleaned.startsWith("628") && cleaned.length >= 11 && cleaned.length <= 15) ||
      (cleaned.startsWith("8") && cleaned.length >= 9 && cleaned.length <= 13)
    );
  }, "Nomor WhatsApp tidak valid (contoh: 081234567890)");

// Schema Profile Barbershop
export const barberProfileSchema = z.object({
  shopName: z.string().min(2, "Nama barbershop minimal 2 karakter"),
  address: z.string().min(5, "Alamat lengkap minimal 5 karakter"),
  city: z.string().min(3, "Kota / Kecamatan minimal 3 karakter"),
  whatsapp: whatsAppSchema,
  chairCount: z.number().min(1, "Minimal 1 kursi").max(50, "Maksimal 50 kursi"),
  openTime: z.string().regex(/^([01]\d|2[0-3])[:.][0-5]\d$/, "Format jam buka JJ.MM (contoh: 09.00)").optional().or(z.literal("")),
  closeTime: z.string().regex(/^([01]\d|2[0-3])[:.][0-5]\d$/, "Format jam tutup JJ.MM (contoh: 21.00)").optional().or(z.literal("")),
  openDays: z.array(z.number()).default([1, 2, 3, 4, 5, 6, 7]),
  sop: z.string().max(1000, "SOP maksimal 1000 karakter").optional(),
});

export type BarberProfileInput = z.infer<typeof barberProfileSchema>;

// Schema Profile Capster
export const capsterProfileSchema = z.object({
  name: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  whatsapp: whatsAppSchema,
  experienceYears: z.number().min(0, "Tahun pengalaman minimal 0").max(50, "Tahun pengalaman maksimal 50"),
  skills: z.array(z.string()).min(1, "Pilih minimal 1 keahlian"),
  dailyRate: z.number().min(50000, "Tarif harian minimal Rp 50.000"),
});

export type CapsterProfileInput = z.infer<typeof capsterProfileSchema>;

