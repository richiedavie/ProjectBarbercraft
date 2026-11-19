import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  advanced: {
    disableSchemaValidation: true, // User.image dipetakan ke avatarUrl
  },
  user: {
    fields: {
      image: "avatarUrl",
    },
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "UNASSIGNED",
        input: false, // Proteksi: role tidak boleh diisi langsung oleh user pada endpoint sign-up publik
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  rateLimit: {
    window: 60, // 60 detik
    max: 10,    // Maksimal 10 percobaan per IP/window
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5, // Batas lebih ketat: maksimal 5 percobaan login per menit
      },
    },
    // Catatan arsitektur: Penyimpanan rate limit saat ini in-memory.
    // Harus dipindahkan ke database/redis storage adapter sebelum deploy ke production multi-instance.
  },
  plugins: [
    nextCookies(), // Plugin Next.js agar session cookies tersinkronisasi otomatis pada Server Actions
  ],
});

