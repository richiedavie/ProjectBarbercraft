"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AccountMenu } from "@/components/shared/AccountMenu";
import { logoutAction } from "@/app/actions/auth";
import { copy } from "@/lib/copy";

export interface LandingNavbarUser {
  name: string;
  email: string;
  avatarUrl: string | null;
  role: "OWNER" | "CAPSTER" | "UNASSIGNED";
  initials: string;
}

export interface LandingNavbarClientProps {
  user: LandingNavbarUser | null;
}

export function LandingNavbarClient({ user }: LandingNavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardHref =
    user?.role === "OWNER"
      ? "/owner"
      : user?.role === "CAPSTER"
      ? "/capster"
      : "/register/role";

  const dashboardLabel =
    user?.role === "UNASSIGNED"
      ? copy.completeRegistrationBtn
      : copy.dashboardBtn;

  return (
    <header className="sticky top-0 w-full z-50 bg-[#FFF9F0] border-b border-[#E6DFD3]">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto h-16">
        {/* Brand & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#F26B21] flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-lg sm:text-xl">content_cut</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] sm:text-[20px] font-bold text-[#1B1B1B] tracking-tight leading-none">
              {copy.brand}
            </span>
          </div>
        </Link>

        {/* Center Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
            href="#katalog-capster"
          >
            {copy.landingNav.catalog}
          </a>
          <a
            className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
            href="#skema-outsourcing"
          >
            {copy.landingNav.schemes}
          </a>
          <a
            className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
            href="#cara-kerja"
          >
            {copy.landingNav.howItWorks}
          </a>
          <a
            className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors"
            href="#keunggulan"
          >
            {copy.landingNav.advantages}
          </a>
        </nav>

        {/* Trailing Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            /* Logged in state */
            <div className="flex items-center gap-3">
              <Link
                href={dashboardHref}
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-[10px] transition-all duration-150 font-bold inline-flex items-center gap-1.5 shrink-0"
              >
                <span>{dashboardLabel}</span>
              </Link>
              <AccountMenu
                name={user.name}
                email={user.email}
                role={user.role}
                initials={user.initials}
                avatarUrl={user.avatarUrl}
                redirectToOnLogout="/"
              />
            </div>
          ) : (
            /* Logged out state */
            <>
              <Link
                className="hidden md:inline-block text-xs sm:text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] transition-colors py-2"
                href="/login"
              >
                {copy.landingNav.joinCapster}
              </Link>
              <Link
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-[10px] transition-all duration-150 font-bold inline-flex items-center gap-1.5 shrink-0"
                href="/login"
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>{copy.landingNav.rentCapster}</span>
              </Link>
            </>
          )}

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
        <div className="lg:hidden bg-[#FFF9F0] border-b border-[#E6DFD3] px-4 py-4 space-y-3">
          <a
            className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
            href="#katalog-capster"
            onClick={() => setMobileMenuOpen(false)}
          >
            {copy.landingNav.catalog}
          </a>
          <a
            className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
            href="#skema-outsourcing"
            onClick={() => setMobileMenuOpen(false)}
          >
            {copy.landingNav.schemes}
          </a>
          <a
            className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
            href="#cara-kerja"
            onClick={() => setMobileMenuOpen(false)}
          >
            {copy.landingNav.howItWorks}
          </a>
          <a
            className="block text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
            href="#keunggulan"
            onClick={() => setMobileMenuOpen(false)}
          >
            {copy.landingNav.advantages}
          </a>

          {user ? (
            /* Logged in mobile menu */
            <div className="pt-3 border-t border-[#E6DFD3] space-y-3">
              <Link
                href={dashboardHref}
                className="w-full bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-sm py-2.5 rounded-[10px] font-bold flex items-center justify-center transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {dashboardLabel}
              </Link>
              <div className="pt-2 border-t border-[#E6DFD3] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1B1B1B]">{user.name}</p>
                  <p className="text-[11px] text-[#5C5C5C]">{user.email}</p>
                </div>
                <form
                  action={async () => {
                    await logoutAction("/");
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs font-bold text-[#C0392B] hover:underline cursor-pointer"
                  >
                    {copy.logout}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Logged out mobile menu */
            <div className="pt-2 border-t border-[#E6DFD3] flex flex-col gap-2">
              <Link
                className="text-sm font-bold text-[#1B1B1B] hover:text-[#F26B21] py-1.5 transition-colors"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                {copy.landingNav.joinCapster}
              </Link>
              <Link
                className="bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs px-3.5 py-2.5 rounded-[10px] font-bold flex items-center justify-center gap-1.5"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>{copy.landingNav.rentCapster}</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

