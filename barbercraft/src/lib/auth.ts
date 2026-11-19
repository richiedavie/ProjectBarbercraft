import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "./auth/better-auth";
import { prisma } from "@/lib/prisma";
import type { Role, BarberProfile, CapsterProfile } from "@prisma/client";

export type SafeUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  barberProfile: BarberProfile | null;
  capsterProfile: CapsterProfile | null;
};

export type CurrentUser = SafeUser;

/**
 * Single source of truth untuk mengambil data session user yang sedang aktif.
 * Menggunakan React cache() agar deduplikasi request berjalan otomatis dalam 1 render cycle.
 * Memakai select eksplisit agar field sensitif (password, token, hash) tidak pernah terekspos.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  let session = null;

  try {
    const h = await headers();
    session = await auth.api.getSession({
      headers: h,
    });
  } catch (authError: unknown) {
    // Next.js dynamic server usage error saat prerendering harus di-rethrow agar rute otomatis dynamic
    if (
      authError &&
      typeof authError === "object" &&
      "digest" in authError &&
      authError.digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw authError;
    }
    console.error("Gagal membaca session Better Auth:", authError);
    return null;
  }

  if (!session || !session.user) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        barberProfile: true,
        capsterProfile: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (dbError) {
    console.error("Error database saat mengambil detail user dari session:", dbError);
    throw dbError; // Jangan menelan database error yang tak terduga
  }
});
