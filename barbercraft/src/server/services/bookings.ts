import { prisma } from "@/lib/prisma";
import type { Prisma, Shift } from "@prisma/client";
import { DomainError } from "../errors";
import { syncShiftStatus } from "./shifts";

export type PrismaTransaction = Prisma.TransactionClient;

export interface ApplyShiftParams {
  shiftId: string;
  capsterProfileId: string;
}

export async function applyShift(
  params: ApplyShiftParams,
  tx?: PrismaTransaction
) {
  const execute = async (client: PrismaTransaction) => {
    const { shiftId, capsterProfileId } = params;

    const shift = await client.shift.findUnique({
      where: { id: shiftId },
      include: {
        bookings: {
          where: { status: "ACCEPTED" },
        },
      },
    });

    if (!shift) {
      throw new DomainError("NOT_FOUND", "Shift tidak ditemukan.");
    }

    if (shift.status !== "OPEN") {
      throw new DomainError("QUOTA_FULL", "Shift sudah tidak membuka lamaran atau kuota sudah penuh.");
    }

    const now = new Date();
    if (new Date(shift.endAt) <= now) {
      throw new DomainError("SHIFT_ENDED", "Shift ini sudah melewati waktu berakhir.");
    }

    if (shift.bookings.length >= shift.capsterCount) {
      throw new DomainError("QUOTA_FULL", "Kuota shift ini sudah terpenuhi.");
    }

    const existingBooking = await client.booking.findUnique({
      where: {
        shiftId_capsterId: {
          shiftId,
          capsterId: capsterProfileId,
        },
      },
    });

    if (existingBooking) {
      if (existingBooking.status === "PENDING") {
        throw new DomainError("ALREADY_APPLIED", "Anda sudah mengajukan lamaran untuk shift ini.");
      }
      if (existingBooking.status === "ACCEPTED") {
        throw new DomainError("ALREADY_PROCESSED", "Lamaran Anda untuk shift ini sudah diterima.");
      }
      // Jika sebelumnya REJECTED atau CANCELLED, pulihkan ke PENDING
      return await client.booking.update({
        where: { id: existingBooking.id },
        data: { status: "PENDING" },
      });
    }

    // Validasi tabrakan jadwal dengan shift ACCEPTED lainnya
    const overlapping = await client.booking.findFirst({
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
      throw new DomainError("INVALID_STATUS", "Anda sudah memiliki shift yang diterima di rentang waktu yang sama.");
    }

    return await client.booking.create({
      data: {
        shiftId,
        capsterId: capsterProfileId,
        status: "PENDING",
      },
    });
  };

  if (tx) {
    return await execute(tx);
  } else {
    return await prisma.$transaction(execute);
  }
}

export interface CancelBookingParams {
  bookingId: string;
  capsterProfileId: string;
}

export async function cancelBooking(
  params: CancelBookingParams,
  client: PrismaTransaction = prisma
) {
  const { bookingId, capsterProfileId } = params;

  const booking = await client.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new DomainError("NOT_FOUND", "Lamaran tidak ditemukan.");
  }

  if (booking.capsterId !== capsterProfileId) {
    throw new DomainError("FORBIDDEN", "Anda tidak berhak membatalkan lamaran ini.");
  }

  if (booking.status !== "PENDING") {
    throw new DomainError("INVALID_STATUS", "Hanya lamaran berstatus menunggu konfirmasi yang dapat dibatalkan.");
  }

  return await client.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
}

export interface ManageApplicantParams {
  bookingId: string;
  shopId: string;
}

