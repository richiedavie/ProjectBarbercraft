import type { Prisma } from "@prisma/client";

export type PrismaTransaction = Prisma.TransactionClient;

/**
 * Sinkronisasi status shift berdasarkan kuota capsterCount dan booking yang ACCEPTED.
 * - Jika accepted >= capsterCount => BOOKED
 * - Jika accepted < capsterCount dan shift bukan COMPLETED atau CANCELLED => OPEN
 */
export async function syncShiftStatus(
  tx: PrismaTransaction,
  shiftId: string
): Promise<"OPEN" | "BOOKED" | "COMPLETED" | "CANCELLED"> {
  const shift = await tx.shift.findUnique({
    where: { id: shiftId },
    select: {
      id: true,
      status: true,
      capsterCount: true,
    },
  });

  if (!shift) {
    throw new Error("Shift tidak ditemukan.");
  }

  // Jika shift sudah COMPLETED atau CANCELLED, status tidak boleh ditimpa kembali
  if (shift.status === "COMPLETED" || shift.status === "CANCELLED") {
    return shift.status;
  }

  const acceptedCount = await tx.booking.count({
    where: {
      shiftId,
      status: "ACCEPTED",
    },
  });

  let newStatus: "OPEN" | "BOOKED" = "OPEN";
  if (acceptedCount >= shift.capsterCount) {
    newStatus = "BOOKED";
  }

  if (shift.status !== newStatus) {
    await tx.shift.update({
      where: { id: shiftId },
      data: { status: newStatus },
    });
  }

  return newStatus;
}
