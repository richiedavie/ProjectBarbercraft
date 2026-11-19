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
    const result = await prisma.$transaction(async (tx) => {
      // Pastikan shift ini milik barbershop user yang bersangkutan
      const shift = await tx.shift.findUnique({
        where: { id: shiftId },
        include: {
          shop: true,
          bookings: {
            where: { status: "ACCEPTED" },
          },
        },
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

      // Tolak jika ada booking yang sudah ACCEPTED
      if (shift.bookings && shift.bookings.length > 0) {
        return {
          success: false,
          error: "Tidak dapat menghapus shift yang sudah memiliki capster diterima. Batalkan atau selesaikan shift terlebih dahulu.",
        };
      }

      // Hapus shift (otomatis cascade booking non-ACCEPTED jika ada)
      await tx.shift.delete({
        where: { id: shiftId },
      });

      return { success: true };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/owner");
    revalidatePath("/owner/shift");
    revalidatePath("/owner/pelamar");
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
