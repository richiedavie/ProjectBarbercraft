import { auth } from "@/lib/auth/better-auth";
import { prisma } from "@/lib/prisma";
import { DomainError } from "../errors";

export interface RegisterCapsterParams {
  email: string;
  name: string;
  password?: string;
  whatsapp: string;
  experienceYears?: number;
  skills: string[];
  expectedRate?: number;
}

export async function registerCapster(params: RegisterCapsterParams) {
  const { email, name, password, whatsapp, experienceYears, skills, expectedRate } = params;

  if (!password || password.length < 8 || password.length > 128) {
    throw new DomainError("VALIDATION_ERROR", "Kata sandi harus terdiri dari 8 hingga 128 karakter.");
  }

  // 1. Buat akun kredensial menggunakan Better Auth API
  let authUser;
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });
    authUser = res.user;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("exist")) {
      throw new DomainError("ALREADY_PROCESSED", "Email ini sudah terdaftar di BarberCraft.");
    }
    throw new DomainError("UNKNOWN", "Gagal mendaftarkan akun. Silakan coba lagi.");
  }

  // 2. Dalam satu transaksi prisma, set role ke CAPSTER dan buat CapsterProfile
  try {
    await prisma.$transaction(async (tx) => {
      // Pastikan peran user hanya boleh berubah satu kali dari UNASSIGNED ke CAPSTER
      const current = await tx.user.findUnique({
        where: { id: authUser.id },
        select: { role: true },
      });

      if (!current || (current.role !== "UNASSIGNED" && current.role !== "CAPSTER")) {
        throw new DomainError("FORBIDDEN", "Peran akun tidak dapat diubah.");
      }

      await tx.user.update({
        where: { id: authUser.id },
        data: {
          role: "CAPSTER",
          phone: whatsapp,
        },
      });

      await tx.capsterProfile.create({
        data: {
          userId: authUser.id,
          whatsapp,
          experienceYears: experienceYears ?? 1,
          skills: skills.length > 0 ? skills : ["Classic Cut"],
          dailyRate: expectedRate ?? 200000,
        },
      });
    });

    return authUser;
  } catch (profileError) {
    // Pencegahan Akun Yatim: jika transaksi pembuatan profil gagal, hapus akun autentikasi
    try {
      await prisma.user.delete({ where: { id: authUser.id } });
    } catch (cleanupErr) {
      console.error("Gagal membersihkan orphan account:", cleanupErr);
    }
    throw profileError instanceof DomainError
      ? profileError
      : new DomainError("UNKNOWN", "Gagal menyelesaikan profil capster.");
  }
}

export interface RegisterOwnerParams {
  email: string;
  shopName: string;
  password?: string;
  address: string;
  city: string;
  whatsapp: string;
  chairCount: number;
}

export async function registerOwner(params: RegisterOwnerParams) {
  const { email, shopName, password, address, city, whatsapp, chairCount } = params;

  if (!password || password.length < 8 || password.length > 128) {
    throw new DomainError("VALIDATION_ERROR", "Kata sandi harus terdiri dari 8 hingga 128 karakter.");
  }

  // 1. Buat akun kredensial menggunakan Better Auth API
  let authUser;
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email,
        name: shopName,
        password,
      },
    });
    authUser = res.user;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("exist")) {
      throw new DomainError("ALREADY_PROCESSED", "Email ini sudah terdaftar di BarberCraft.");
    }
    throw new DomainError("UNKNOWN", "Gagal mendaftarkan akun. Silakan coba lagi.");
  }

  // 2. Dalam satu transaksi prisma, set role ke OWNER dan buat BarberProfile
  try {
    await prisma.$transaction(async (tx) => {
      // Pastikan peran user hanya boleh berubah satu kali dari UNASSIGNED ke OWNER
      const current = await tx.user.findUnique({
        where: { id: authUser.id },
        select: { role: true },
      });

      if (!current || (current.role !== "UNASSIGNED" && current.role !== "OWNER")) {
        throw new DomainError("FORBIDDEN", "Peran akun tidak dapat diubah.");
      }

      await tx.user.update({
        where: { id: authUser.id },
        data: {
          role: "OWNER",
          phone: whatsapp,
        },
      });

      await tx.barberProfile.create({
        data: {
          userId: authUser.id,
          shopName,
          address,
          city,
          whatsapp,
          chairCount: chairCount || 2,
        },
      });
    });

    return authUser;
  } catch (profileError) {
    // Pencegahan Akun Yatim: jika transaksi pembuatan profil gagal, hapus akun autentikasi
    try {
      await prisma.user.delete({ where: { id: authUser.id } });
    } catch (cleanupErr) {
      console.error("Gagal membersihkan orphan account:", cleanupErr);
    }
    throw profileError instanceof DomainError
      ? profileError
      : new DomainError("UNKNOWN", "Gagal menyelesaikan profil barbershop.");
  }
}
