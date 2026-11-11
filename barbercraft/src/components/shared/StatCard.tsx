import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  helper: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, helper, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E6DFD3] rounded-[12px] p-5 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between text-[#5C5C5C] text-sm">
        <span>{title}</span>
        {icon && <span className="text-[#5C5C5C]">{icon}</span>}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-[#1B1B1B]">{value}</div>
        <div className="text-xs text-[#5C5C5C] mt-1">{helper}</div>
      </div>
    </div>
  );
}

