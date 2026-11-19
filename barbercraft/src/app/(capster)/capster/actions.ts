"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function applyShiftAction(shiftId: string): Promise<ActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "CAPSTER") {
    return {
      success: false,
      error: "Hanya Capster yang dapat melamar shift.",
    };
  }

  let capsterProfileId = user.capsterProfile?.id;

  // Jika profile belum ada (misal dev user baru), coba auto-provision
  if (!capsterProfileId || capsterProfileId === "mock-capster-id") {
    try {
      let dbUser = await prisma.user.findFirst({
        where: {
          OR: [{ id: user.id }, { email: user.email }],
        },
        include: { capsterProfile: true },
      });

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            role: "CAPSTER",
            capsterProfile: {
              create: {
                experienceYears: 2,
                skills: ["Classic Cut", "Skin Fade"],
                dailyRate: 200000,
                whatsapp: user.phone || "6289876543210",
              },
            },
          },
          include: { capsterProfile: true },
        });
      } else if (!dbUser.capsterProfile) {
        const newProf = await prisma.capsterProfile.create({
          data: {
            userId: dbUser.id,
            experienceYears: 2,
            skills: ["Classic Cut", "Skin Fade"],
            dailyRate: 200000,
            whatsapp: user.phone || "6289876543210",
          },
        });
        dbUser.capsterProfile = newProf;
      }

      if (dbUser.capsterProfile) {
        capsterProfileId = dbUser.capsterProfile.id;
      }
    } catch (e) {
      console.error("Gagal sinkron capster profile:", e);
    }
  }

  if (!capsterProfileId || capsterProfileId === "mock-capster-id") {
    return {
      success: false,
      error: "Profil capster belum siap. Lengkapi profil terlebih dahulu.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ambil data shift
      const shift = await tx.shift.findUnique({
        where: { id: shiftId },
        include: {
          bookings: {
            where: { status: "ACCEPTED" },
          },
        },
      });

      if (!shift) {
        return { success: false, error: "Shift tidak ditemukan." };
      }

      if (shift.status !== "OPEN") {
        return { success: false, error: "Shift sudah tidak membuka lamaran atau kuota sudah penuh." };
      }

      const now = new Date();
      if (new Date(shift.endAt) <= now) {
        return { success: false, error: "Shift ini sudah melewati waktu berakhir." };
      }

      if (shift.bookings.length >= shift.capsterCount) {
        return { success: false, error: "Kuota shift ini sudah terpenuhi." };
      }

      // 2. Cek apakah sudah pernah melamar
      const existingBooking = await tx.booking.findUnique({
        where: {
          shiftId_capsterId: {
            shiftId,
            capsterId: capsterProfileId,
          },
        },
      });

      if (existingBooking) {
        if (existingBooking.status === "PENDING") {
          return { success: false, error: "Anda sudah mengajukan lamaran untuk shift ini." };
        }
        if (existingBooking.status === "ACCEPTED") {
          return { success: false, error: "Lamaran Anda untuk shift ini sudah diterima." };
        }
        // Jika tadinya REJECTED atau CANCELLED, perbarui menjadi PENDING kembali
        await tx.booking.update({
          where: { id: existingBooking.id },
          data: { status: "PENDING" },
        });

        return { success: true };
      }

      // 3. Validasi overlap jadwal dengan shift ACCEPTED lainnya
      const overlapping = await tx.booking.findFirst({
        where: {
          capsterId: capsterProfileId,
          status: "ACCEPTED",
          shift: {
            startAt: { lt: shift.endAt },
            endAt: { gt: shift.startAt },
          },
        },
      });

      if (overlapping) {
        return {
          success: false,
          error: "Anda sudah memiliki shift yang diterima di rentang waktu yang sama.",
        };
      }

      // 4. Buat record booking baru PENDING
      await tx.booking.create({
        data: {
          shiftId,
          capsterId: capsterProfileId,
          status: "PENDING",
        },
      });

      return { success: true };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");
    revalidatePath("/owner/pelamar");
    revalidatePath("/owner/shift");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal mengajukan lamaran.";
    return { success: false, error: message };
  }
}

export async function cancelApplicationAction(bookingId: string): Promise<ActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "CAPSTER") {
    return {
      success: false,
      error: "Hanya Capster yang dapat membatalkan lamaran.",
    };
  }

  const capsterProfileId = user.capsterProfile?.id;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, error: "Lamaran tidak ditemukan." };
    }

    if (capsterProfileId && booking.capsterId !== capsterProfileId && capsterProfileId !== "mock-capster-id") {
      return { success: false, error: "Anda tidak berhak membatalkan lamaran ini." };
    }

    if (booking.status !== "PENDING") {
      return {
        success: false,
        error: "Hanya lamaran berstatus menunggu konfirmasi yang dapat dibatalkan.",
      };
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");
    revalidatePath("/owner/pelamar");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal membatalkan lamaran.";
    return { success: false, error: message };
  }
}

