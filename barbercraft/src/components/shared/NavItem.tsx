import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export function NavItem({ href, label, icon, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm transition-colors",
        isActive
          ? "bg-[#FDE8D8] text-[#1B1B1B] font-bold"
          : "text-[#5C5C5C] hover:text-[#1B1B1B] hover:bg-black/5 font-medium"
      )}
    >
      <span className={cn(isActive ? "text-[#F26B21]" : "text-[#5C5C5C]")}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

export function BottomNavItem({ href, label, icon, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors",
        isActive
          ? "text-[#1B1B1B] font-bold"
          : "text-[#5C5C5C] hover:text-[#1B1B1B] font-medium"
      )}
    >
      <span className={cn("mb-1", isActive ? "text-[#F26B21]" : "text-[#5C5C5C]")}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

