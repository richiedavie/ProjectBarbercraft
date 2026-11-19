import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { DomainError } from "../errors";
import { parseWibTimeToUtc } from "@/lib/format";
import type { CreateShiftInput } from "@/lib/validations/shift";

export type PrismaTransaction = Prisma.TransactionClient;

/**
 * Sinkronisasi status shift berdasarkan kuota capsterCount dan booking yang ACCEPTED.
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
    throw new DomainError("NOT_FOUND", "Shift tidak ditemukan.");
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

export interface CreateShiftParams {
  shopId: string;
  data: CreateShiftInput;
}

export async function createShift(
  params: CreateShiftParams,
  client: PrismaTransaction = prisma
) {
  const { shopId, data } = params;
  const shiftDate = new Date(data.date);
  const startAt = parseWibTimeToUtc(shiftDate, data.startTime);
  const endAt = parseWibTimeToUtc(shiftDate, data.endTime);

  return await client.shift.create({
    data: {
      shopId,
      title: data.title,
      date: shiftDate,
      startTime: data.startTime,
      endTime: data.endTime,
      startAt,
      endAt,
      payAmount: data.payAmount,
      capsterCount: data.capsterCount,
      minExperienceYears: data.minExperienceYears ?? null,
      requiredSkills: data.requiredSkills,
      notes: data.notes || null,
      status: "OPEN",
    },
  });
}

export interface DeleteShiftParams {
  shiftId: string;
  shopId: string;
}

export async function deleteShift(
  params: DeleteShiftParams,
  tx?: PrismaTransaction
) {
  const execute = async (client: PrismaTransaction) => {
    const shift = await client.shift.findUnique({
      where: { id: params.shiftId },
      include: {
        bookings: {
          where: { status: "ACCEPTED" },
        },
      },
    });

    if (!shift) {
      throw new DomainError("NOT_FOUND", "Shift tidak ditemukan.");
    }

    if (shift.shopId !== params.shopId) {
      throw new DomainError("NOT_OWNER", "Anda tidak berhak menghapus shift ini.");
    }

    if (shift.bookings && shift.bookings.length > 0) {
      throw new DomainError(
        "INVALID_STATUS",
        "Tidak dapat menghapus shift yang sudah memiliki capster diterima. Batalkan atau selesaikan shift terlebih dahulu."
      );
    }

    await client.shift.delete({
      where: { id: params.shiftId },
    });

    return { id: params.shiftId };
  };

  if (tx) {
    return await execute(tx);
  } else {
    return await prisma.$transaction(execute);
  }
}

