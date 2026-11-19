import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { normalizeWhatsApp, type BarberProfileInput, type CapsterProfileInput } from "@/lib/validations/profile";

export type PrismaTransaction = Prisma.TransactionClient;

export interface UpdateBarberProfileParams {
  userId: string;
  data: BarberProfileInput;
}

export async function updateBarberProfile(
  params: UpdateBarberProfileParams,
  client: PrismaTransaction = prisma
) {
  const { userId, data } = params;
  const normalizedWA = normalizeWhatsApp(data.whatsapp);

  return await client.barberProfile.upsert({
    where: { userId },
    create: {
      userId,
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
}

export interface UpdateCapsterProfileParams {
  userId: string;
  data: CapsterProfileInput;
}

export async function updateCapsterProfile(
  params: UpdateCapsterProfileParams,
  tx?: PrismaTransaction
) {
  const execute = async (client: PrismaTransaction) => {
    const { userId, data } = params;
    const normalizedWA = normalizeWhatsApp(data.whatsapp);

    await client.user.update({
      where: { id: userId },
      data: { name: data.name },
    });

    return await client.capsterProfile.upsert({
      where: { userId },
      create: {
        userId,
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
  };

  if (tx) {
    return await execute(tx);
  } else {
    return await prisma.$transaction(execute);
  }
}

