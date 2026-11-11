"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RoleType = "owner" | "barber" | null;

export default function RegisterRolePage() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedRole) return;
    if (selectedRole === "owner") {
      router.push("/register/owner");
    } else if (selectedRole === "barber") {
      router.push("/register/barber");
    }
  };

  return (
    <div className="bg-[#fcf9f8] text-[#1b1b1b] min-h-screen flex flex-col justify-between font-sans selection:bg-[#f26b21] selection:text-white">
      {/* Top App Bar / Header */}
      <header className="sticky top-0 w-full z-50 bg-[#fcf9f8]/90 backdrop-blur-md border-b border-[#e6dfd3]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 sm:h-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#f1dccc] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[#a23f00] text-[20px] sm:text-[22px]">
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
              className="text-xs sm:text-sm font-semibold text-[#594238] hover:text-[#1b1b1b] transition-colors"
            >
              Sudah Punya Akun? Masuk
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#a23f00] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Role Selection Area */}
      <main className="w-full flex-grow flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up">
        <div className="w-full max-w-[880px] flex flex-col items-center">
          {/* Progress Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-[#5e5e5e] tracking-wide">
              Langkah 1 dari 2
            </span>
            <div className="w-[240px] sm:w-[320px] h-1 flex gap-1.5 mt-2.5">
              <div className="flex-1 h-full bg-[#f26b21] rounded-full transition-all duration-500"></div>
              <div className="flex-1 h-full bg-[#e0c0b2]/60 rounded-full"></div>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="text-center mt-6 sm:mt-7 mb-8 sm:mb-10 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1b1b1b] tracking-tight leading-tight">
              Pilih Peran Anda
            </h1>
            <p className="text-sm sm:text-base text-[#5e5e5e] mt-2 font-normal max-w-md mx-auto">
              Bagaimana Anda ingin menggunakan BarberCraft hari ini?
            </p>
          </div>

          {/* Role Selection Cards Grid */}
          <div
            aria-label="Pilih Peran"
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            role="radiogroup"
          >
            {/* Role 1: Pemilik Barbershop */}
            <div
              aria-checked={selectedRole === "owner"}
              className={`role-card group cursor-pointer bg-white p-6 sm:p-7 rounded-[14px] flex flex-col justify-between transition-all duration-200 outline-none hover:-translate-y-1 hover:shadow-md ${
                selectedRole === "owner"
                  ? "ring-2 ring-[#f26b21] shadow-md bg-white -translate-y-1"
                  : "ring-1 ring-[#e0c0b2]/70 hover:ring-[#f26b21]/70 bg-white"
              }`}
              id="card-owner"
              onClick={() => setSelectedRole("owner")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedRole("owner");
                }
              }}
              role="radio"
              tabIndex={0}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-[#f1dccc]/70 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined text-[#f26b21] text-[26px]">
                      storefront
                    </span>
                  </div>
                  {/* Custom Radio Button */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all bg-white ${
                      selectedRole === "owner"
                        ? "ring-2 ring-[#f26b21]"
                        : "ring-1 ring-[#e0c0b2]/80"
                    }`}
                  >
                    {selectedRole === "owner" && (
                      <div className="w-3 h-3 rounded-full bg-[#f26b21]"></div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="inline-block px-2.5 py-1 rounded-full ring-1 ring-[#e0c0b2]/80 text-[#5e5e5e] text-[11px] font-bold tracking-wider uppercase">
                    PEMILIK USAHA
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#1b1b1b] mt-3">
                  Pemilik Barbershop
                </h2>
                <p className="text-sm text-[#5e5e5e] leading-relaxed mt-2">
                  Saya ingin posting shift harian, mencari capster pengganti, dan kelola operasional.
                </p>
              </div>

              <div className="pt-6 mt-6 flex items-center gap-2 border-t border-[#f0eded]">
                <span
                  className={`material-symbols-outlined text-[18px] transition-colors ${
                    selectedRole === "owner"
                      ? "text-[#f26b21]"
                      : "text-[#8c7166] group-hover:text-[#f26b21]"
                  }`}
                >
                  check_circle
                </span>
                <span className="text-xs text-[#5e5e5e]">
                  Akses fitur posting jadwal &amp; kelola gerai
                </span>
              </div>
            </div>

            {/* Role 2: Capster / Barber */}
            <div
              aria-checked={selectedRole === "barber"}
              className={`role-card group cursor-pointer bg-white p-6 sm:p-7 rounded-[14px] flex flex-col justify-between transition-all duration-200 outline-none hover:-translate-y-1 hover:shadow-md ${
                selectedRole === "barber"
                  ? "ring-2 ring-[#f26b21] shadow-md bg-white -translate-y-1"
                  : "ring-1 ring-[#e0c0b2]/70 hover:ring-[#f26b21]/70 bg-white"
              }`}
              id="card-barber"
              onClick={() => setSelectedRole("barber")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedRole("barber");
                }
              }}
              role="radio"
              tabIndex={0}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-[#f1dccc]/70 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#f26b21] text-[26px]">
                      content_cut
                    </span>
                  </div>
                  {/* Custom Radio Button */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all bg-white ${
                      selectedRole === "barber"
                        ? "ring-2 ring-[#f26b21]"
                        : "ring-1 ring-[#e0c0b2]/80"
                    }`}
                  >
                    {selectedRole === "barber" && (
                      <div className="w-3 h-3 rounded-full bg-[#f26b21]"></div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="inline-block px-2.5 py-1 rounded-full ring-1 ring-[#e0c0b2]/80 text-[#5e5e5e] text-[11px] font-bold tracking-wider uppercase">
                    CAPSTER FREELANCE
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#1b1b1b] mt-3">
                  Capster / Barber
                </h2>
                <p className="text-sm text-[#5e5e5e] leading-relaxed mt-2">
                  Saya ingin cari shift harian, melamar proyek barbershop, dan dapat bayaran langsung.
                </p>
              </div>

              <div className="pt-6 mt-6 flex items-center gap-2 border-t border-[#f0eded]">
                <span
                  className={`material-symbols-outlined text-[18px] transition-colors ${
                    selectedRole === "barber"
                      ? "text-[#f26b21]"
                      : "text-[#8c7166] group-hover:text-[#f26b21]"
                  }`}
                >
                  check_circle
                </span>
                <span className="text-xs text-[#5e5e5e]">
                  Pencairan upah instan langsung ke rekening
                </span>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="w-full mt-8 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-4">
            <span className="text-xs sm:text-sm text-[#5e5e5e] order-2 sm:order-1 text-center sm:text-left">
              {selectedRole
                ? `Peran dipilih: ${
                    selectedRole === "owner" ? "Pemilik Barbershop" : "Capster / Barber"
                  }`
                : "Pilih salah satu untuk melanjutkan."}
            </span>
            <button
              className={`w-full sm:w-[220px] h-12 rounded-[10px] font-bold text-sm flex items-center justify-center transition-all duration-200 order-1 sm:order-2 ${
                selectedRole
                  ? "bg-[#f26b21] hover:bg-[#d95a16] text-white cursor-pointer active:scale-95 shadow-md hover:shadow-lg hover:shadow-[#f26b21]/20"
                  : "bg-[#f26b21] text-white opacity-40 cursor-not-allowed"
              }`}
              disabled={!selectedRole}
              onClick={handleContinue}
              type="button"
            >
              Lanjutkan Pendaftaran
            </button>
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

