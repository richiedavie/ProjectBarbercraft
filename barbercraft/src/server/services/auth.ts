import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export type PrismaTransaction = Prisma.TransactionClient;

export interface RegisterCapsterParams {
  email: string;
  name: string;
  whatsapp: string;
  experienceYears?: number;
  skills: string[];
  expectedRate?: number;
}

export async function registerCapster(
  params: RegisterCapsterParams,
  client: PrismaTransaction = prisma
) {
  const { email, name, whatsapp, experienceYears, skills, expectedRate } = params;

  let user = await client.user.findUnique({
    where: { email },
    include: { capsterProfile: true },
  });

  if (!user) {
    user = await client.user.create({
      data: {
        email,
        name,
        role: "CAPSTER",
        phone: whatsapp,
        capsterProfile: {
          create: {
            experienceYears: experienceYears ?? 1,
            skills: skills.length > 0 ? skills : ["Classic Cut"],
            dailyRate: expectedRate ?? 200000,
            whatsapp,
          },
        },
      },
      include: { capsterProfile: true },
    });
  } else {
    user = await client.user.update({
      where: { id: user.id },
      data: {
        role: "CAPSTER",
        phone: whatsapp,
        capsterProfile: user.capsterProfile
          ? {
              update: {
                experienceYears: experienceYears ?? user.capsterProfile.experienceYears,
                skills: skills.length > 0 ? skills : user.capsterProfile.skills,
                whatsapp,
              },
            }
          : {
              create: {
                experienceYears: experienceYears ?? 1,
                skills: skills.length > 0 ? skills : ["Classic Cut"],
                dailyRate: expectedRate ?? 200000,
                whatsapp,
              },
            },
      },
      include: { capsterProfile: true },
    });
  }

  return user;
}

export interface RegisterOwnerParams {
  email: string;
  shopName: string;
  address: string;
  city: string;
  whatsapp: string;
  chairCount: number;
}

export async function registerOwner(
  params: RegisterOwnerParams,
  client: PrismaTransaction = prisma
) {
  const { email, shopName, address, city, whatsapp, chairCount } = params;
  const name = shopName;

  let user = await client.user.findUnique({
    where: { email },
    include: { barberProfile: true },
  });

  if (!user) {
    user = await client.user.create({
      data: {
        email,
        name,
        role: "OWNER",
        phone: whatsapp,
        barberProfile: {
          create: {
            shopName,
            address,
            city,
            whatsapp,
            chairCount: chairCount || 2,
          },
        },
      },
      include: { barberProfile: true },
    });
  } else {
    user = await client.user.update({
      where: { id: user.id },
      data: {
        role: "OWNER",
        phone: whatsapp,
        barberProfile: user.barberProfile
          ? {
              update: {
                shopName,
                address,
                city,
                whatsapp,
                chairCount: chairCount || 2,
              },
            }
          : {
              create: {
                shopName,
                address,
                city,
                whatsapp,
                chairCount: chairCount || 2,
              },
            },
      },
      include: { barberProfile: true },
    });
  }

  return user;
}

export interface DevLoginParams {
  role: "OWNER" | "CAPSTER";
  email: string;
  name: string;
}

export async function findOrCreateDevUser(
  params: DevLoginParams,
  client: PrismaTransaction = prisma
) {
  const { role, email, name } = params;

  let user = await client.user.findUnique({
    where: { email },
    include: { barberProfile: true, capsterProfile: true },
  });

  const finalRole = user ? user.role : role;

  if (!user) {
    user = await client.user.create({
      data: {
        email,
        name,
        role,
        ...(role === "OWNER"
          ? {
              barberProfile: {
                create: {
                  shopName: "Roots Barbershop",
                  address: "Jl. Kemang Raya No. 12",
                  city: "Jakarta Selatan",
                  whatsapp: "6281234567890",
                  chairCount: 4,
                },
              },
            }
          : {
              capsterProfile: {
                create: {
                  experienceYears: 3,
                  skills: ["Skin Fade", "Classic Cut", "Beard Trim"],
                  dailyRate: 250000,
                  whatsapp: "6289876543210",
                },
              },
            }),
      },
      include: { barberProfile: true, capsterProfile: true },
    });
  }

  return { user, finalRole };
}

