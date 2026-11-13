import { prisma } from "@/lib/prisma";
import type { Shift, Booking, CapsterProfile, User } from "@prisma/client";

export type ShiftWithBookings = Shift & {
  bookings: (Booking & {
    capster: CapsterProfile & {
      user: User;
    };
  })[];
};

export async function getOwnerMetrics(shopId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    // 1. Shift aktif: status OPEN atau BOOKED
    const activeShiftsCount = await prisma.shift.count({
      where: {
        shopId,
        status: { in: ["OPEN", "BOOKED"] },
      },
    });

    // 2. Pelamar masuk: status booking PENDING pada shift milik barbershop ini
    const pendingApplicantsCount = await prisma.booking.count({
      where: {
        shift: { shopId },
        status: "PENDING",
      },
    });

    // 3. Total pengeluaran bulan ini dari Transaction COMPLETED
    const transactions = await prisma.transaction.aggregate({
      where: {
        booking: {
          shift: { shopId },
        },
        status: "COMPLETED",
        createdAt: { gte: startOfMonth },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      activeShiftsCount,
      pendingApplicantsCount,
      totalExpenses: transactions._sum.amount ?? 0,
    };
  } catch {
    // Fallback if DB is empty or offline
    return {
      activeShiftsCount: 0,
      pendingApplicantsCount: 0,
      totalExpenses: 0,
    };
  }
}

export async function getOwnerUpcomingShifts(shopId: string): Promise<ShiftWithBookings[]> {
  try {
    return await prisma.shift.findMany({
      where: {
        shopId,
        status: { in: ["OPEN", "BOOKED"] },
      },
      include: {
        bookings: {
          include: {
            capster: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
      take: 5,
    });
  } catch {
    return [];
  }
}

export async function getOwnerAllShifts(shopId: string): Promise<ShiftWithBookings[]> {
  try {
    return await prisma.shift.findMany({
      where: { shopId },
      include: {
        bookings: {
          include: {
            capster: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  } catch {
    return [];
  }
}

