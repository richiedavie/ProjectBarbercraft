"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { syncShiftStatus } from "@/lib/shifts";
import type { Shift } from "@prisma/client";

export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function acceptApplicantAction(bookingId: string): Promise<ActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "OWNER") {
    return {
      success: false,
      error: "Hanya Owner yang dapat menerima pelamar.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ambil data booking awal beserta shift-nya
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: {
          shift: true,
          capster: {
            include: { user: true },
          },
        },
      });

      if (!booking) {
        return { success: false, error: "Lamaran tidak ditemukan." };
      }

      // Pastikan status booking masih PENDING
      if (booking.status !== "PENDING") {
        return {
          success: false,
          error: "Lamaran sudah diproses sebelumnya.",
        };
      }

      // 2. Kunci baris Shift dengan SELECT ... FOR UPDATE untuk mencegah race condition
      const lockedShifts = await tx.$queryRaw<Shift[]>`
        SELECT * FROM "Shift" WHERE id = ${booking.shiftId} FOR UPDATE
      `;

      if (!lockedShifts || lockedShifts.length === 0) {
        return { success: false, error: "Shift tidak ditemukan." };
      }

      const lockedShift = lockedShifts[0];

      // 3. Pastikan booking milik shift dari barbershop owner yang login
      if (user.barberProfile && lockedShift.shopId !== user.barberProfile.id) {
        return {
          success: false,
          error: "Anda tidak berhak mengelola lamaran ini.",
        };
      }

      // 4. Pastikan shift berstatus OPEN
      if (lockedShift.status !== "OPEN") {
        return {
          success: false,
          error: "Shift sudah tidak membuka lamaran atau kuota sudah penuh.",
        };
      }

      // 5. Pastikan waktu shift (endAt) belum lewat dari waktu sekarang
      const now = new Date();
      if (new Date(lockedShift.endAt) <= now) {
        return {
          success: false,
          error: "Shift sudah lewat dan tidak dapat menerima pelamar lagi.",
        };
      }

      // 6. Hitung booking ACCEPTED saat ini, pastikan belum mencapai capsterCount
      const acceptedCount = await tx.booking.count({
        where: {
          shiftId: lockedShift.id,
          status: "ACCEPTED",
        },
      });

      if (acceptedCount >= lockedShift.capsterCount) {
        // Otomatis tandai BOOKED jika ternyata sudah penuh
        await syncShiftStatus(tx, lockedShift.id);
        return {
          success: false,
          error: "Kuota shift sudah penuh.",
        };
      }

      // 7. Cek apakah capster punya booking ACCEPTED lain yang jadwalnya bentrok
      // Bentrok jika: existing.startAt < new.endAt DAN existing.endAt > new.startAt
      const overlappingBookings = await tx.booking.findFirst({
        where: {
          capsterId: booking.capsterId,
          status: "ACCEPTED",
          shift: {
            startAt: { lt: lockedShift.endAt },
            endAt: { gt: lockedShift.startAt },
          },
        },
        include: {
          shift: true,
        },
      });

      if (overlappingBookings) {
        return {
          success: false,
          error: "Capster sudah punya shift di jam yang sama pada barbershop lain.",
        };
      }

      // 8. Update atomik status booking PENDING -> ACCEPTED
      const updateResult = await tx.booking.updateMany({
        where: {
          id: bookingId,
          status: "PENDING",
        },
        data: {
          status: "ACCEPTED",
        },
      });

      if (updateResult.count === 0) {
        return {
          success: false,
          error: "Lamaran sudah diproses atau statusnya telah berubah.",
        };
      }

      // 9. Sinkronisasi status shift (jika kuota pas terpenuhi, status otomatis BOOKED)
      await syncShiftStatus(tx, lockedShift.id);

      return { success: true };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/owner");
    revalidatePath("/owner/pelamar");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal menerima pelamar.";
    return { success: false, error: message };
  }
}

export async function rejectApplicantAction(bookingId: string): Promise<ActionResult> {
  const user = await getCurrentUser();

  if (!user || user.role !== "OWNER") {
    return {
      success: false,
      error: "Hanya Owner yang dapat menolak pelamar.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ambil data booking
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: {
          shift: true,
        },
      });

      if (!booking) {
        return { success: false, error: "Lamaran tidak ditemukan." };
      }

      // Booking ACCEPTED tidak boleh ditolak lewat aksi ini
      if (booking.status === "ACCEPTED") {
        return {
          success: false,
          error: "Lamaran yang sudah diterima tidak dapat ditolak lewat menu ini.",
        };
      }

      if (booking.status !== "PENDING") {
        return {
          success: false,
          error: "Lamaran sudah diproses sebelumnya.",
        };
      }

      // 2. Kunci baris Shift
      const lockedShifts = await tx.$queryRaw<Shift[]>`
        SELECT * FROM "Shift" WHERE id = ${booking.shiftId} FOR UPDATE
      `;

      if (!lockedShifts || lockedShifts.length === 0) {
        return { success: false, error: "Shift tidak ditemukan." };
      }

      const lockedShift = lockedShifts[0];

      // 3. Validasi kepemilikan shop
      if (user.barberProfile && lockedShift.shopId !== user.barberProfile.id) {
        return {
          success: false,
          error: "Anda tidak berhak mengelola lamaran ini.",
        };
      }

      // 4. Update atomik PENDING -> REJECTED
      const updateResult = await tx.booking.updateMany({
        where: {
          id: bookingId,
          status: "PENDING",
        },
        data: {
          status: "REJECTED",
        },
      });

      if (updateResult.count === 0) {
        return {
          success: false,
          error: "Lamaran sudah diproses atau statusnya telah berubah.",
        };
      }

      // 5. Sinkronisasi status shift
      await syncShiftStatus(tx, lockedShift.id);

      return { success: true };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/owner");
    revalidatePath("/owner/pelamar");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal menolak pelamar.";
    return { success: false, error: message };
  }
}
