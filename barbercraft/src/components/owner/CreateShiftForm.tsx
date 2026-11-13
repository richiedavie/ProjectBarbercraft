"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormSection, Stepper, MoneyInput } from "@/components/shared/FormComponents";
import { SkillChip } from "@/components/shared/Chips";
import { createShiftAction } from "@/app/(owner)/owner/shift/baru/actions";
import { copy } from "@/lib/copy";

const POPULAR_SKILLS = [
  "Skin Fade",
  "Classic Cut",
  "French Crop",
  "Pompadour",
  "Beard Trim",
  "Hair Tattoo",
  "Coloring",
  "Hot Towel Massage",
];

const EXPERIENCE_OPTIONS = [
  { label: "Tanpa minimum pengalaman", value: "none" },
  { label: "Minimal 1 tahun", value: "1" },
  { label: "Minimal 2 tahun", value: "2" },
  { label: "Minimal 3 tahun", value: "3" },
  { label: "Minimal 5 tahun (Senior)", value: "5" },
];

export function CreateShiftForm() {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  // Form State
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("10.00");
  const [endTime, setEndTime] = React.useState("18.00");
  const [payAmount, setPayAmount] = React.useState(250000);
  const [capsterCount, setCapsterCount] = React.useState(1);
  const [minExperienceYears, setMinExperienceYears] = React.useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(["Skin Fade", "Classic Cut"]);
  const [notes, setNotes] = React.useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setGeneralError(null);
    setFieldErrors({});

    const result = await createShiftAction({
      title: title.trim(),
      date,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      payAmount,
      capsterCount,
      minExperienceYears,
      requiredSkills: selectedSkills,
      notes: notes.trim(),
    });

    setIsPending(false);

    if (result.success) {
      router.push("/owner/shift");
      router.refresh();
    } else {
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      if (result.error) {
        setGeneralError(result.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {generalError && (
        <div className="p-4 bg-red-50 border border-[#C0392B]/20 rounded-[10px] text-sm text-[#C0392B]">
          {generalError}
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 sm:p-8 space-y-8">
        {/* Section 1: Detail & Waktu */}
        <FormSection title={copy.ownerNewShift.sections.time}>
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              Judul Shift
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="contoh: Shift Akhir Pekan Cabang Kemang"
              required
              className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] transition-colors"
            />
            {fieldErrors.title && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.title[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
                {copy.ownerNewShift.fields.date}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] transition-colors"
              />
              {fieldErrors.date && (
                <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.date[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
                {copy.ownerNewShift.fields.startTime}
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="10.00"
                required
                className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] transition-colors"
              />
              {fieldErrors.startTime && (
                <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.startTime[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
                {copy.ownerNewShift.fields.endTime}
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="18.00"
                required
                className="w-full h-12 px-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] transition-colors"
              />
              {fieldErrors.endTime && (
                <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.endTime[0]}</p>
              )}
            </div>
          </div>
        </FormSection>

        {/* Section 2: Kebutuhan */}
        <FormSection title={copy.ownerNewShift.sections.requirements}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
                {copy.ownerNewShift.fields.capsterCount}
              </label>
              <Stepper
                value={capsterCount}
                onChange={setCapsterCount}
                min={1}
                max={10}
              />
              {fieldErrors.capsterCount && (
                <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.capsterCount[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
                {copy.ownerNewShift.fields.minExperience}
              </label>
              <select
                value={minExperienceYears !== null ? String(minExperienceYears) : "none"}
                onChange={(e) => {
                  const val = e.target.value;
                  setMinExperienceYears(val === "none" ? null : parseInt(val, 10));
                }}
                className="w-full h-12 px-3.5 bg-white text-[#1B1B1B] border border-[#E6DFD3] rounded-[10px] text-sm outline-none focus:border-[#F26B21] transition-colors cursor-pointer"
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-[#1B1B1B] bg-white py-1">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-2">
              {copy.ownerNewShift.fields.skills}
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.map((skill) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onClick={() => toggleSkill(skill)}
                />
              ))}
            </div>
          </div>
        </FormSection>

        {/* Section 3: Bayaran */}
        <FormSection title={copy.ownerNewShift.sections.pay}>
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              {copy.ownerNewShift.fields.payAmount}
            </label>
            <MoneyInput
              value={payAmount}
              onChange={setPayAmount}
              placeholder="250.000"
            />
            {fieldErrors.payAmount && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.payAmount[0]}</p>
            )}
          </div>
        </FormSection>

        {/* Section 4: Catatan */}
        <FormSection title={copy.ownerNewShift.sections.notes}>
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase mb-1.5">
              {copy.ownerNewShift.fields.notes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Contoh: Harap membawa clipper sendiri, seragam kaos hitam disediakan."
              className="w-full p-3.5 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] outline-none focus:border-[#F26B21] transition-colors resize-none placeholder:text-[#5C5C5C]/60"
            />
            {fieldErrors.notes && (
              <p className="text-xs text-[#C0392B] mt-1">{fieldErrors.notes[0]}</p>
            )}
          </div>
        </FormSection>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Link
          href="/owner/shift"
          className="px-5 py-2.5 rounded-[10px] border border-[#E6DFD3] text-sm font-bold text-[#1B1B1B] hover:bg-black/5 min-h-[48px] inline-flex items-center justify-center transition-colors"
        >
          {copy.ownerNewShift.cancelBtn}
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold px-6 py-2.5 rounded-[10px] text-sm min-h-[48px] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Menerbitkan..." : copy.ownerNewShift.publishBtn}
        </button>
      </div>
    </form>
  );
}

