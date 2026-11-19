"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/better-auth";
import { runAction } from "@/server/action-helper";
import { DomainError } from "@/server/errors";
import type { ActionResult } from "@/server/types";

export interface LoginInput {
  email: string;
  password?: string;
}

/**
 * Server Action untuk login pengguna dengan email dan kata sandi asli.
 * Mengembalikan role pengguna untuk penentuan tujuan redirect di client.
 * Pesan error sengaja dibuat generik agar tidak membocorkan keberadaan email.
 */
export async function loginAction(
  input: LoginInput
): Promise<ActionResult<{ role: string }>> {
  return runAction(async () => {
    const email = input.email.trim().toLowerCase();
    const password = input.password || "";

    if (!email || !password) {
      throw new DomainError("VALIDATION_ERROR", "Email dan kata sandi wajib diisi.");
    }

    try {
      const h = await headers();
      const res = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        headers: h,
      });

      if (!res || !res.user) {
        throw new DomainError("UNAUTHORIZED", "Email atau kata sandi tidak valid.");
      }

      const role = (res.user as { role?: string }).role || "UNASSIGNED";
      return { role };
    } catch (err) {
      if (err instanceof DomainError) throw err;
      // Respons generik agar aman dari user enumeration attack
      throw new DomainError("UNAUTHORIZED", "Email atau kata sandi tidak valid.");
    }
  });
}

/**
 * Server Action untuk logout:
 * Memanggil signOut Better Auth untuk menginvalidasi session di database dan menghapus cookie.
 */
export async function logoutAction(redirectTo?: string) {
  try {
    const h = await headers();
    await auth.api.signOut({
      headers: h,
    });
  } catch (err) {
    console.error("Gagal sign out dari Better Auth:", err);
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");

  const { redirect } = await import("next/navigation");
  redirect(redirectTo || "/login");
}
