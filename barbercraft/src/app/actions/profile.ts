"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  barberProfileSchema,
  capsterProfileSchema,
  normalizeWhatsApp,
  type BarberProfileInput,
  type CapsterProfileInput,
} from "@/lib/validations/profile";

export type ProfileActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

// 1. Update Profile Barbershop (Owner)
export async function updateBarberProfileAction(
  input: BarberProfileInput
): Promise<ProfileActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "OWNER") {
    return { success: false, error: "Hanya Owner yang dapat mengubah data barbershop." };
  }

  const validation = barberProfileSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
      error: "Data yang dimasukkan belum valid.",
    };
  }

  const data = validation.data;
  const normalizedWA = normalizeWhatsApp(data.whatsapp);

  try {
    await prisma.barberProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        shopName: data.shopName,
        address: data.address,
        city: data.city,
        whatsapp: normalizedWA,
        chairCount: data.chairCount,
        openTime: data.openTime || null,
        closeTime: data.closeTime || null,
        openDays: data.openDays,
        sop: data.sop || null,
      },
      update: {
        shopName: data.shopName,
        address: data.address,
        city: data.city,
        whatsapp: normalizedWA,
        chairCount: data.chairCount,
        openTime: data.openTime || null,
        closeTime: data.closeTime || null,
        openDays: data.openDays,
        sop: data.sop || null,
      },
    });

    revalidatePath("/owner/barbershop");
    revalidatePath("/owner");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal memperbarui profil barbershop.",
    };
  }
}

// 2. Update Profile Capster
export async function updateCapsterProfileAction(
  input: CapsterProfileInput
): Promise<ProfileActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "CAPSTER") {
    return { success: false, error: "Hanya Capster yang dapat mengubah profil ini." };
  }

  const validation = capsterProfileSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
      error: "Data yang dimasukkan belum valid.",
    };
  }

  const data = validation.data;
  const normalizedWA = normalizeWhatsApp(data.whatsapp);

  try {
    // Update User name
    await prisma.user.update({
      where: { id: user.id },
      data: { name: data.name },
    });

    // Update / Upsert CapsterProfile
    await prisma.capsterProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        whatsapp: normalizedWA,
        experienceYears: data.experienceYears,
        skills: data.skills,
        dailyRate: data.dailyRate,
      },
      update: {
        whatsapp: normalizedWA,
        experienceYears: data.experienceYears,
        skills: data.skills,
        dailyRate: data.dailyRate,
      },
    });

    revalidatePath("/capster/profil");
    revalidatePath("/capster");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal memperbarui profil capster.",
    };
  }
}

