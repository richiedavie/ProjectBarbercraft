"use client";

import * as React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TabRow } from "@/components/shared/TabRow";
import { ShiftCard } from "@/components/shared/ShiftCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { copy } from "@/lib/copy";
import type { ShiftWithBookings } from "@/lib/queries/owner";

interface OwnerShiftListProps {
  shifts: ShiftWithBookings[];
}

export function OwnerShiftList({ shifts }: OwnerShiftListProps) {
  const [activeTab, setActiveTab] = React.useState<"active" | "filled" | "completed">("active");

  // Klasifikasi shift berdasarkan keterisian dan status:
  // 1. Aktif: OPEN dan belum penuh
  // 2. Terisi: OPEN/BOOKED dan jumlah booking ACCEPTED >= capsterCount
  // 3. Selesai: COMPLETED / CANCELLED
  const activeShifts = shifts.filter((s) => {
    const accepted = s.bookings?.filter((b) => b.status === "ACCEPTED").length ?? 0;
    return s.status === "OPEN" && accepted < s.capsterCount;
  });

  const filledShifts = shifts.filter((s) => {
    const accepted = s.bookings?.filter((b) => b.status === "ACCEPTED").length ?? 0;
    return (s.status === "OPEN" || s.status === "BOOKED") && accepted >= s.capsterCount;
  });

  const completedShifts = shifts.filter((s) => s.status === "COMPLETED" || s.status === "CANCELLED");

  const tabs = [
    { id: "active", label: copy.ownerShift.tabs.active, count: activeShifts.length },
    { id: "filled", label: copy.ownerShift.tabs.filled, count: filledShifts.length },
    { id: "completed", label: copy.ownerShift.tabs.completed, count: completedShifts.length },
  ];

  let currentList = activeShifts;
  let emptyText = copy.ownerShift.emptyActive;
  if (activeTab === "filled") {
    currentList = filledShifts;
    emptyText = copy.ownerShift.emptyFilled;
  } else if (activeTab === "completed") {
    currentList = completedShifts;
    emptyText = copy.ownerShift.emptyCompleted;
  }

  return (
    <div className="space-y-6">
      {/* Header and Action */}
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

      {/* Tabs */}
      <TabRow
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as typeof activeTab)}
      />

      {/* List / Grid */}
      {currentList.length === 0 ? (
        <EmptyState
          heading={emptyText}
          actionLabel={activeTab === "active" ? copy.ownerShift.newShiftBtn : undefined}
          actionHref={activeTab === "active" ? "/owner/shift/baru" : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentList.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} variant="owner" />
          ))}
        </div>
      )}
    </div>
  );
}

