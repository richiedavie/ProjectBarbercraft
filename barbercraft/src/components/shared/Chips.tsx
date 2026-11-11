import * as React from "react";
import { cn } from "@/lib/utils";

interface SkillChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SkillChip({ label, selected, onClick, className }: SkillChipProps) {
  const isClickable = Boolean(onClick);

  return (
    <button
      type="button"
      disabled={!isClickable}
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
        selected
          ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
          : "bg-white text-[#1B1B1B] border-[#E6DFD3] hover:border-[#F26B21]",
        !isClickable && "cursor-default",
        className
      )}
    >
      {label}
    </button>
  );
}

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterChip({ label, active, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer",
        active
          ? "border-[#F26B21] bg-[#FDE8D8] text-[#1B1B1B] font-bold"
          : "border-[#E6DFD3] bg-white text-[#5C5C5C] hover:border-[#1B1B1B] hover:text-[#1B1B1B]",
        className
      )}
    >
      {label}
    </button>
  );
}

