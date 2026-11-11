import Link from "next/link";
import { Plus } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { copy } from "@/lib/copy";

export default function OwnerSummaryPage() {
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
          value="0"
          helper={copy.ownerSummary.activeShiftsHelper}
        />
        <StatCard
          title={copy.ownerSummary.incomingApplicants}
          value="0"
          helper={copy.ownerSummary.incomingApplicantsHelper}
        />
        <StatCard
          title={copy.ownerSummary.totalExpenses}
          value="Rp 0"
          helper={copy.ownerSummary.totalExpensesHelper}
        />
      </div>

      {/* Upcoming Shifts / Empty State */}
      <div className="mt-6">
        <EmptyState
          heading={copy.ownerSummary.emptyHeading}
          actionLabel={copy.ownerSummary.newShiftBtn}
          actionHref="/owner/shift/baru"
        />
      </div>
    </div>
  );
}

