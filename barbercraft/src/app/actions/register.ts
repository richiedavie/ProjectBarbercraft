"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export interface RegisterBarberInput {
  fullName: string;
  email: string;
  password?: string;
  experienceYears?: number;
  whatsapp: string;
  skills: string[];
  expectedRate?: number;
}

export async function registerBarberAction(input: RegisterBarberInput) {
  const cookieStore = await cookies();
  const email = input.email.trim().toLowerCase();
  const name = input.fullName.trim();
  const cleanPhone = input.whatsapp.replace(/\D/g, "");
  const whatsapp = cleanPhone.startsWith("0")
    ? "62" + cleanPhone.slice(1)
    : cleanPhone.startsWith("62")
    ? cleanPhone
    : "62" + cleanPhone;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { capsterProfile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: "CAPSTER",
          phone: whatsapp,
          capsterProfile: {
            create: {
              experienceYears: input.experienceYears ?? 1,
              skills: input.skills.length > 0 ? input.skills : ["Classic Cut"],
              dailyRate: input.expectedRate ?? 200000,
              whatsapp,
            },
          },
        },
        include: { capsterProfile: true },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          role: "CAPSTER",
          phone: whatsapp,
          capsterProfile: user.capsterProfile
            ? {
                update: {
                  experienceYears: input.experienceYears ?? user.capsterProfile.experienceYears,
                  skills: input.skills.length > 0 ? input.skills : user.capsterProfile.skills,
                  whatsapp,
                },
              }
            : {
                create: {
                  experienceYears: input.experienceYears ?? 1,
                  skills: input.skills.length > 0 ? input.skills : ["Classic Cut"],
                  dailyRate: input.expectedRate ?? 200000,
                  whatsapp,
                },
              },
        },
        include: { capsterProfile: true },
      });
    }

    // Set cookie sesi
    cookieStore.set("userId", user.id, { path: "/" });
    cookieStore.set("userRole", "CAPSTER", { path: "/" });

    return { success: true };
  } catch (err) {
    console.error("Gagal mendaftar capster:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal mendaftar capster.",
    };
  }
}

export interface RegisterOwnerInput {
  shopName: string;
  email: string;
  password?: string;
  address: string;
  city: string;
  whatsapp: string;
  chairCount: number;
}

export async function registerOwnerAction(input: RegisterOwnerInput) {
  const cookieStore = await cookies();
  const email = input.email.trim().toLowerCase();
  const name = input.shopName.trim();
  const cleanPhone = input.whatsapp.replace(/\D/g, "");
  const whatsapp = cleanPhone.startsWith("0")
    ? "62" + cleanPhone.slice(1)
    : cleanPhone.startsWith("62")
    ? cleanPhone
    : "62" + cleanPhone;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { barberProfile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: "OWNER",
          phone: whatsapp,
          barberProfile: {
            create: {
              shopName: input.shopName.trim(),
              address: input.address.trim(),
              city: input.city.trim(),
              whatsapp,
              chairCount: input.chairCount || 2,
            },
          },
        },
        include: { barberProfile: true },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          role: "OWNER",
          phone: whatsapp,
          barberProfile: user.barberProfile
            ? {
                update: {
                  shopName: input.shopName.trim(),
                  address: input.address.trim(),
                  city: input.city.trim(),
                  whatsapp,
                  chairCount: input.chairCount || 2,
                },
              }
            : {
                create: {
                  shopName: input.shopName.trim(),
                  address: input.address.trim(),
                  city: input.city.trim(),
                  whatsapp,
                  chairCount: input.chairCount || 2,
                },
              },
        },
        include: { barberProfile: true },
      });
    }

    cookieStore.set("userId", user.id, { path: "/" });
    cookieStore.set("userRole", "OWNER", { path: "/" });

    return { success: true };
  } catch (err) {
    console.error("Gagal mendaftar owner:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal mendaftar barbershop.",
    };
  }
}
