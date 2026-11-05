"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* TOP APP BAR */}
      <header className="sticky top-0 w-full z-50 bg-[#FFF9F0] border-b border-[#E6DFD3] shadow-xs">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto h-16">
          {/* Brand & Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F26B21] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-lg sm:text-xl">content_cut</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] sm:text-[20px] font-bold text-[#1B1B1B] tracking-tight leading-none">
                BarberCraft
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C8479] tracking-wider uppercase mt-0.5">
                Capster Outsourcing Agency
              </span>
            </div>
          </Link>

          {/* Center Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a
              className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
              href="#katalog-capster"
            >
              Katalog Capster
            </a>
            <a
              className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
              href="#skema-outsourcing"
            >
              Skema Penempatan
            </a>
            <a
              className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
              href="#cara-kerja"
            >
              Cara Sewa
            </a>
            <a
              className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
              href="#keunggulan"
            >
              Keunggulan
            </a>
          </nav>

          {/* Trailing Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              className="hidden md:inline-block text-xs sm:text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors py-2"
              href="#gabung-tim"
            >
              Gabung Jadi Capster
            </a>
            <Link
              className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-[10px] transition-all duration-150 shadow-none font-bold inline-flex items-center gap-1.5 shrink-0"
              href="/login"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>Sewa Capster</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1B1B1B] hover:text-[#F26B21] focus:outline-none cursor-pointer"
              aria-label="Toggle menu navigasi"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF9F0] border-b border-[#E6DFD3] px-4 py-4 space-y-3 shadow-md animate-in slide-in-from-top duration-200">
            <a
              className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
              href="#katalog-capster"
              onClick={() => setMobileMenuOpen(false)}
            >
              Katalog Capster
            </a>
            <a
              className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
              href="#skema-outsourcing"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skema Penempatan
            </a>
            <a
              className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cara Sewa
            </a>
            <a
              className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
            >
              Keunggulan
            </a>
            <div className="pt-2 border-t border-[#E6DFD3] flex flex-col gap-2">
              <a
                className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
                href="#gabung-tim"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gabung Jadi Capster
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CANVAS */}
      <main className="w-full flex-grow">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (60%) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B1B1B] leading-[1.2] sm:leading-[1.15] tracking-tight">
                Outsourcing Capster Handal untuk Barbershop Anda.
              </h1>
              <p className="text-sm sm:text-base text-[#5C5C5C] font-medium mt-4 sm:mt-5 max-w-xl leading-relaxed">
                Kami melatih, menguji, dan menempatkan capster profesional langsung ke barbershop Anda.
                Tersedia untuk pengganti shift harian, kontrak bulanan, hingga tim ekspansi cabang baru tanpa pusing rekrutmen.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mt-6 sm:mt-8">
                <a
                  className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold py-3.5 px-6 sm:px-8 rounded-[10px] text-sm sm:text-base text-center transition-all duration-150 inline-flex justify-center items-center gap-2"
                  href="#katalog-capster"
                >
                  <span className="material-symbols-outlined text-lg sm:text-xl">person_search</span>
                  <span>Pilih Capster Siap Kerja</span>
                </a>
                <a
                  className="bg-white hover:bg-[#F7F2E8] active:scale-95 text-[#1B1B1B] border border-[#1B1B1B] font-bold py-3.5 px-6 sm:px-8 rounded-[10px] text-sm sm:text-base text-center transition-all duration-150 inline-flex justify-center items-center gap-2"
                  href="#rekrut-sekarang"
                >
                  <span className="material-symbols-outlined text-lg sm:text-xl">support_agent</span>
                  <span>Konsultasi Kebutuhan</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-[#E6DFD3]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#236B47]">verified_user</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#1B1B1B]">100% Lulus Uji Standar BarberCraft</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#236B47]">published_with_changes</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#1B1B1B]">Garansi Ganti Capster 24 Jam</span>
                </div>
              </div>
            </div>

            {/* Right Column (40%) */}
            <div className="lg:col-span-5">
              <div className="relative w-full rounded-[12px] border border-[#E6DFD3] overflow-hidden bg-white shadow-sm h-[280px] sm:h-[350px] lg:h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="BarberCraft Professional Outsource Capster"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPBzSAwy-9wa38AX3Fu1J3aSfIDHifz-VOeus1YulFd2xfGfqgZYLAJk2b_f5dpUdVRb3qNKSTxVQfKDmW6RoyOjg0MsLacWQ8FbDV5NLZsO3IrzRwtzT_S9DYs6TjbbCgV_1BgYVv0-BEO3GR_ma6zIAiGerqp46WRe3dATRl2ieoLs8NSqi4I79cdWkLAGjj25ySfD3TW-A1LYWEFdnx7CNQ4LaIskt2U-Oj6WSw"
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-sm border border-[#E6DFD3] p-3 rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1B1B1B] block">Siap Penempatan Instan</span>
                    <span className="text-[10px] sm:text-[11px] text-[#5C5C5C]">Wilayah Jabodetabek & sekitarnya</span>
                  </div>
                  <span className="bg-[#E7EFEA] text-[#0F5C3A] text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-md shrink-0">
                    25+ Siap Tugaskan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KATALOG CAPSTER OUTSOURCE KAMI (Katalog Tenaga Kerja Tersedia) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12" id="katalog-capster">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[24px] sm:text-[28px] md:text-[30px] leading-tight text-[#1B1B1B] font-bold mb-1.5">
              Capster Siap Ditempatkan
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C]">
              Pilih profil capster internal binaan BarberCraft sesuai spesialisasi dan kebutuhan barbershop Anda.
            </p>
          </div>

          {/* 3-Column Card Grid (Profil Capster yang di-outsource) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm flex flex-col justify-between hover:border-[#F26B21]/60 transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FFF1E6] border border-[#F26B21]/20 flex items-center justify-center text-[#F26B21] font-extrabold text-base shrink-0">
                      AP
                    </div>
                    <div>
                      <h3 className="text-base text-[#1B1B1B] font-bold">Arya Pratama</h3>
                      <p className="text-xs text-[#5C5C5C] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-sm text-[#0F5C3A]">verified</span>
                        Senior Barber • 5 Th Pengalaman
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#E7EFEA] text-[#0F5C3A] text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0">
                    Standby
                  </span>
                </div>

                <div className="my-4 pt-3 pb-3 border-y border-[#E6DFD3]/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#5C5C5C] block">Rate Penempatan</span>
                    <span className="text-base text-[#F26B21] font-extrabold">Mulai Rp 200rb<span className="text-xs font-normal text-[#5C5C5C]">/hari</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#5C5C5C] block">Area Jangkauan</span>
                    <span className="text-xs text-[#1B1B1B] font-bold">Jaksel &amp; Depok</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Skin Fade
                    </span>
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      French Crop
                    </span>
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Hot Towel
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A7A7A] italic mt-2">
                    Disiplin waktu, ramah pelanggan, membawa perlengkapan standar profesional.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white py-3 rounded-[10px] w-full font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Penempatan</span>
                <span className="material-symbols-outlined text-base">send</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm flex flex-col justify-between hover:border-[#F26B21]/60 transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FFF1E6] border border-[#F26B21]/20 flex items-center justify-center text-[#F26B21] font-extrabold text-base shrink-0">
                      BS
                    </div>
                    <div>
                      <h3 className="text-base text-[#1B1B1B] font-bold">Bagas Saputra</h3>
                      <p className="text-xs text-[#5C5C5C] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-sm text-[#0F5C3A]">verified</span>
                        Fade Specialist • 4 Th Pengalaman
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#E7EFEA] text-[#0F5C3A] text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0">
                    Standby
                  </span>
                </div>

                <div className="my-4 pt-3 pb-3 border-y border-[#E6DFD3]/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#5C5C5C] block">Rate Penempatan</span>
                    <span className="text-base text-[#F26B21] font-extrabold">Mulai Rp 220rb<span className="text-xs font-normal text-[#5C5C5C]">/hari</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#5C5C5C] block">Area Jangkauan</span>
                    <span className="text-xs text-[#1B1B1B] font-bold">Jakpus &amp; Jaksel</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Taper Fade
                    </span>
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Pompadour
                    </span>
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Coloring
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A7A7A] italic mt-2">
                    Spesialis potongan modern &amp; teknik gradasi tajam, menguasai komunikasi kasir.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white py-3 rounded-[10px] w-full font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Penempatan</span>
                <span className="material-symbols-outlined text-base">send</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm flex flex-col justify-between hover:border-[#F26B21]/60 transition-all md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FFF1E6] border border-[#F26B21]/20 flex items-center justify-center text-[#F26B21] font-extrabold text-base shrink-0">
                      FR
                    </div>
                    <div>
                      <h3 className="text-base text-[#1B1B1B] font-bold">Fajar Ramadhan</h3>
                      <p className="text-xs text-[#5C5C5C] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-sm text-[#0F5C3A]">verified</span>
                        All-Round Barber • 6 Th Pengalaman
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#FFF1E6] text-[#F26B21] text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0">
                    Shift Siang
                  </span>
                </div>

                <div className="my-4 pt-3 pb-3 border-y border-[#E6DFD3]/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#5C5C5C] block">Rate Penempatan</span>
                    <span className="text-base text-[#F26B21] font-extrabold">Mulai Rp 250rb<span className="text-xs font-normal text-[#5C5C5C]">/hari</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#5C5C5C] block">Area Jangkauan</span>
                    <span className="text-xs text-[#1B1B1B] font-bold">Tangsel &amp; Jakbar</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Classic Cuts
                    </span>
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Beard Sculpting
                    </span>
                    <span className="bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] text-xs font-semibold px-2.5 py-1 rounded-md">
                      Head Massage
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A7A7A] italic mt-2">
                    Terbiasa melayani barbershop premium dengan hospitality bintang lima.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white py-3 rounded-[10px] w-full font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Penempatan</span>
                <span className="material-symbols-outlined text-base">send</span>
              </Link>
            </div>
          </div>
        </section>

        {/* TIGA SKEMA OUTSOURCING */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12" id="skema-outsourcing">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#1B1B1B]">
              Skema Outsourcing yang Fleksibel
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1">
              Sesuaikan dengan situasi barbershop Anda: darurat capster cuti, jam sibuk akhir pekan, atau ekspansi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Skema 1 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 shadow-sm flex flex-col justify-between hover:border-[#F26B21]/50 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[10px] bg-[#FFF9F0] border border-[#E6DFD3] flex items-center justify-center text-[#F26B21] mb-5">
                  <span className="material-symbols-outlined text-2xl">schedule</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B] mb-2">Shift Harian &amp; Pengganti</h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed">
                  Solusi cepat saat capster Anda mendadak sakit atau libur. Penempatan 1-7 hari tanpa komitmen panjang.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E6DFD3]">
                <a
                  className="text-[#F26B21] font-semibold text-sm inline-flex items-center gap-1 hover:underline"
                  href="#rekrut-sekarang"
                >
                  <span>Minta capster harian</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Skema 2 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 shadow-sm flex flex-col justify-between hover:border-[#F26B21]/50 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[10px] bg-[#FFF9F0] border border-[#E6DFD3] flex items-center justify-center text-[#F26B21] mb-5">
                  <span className="material-symbols-outlined text-2xl">contract</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B] mb-2">Kontrak Dedicated (3-12 Bulan)</h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed">
                  Penempatan capster tetap untuk gerai Anda. Urusan payroll, BPJS, evaluasi kinerja, dan pengganti saat cuti kami yang tanggung.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E6DFD3]">
                <a
                  className="text-[#F26B21] font-semibold text-sm inline-flex items-center gap-1 hover:underline"
                  href="#rekrut-sekarang"
                >
                  <span>Konsultasi kontrak</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Skema 3 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 shadow-sm flex flex-col justify-between hover:border-[#F26B21]/50 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[10px] bg-[#FFF9F0] border border-[#E6DFD3] flex items-center justify-center text-[#F26B21] mb-5">
                  <span className="material-symbols-outlined text-2xl">storefront</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B] mb-2">Paket Cabang Baru &amp; Event</h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed">
                  Buka cabang baru tanpa hambatan SDM. Kami sediakan 2-5 capster sekaligus lengkap dengan pelatihan SOP brand Anda.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E6DFD3]">
                <a
                  className="text-[#F26B21] font-semibold text-sm inline-flex items-center gap-1 hover:underline"
                  href="#rekrut-sekarang"
                >
                  <span>Pelajari paket cabang</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CARA KERJA OUTSOURCING */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12" id="cara-kerja">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#1B1B1B]">Alur Kerja Sama</h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1">
              Mudah dan cepat, dari request hingga capster siap melayani pelanggan barbershop Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-[#1B1B1B] mb-1.5">
                Ajukan Kebutuhan Anda
              </h4>
              <p className="text-xs text-[#5C5C5C]">
                Pilih profil capster atau tentukan kriteria skill, jumlah kursi, lokasi, dan durasi kerja yang diinginkan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-[#1B1B1B] mb-1.5">Pencocokan &amp; Briefing SOP</h4>
              <p className="text-xs text-[#5C5C5C]">
                Kami siapkan capster terbaik dan memberikan pembekalan sesuai SOP serta standard operasional barbershop Anda.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-[#1B1B1B] mb-1.5">Penempatan &amp; Tugas</h4>
              <p className="text-xs text-[#5C5C5C]">
                Capster datang tepat waktu dengan seragam rapi, peralatan lengkap, dan siap memangkas pelanggan Anda.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#F26B21] text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h4 className="text-base font-bold text-[#1B1B1B] mb-1.5">
                Monitoring &amp; Garansi
              </h4>
              <p className="text-xs text-[#5C5C5C]">
                Evaluasi kinerja berkala. Jika ada ketidakcocokan, kami sediakan capster pengganti secara instan tanpa biaya tambahan.
              </p>
            </div>
          </div>
        </section>

        {/* KEUNGGULAN OUTSOURCING DENGAN KAMI */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12" id="keunggulan">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#1B1B1B]">
              Kenapa Memilih Outsourcing BarberCraft?
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1">
              Fokus kembangkan bisnis Anda, biar urusan rekrutmen dan manajemen capster kami yang kelola.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Feature 1 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#E7EFEA] text-[#0F5C3A] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B] mb-2">Teruji &amp; Tersertifikasi</h3>
              <p className="text-xs text-[#5C5C5C]">
                Semua capster melewati tes potong langsung, uji kerapian, dan pelatihan etika pelayanan pelanggan standar tinggi.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FFF9F0] text-[#F26B21] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">published_with_changes</span>
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B] mb-2">Garansi Pengganti Cepat</h3>
              <p className="text-xs text-[#5C5C5C]">
                Jika capster berhalangan atau kurang cocok, tim backup kami siap menggantikan dalam waktu kurang dari 24 jam.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FFF9F0] text-[#1B1B1B] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">receipt_long</span>
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B] mb-2">Bebas Beban Administrasi</h3>
              <p className="text-xs text-[#5C5C5C]">
                Tak perlu repot urus kontrak kerja rumit, BPJS, atau pesangon. Semua tagihan transparan dalam satu invoice bulanan.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#E7EFEA] text-[#0F5C3A] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">trending_up</span>
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B] mb-2">Skalabilitas Bisnis</h3>
              <p className="text-xs text-[#5C5C5C]">
                Tambah atau kurangi jumlah capster kapan saja sesuai kapasitas barbershop tanpa risiko operasional berlebih.
              </p>
            </div>
          </div>
        </section>

        {/* BAGI OWNER BARBERSHOP vs CALON CAPSTER */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kolom Barbershop */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-3xl text-[#F26B21]">store</span>
                  <h3 className="text-2xl sm:text-[28px] font-bold text-[#1B1B1B]">Untuk Pemilik Barbershop</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5C5C5C] mb-6">
                  Atasi masalah turn-over capster tinggi dan kursi kosong. Dapatkan tenaga kerja siap pakai dengan skill terjamin.
                </p>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F5C3A] text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-xs sm:text-sm text-[#1B1B1B]">
                      Capster telah lulus kurasi skill teknik potongan &amp; grooming
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F5C3A] text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-xs sm:text-sm text-[#1B1B1B]">
                      Garansi penggantian instan jika kinerja capster tidak memuaskan
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F5C3A] text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-xs sm:text-sm text-[#1B1B1B]">
                      Pilihan penempatan fleksibel: harian, mingguan, atau kontrak tahunan
                    </span>
                  </li>
                </ul>
              </div>
              <a
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white font-bold py-3.5 px-6 rounded-[10px] text-center transition-all duration-150 inline-block w-full text-sm sm:text-base"
                href="#rekrut-sekarang"
              >
                Minta Penempatan Capster
              </a>
            </div>

            {/* Kolom Capster Ingin Bergabung */}
            <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 sm:p-8 shadow-sm flex flex-col justify-between" id="gabung-tim">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-3xl text-[#1B1B1B]">badge</span>
                  <h3 className="text-2xl sm:text-[28px] font-bold text-[#1B1B1B]">Untuk Capster (Karier)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5C5C5C] mb-6">
                  Bergabunglah sebagai capster resmi BarberCraft. Dapatkan kepastian penempatan kerja, jenjang karier, dan penghasilan stabil.
                </p>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F5C3A] text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-xs sm:text-sm text-[#1B1B1B]">
                      Penempatan kerja berkelanjutan di barbershop ternama
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F5C3A] text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-xs sm:text-sm text-[#1B1B1B]">
                      Pendapatan pokok, insentif potongan, dan jaminan perlindungan kerja
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F5C3A] text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-xs sm:text-sm text-[#1B1B1B]">
                      Pelatihan berkala &amp; sertifikasi keahlian barber profesional
                    </span>
                  </li>
                </ul>
              </div>
              <a
                className="bg-white hover:bg-[#F7F2E8] active:scale-95 text-[#1B1B1B] border border-[#1B1B1B] font-bold py-3.5 px-6 rounded-[10px] text-center transition-all duration-150 inline-block w-full text-sm sm:text-base"
                href="#rekrut-sekarang"
              >
                Lamar Jadi Capster BarberCraft
              </a>
            </div>
          </div>
        </section>

        {/* ANGKA & PENCAPAIAN */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E6DFD3]">
              <div className="pt-2 md:pt-0">
                <span className="text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B] font-extrabold block">
                  -
                </span>
                <span className="text-xs sm:text-sm text-[#5C5C5C] mt-1 block">Capster Terlatih Aktif</span>
              </div>
              <div className="pt-2 md:pt-0">
                <span className="text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B] font-extrabold block">
                  -
                </span>
                <span className="text-xs sm:text-sm text-[#5C5C5C] mt-1 block">Mitra Barbershop</span>
              </div>
              <div className="pt-4 md:pt-0">
                <span className="text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B] font-extrabold block">
                  -
                </span>
                <span className="text-xs sm:text-sm text-[#5C5C5C] mt-1 block">Tingkat Retensi Klien</span>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="inline-flex items-center justify-center gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B] font-extrabold">-</span>
                </div>
                <span className="text-xs sm:text-sm text-[#5C5C5C] mt-1 block">Rating Kepuasan Barbershop</span>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 mb-8" id="rekrut-sekarang">
          <div className="bg-[#FFF1E6] border border-[#F26B21]/30 rounded-[12px] p-6 sm:p-10 md:p-12 text-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
              Butuh Capster Cepat &amp; Terpercaya Hari Ini?
            </h2>
            <p className="text-sm sm:text-base text-[#5C5C5C] font-medium mt-3 max-w-xl mx-auto leading-relaxed">
              Hubungi tim kami sekarang. Beritahu kebutuhan barbershop Anda, dan kami siapkan tenaga capster profesional siap kerja.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                className="w-full sm:w-auto bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white px-6 sm:px-8 py-3.5 rounded-[10px] font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all duration-150 shadow-none"
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span>Hubungi via WhatsApp</span>
              </a>
              <a
                className="w-full sm:w-auto bg-white hover:bg-[#F7F2E8] active:scale-95 text-[#1B1B1B] border border-[#1B1B1B] px-6 sm:px-8 py-3.5 rounded-[10px] font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all duration-150"
                href="#katalog-capster"
              >
                <span>Lihat Profil Capster</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#f6f3f2] border-t border-[#E6DFD3] mt-8">
        <div className="w-full px-4 sm:px-6 md:px-8 py-10 sm:py-12 max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10">
          {/* Columns Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Info */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#F26B21] flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-lg">content_cut</span>
                </div>
                <span className="text-xl text-[#1B1B1B] font-bold">BarberCraft</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-sm mb-4">
                Agensi outsourcing dan penyedia tenaga kerja capster profesional terpercaya untuk barbershop di Indonesia.
              </p>
            </div>

            {/* Kolom 1: Layanan */}
            <div>
              <h4 className="text-sm text-[#1B1B1B] font-bold mb-3.5">Layanan</h4>
              <ul className="space-y-2.5 text-xs text-[#5C5C5C]">
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#skema-outsourcing">
                    Penempatan Harian
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#skema-outsourcing">
                    Kontrak Dedicated
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#skema-outsourcing">
                    Tim Buka Cabang Baru
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#skema-outsourcing">
                    Event &amp; Grooming Show
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 2: Perusahaan */}
            <div>
              <h4 className="text-sm text-[#1B1B1B] font-bold mb-3.5">Perusahaan</h4>
              <ul className="space-y-2.5 text-xs text-[#5C5C5C]">
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#tentang">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#gabung-tim">
                    Rekrutmen Capster
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#akademi">
                    BarberCraft Academy
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#kontak">
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Bantuan & Legal */}
            <div>
              <h4 className="text-sm text-[#1B1B1B] font-bold mb-3.5">Bantuan &amp; Legal</h4>
              <ul className="space-y-2.5 text-xs text-[#5C5C5C]">
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#faq">
                    Tanya Jawab (FAQ)
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#garansi">
                    Kebijakan Garansi
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#syarat">
                    Perjanjian Layanan
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F26B21] transition-colors" href="#privasi">
                    Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="pt-6 border-t border-[#E6DFD3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C5C5C]">
            <span>© 2026 BarberCraft - Capster Outsourcing Agency.</span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a className="hover:text-[#1B1B1B] transition-colors" href="#kebijakan">
                Privasi
              </a>
              <a className="hover:text-[#1B1B1B] transition-colors" href="#syarat">
                Syarat &amp; Ketentuan
              </a>
              <a className="hover:text-[#1B1B1B] transition-colors" href="#sop">
                Standar SOP
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
