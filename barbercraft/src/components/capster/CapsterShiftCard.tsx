"use client";

import * as React from "react";
import { Store, MapPin, Calendar, Clock, AlertCircle } from "lucide-react";
import { SkillChip } from "@/components/shared/Chips";
import { formatDateId, formatRupiah, formatTimeRange } from "@/lib/format";
import { copy } from "@/lib/copy";
import { applyShiftAction } from "@/app/(capster)/capster/actions";
import type { AvailableShiftItem } from "@/lib/queries/capster";

interface CapsterShiftCardProps {
  shift: AvailableShiftItem;
}

export function CapsterShiftCard({ shift }: CapsterShiftCardProps) {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const handleApply = () => {
    setError(null);
    startTransition(async () => {
      const res = await applyShiftAction(shift.id);
      if (!res.success) {
        setError(res.error || "Gagal mengajukan lamaran.");
      }
    });
  };

  const isApplied = shift.isApplied;

  return (
    <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 transition-all duration-200 hover:border-[#1B1B1B]/40">
      {error && (
        <div className="mb-4 p-3 rounded-[8px] bg-[#C0392B]/10 border border-[#C0392B]/20 text-[#C0392B] text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Card: Barbershop & Tarif */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#F26B21] shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-[#1B1B1B]">{shift.shop.shopName}</h2>
          </div>
          <p className="text-xs text-[#5C5C5C] flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#5C5C5C] shrink-0" />
            <span>{shift.shop.city} • {shift.shop.address}</span>
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-lg font-extrabold text-[#F26B21]">
            {formatRupiah(shift.payAmount)}
          </p>
          <p className="text-[11px] font-medium text-[#5C5C5C]">{copy.capsterFeed.perShift}</p>
        </div>
      </div>

      {/* Judul & Detail Waktu Shift */}
      <div className="mt-4 pt-3.5 border-t border-[#E6DFD3]/60">
        <h3 className="text-sm font-bold text-[#1B1B1B]">{shift.title}</h3>
        
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1.5 text-xs text-[#5C5C5C]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#5C5C5C]" />
            {formatDateId(shift.date)}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5C5C5C]" />
            {shift.startAt && shift.endAt
              ? formatTimeRange(new Date(shift.startAt), new Date(shift.endAt))
              : formatTimeRange(shift.startTime, shift.endTime)}
          </span>
        </div>
      </div>

      {/* Syarat Keahlian & Catatan */}
      {shift.requiredSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {shift.requiredSkills.map((skill) => (
            <SkillChip key={skill} label={skill} className="text-[11px] px-2.5 py-1" />
          ))}
        </div>
      )}

      {shift.notes && (
        <p className="text-xs text-[#5C5C5C] mt-3 italic line-clamp-2">
          &quot;{shift.notes}&quot;
        </p>
      )}

      {/* Footer & Tombol Lamar */}
      <div className="mt-5 pt-3.5 border-t border-[#E6DFD3] flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-[#5C5C5C]">
          Kebutuhan: <strong className="text-[#1B1B1B]">{shift.capsterCount} capster</strong>
          {shift.minExperienceYears ? ` (min. ${shift.minExperienceYears} thn exp)` : ""}
        </span>

        {isApplied ? (
          <button
            type="button"
            disabled
            className="px-5 py-2.5 rounded-[10px] bg-[#E6DFD3] text-[#5C5C5C] text-xs font-bold cursor-not-allowed"
          >
            {copy.capsterFeed.appliedBtn}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            disabled={isPending}
            className="px-5 py-2.5 rounded-[10px] bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Mengirim..." : copy.capsterFeed.applyBtn}
          </button>
        )}
      </div>
    </div>
  );
}

