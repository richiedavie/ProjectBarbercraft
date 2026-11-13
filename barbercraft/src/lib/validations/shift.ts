import { z } from "zod";

export const createShiftSchema = z.object({
  title: z.string().min(3, "Judul shift minimal 3 karakter"),
  date: z.string().min(1, "Tanggal harus diisi"),
  startTime: z.string().regex(/^([01]\d|2[0-3])[:.][0-5]\d$/, "Format jam mulai harus JJ.MM atau JJ:MM (contoh: 10.00)"),
  endTime: z.string().regex(/^([01]\d|2[0-3])[:.][0-5]\d$/, "Format jam selesai harus JJ.MM atau JJ:MM (contoh: 18.00)"),
  payAmount: z.number().min(50000, "Tarif per shift minimal Rp 50.000"),
  capsterCount: z.number().min(1, "Jumlah capster minimal 1").max(10, "Maksimal 10 capster"),
  minExperienceYears: z.number().nullable().optional(),
  requiredSkills: z.array(z.string()).default([]),
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
});

export type CreateShiftInput = z.infer<typeof createShiftSchema>;