export async function acceptApplicant(
  params: ManageApplicantParams,
  tx?: PrismaTransaction
) {
  const execute = async (client: PrismaTransaction) => {
    const { bookingId, shopId } = params;

    const booking = await client.booking.findUnique({
      where: { id: bookingId },
      include: {
        shift: true,
        capster: {
          include: { user: true },
        },
      },
    });

    if (!booking) {
      throw new DomainError("NOT_FOUND", "Lamaran tidak ditemukan.");
    }

    if (booking.status !== "PENDING") {
      throw new DomainError("ALREADY_PROCESSED", "Lamaran sudah diproses sebelumnya.");
    }

    // Row-locking pada Shift
    const lockedShifts = await client.$queryRaw<Shift[]>`
      SELECT * FROM "Shift" WHERE id = ${booking.shiftId} FOR UPDATE
    `;

    if (!lockedShifts || lockedShifts.length === 0) {
      throw new DomainError("NOT_FOUND", "Shift tidak ditemukan.");
    }

    const lockedShift = lockedShifts[0];

    if (lockedShift.shopId !== shopId) {
      throw new DomainError("NOT_OWNER", "Anda tidak berhak mengelola lamaran ini.");
    }

    if (lockedShift.status !== "OPEN") {
      throw new DomainError("QUOTA_FULL", "Shift sudah tidak membuka lamaran atau kuota sudah penuh.");
    }

    const now = new Date();
    if (new Date(lockedShift.endAt) <= now) {
      throw new DomainError("SHIFT_ENDED", "Shift sudah lewat dan tidak dapat menerima pelamar lagi.");
    }

    const acceptedCount = await client.booking.count({
      where: {
        shiftId: lockedShift.id,
        status: "ACCEPTED",
      },
    });

    if (acceptedCount >= lockedShift.capsterCount) {
      await syncShiftStatus(client, lockedShift.id);
      throw new DomainError("QUOTA_FULL", "Kuota shift sudah penuh.");
    }

    const overlappingBookings = await client.booking.findFirst({
      where: {
        capsterId: booking.capsterId,
        status: "ACCEPTED",
        shift: {
          startAt: { lt: lockedShift.endAt },
          endAt: { gt: lockedShift.startAt },
        },
      },
    });

    if (overlappingBookings) {
      throw new DomainError("INVALID_STATUS", "Capster sudah punya shift di jam yang sama pada barbershop lain.");
    }

    const updateResult = await client.booking.updateMany({
      where: {
        id: bookingId,
        status: "PENDING",
      },
      data: {
        status: "ACCEPTED",
      },
    });

    if (updateResult.count === 0) {
      throw new DomainError("ALREADY_PROCESSED", "Lamaran sudah diproses atau statusnya telah berubah.");
    }

    await syncShiftStatus(client, lockedShift.id);

    return { id: bookingId };
  };

  if (tx) {
    return await execute(tx);
  } else {
    return await prisma.$transaction(execute);
  }
}

export async function rejectApplicant(
  params: ManageApplicantParams,
  tx?: PrismaTransaction
) {
  const execute = async (client: PrismaTransaction) => {
    const { bookingId, shopId } = params;

    const booking = await client.booking.findUnique({
      where: { id: bookingId },
      include: {
        shift: true,
      },
    });

    if (!booking) {
      throw new DomainError("NOT_FOUND", "Lamaran tidak ditemukan.");
    }

    if (booking.status === "ACCEPTED") {
      throw new DomainError("INVALID_STATUS", "Lamaran yang sudah diterima tidak dapat ditolak lewat menu ini.");
    }

    if (booking.status !== "PENDING") {
      throw new DomainError("ALREADY_PROCESSED", "Lamaran sudah diproses sebelumnya.");
    }

    const lockedShifts = await client.$queryRaw<Shift[]>`
      SELECT * FROM "Shift" WHERE id = ${booking.shiftId} FOR UPDATE
    `;

    if (!lockedShifts || lockedShifts.length === 0) {
      throw new DomainError("NOT_FOUND", "Shift tidak ditemukan.");
    }

    const lockedShift = lockedShifts[0];

    if (lockedShift.shopId !== shopId) {
      throw new DomainError("NOT_OWNER", "Anda tidak berhak mengelola lamaran ini.");
    }

    const updateResult = await client.booking.updateMany({
      where: {
        id: bookingId,
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
      },
    });

    if (updateResult.count === 0) {
      throw new DomainError("ALREADY_PROCESSED", "Lamaran sudah diproses atau statusnya telah berubah.");
    }

    await syncShiftStatus(client, lockedShift.id);

    return { id: bookingId };
  };

  if (tx) {
    return await execute(tx);
  } else {
    return await prisma.$transaction(execute);
  }
}

