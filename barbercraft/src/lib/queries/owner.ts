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

export type ApplicantItem = {
  id: string; // bookingId
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED";
  appliedAt: Date;
  capster: {
    id: string;
    name: string;
    avatarUrl: string | null;
    whatsapp: string;
    skills: string[];
    experienceYears: number | null;
    rating: number | null;
    completedShiftsCount: number;
  };
  shift: {
    id: string;
    title: string;
    date: Date;
    startAt: Date;
    endAt: Date;
    startTime: string;
    endTime: string;
    payAmount: number;
    capsterCount: number;
    status: string;
  };
};

export type ApplicantTabCounts = {
  pending: number;
  accepted: number;
  rejected: number;
};

export async function getOwnerApplicantCounts(shopId: string): Promise<ApplicantTabCounts> {
  try {
    const grouped = await prisma.booking.groupBy({
      by: ["status"],
      where: {
        shift: { shopId },
      },
      _count: {
        id: true,
      },
    });

    const counts: ApplicantTabCounts = {
      pending: 0,
      accepted: 0,
      rejected: 0,
    };

    for (const item of grouped) {
      if (item.status === "PENDING") counts.pending = item._count.id;
      if (item.status === "ACCEPTED") counts.accepted = item._count.id;
      if (item.status === "REJECTED") counts.rejected = item._count.id;
    }

    return counts;
  } catch {
    return { pending: 0, accepted: 0, rejected: 0 };
  }
}

export async function getOwnerApplicants(shopId: string): Promise<ApplicantItem[]> {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        shift: { shopId },
      },
      include: {
        shift: true,
        capster: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const capsterIds = Array.from(new Set(bookings.map((b) => b.capsterId)));

    // 1. Agregasi rating per capster (hanya ulasan dari owner barbershop pada booking terkait)
    // Ambil data review yang reviewerId-nya cocok dengan owner dari barbershop booking tersebut
    const reviews = await prisma.review.findMany({
      where: {
        booking: {
          capsterId: { in: capsterIds },
        },
      },
      select: {
        rating: true,
        reviewerId: true,
        booking: {
          select: {
            capsterId: true,
            shift: {
              select: {
                shop: {
                  select: {
                    userId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const ratingAggMap: Record<string, { sum: number; count: number }> = {};
    for (const r of reviews) {
      // Pastikan ulasan berasal dari owner barbershop pada shift tersebut
      const ownerUserId = r.booking.shift.shop.userId;
      if (r.reviewerId === ownerUserId) {
        const cid = r.booking.capsterId;
        if (!ratingAggMap[cid]) ratingAggMap[cid] = { sum: 0, count: 0 };
        ratingAggMap[cid].sum += r.rating;
        ratingAggMap[cid].count += 1;
      }
    }

    // 2. Jumlah shift selesai (booking status COMPLETED) per capster dalam satu query groupBy
    const completedCountsGrouped = await prisma.booking.groupBy({
      by: ["capsterId"],
      where: {
        capsterId: { in: capsterIds },
        status: "COMPLETED",
      },
      _count: {
        id: true,
      },
    });

    const completedMap: Record<string, number> = {};
    for (const c of completedCountsGrouped) {
      completedMap[c.capsterId] = c._count.id;
    }

    return bookings.map((b) => {
      const rData = ratingAggMap[b.capsterId];
      const avgRating = rData && rData.count > 0 ? Number((rData.sum / rData.count).toFixed(1)) : null;

      return {
        id: b.id,
        status: b.status,
        appliedAt: b.createdAt,
        capster: {
          id: b.capster.id,
          name: b.capster.user.name,
          avatarUrl: b.capster.user.avatarUrl,
          whatsapp: b.capster.whatsapp || b.capster.user.phone || "",
          skills: b.capster.skills || [],
          experienceYears: b.capster.experienceYears,
          rating: avgRating,
          completedShiftsCount: completedMap[b.capsterId] ?? 0,
        },
        shift: {
          id: b.shift.id,
          title: b.shift.title,
          date: b.shift.date,
          startAt: b.shift.startAt,
          endAt: b.shift.endAt,
          startTime: b.shift.startTime,
          endTime: b.shift.endTime,
          payAmount: b.shift.payAmount,
          capsterCount: b.shift.capsterCount,
          status: b.shift.status,
        },
      };
    });
  } catch {
    return [];
  }
}

export async function getFirstBarberProfile() {
  try {
    return await prisma.barberProfile.findFirst();
  } catch {
    return null;
  }
}



