"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function setDevUserCookie(role: "OWNER" | "CAPSTER", inputEmail?: string) {
  const cookieStore = await cookies();
  
  // Gunakan email yang diinputkan user, atau default dev email jika lewat tombol cepat
  const trimmedEmail = inputEmail?.trim().toLowerCase();
  const email = trimmedEmail || (role === "OWNER" ? "owner@rootsbarbershop.com" : "capster@barbercraft.com");
  const name = role === "OWNER" ? (trimmedEmail ? trimmedEmail.split("@")[0] : "Roots Barbershop Owner") : "Arya Pratama";

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { barberProfile: true, capsterProfile: true },
    });

    // Jika user sudah ada di DB, gunakan role aslinya dari DB
    const finalRole = user ? user.role : role;

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

    cookieStore.set("userId", user.id, { path: "/" });
    cookieStore.set("userRole", finalRole, { path: "/" });
    return { success: true, role: finalRole };
  } catch (e) {
    console.error("Gagal login:", e);
    // Fallback jika database belum connect/migrate
    cookieStore.set("userId", `mock-${role.toLowerCase()}`, { path: "/" });
    cookieStore.set("userRole", role, { path: "/" });
    return { success: true, role };
  }
}

/**
 * Server Action to log out:
 * Clears temporary dev session cookies and redirects to /login or custom internal path.
 * IN REAL PRODUCTION: Replace this with real session invalidation.
 */
export async function logoutAction(redirectTo?: string) {
  const cookieStore = await cookies();
  cookieStore.set("userId", "", { path: "/", maxAge: 0 });
  cookieStore.set("userRole", "", { path: "/", maxAge: 0 });
  cookieStore.delete("userId");
  cookieStore.delete("userRole");

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");

  const { redirect } = await import("next/navigation");
  // Restricted to internal paths only starting with "/"
  const target = redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
    ? redirectTo
    : "/login";

  redirect(target);
}

