"use client";

import * as React from "react";
import { Star, Check, MessageSquare, Clock, Calendar, X, AlertCircle } from "lucide-react";
import { SkillChip } from "@/components/shared/Chips";
import { formatDateId, formatRupiah, formatTimeRange, formatWhatsAppLink, getInitials } from "@/lib/format";
import { copy } from "@/lib/copy";
import { acceptApplicantAction, rejectApplicantAction } from "@/app/(owner)/owner/pelamar/actions";
import type { ApplicantItem } from "@/lib/queries/owner";

interface ApplicantCardProps {
  applicant: ApplicantItem;
}

export function ApplicantCard({ applicant }: ApplicantCardProps) {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const { capster, shift, status } = applicant;

  // Format link WhatsApp menggunakan normalizer terpusat
  const waMessage = `Halo ${capster.name}, selamat! Lamaran Anda untuk shift "${shift.title}" pada ${formatDateId(shift.date)} di barbershop kami telah diterima.`;
  const waUrl = formatWhatsAppLink(capster.whatsapp, waMessage);

  const handleAccept = () => {
    setError(null);
    startTransition(async () => {
      const res = await acceptApplicantAction(applicant.id);
      if (!res.ok) {
        setError(res.error || "Gagal menerima pelamar.");
      }
    });
  };

  const handleReject = () => {
    setError(null);
    startTransition(async () => {
      const res = await rejectApplicantAction(applicant.id);
      if (!res.ok) {
        setError(res.error || "Gagal menolak pelamar.");
      }
    });
  };

  return (
    <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 transition-all duration-200">
      {error && (
        <div className="mb-4 p-3 rounded-[8px] bg-[#C0392B]/10 border border-[#C0392B]/20 text-[#C0392B] text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Capster Info & Avatar */}
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-[#FDE8D8] text-[#F26B21] border border-[#F26B21]/30 flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
            {capster.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={capster.avatarUrl}
                alt={capster.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{getInitials(capster.name)}</span>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-[#1B1B1B]">{capster.name}</h3>
              {capster.experienceYears && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[6px] bg-[#FFF9F0] border border-[#E6DFD3] text-[#5C5C5C]">
                  {capster.experienceYears} thn exp
                </span>
              )}
            </div>

            {/* Metrik: Rating ulasan & Shift selesai */}
            <div className="flex items-center gap-3 mt-1 text-xs text-[#5C5C5C]">
              {capster.rating !== null ? (
                <span className="inline-flex items-center gap-1 font-bold text-[#1B1B1B]">
                  <Star className="w-3.5 h-3.5 fill-[#F26B21] text-[#F26B21]" />
                  {capster.rating.toFixed(1)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-medium text-[#5C5C5C] bg-[#FFF9F0] px-2 py-0.5 rounded-[4px] border border-[#E6DFD3]">
                  Baru
                </span>
              )}
              <span>•</span>
              <span>{capster.completedShiftsCount} shift selesai</span>
            </div>

            {/* Skills */}
            {capster.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {capster.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} className="text-[11px] px-2.5 py-1" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Shift detail snippet */}
        <div className="sm:text-right p-3 sm:p-0 bg-[#FFF9F0] sm:bg-transparent rounded-[8px] border border-[#E6DFD3] sm:border-0">
          <p className="text-xs font-semibold text-[#5C5C5C]">Shift yang Dilamar:</p>
          <p className="text-sm font-bold text-[#1B1B1B] mt-0.5">{shift.title}</p>
          <div className="flex items-center sm:justify-end gap-2 mt-1 text-xs text-[#5C5C5C]">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#5C5C5C]" />
              {formatDateId(shift.date)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#5C5C5C]" />
              {shift.startAt && shift.endAt
                ? formatTimeRange(new Date(shift.startAt), new Date(shift.endAt))
                : `${shift.startTime} - ${shift.endTime}`}
            </span>
          </div>
          <p className="text-xs font-bold text-[#F26B21] mt-1.5">
            {formatRupiah(shift.payAmount)} / shift
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#E6DFD3] my-4" />

      {/* Action Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs text-[#5C5C5C]">
          Diajukan pada {formatDateId(applicant.appliedAt)}
        </span>

        {/* Action Buttons based on status */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {status === "PENDING" && (
            <>
              <button
                type="button"
                onClick={handleReject}
                disabled={isPending}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-[#E6DFD3] hover:border-[#C0392B] hover:text-[#C0392B] text-xs font-bold rounded-[8px] text-[#5C5C5C] bg-white transition-all cursor-pointer disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
                <span>{copy.ownerApplicants.reject}</span>
              </button>

              {shift.status === "BOOKED" ? (
                <button
                  type="button"
                  disabled
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-100 text-[#5C5C5C] border border-[#E6DFD3] text-xs font-bold rounded-[8px] cursor-not-allowed"
                >
                  <span>Kuota penuh</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAccept}
                  disabled={isPending}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0F5C3A] hover:bg-[#0c492e] text-white text-xs font-bold rounded-[8px] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{copy.ownerApplicants.accept}</span>
                </button>
              )}
            </>
          )}

          {status === "ACCEPTED" && (
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0F5C3A]/10 text-[#0F5C3A] text-xs font-bold border border-[#0F5C3A]/20">
                <Check className="w-3.5 h-3.5" />
                <span>{copy.ownerApplicants.acceptedStatus}</span>
              </div>

              {capster.whatsapp && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#0F5C3A] hover:bg-[#0c492e] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              )}
            </div>
          )}

          {status === "REJECTED" && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-neutral-100 text-[#5C5C5C] text-xs font-bold border border-[#E6DFD3]">
              <X className="w-3.5 h-3.5" />
              <span>{copy.ownerApplicants.tabs.rejected}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

