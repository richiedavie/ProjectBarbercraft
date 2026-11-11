"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SKILL_OPTIONS = [
  "Skin Fade",
  "Classic Cut",
  "Hair Tattoo",
  "Beard Trim",
  "Coloring",
  "Hot Towel Massage",
  "Pompadour",
];

const EXPERIENCE_OPTIONS = [
  "Kurang dari 1 tahun",
  "1 - 2 tahun",
  "3 - 5 tahun",
  "Lebih dari 5 tahun (Senior Barber)",
];

export default function RegisterBarberPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [expectedRate, setExpectedRate] = useState("200.000");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Form valid jika Nama, Email, Password, Pengalaman, dan WhatsApp terisi
  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length >= 6 &&
    experience.trim().length > 0 &&
    whatsapp.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      alert("Pendaftaran Capster / Barber berhasil! Selamat datang di BarberCraft.");
      router.push("/");
    }, 600);
  };

  return (
    <div className="bg-[#fcf9f8] text-[#1b1b1b] min-h-screen flex flex-col justify-between font-sans selection:bg-[#f26b21] selection:text-white">
      {/* Top App Bar / Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#fcf9f8]/90 backdrop-blur-md border-b border-[#e5e2e1] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 sm:h-[72px] max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#f1dccc] flex items-center justify-center text-[#f26b21] transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                content_cut
              </span>
            </div>
            <span className="text-[18px] sm:text-[20px] font-bold text-[#1b1b1b] tracking-tight">
              Barber<span className="text-[#f26b21]">Craft</span>
            </span>
          </Link>

          {/* User / Exit Action */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-[#5e5e5e] hover:text-[#1b1b1b] transition-colors"
            >
              Keluar
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#a23f00] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-grow flex flex-col items-center justify-center py-10 sm:py-16 px-4 sm:px-6 animate-fade-in-up">
        <div className="w-full max-w-[1100px] flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* LEFT COLUMN: Progress & Info */}
          <div className="w-full lg:w-[380px] xl:w-[400px] shrink-0 flex flex-col items-start pt-1">
            {/* Progress Label */}
            <span className="text-xs sm:text-sm font-semibold text-[#5e5e5e]">
              Langkah 2 dari 2: Profil Keahlian
            </span>

            {/* 2-Segment Progress Bar (Both Active) */}
            <div className="w-full grid grid-cols-2 gap-1.5 mt-2.5">
              <div className="h-1 bg-[#f26b21] rounded-full"></div>
              <div className="h-1 bg-[#f26b21] rounded-full"></div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1b1b1b] tracking-tight mt-6 sm:mt-8 leading-[1.15]">
              Lengkapi Profil Keahlian
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#5e5e5e] mt-3 sm:mt-4 leading-relaxed font-normal">
              Profil ini dilihat barbershop saat Anda melamar atau menerima tugas shift.
            </p>

            {/* Back Link */}
            <Link
              className="inline-flex items-center gap-2 mt-8 sm:mt-12 text-[#5e5e5e] hover:text-[#1b1b1b] transition-all duration-200 hover:-translate-x-1 text-xs sm:text-sm font-bold"
              href="/register/role"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Kembali</span>
            </Link>
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div className="w-full lg:w-[600px] xl:w-[640px] shrink-0">
            <div className="bg-white border border-[#e6dfd3]/80 rounded-[14px] p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md">
              <form className="flex flex-col space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                {/* 1. Nama Lengkap */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="full-name"
                  >
                    Nama Lengkap Capster
                  </label>
                  <input
                    className="w-full h-12 bg-white border border-[#e0c0b2]/80 rounded-[10px] px-4 text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none focus:border-[#f26b21] focus:ring-2 focus:ring-[#f26b21]/20 transition-all"
                    id="full-name"
                    placeholder="contoh: Arya Pratama"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                {/* 2. Email Akun */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="email"
                  >
                    Email Akun
                  </label>
                  <input
                    className="w-full h-12 bg-white border border-[#e0c0b2]/80 rounded-[10px] px-4 text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none focus:border-[#f26b21] focus:ring-2 focus:ring-[#f26b21]/20 transition-all"
                    id="email"
                    name="email"
                    placeholder="nama@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-[11px] sm:text-xs text-[#5e5e5e]">
                    Digunakan untuk login ke akun BarberCraft Anda.
                  </p>
                </div>

                {/* 3. Kata Sandi */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="password"
                  >
                    Kata Sandi
                  </label>
                  <div className="relative flex items-center border border-[#e0c0b2]/80 rounded-[10px] bg-white focus-within:border-[#f26b21] focus-within:ring-2 focus-within:ring-[#f26b21]/20 transition-all">
                    <input
                      className="w-full h-12 pl-4 pr-24 bg-transparent text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none border-none"
                      id="password"
                      name="password"
                      placeholder="Minimal 6 karakter"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-3.5 text-xs font-bold text-[#5e5e5e] hover:text-[#1b1b1b] cursor-pointer select-none transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? "Sembunyikan" : "Tampilkan"}
                    </button>
                  </div>
                </div>

                {/* 4. Pengalaman Kerja (Dropdown) */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="experience"
                  >
                    Pengalaman Kerja
                  </label>
                  <select
                    className="w-full h-12 bg-white border border-[#e0c0b2]/80 rounded-[10px] px-4 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#f26b21] focus:ring-2 focus:ring-[#f26b21]/20 transition-all cursor-pointer"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Pilih lama pengalaman
                    </option>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Nomor WhatsApp Aktif */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="whatsapp"
                  >
                    Nomor WhatsApp Aktif
                  </label>
                  <div className="flex items-center h-12 bg-white border border-[#e0c0b2]/80 rounded-[10px] focus-within:border-[#f26b21] focus-within:ring-2 focus-within:ring-[#f26b21]/20 transition-all overflow-hidden">
                    <span className="px-3.5 sm:px-4 text-xs sm:text-sm font-bold text-[#1b1b1b] bg-[#f6f3f2] border-r border-[#e0c0b2]/80 flex items-center h-full select-none shrink-0">
                      +62
                    </span>
                    <input
                      className="w-full h-full bg-transparent px-4 text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none border-none"
                      id="whatsapp"
                      placeholder="812 3456 7890"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#5e5e5e]">
                    Untuk notifikasi shift dan booking dari barbershop.
                  </p>
                </div>

                {/* 6. Keahlian Utama (Chips selector) */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#1b1b1b]">
                    Keahlian Utama
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SKILL_OPTIONS.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`h-9 px-3.5 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                            isSelected
                              ? "bg-[#1b1b1b] text-white border-[#1b1b1b] shadow-xs scale-102"
                              : "bg-white text-[#1b1b1b] border-[#e0c0b2]/80 hover:border-[#f26b21] hover:bg-[#fff9f0]"
                          }`}
                        >
                          <span>{skill}</span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-sm">check</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Ekspektasi Tarif Harian */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="rate"
                  >
                    Ekspektasi Tarif Harian
                  </label>
                  <div className="flex items-center h-12 bg-white border border-[#e0c0b2]/80 rounded-[10px] focus-within:border-[#f26b21] focus-within:ring-2 focus-within:ring-[#f26b21]/20 transition-all overflow-hidden">
                    <span className="px-3.5 sm:px-4 text-xs sm:text-sm font-bold text-[#5e5e5e] bg-[#f6f3f2] border-r border-[#e0c0b2]/80 flex items-center h-full select-none shrink-0">
                      Rp
                    </span>
                    <input
                      className="w-full h-full bg-transparent px-4 text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none border-none font-semibold"
                      id="rate"
                      placeholder="200.000"
                      type="text"
                      value={expectedRate}
                      onChange={(e) => setExpectedRate(e.target.value)}
                    />
                    <span className="px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-[#5e5e5e] bg-[#f6f3f2] border-l border-[#e0c0b2]/80 flex items-center h-full select-none shrink-0">
                      / shift
                    </span>
                  </div>
                </div>

                {/* 8. Foto Portofolio / Hasil Potong (Opsional) */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#1b1b1b]">
                      Foto Portofolio / Hasil Potong
                    </label>
                    <span className="text-[#5e5e5e] text-xs font-normal">(opsional)</span>
                  </div>
                  <div className="w-full h-32 rounded-[12px] border-2 border-dashed border-[#e0c0b2] bg-[#fcf9f8] flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-9 h-9 rounded-lg bg-[#f1dccc] flex items-center justify-center text-[#f26b21] mb-1.5">
                      <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                    </div>
                    <p className="text-xs font-bold text-[#1b1b1b]">Tarik dan lepas foto di sini</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        className="h-7 px-3 rounded-[6px] border border-[#e0c0b2] bg-white text-[#1b1b1b] text-[11px] font-bold hover:border-[#f26b21] transition-colors cursor-pointer"
                        onClick={() => alert("Fitur unggah file foto portofolio segera hadir.")}
                      >
                        Pilih foto
                      </button>
                      <span className="text-[#5e5e5e] text-[11px]">Maks 3 foto</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-3 sm:pt-4">
                  <button
                    className={`w-full h-12 rounded-[10px] font-bold text-sm flex items-center justify-center transition-all ${
                      isFormValid
                        ? "bg-[#f26b21] hover:bg-[#d95a16] text-white active:scale-98 cursor-pointer shadow-sm"
                        : "bg-[#f26b21] text-white opacity-40 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid || isSubmitting}
                    id="submit-btn"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Menyimpan Profil...</span>
                      </div>
                    ) : (
                      "Selesaikan & Cari Shift"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f6f3f2] border-t border-[#e6dfd3]/60 py-6 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between text-[#594238] text-xs gap-3">
          <p className="text-center md:text-left">
            © 2026 BarberCraft. Solusi Digital Barbershop &amp; Tukang Cukur Profesional.
          </p>
          <div className="flex items-center gap-5 sm:gap-6">
            <a className="hover:text-[#1b1b1b] transition-colors" href="#">
              Bantuan
            </a>
            <a className="hover:text-[#1b1b1b] transition-colors" href="#">
              Syarat &amp; Ketentuan
            </a>
            <a className="hover:text-[#1b1b1b] transition-colors" href="#">
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

