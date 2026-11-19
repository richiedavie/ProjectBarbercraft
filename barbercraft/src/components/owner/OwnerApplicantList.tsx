"use client";

import * as React from "react";
import { TabRow } from "@/components/shared/TabRow";
import { EmptyState } from "@/components/shared/EmptyState";
import { ApplicantCard } from "@/components/owner/ApplicantCard";
import { copy } from "@/lib/copy";
import type { ApplicantItem, ApplicantTabCounts } from "@/lib/queries/owner";

interface OwnerApplicantListProps {
  applicants: ApplicantItem[];
  counts?: ApplicantTabCounts;
}

export function OwnerApplicantList({ applicants, counts }: OwnerApplicantListProps) {
  const [activeTab, setActiveTab] = React.useState<"pending" | "accepted" | "rejected">("pending");

  const pendingList = applicants.filter((a) => a.status === "PENDING");
  const acceptedList = applicants.filter((a) => a.status === "ACCEPTED");
  const rejectedList = applicants.filter((a) => a.status === "REJECTED");

  const tabs = [
    { id: "pending", label: copy.ownerApplicants.tabs.pending, count: counts?.pending ?? pendingList.length },
    { id: "accepted", label: copy.ownerApplicants.tabs.accepted, count: counts?.accepted ?? acceptedList.length },
    { id: "rejected", label: copy.ownerApplicants.tabs.rejected, count: counts?.rejected ?? rejectedList.length },
  ];

  let currentList = pendingList;
  if (activeTab === "accepted") {
    currentList = acceptedList;
  } else if (activeTab === "rejected") {
    currentList = rejectedList;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.ownerApplicants.title}</h1>
          <p className="text-sm text-[#5C5C5C] mt-1">
            Kelola dan konfirmasi pelamar capster untuk shift barbershop Anda.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <TabRow
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as "pending" | "accepted" | "rejected")}
      />

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <EmptyState
          heading={
            activeTab === "pending"
              ? "Belum ada pelamar yang menunggu keputusan."
              : activeTab === "accepted"
              ? "Belum ada pelamar yang diterima."
              : "Belum ada pelamar yang ditolak."
          }
          actionLabel={copy.ownerApplicants.viewShiftBtn}
          actionHref="/owner/shift"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {currentList.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      )}
    </div>
  );
}

