"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Berhasil masuk! Mengalihkan ke dashboard...");
    window.location.href = "/";
  };

  return (
    <div className="bg-[#FFF9F0] text-[#1B1B1B] antialiased min-h-screen lg:h-screen w-full selection:bg-[#F26B21] selection:text-white flex flex-col lg:flex-row overflow-x-hidden font-sans">
      {/* Left Column: Form & Brand Area */}
      <div className="w-full lg:w-1/2 bg-[#FFF9F0] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 lg:h-screen lg:overflow-y-auto">
        {/* Top-left Wordmark */}
        <header className="flex items-center shrink-0 mb-6 lg:mb-0">
          <Link
            className="inline-flex items-center gap-2 group transition-transform active:scale-[0.98]"
            href="/"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F26B21] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg" data-icon="content_cut">
                content_cut
              </span>
            </div>
            <span className="text-[20px] font-bold tracking-tight text-[#1B1B1B]">
              Barber<span className="text-[#F26B21]">Craft</span>
            </span>
          </Link>
        </header>

        {/* Vertically Centered Form Container */}
        <main className="my-auto mx-auto w-full max-w-[420px] py-4 lg:py-6">
          {/* Header Text */}
          <div className="mb-5 sm:mb-6">
            <h1 className="text-2xl sm:text-[30px] lg:text-[32px] leading-tight font-bold text-[#1B1B1B] tracking-tight mb-1.5 sm:mb-2">
              Masuk ke BarberCraft
            </h1>
            <p className="text-xs sm:text-sm font-normal text-[#5C5C5C]">
              Lanjutkan untuk melihat dan mengelola shift.
            </p>
          </div>

          {/* Form Card Container */}
          <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-7 shadow-[0_1px_2px_rgba(27,27,27,0.06)] space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-bold text-[#1B1B1B] tracking-wider uppercase"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full min-h-[46px] sm:min-h-[48px] px-4 bg-white text-sm font-normal text-[#1B1B1B] placeholder-[#8C8479] border border-[#E6DFD3] rounded-[10px] focus:outline-none focus:border-[#F26B21] focus:ring-2 focus:ring-[#F26B21]/20 transition-all duration-150"
                  id="email"
                  name="email"
                  placeholder="nama@email.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field with inline Lupa kata sandi */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="block text-xs font-bold text-[#1B1B1B] tracking-wider uppercase"
                    htmlFor="password"
                  >
                    Kata sandi
                  </label>
                  <a
                    className="text-xs text-[#F26B21] hover:underline focus:outline-none font-medium"
                    href="#"
                  >
                    Lupa kata sandi?
                  </a>
                </div>
                <div className="relative flex items-center border border-[#E6DFD3] rounded-[10px] bg-white focus-within:border-[#F26B21] focus-within:ring-2 focus-within:ring-[#F26B21]/20 transition-all duration-150">
                  <input
                    className="w-full min-h-[46px] sm:min-h-[48px] pl-4 pr-24 bg-transparent text-sm font-normal text-[#1B1B1B] placeholder-[#8C8479] border-none focus:ring-0 focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-3.5 sm:right-4 text-xs font-bold text-[#5C5C5C] hover:text-[#1B1B1B] cursor-pointer select-none transition-colors"
                    id="togglePassword"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                className="w-full min-h-[46px] sm:min-h-[48px] bg-[#F26B21] hover:bg-[#d95a16] active:scale-[0.98] text-white font-bold text-sm rounded-[10px] flex items-center justify-center transition-all duration-150 cursor-pointer shadow-none"
                type="submit"
              >
                Masuk
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-1.5 items-center">
              <div className="flex-grow border-t border-[#E6DFD3]"></div>
              <span className="flex-shrink mx-3 text-[11px] font-bold text-[#5C5C5C] bg-white px-2">
                atau
              </span>
              <div className="flex-grow border-t border-[#E6DFD3]"></div>
            </div>

            {/* Google SSO Button */}
            <button
              className="w-full min-h-[46px] sm:min-h-[48px] bg-white border border-[#E6DFD3] text-[#1B1B1B] font-bold text-sm rounded-[10px] flex items-center justify-center gap-3 hover:bg-[#FFF9F0] active:scale-[0.98] transition-all duration-150 cursor-pointer"
              type="button"
            >
              <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                  fill="#34A853"
                />
                <path
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  fill="#EA4335"
                />
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </div>

          {/* Registration Link */}
          <p className="text-xs sm:text-sm font-normal text-[#1B1B1B] text-center mt-4 sm:mt-5">
            Belum punya akun?{" "}
            <a
              className="text-[#F26B21] font-bold text-xs sm:text-sm hover:underline cursor-pointer ml-1"
              href="#"
            >
              Daftar
            </a>
          </p>

          {/* Legal Disclaimer */}
          <p className="text-[11px] sm:text-xs font-normal text-[#5C5C5C] text-center mt-5 sm:mt-6 leading-relaxed">
            Dengan masuk, kamu menyetujui{" "}
            <a className="underline hover:text-[#1B1B1B]" href="#">
              Ketentuan Layanan
            </a>{" "}
            dan{" "}
            <a className="underline hover:text-[#1B1B1B]" href="#">
              Kebijakan Privasi
            </a>
            .
          </p>
        </main>

        {/* Bottom subtle copyright */}
        <footer className="pt-4 shrink-0 text-center lg:text-left">
          <p className="text-xs font-normal text-[#5C5C5C]">
            © 2026 BarberCraft
          </p>
        </footer>
      </div>

      {/* Right Column: Full-Height Barber Photo & Micro Floating Card */}
      <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[420px] lg:h-screen overflow-hidden bg-[#F0E4D3] shrink-0">
        <img
          alt="BarberCraft Artisanal Barbershop"
          className="w-full h-full object-cover object-center absolute inset-0 select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt2rdMnq6rbPdYp7fAdaXn9PRfCmVd1Y311pEvR5qtB3BqIuJabWjDI_yCv6OCVOiJHP6Wmx95BhTY6dnF7LZ3K2aw2_Y1OwA4OzXNLgt92H51TKa0E7STFbZIWG5nQEsiWeTAk1Phda51Bu831JROSNmXb21VBG9OfG1jfmq1xpQAm2Lm_w84gWb-Iiq-qza8eQHaikk2TUUlEFfWFeKP7waqE-g2qwUGhQ3mDiix"
        />
        {/* Floating Anchor Card in Bottom-Left Corner */}
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto max-w-sm z-10">
          <div className="bg-white/95 backdrop-blur-xs border border-[#E6DFD3] rounded-[12px] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <p className="font-bold text-[#1B1B1B] text-sm sm:text-base leading-snug">
              Shift berikutnya mulai di sini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
