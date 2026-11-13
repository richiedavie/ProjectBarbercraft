"use client";

import * as React from "react";
import { SkillChip } from "@/components/shared/Chips";
import { MoneyInput, Stepper } from "@/components/shared/FormComponents";
import { updateCapsterProfileAction } from "@/app/actions/profile";
import type { CapsterProfile } from "@prisma/client";

const SKILL_OPTIONS = [
  "Skin Fade",
  "Classic Cut",
  "French Crop",
  "Pompadour",
  "Hair Tattoo",
  "Beard Trim",
  "Coloring",
  "Hot Towel Massage",
];

interface CapsterProfileFormProps {
  initialData: Partial<CapsterProfile>;
  userName: string;
  userEmail: string;
}

export function CapsterProfileForm({
  initialData,
  userName,
  userEmail,
}: CapsterProfileFormProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  // Form states
  const [name, setName] = React.useState(userName);
  const [whatsapp, setWhatsapp] = React.useState(initialData.whatsapp ?? "");
  const [experienceYears, setExperienceYears] = React.useState(initialData.experienceYears ?? 1);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(initialData.skills ?? ["Skin Fade", "Classic Cut"]);
  const [dailyRate, setDailyRate] = React.useState(initialData.dailyRate ?? 200000);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    setFieldErrors({});

    const res = await updateCapsterProfileAction({
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      experienceYears,
      skills: selectedSkills,
      dailyRate,
    });

    setIsPending(false);

    if (res.success) {
      setSuccessMsg("Profil capster berhasil diperbarui.");
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

      {/* Card 1: Data Pribadi & Kontak */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1B1B1B] border-b border-[#E6DFD3] pb-2">
          Data Pribadi & Kontak
        </h2>

        <div>
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21]"
          />
          {fieldErrors.name && (
            <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.name[0]}</p>
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
      </div>

      {/* Card 2: Keahlian & Pengalaman */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1B1B1B] border-b border-[#E6DFD3] pb-2">
          Keahlian & Pengalaman
        </h2>

        <div>
          <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-2">
            Keahlian Utama
          </label>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((skill) => (
              <SkillChip
                key={skill}
                label={skill}
                selected={selectedSkills.includes(skill)}
                onClick={() => toggleSkill(skill)}
              />
            ))}
          </div>
          {fieldErrors.skills && (
            <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.skills[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Pengalaman Kerja (Tahun)
            </label>
            <Stepper value={experienceYears} onChange={setExperienceYears} min={0} max={40} />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Ekspektasi Tarif Harian
            </label>
            <MoneyInput value={dailyRate} onChange={setDailyRate} placeholder="200.000" />
            {fieldErrors.dailyRate && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.dailyRate[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Galeri Hasil Potong (UI Only) */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-2">
          <h2 className="text-base font-bold text-[#1B1B1B]">Galeri Hasil Potong</h2>
          <button
            type="button"
            className="text-xs font-bold text-[#F26B21] hover:underline cursor-pointer"
          >
            + Tambah Foto
          </button>
        </div>
        <div className="border border-dashed border-[#E6DFD3] rounded-[10px] p-6 text-center text-xs text-[#5C5C5C] bg-[#FFF9F0]">
          Belum ada foto portofolio. (UI Only - penyimpanan foto akan dihubungkan nanti)
        </div>
      </div>

      {/* Card 4: Sertifikat (UI Only) */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-2">
          <h2 className="text-base font-bold text-[#1B1B1B]">Sertifikat</h2>
          <button
            type="button"
            className="text-xs font-bold text-[#F26B21] hover:underline cursor-pointer"
          >
            + Tambah Sertifikat
          </button>
        </div>
        <div className="border border-dashed border-[#E6DFD3] rounded-[10px] p-6 text-center text-xs text-[#5C5C5C] bg-[#FFF9F0]">
          Belum ada sertifikat keahlian barber terdaftar.
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-6 py-2.5 rounded-[10px] text-sm min-h-[48px] transition-all cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Menyimpan..." : "Ubah Profil"}
        </button>
      </div>
    </form>
  );
}

