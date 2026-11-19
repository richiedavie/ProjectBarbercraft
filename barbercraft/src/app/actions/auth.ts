"use server";

import { cookies } from "next/headers";
import { findOrCreateDevUser } from "@/server/services/auth";
import type { ActionResult } from "@/server/types";

export async function setDevUserCookie(
  role: "OWNER" | "CAPSTER",
  inputEmail?: string
): Promise<ActionResult<{ role: string }>> {
  const cookieStore = await cookies();

  const trimmedEmail = inputEmail?.trim().toLowerCase();
  const email = trimmedEmail || (role === "OWNER" ? "owner@rootsbarbershop.com" : "capster@barbercraft.com");
  const name = role === "OWNER" ? (trimmedEmail ? trimmedEmail.split("@")[0] : "Roots Barbershop Owner") : "Arya Pratama";

  try {
    const { user, finalRole } = await findOrCreateDevUser({
      role,
      email,
      name,
    });

    cookieStore.set("userId", user.id, { path: "/" });
    cookieStore.set("userRole", finalRole, { path: "/" });
    return { ok: true, data: { role: finalRole } };
  } catch (e) {
    console.error("Gagal login:", e);
    cookieStore.set("userId", `mock-${role.toLowerCase()}`, { path: "/" });
    cookieStore.set("userRole", role, { path: "/" });
    return { ok: true, data: { role } };
  }
}

/**
 * Server Action to log out:
 * Clears temporary dev session cookies and redirects to /login or custom internal path.
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
  redirect(redirectTo || "/login");
}
