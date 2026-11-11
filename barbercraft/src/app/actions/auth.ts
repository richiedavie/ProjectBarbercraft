"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function setDevUserCookie(role: "OWNER" | "CAPSTER") {
  const cookieStore = await cookies();
  
  // 1. Coba cari atau buat dev user di DB
  const email = role === "OWNER" ? "owner@rootsbarbershop.com" : "capster@barbercraft.com";
  const name = role === "OWNER" ? "Roots Barbershop Owner" : "Arya Pratama";

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { barberProfile: true, capsterProfile: true },
    });

    if (!user) {
      user = await prisma.user.create({
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
                    experience: "3 - 5 tahun",
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

    cookieStore.set("userId", user.id, { path: "/" });
  } catch {
    // Fallback jika database belum connect/migrate: set cookie mock id
    cookieStore.set("userId", `mock-${role.toLowerCase()}`, { path: "/" });
  }

  cookieStore.set("userRole", role, { path: "/" });
}

