"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabRowProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function TabRow({ tabs, activeTab, onChange, className }: TabRowProps) {
  return (
    <div
      className={cn(
        "flex border-b border-[#E6DFD3] gap-6 text-sm font-medium overflow-x-auto",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "pb-3 relative transition-colors whitespace-nowrap cursor-pointer",
              isActive
                ? "text-[#1B1B1B] font-bold"
                : "text-[#5C5C5C] hover:text-[#1B1B1B]"
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span className="ml-1.5 text-xs text-[#5C5C5C]">({tab.count})</span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F26B21]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

