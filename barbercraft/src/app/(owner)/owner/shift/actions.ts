"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function deleteShiftAction(shiftId: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "OWNER") {
    return {
      success: false,
      error: "Hanya Owner yang dapat menghapus shift.",
    };
  }

  try {
    // Pastikan shift ini milik barbershop user yang bersangkutan
    const shift = await prisma.shift.findUnique({
      where: { id: shiftId },
      include: { shop: true },
    });

    if (!shift) {
      return {
        success: false,
        error: "Shift tidak ditemukan.",
      };
    }

    // Cek kepemilikan shop
    if (user.barberProfile && shift.shopId !== user.barberProfile.id) {
      return {
        success: false,
        error: "Anda tidak berhak menghapus shift ini.",
      };
    }

    // Hapus shift (cascade booking jika ada)
    await prisma.shift.delete({
      where: { id: shiftId },
    });

    revalidatePath("/owner");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal menghapus shift.";
    return {
      success: false,
      error: message,
    };
  }
}

