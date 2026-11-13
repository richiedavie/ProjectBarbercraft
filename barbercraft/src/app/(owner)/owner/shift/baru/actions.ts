"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createShiftSchema, type CreateShiftInput } from "@/lib/validations/shift";

export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createShiftAction(input: CreateShiftInput): Promise<ActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "OWNER") {
    return {
      success: false,
      error: "Anda harus masuk sebagai Owner untuk membuat shift.",
    };
  }

  // Cari atau pastikan BarberProfile ada di DB untuk foreign key
  let shopId = user.barberProfile?.id;

  try {
    // 1. Cek apakah user ada di DB
    let dbUser = await prisma.user.findFirst({
      where: {
        OR: [{ id: user.id }, { email: user.email }],
      },
      include: { barberProfile: true },
    });

    // 2. Jika user belum ada di DB (karena tadi baru reset), buat user & barberProfile otomatis
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          role: "OWNER",
          barberProfile: {
            create: {
              shopName: user.barberProfile?.shopName ?? "Roots Barbershop",
              address: user.barberProfile?.address ?? "Jl. Kemang Raya No. 12",
              city: user.barberProfile?.city ?? "Jakarta Selatan",
              whatsapp: user.barberProfile?.whatsapp ?? "6281234567890",
              chairCount: user.barberProfile?.chairCount ?? 4,
            },
          },
        },
        include: { barberProfile: true },
      });
    } else if (!dbUser.barberProfile) {
      const newProfile = await prisma.barberProfile.create({
        data: {
          userId: dbUser.id,
          shopName: "Roots Barbershop",
          address: "Jl. Kemang Raya No. 12",
          city: "Jakarta Selatan",
          whatsapp: "6281234567890",
          chairCount: 4,
        },
      });
      dbUser.barberProfile = newProfile;
    }

    if (dbUser.barberProfile) {
      shopId = dbUser.barberProfile.id;
    }
  } catch (err) {
    console.error("Gagal sinkron user owner:", err);
  }

  if (!shopId) {
    return {
      success: false,
      error: "Data profil barbershop belum ditemukan. Silakan refresh halaman.",
    };
  }

  // Validasi input dengan Zod
  const validation = createShiftSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
      error: "Data yang dimasukkan belum valid.",
    };
  }

  const { title, date, startTime, endTime, payAmount, capsterCount, minExperienceYears, requiredSkills, notes } = validation.data;

  try {
    const shiftDate = new Date(date);

    await prisma.shift.create({
      data: {
        shopId: shopId,
        title,
        date: shiftDate,
        startTime,
        endTime,
        payAmount,
        capsterCount,
        minExperienceYears: minExperienceYears ?? null,
        requiredSkills,
        notes: notes || null,
        status: "OPEN",
      },
    });

    revalidatePath("/owner");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "";
    // Jika tabel belum dimigrasi di Postgres, berikan instruksi ramah
    if (message.includes("does not exist") || message.includes("Table")) {
      return {
        success: false,
        error: "Tabel database belum dibuat di Postgres. Jalankan `npx prisma db push` di terminal folder barbercraft agar tabel otomatis dibuat.",
      };
    }
    return {
      success: false,
      error: message || "Gagal membuat shift.",
    };
  }
}

