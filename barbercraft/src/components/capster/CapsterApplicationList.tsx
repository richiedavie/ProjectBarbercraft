"use client";

import * as React from "react";
import { TabRow } from "@/components/shared/TabRow";
import { EmptyState } from "@/components/shared/EmptyState";
import { ApplicationCard } from "@/components/capster/ApplicationCard";
import { copy } from "@/lib/copy";
import type { CapsterApplicationItem } from "@/lib/queries/capster";

interface CapsterApplicationListProps {
  applications: CapsterApplicationItem[];
}

export function CapsterApplicationList({ applications }: CapsterApplicationListProps) {
  const [activeTab, setActiveTab] = React.useState<"processing" | "accepted" | "completed">("processing");

  const processingList = applications.filter((a) => a.status === "PENDING");
  const acceptedList = applications.filter((a) => a.status === "ACCEPTED");
  const completedList = applications.filter((a) => a.status === "COMPLETED");

  const tabs = [
    { id: "processing", label: copy.capsterApplications.tabs.processing, count: processingList.length },
    { id: "accepted", label: copy.capsterApplications.tabs.accepted, count: acceptedList.length },
    { id: "completed", label: copy.capsterApplications.tabs.completed, count: completedList.length },
  ];

  let currentList = processingList;
  if (activeTab === "accepted") {
    currentList = acceptedList;
  } else if (activeTab === "completed") {
    currentList = completedList;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.capsterApplications.title}</h1>
        <p className="text-sm text-[#5C5C5C] mt-1">
          Pantau status lamaran shift Anda dan koordinasi dengan owner barbershop.
        </p>
      </div>

      {/* Tabs */}
      <TabRow
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as "processing" | "accepted" | "completed")}
      />

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <EmptyState
          heading={
            activeTab === "processing"
              ? "Belum ada lamaran yang sedang diproses."
              : activeTab === "accepted"
              ? "Belum ada shift yang diterima saat ini."
              : "Belum ada riwayat shift yang selesai."
          }
          actionLabel={copy.capsterApplications.findShiftBtn}
          actionHref="/capster"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {currentList.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}

