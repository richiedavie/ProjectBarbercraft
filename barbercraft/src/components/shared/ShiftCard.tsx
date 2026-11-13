import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatDateId, formatRupiah, formatTimeRange } from "@/lib/format";
import { SkillChip } from "@/components/shared/Chips";
import { DeleteShiftButton } from "@/components/owner/DeleteShiftButton";
import { cn } from "@/lib/utils";
import type { ShiftWithBookings } from "@/lib/queries/owner";

interface ShiftCardProps {
  shift: ShiftWithBookings;
  variant?: "owner" | "capster";
  actionButton?: React.ReactNode;
  className?: string;
}

export function ShiftCard({
  shift,
  variant = "owner",
  actionButton,
  className,
}: ShiftCardProps) {
  // Hitung jumlah booking yang ACCEPTED
  const acceptedCount = shift.bookings?.filter((b) => b.status === "ACCEPTED").length ?? 0;
  const isFilled = acceptedCount >= shift.capsterCount;

  return (
    <div
      className={cn(
        "bg-white border border-[#E6DFD3] rounded-[12px] p-5 flex flex-col justify-between transition-colors",
        className
      )}
    >
      <div>
        {/* Header: Title / Shop Name & Pay */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#1B1B1B]">{shift.title}</h3>
              {variant === "owner" && (
                <DeleteShiftButton shiftId={shift.id} />
              )}
            </div>
            {variant === "owner" && (
              <div className="flex items-center gap-2 mt-1 text-xs text-[#5C5C5C]">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>
                    {acceptedCount}/{shift.capsterCount} Capster terisi
                  </span>
                </span>
                <span>•</span>
                <span
                  className={cn(
                    "font-semibold",
                    isFilled ? "text-[#0F5C3A]" : "text-[#F26B21]"
                  )}
                >
                  {isFilled ? "Terisi" : "Terbuka"}
                </span>
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <span className="font-bold text-base text-[#1B1B1B]">
              {formatRupiah(shift.payAmount)}
            </span>
            <span className="text-xs text-[#5C5C5C] block">/ shift</span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E6DFD3]/60 text-xs text-[#5C5C5C]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5C5C5C] shrink-0" strokeWidth={1.5} />
            <span>{formatDateId(shift.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5C5C5C] shrink-0" strokeWidth={1.5} />
            <span>{formatTimeRange(shift.startTime, shift.endTime)}</span>
          </div>
        </div>

        {/* Required Skills & Notes */}
        {shift.requiredSkills && shift.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {shift.requiredSkills.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>
        )}

        {shift.notes && (
          <p className="text-xs text-[#5C5C5C] mt-3 line-clamp-2 italic">
            &quot;{shift.notes}&quot;
          </p>
        )}
      </div>

      {/* Action Area */}
      {actionButton && <div className="mt-4 pt-3 border-t border-[#E6DFD3]/60">{actionButton}</div>}
    </div>
  );
}

