"use client";

import * as React from "react";
import { Store, MapPin, Calendar, Clock, Map, MessageSquare, AlertCircle, X } from "lucide-react";
import { formatDateId, formatRupiah, formatTimeRange } from "@/lib/format";
import { copy } from "@/lib/copy";
import { cancelApplicationAction } from "@/app/(capster)/capster/actions";
import type { CapsterApplicationItem } from "@/lib/queries/capster";

interface ApplicationCardProps {
  application: CapsterApplicationItem;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const { shift, status } = application;
  const shop = shift.shop;

  const handleCancel = () => {
    if (!confirm("Apakah Anda yakin ingin membatalkan lamaran ini?")) return;
    setError(null);
    startTransition(async () => {
      const res = await cancelApplicationAction(application.id);
      if (!res.success) {
        setError(res.error || "Gagal membatalkan lamaran.");
      }
    });
  };

  // Google Maps Search Link
  const mapsQuery = encodeURIComponent(`${shop.shopName} ${shop.address} ${shop.city}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  // WhatsApp Link to Owner
  const cleanPhone = shop.whatsapp.replace(/\D/g, "");
  const waNumber = cleanPhone.startsWith("0")
    ? "62" + cleanPhone.slice(1)
    : cleanPhone.startsWith("62")
    ? cleanPhone
    : "62" + cleanPhone;
  const waMsg = encodeURIComponent(
    `Halo ${shop.shopName}, saya capster pelamar untuk shift "${shift.title}" pada ${formatDateId(shift.date)}. Saya ingin mengonfirmasi detail kedatangan.`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 transition-all duration-200">
      {error && (
        <div className="mb-4 p-3 rounded-[8px] bg-[#C0392B]/10 border border-[#C0392B]/20 text-[#C0392B] text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Info Gerai & Tarif */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#F26B21] shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-[#1B1B1B]">{shop.shopName}</h2>
          </div>
          <p className="text-xs text-[#5C5C5C] flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#5C5C5C] shrink-0" />
            <span>{shop.city} • {shop.address}</span>
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-base font-extrabold text-[#F26B21]">
            {formatRupiah(shift.payAmount)}
          </p>
          <p className="text-[11px] font-medium text-[#5C5C5C]">{copy.capsterFeed.perShift}</p>
        </div>
      </div>

      {/* Judul & Detail Shift */}
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

      {/* SOP Gerai jika Diterima */}
      {status === "ACCEPTED" && shop.sop && (
        <div className="mt-3.5 p-3 rounded-[8px] bg-[#FFF9F0] border border-[#E6DFD3] text-xs">
          <span className="font-bold text-[#1B1B1B] block mb-1">SOP Barbershop:</span>
          <p className="text-[#5C5C5C] leading-relaxed">{shop.sop}</p>
        </div>
      )}

      {/* Footer Aksi Berdasarkan Status */}
      <div className="mt-5 pt-3.5 border-t border-[#E6DFD3] flex items-center justify-between gap-3 flex-wrap">
        <div>
          {status === "PENDING" && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D85812] bg-[#FDE8D8] px-2.5 py-1 rounded-[6px]">
              <Clock className="w-3 h-3" />
              {copy.capsterApplications.waitingNotice}
            </span>
          )}

          {status === "ACCEPTED" && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5C3A] bg-[#0F5C3A]/10 px-2.5 py-1 rounded-[6px] border border-[#0F5C3A]/20">
              {copy.ownerApplicants.acceptedStatus}
            </span>
          )}

          {status === "COMPLETED" && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5C5C] bg-neutral-100 px-2.5 py-1 rounded-[6px] border border-[#E6DFD3]">
              Selesai Dikerjakan
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {status === "PENDING" && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-[8px] border border-[#C0392B]/30 text-[#C0392B] hover:bg-red-50 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isPending ? "Membatalkan..." : copy.capsterApplications.cancelApplication}</span>
            </button>
          )}

          {status === "ACCEPTED" && (
            <>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E6DFD3] bg-white text-[#1B1B1B] hover:border-[#F26B21] text-xs font-bold transition-all"
              >
                <Map className="w-3.5 h-3.5 text-[#F26B21]" />
                <span>{copy.capsterApplications.openInMaps}</span>
              </a>

              {shop.whatsapp && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#0F5C3A] hover:bg-[#0c492e] text-white text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Owner</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

