import { prisma } from "@/lib/prisma";
import type { Shift, BarberProfile, Booking } from "@prisma/client";

export type AvailableShiftItem = Shift & {
  shop: BarberProfile;
  bookings: { id: string; capsterId: string; status: string }[];
  isApplied: boolean;
  userBookingId?: string;
  userBookingStatus?: string;
};

export async function getCapsterFeedShifts(capsterId?: string): Promise<AvailableShiftItem[]> {
  const now = new Date();

  try {
    const shifts = await prisma.shift.findMany({
      where: {
        status: "OPEN",
        endAt: { gt: now },
      },
      include: {
        shop: true,
        bookings: {
          select: {
            id: true,
            capsterId: true,
            status: true,
          },
        },
      },
      orderBy: {
        startAt: "asc",
      },
    });

    return shifts.map((s) => {
      const userBooking = capsterId
        ? s.bookings.find((b) => b.capsterId === capsterId && b.status !== "CANCELLED" && b.status !== "REJECTED")
        : undefined;

      return {
        ...s,
        isApplied: Boolean(userBooking),
        userBookingId: userBooking?.id,
        userBookingStatus: userBooking?.status,
      };
    });
  } catch {
    return [];
  }
}

export type CapsterApplicationItem = Booking & {
  shift: Shift & {
    shop: BarberProfile;
  };
};

export async function getCapsterApplications(capsterId: string): Promise<CapsterApplicationItem[]> {
  try {
    return await prisma.booking.findMany({
      where: {
        capsterId,
        status: { in: ["PENDING", "ACCEPTED", "COMPLETED"] },
      },
      include: {
        shift: {
          include: {
            shop: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch {
    return [];
  }
}

export type WalletMetrics = {
  weekEarnings: number;
  withdrawableBalance: number;
  totalEarnings: number;
};

export type WalletTransactionItem = {
  id: string;
  type: "EARNING" | "WITHDRAWAL";
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  bankName: string | null;
  accountNumber: string | null;
  createdAt: Date;
  booking?: {
    id: string;
    shift: {
      id: string;
      title: string;
      date: Date;
      shop: {
        shopName: string;
      };
    };
  } | null;
};

export async function getCapsterWalletData(userId: string): Promise<{
  metrics: WalletMetrics;
  transactions: WalletTransactionItem[];
}> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        booking: {
          include: {
            shift: {
              include: {
                shop: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Hitung tanggal awal minggu ini (Senin 00:00:00 WIB)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday
    const distanceToMonday = (dayOfWeek + 6) % 7;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - distanceToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    let weekEarnings = 0;
    let totalEarnings = 0;
    let totalWithdrawn = 0;

    for (const t of transactions) {
      if (t.type === "EARNING" && t.status === "COMPLETED") {
        totalEarnings += t.amount;
        if (new Date(t.createdAt) >= startOfWeek) {
          weekEarnings += t.amount;
        }
      } else if (t.type === "WITHDRAWAL" && (t.status === "COMPLETED" || t.status === "PENDING")) {
        // Penarikan (baik yang pending diproses maupun completed) mengurangi saldo tersedia
        totalWithdrawn += t.amount;
      }
    }

    const withdrawableBalance = Math.max(0, totalEarnings - totalWithdrawn);

    return {
      metrics: {
        weekEarnings,
        withdrawableBalance,
        totalEarnings,
      },
      transactions: transactions.map((t) => ({
        id: t.id,
        type: t.type,
        amount: t.amount,
        status: t.status,
        bankName: t.bankName,
        accountNumber: t.accountNumber,
        createdAt: t.createdAt,
        booking: t.booking
          ? {
              id: t.booking.id,
              shift: {
                id: t.booking.shift.id,
                title: t.booking.shift.title,
                date: t.booking.shift.date,
                shop: {
                  shopName: t.booking.shift.shop.shopName,
                },
              },
            }
          : null,
      })),
    };
  } catch (err) {
    console.error("Gagal mengambil data dompet capster:", err);
    return {
      metrics: {
        weekEarnings: 0,
        withdrawableBalance: 0,
        totalEarnings: 0,
      },
      transactions: [],
    };
  }
}

export async function getCapsterProfileSummary(capsterProfileId: string) {
  try {
    const completedShiftsCount = await prisma.booking.count({
      where: {
        capsterId: capsterProfileId,
        status: "COMPLETED",
      },
    });

    const reviews = await prisma.review.findMany({
      where: {
        booking: { capsterId: capsterProfileId },
      },
      select: { rating: true },
    });

    let rating = 5.0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      rating = Number((sum / reviews.length).toFixed(1));
    }

    return { completedShiftsCount, rating };
  } catch {
    return { completedShiftsCount: 0, rating: 5.0 };
  }
}



