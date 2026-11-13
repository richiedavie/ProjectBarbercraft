import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { Role, User, BarberProfile, CapsterProfile } from "@prisma/client";

export type CurrentUser = User & {
  barberProfile: BarberProfile | null;
  capsterProfile: CapsterProfile | null;
};

/**
 * Temporary auth placeholder:
 * Reads a temporary dev cookie (userId / userRole) to simulate authentication.
 * IN REAL PRODUCTION: Replace this with real session/cookie/JWT auth.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const userRole = cookieStore.get("userRole")?.value as Role | undefined;

  if (!userId) {
    return null;
  }

  try {
    // 1. Coba cari berdasarkan ID
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        barberProfile: true,
        capsterProfile: true,
      },
    });

    if (user) return user;

    // 2. Jika ID berupa string cookie lama (misal "mock-owner"), cari berdasarkan email dev
    const defaultEmail = userRole === "CAPSTER" ? "capster@barbercraft.com" : "owner@rootsbarbershop.com";
    user = await prisma.user.findUnique({
      where: { email: defaultEmail },
      include: {
        barberProfile: true,
        capsterProfile: true,
      },
    });

    if (user) return user;
  } catch {
    // If DB is offline or prisma client not generated yet, fallback to mock object
  }

  // Fallback dev mock user agar dashboard langsung bisa direview/dites
  const isOwner = userRole === "OWNER" || userId.includes("owner");
  return {
    id: userId,
    email: isOwner ? "owner@rootsbarbershop.com" : "capster@barbercraft.com",
    password: null,
    name: isOwner ? "Roots Barbershop Owner" : "Arya Pratama",
    avatarUrl: null,
    phone: "6281234567890",
    role: isOwner ? ("OWNER" as Role) : ("CAPSTER" as Role),
    createdAt: new Date(),
    updatedAt: new Date(),
    barberProfile: isOwner
      ? {
          id: "mock-barber-id",
          userId: userId,
          shopName: "Roots Barbershop",
          address: "Jl. Kemang Raya No. 12",
          city: "Jakarta Selatan",
          latitude: -6.2607,
          longitude: 106.8159,
          whatsapp: "6281234567890",
          chairCount: 4,
          openTime: "10.00",
          closeTime: "21.00",
          openDays: [1, 2, 3, 4, 5, 6, 7],
          sop: "Datang 15 menit sebelum shift, bawa alat lengkap, seragam rapi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : null,
    capsterProfile: !isOwner
      ? {
          id: "mock-capster-id",
          userId: userId,
          experience: "3 - 5 tahun",
          skills: ["Skin Fade", "Classic Cut", "Beard Trim"],
          dailyRate: 250000,
          whatsapp: "6289876543210",
          isAvailable: true,
          portfolio: [],
          certificates: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : null,
  };
}

/**
 * Requires a specific role or redirects appropriately.
 */
export async function requireUserWithRole(requiredRole: Role): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  if (user.role !== requiredRole) {
    throw new Error("FORBIDDEN");
  }

  return user;
}
