import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  heading: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  heading,
  actionLabel,
  actionHref,
  onAction,
  className,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E6DFD3] rounded-[12px] p-8 sm:p-12 text-center flex flex-col items-center justify-center",
        className
      )}
    >
      {icon && <div className="text-[#5C5C5C] mb-3">{icon}</div>}
      <h3 className="text-base font-bold text-[#1B1B1B]">{heading}</h3>
      {actionLabel && (
        <div className="mt-4">
          {actionHref ? (
            <Link
              href={actionHref}
              className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-4 py-2.5 rounded-[10px] text-sm inline-flex items-center justify-center min-h-[48px] transition-all"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-4 py-2.5 rounded-[10px] text-sm inline-flex items-center justify-center min-h-[48px] transition-all"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

