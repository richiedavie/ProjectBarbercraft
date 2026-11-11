"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterOwnerPage() {
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [seatCount, setSeatCount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form valid jika Nama, Email, Password, WhatsApp, dan Alamat terisi
  const isFormValid =
    shopName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length >= 6 &&
    whatsapp.trim().length > 0 &&
    address.trim().length > 0;

  const handleIncrement = () => {
    setSeatCount((prev) => (prev === null ? 1 : prev + 1));
  };

  const handleDecrement = () => {
    setSeatCount((prev) => {
      if (prev === null) return null;
      if (prev <= 1) return null;
      return prev - 1;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      alert("Pendaftaran Barbershop berhasil! Selamat datang di BarberCraft.");
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
              Langkah 2 dari 2: Data Barbershop
            </span>

            {/* 2-Segment Progress Bar (Both Active/Filled) */}
            <div className="w-full grid grid-cols-2 gap-1.5 mt-2.5">
              <div className="h-1 bg-[#f26b21] rounded-full"></div>
              <div className="h-1 bg-[#f26b21] rounded-full"></div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1b1b1b] tracking-tight mt-6 sm:mt-8 leading-[1.15]">
              Lengkapi Data Barbershop
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#5e5e5e] mt-3 sm:mt-4 leading-relaxed font-normal">
              Data ini membantu capster menemukan dan menghubungi barbershop Anda.
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
                {/* 1. Nama Barbershop */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="shop-name"
                  >
                    Nama Barbershop
                  </label>
                  <input
                    className="w-full h-12 bg-white border border-[#e0c0b2]/80 rounded-[10px] px-4 text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none focus:border-[#f26b21] focus:ring-2 focus:ring-[#f26b21]/20 transition-all"
                    id="shop-name"
                    placeholder="contoh: Roots Barbershop Studio"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
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
                    Digunakan untuk masuk ke akun BarberCraft Anda.
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

                {/* 4. WhatsApp Number */}
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
                    Untuk koordinasi dengan capster.
                  </p>
                </div>

                {/* 3. Alamat & Kota */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label
                    className="text-xs sm:text-sm font-bold text-[#1b1b1b]"
                    htmlFor="address"
                  >
                    Alamat Lengkap &amp; Kota
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#e0c0b2]/80 rounded-[10px] p-3 sm:px-4 text-sm text-[#1b1b1b] placeholder:text-[#8c7166]/60 focus:outline-none focus:border-[#f26b21] focus:ring-2 focus:ring-[#f26b21]/20 transition-all resize-none"
                    id="address"
                    placeholder="Nama jalan, nomor, kecamatan, dan kota"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <div className="pt-1">
                    <button
                      className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-[#f6f3f2] hover:bg-[#f0eded] border border-[#e0c0b2]/60 rounded-[8px] text-[#1b1b1b] text-xs font-bold transition-colors cursor-pointer"
                      type="button"
                      onClick={() => alert("Fitur penanda peta GPS segera hadir.")}
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#5e5e5e]">
                        location_on
                      </span>
                      <span>Pilih lokasi di peta</span>
                    </button>
                  </div>
                </div>

                {/* 4. Jumlah Kursi/Spot Aktif */}
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#1b1b1b]">
                    Jumlah Kursi/Spot Aktif{" "}
                    <span className="text-[#5e5e5e] font-normal text-xs">(opsional)</span>
                  </label>
                  <div
                    className="flex items-center w-40 h-12 bg-[#f6f3f2] border border-[#e0c0b2]/80 rounded-[10px] overflow-hidden"
                    id="stepper-container"
                  >
                    <button
                      aria-label="Kurangi kursi"
                      className="w-12 h-12 flex items-center justify-center text-[#1b1b1b] hover:bg-[#f0eded] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      id="btn-decrement"
                      type="button"
                      onClick={handleDecrement}
                      disabled={seatCount === null}
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <div
                      className={`flex-1 text-center font-bold text-sm select-none ${
                        seatCount === null ? "text-[#8c7166]/60 font-normal" : "text-[#1b1b1b]"
                      }`}
                      id="stepper-value"
                    >
                      {seatCount === null ? "contoh: 3" : seatCount}
                    </div>
                    <button
                      aria-label="Tambah kursi"
                      className="w-12 h-12 flex items-center justify-center text-[#1b1b1b] hover:bg-[#f0eded] transition-colors cursor-pointer"
                      id="btn-increment"
                      type="button"
                      onClick={handleIncrement}
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
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
                        <span>Menyimpan Data...</span>
                      </div>
                    ) : (
                      "Selesaikan & Masuk Dashboard"
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

