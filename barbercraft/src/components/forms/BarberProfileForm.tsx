"use client";

import * as React from "react";
import { Stepper } from "@/components/shared/FormComponents";
import { updateBarberProfileAction } from "@/app/actions/profile";
import type { BarberProfile } from "@prisma/client";

interface BarberProfileFormProps {
  initialData: Partial<BarberProfile>;
  userEmail: string;
}

const DAYS = [
  { id: 1, label: "Sen" },
  { id: 2, label: "Sel" },
  { id: 3, label: "Rab" },
  { id: 4, label: "Kam" },
  { id: 5, label: "Jum" },
  { id: 6, label: "Sab" },
  { id: 7, label: "Min" },
];

export function BarberProfileForm({ initialData, userEmail }: BarberProfileFormProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  // Form states
  const [shopName, setShopName] = React.useState(initialData.shopName ?? "");
  const [address, setAddress] = React.useState(initialData.address ?? "");
  const [city, setCity] = React.useState(initialData.city ?? "");
  const [whatsapp, setWhatsapp] = React.useState(initialData.whatsapp ?? "");
  const [chairCount, setChairCount] = React.useState(initialData.chairCount ?? 1);
  const [openTime, setOpenTime] = React.useState(initialData.openTime ?? "09.00");
  const [closeTime, setCloseTime] = React.useState(initialData.closeTime ?? "21.00");
  const [openDays, setOpenDays] = React.useState<number[]>(initialData.openDays ?? [1, 2, 3, 4, 5, 6, 7]);
  const [sop, setSop] = React.useState(initialData.sop ?? "");

  const toggleDay = (dayId: number) => {
    setOpenDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    setFieldErrors({});

    const res = await updateBarberProfileAction({
      shopName: shopName.trim(),
      address: address.trim(),
      city: city.trim(),
      whatsapp: whatsapp.trim(),
      chairCount,
      openTime: openTime.trim(),
      closeTime: closeTime.trim(),
      openDays,
      sop: sop.trim(),
    });

    setIsPending(false);

    if (res.success) {
      setSuccessMsg("Profil barbershop berhasil disimpan.");
    } else {
      if (res.fieldErrors) setFieldErrors(res.fieldErrors);
      if (res.error) setErrorMsg(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Inline Feedback Alerts */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-[#0F5C3A]/20 text-[#0F5C3A] text-sm font-semibold rounded-[10px]">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-[#C0392B]/20 text-[#C0392B] text-sm font-semibold rounded-[10px]">
          {errorMsg}
        </div>
      )}

      {/* Card 1: Profil Barbershop */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1B1B1B] border-b border-[#E6DFD3] pb-2">
          Profil Barbershop
        </h2>

        <div>
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
            Nama Barbershop
          </label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
            className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21]"
          />
          {fieldErrors.shopName && (
            <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.shopName[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Email Akun (Read-only)
            </label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full h-12 px-3.5 bg-[#FFF9F0] border border-[#E6DFD3] rounded-[10px] text-sm text-[#5C5C5C] outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="081234567890"
              required
              className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21]"
            />
            {fieldErrors.whatsapp && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.whatsapp[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Alamat Lengkap
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              required
              className="w-full p-3 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] resize-none"
            />
            {fieldErrors.address && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.address[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Kota / Kecamatan
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Jakarta Selatan"
              required
              className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21]"
            />
            {fieldErrors.city && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.city[0]}</p>
            )}
          </div>
        </div>

        {/* Photo Upload Placeholder (UI only) */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
            Foto Barbershop
          </label>
          <div className="border border-dashed border-[#E6DFD3] rounded-[10px] p-6 text-center text-xs text-[#5C5C5C] bg-[#FFF9F0]">
            Pilih atau seret foto gerai barbershop (UI Only)
          </div>
        </div>
      </div>

      {/* Card 2: Operasional */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1B1B1B] border-b border-[#E6DFD3] pb-2">
          Operasional
        </h2>

        <div>
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
            Jumlah Kursi Aktif
          </label>
          <Stepper value={chairCount} onChange={setChairCount} min={1} max={50} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Jam Buka
            </label>
            <input
              type="text"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              placeholder="09.00"
              className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21]"
            />
            {fieldErrors.openTime && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.openTime[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Jam Tutup
            </label>
            <input
              type="text"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              placeholder="21.00"
              className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21]"
            />
            {fieldErrors.closeTime && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.closeTime[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-2">
            Hari Operasional
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const isSelected = openDays.includes(day.id);
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={`w-12 h-10 rounded-[8px] text-xs font-bold border transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                      : "bg-white text-[#5C5C5C] border-[#E6DFD3] hover:border-[#F26B21]"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card 3: SOP untuk Capster */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1B1B1B] border-b border-[#E6DFD3] pb-2">
          SOP untuk Capster
        </h2>
        <div>
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
            Panduan & Tata Tertib Gerai
          </label>
          <textarea
            value={sop}
            onChange={(e) => setSop(e.target.value)}
            rows={4}
            placeholder="Tuliskan aturan seragam, waktu kehadiran, kebersihan kursi dan alat..."
            className="w-full p-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] resize-none placeholder:text-[#5C5C5C]/60"
          />
          {fieldErrors.sop && (
            <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.sop[0]}</p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-6 py-2.5 rounded-[10px] text-sm min-h-[48px] transition-all cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}

