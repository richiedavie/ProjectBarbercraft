"use client";

import * as React from "react";
import { FilterChip } from "@/components/shared/Chips";
import { EmptyState } from "@/components/shared/EmptyState";
import { CapsterShiftCard } from "@/components/capster/CapsterShiftCard";
import { copy } from "@/lib/copy";
import type { AvailableShiftItem } from "@/lib/queries/capster";

interface CapsterFeedListProps {
  initialShifts: AvailableShiftItem[];
  userCity?: string;
}

type FilterType = "all" | "today" | "tomorrow" | "highestPay" | "nearest";

export function CapsterFeedList({ initialShifts, userCity }: CapsterFeedListProps) {
  const [activeFilter, setActiveFilter] = React.useState<FilterType>("all");

  const filteredShifts = React.useMemo(() => {
    const list = [...initialShifts];

    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    switch (activeFilter) {
      case "today":
        return list.filter((s) => new Date(s.date).toISOString().split("T")[0] === todayStr);
      case "tomorrow":
        return list.filter((s) => new Date(s.date).toISOString().split("T")[0] === tomorrowStr);
      case "highestPay":
        return list.sort((a, b) => b.payAmount - a.payAmount);
      case "nearest":
        if (userCity) {
          return list.sort((a, b) => {
            const aMatch = a.shop.city.toLowerCase().includes(userCity.toLowerCase()) ? 0 : 1;
            const bMatch = b.shop.city.toLowerCase().includes(userCity.toLowerCase()) ? 0 : 1;
            return aMatch - bMatch;
          });
        }
        return list;
      default:
        return list;
    }
  }, [initialShifts, activeFilter, userCity]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.capsterFeed.title}</h1>
        <p className="text-sm text-[#5C5C5C] mt-1">
          Pilih shift yang sesuai dengan keahlian dan jadwal Anda.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <FilterChip
          label="Semua Shift"
          active={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        />
        <FilterChip
          label={copy.capsterFeed.filters.nearest}
          active={activeFilter === "nearest"}
          onClick={() => setActiveFilter("nearest")}
        />
        <FilterChip
          label={copy.capsterFeed.filters.today}
          active={activeFilter === "today"}
          onClick={() => setActiveFilter("today")}
        />
        <FilterChip
          label={copy.capsterFeed.filters.tomorrow}
          active={activeFilter === "tomorrow"}
          onClick={() => setActiveFilter("tomorrow")}
        />
        <FilterChip
          label={copy.capsterFeed.filters.highestPay}
          active={activeFilter === "highestPay"}
          onClick={() => setActiveFilter("highestPay")}
        />
      </div>

      {/* Shift List / Empty State */}
      {filteredShifts.length === 0 ? (
        <EmptyState heading={copy.capsterFeed.emptyHeading} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredShifts.map((shift) => (
            <CapsterShiftCard key={shift.id} shift={shift} />
          ))}
        </div>
      )}
    </div>
  );
}
