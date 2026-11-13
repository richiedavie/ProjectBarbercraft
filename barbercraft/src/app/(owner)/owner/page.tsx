import Link from "next/link";
import { Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getOwnerMetrics, getOwnerUpcomingShifts } from "@/lib/queries/owner";
import { StatCard } from "@/components/shared/StatCard";
import { ShiftCard } from "@/components/shared/ShiftCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatRupiah } from "@/lib/format";
import { copy } from "@/lib/copy";

export default async function OwnerSummaryPage() {
  const user = await getCurrentUser();
  let shopId = user?.barberProfile?.id;

  if (!shopId || shopId === "mock-barber-id") {
    try {
      const firstShop = await prisma.barberProfile.findFirst();
      if (firstShop) shopId = firstShop.id;
    } catch {
      // ignore
    }
  }

  const resolvedShopId = shopId ?? "mock-barber-id";
  const metrics = await getOwnerMetrics(resolvedShopId);
  const upcomingShifts = await getOwnerUpcomingShifts(resolvedShopId);

  return (
    <div className="space-y-6">
      {/* Page Title & Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.ownerSummary.title}</h1>
        <Link
          href="/owner/shift/baru"
          className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-4 py-2.5 rounded-[10px] text-sm inline-flex items-center gap-1.5 min-h-[48px] transition-all"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>{copy.ownerSummary.newShiftBtn}</span>
        </Link>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title={copy.ownerSummary.activeShifts}
          value={metrics.activeShiftsCount}
          helper={copy.ownerSummary.activeShiftsHelper}
        />
        <StatCard
          title={copy.ownerSummary.incomingApplicants}
          value={metrics.pendingApplicantsCount}
          helper={copy.ownerSummary.incomingApplicantsHelper}
        />
        <StatCard
          title={copy.ownerSummary.totalExpenses}
          value={formatRupiah(metrics.totalExpenses)}
          helper={copy.ownerSummary.totalExpensesHelper}
        />
      </div>

      {/* Upcoming Shifts Section */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1B1B1B]">Shift Mendatang</h2>
          {upcomingShifts.length > 0 && (
            <Link
              href="/owner/shift"
              className="text-xs font-bold text-[#F26B21] hover:underline"
            >
              Lihat Semua
            </Link>
          )}
        </div>

        {upcomingShifts.length === 0 ? (
          <EmptyState
            heading={copy.ownerSummary.emptyHeading}
            actionLabel={copy.ownerSummary.newShiftBtn}
            actionHref="/owner/shift/baru"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingShifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} variant="owner" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
