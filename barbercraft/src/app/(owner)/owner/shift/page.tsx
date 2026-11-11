import Link from "next/link";
import { Plus } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { copy } from "@/lib/copy";

export default function OwnerShiftPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.ownerShift.title}</h1>
        <Link
          href="/owner/shift/baru"
          className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-4 py-2.5 rounded-[10px] text-sm inline-flex items-center gap-1.5 min-h-[48px] transition-all"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>{copy.ownerShift.newShiftBtn}</span>
        </Link>
      </div>

      <EmptyState
        heading={copy.ownerShift.emptyActive}
        actionLabel={copy.ownerShift.newShiftBtn}
        actionHref="/owner/shift/baru"
      />
    </div>
  );
}

