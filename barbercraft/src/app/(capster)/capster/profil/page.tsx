import { getCurrentUser } from "@/lib/auth";
import { CapsterProfileForm } from "@/components/forms/CapsterProfileForm";
import { prisma } from "@/lib/prisma";
import { copy } from "@/lib/copy";

export default async function CapsterProfilePage() {
  const user = await getCurrentUser();

  // Hitung rating rata-rata & shift selesai dari Review dan Booking
  let rating = 5.0;
  let completedShiftsCount = 0;

  if (user?.capsterProfile?.id) {
    try {
      completedShiftsCount = await prisma.booking.count({
        where: {
          capsterId: user.capsterProfile.id,
          status: "COMPLETED",
        },
      });

      const reviews = await prisma.review.findMany({
        where: {
          booking: { capsterId: user.capsterProfile.id },
        },
        select: { rating: true },
      });

      if (reviews.length > 0) {
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        rating = Number((sum / reviews.length).toFixed(1));
      }
    } catch {
      // fallback
    }
  }

  const initialData = user?.capsterProfile ?? {
    whatsapp: "",
    experienceYears: 1,
    skills: ["Skin Fade", "Classic Cut"],
    dailyRate: 200000,
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Summary */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1B1B]">{user?.name ?? "Capster"}</h1>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-[#5C5C5C]">
            <span className="font-semibold text-[#1B1B1B]">⭐ {rating} Rating</span>
            <span>•</span>
            <span>{completedShiftsCount} Shift Selesai</span>
            <span>•</span>
            <span>Jabodetabek & Sekitarnya</span>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <CapsterProfileForm
        initialData={initialData}
        userName={user?.name ?? ""}
        userEmail={user?.email ?? ""}
      />
    </div>
  );
}
