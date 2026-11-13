"use client";

import * as React from "react";
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

interface AccountMenuProps {
  name: string;
  email: string;
  role: "OWNER" | "CAPSTER";
  avatarUrl?: string | null;
  initials: string;
}

export function AccountMenu({
  name,
  email,
  role,
  avatarUrl,
  initials,
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const profileLink = role === "OWNER" ? "/owner/barbershop" : "/capster/profil";
  const profileLabel = role === "OWNER" ? "Profil Barbershop" : "Lihat Profil";
  const roleLabel = role === "OWNER" ? "Owner" : "Capster";

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Keyboard-focusable avatar button */}
      <button
        ref={buttonRef}
        type="button"
        aria-label="Menu akun"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-[#FDE8D8] text-[#F26B21] border border-[#F26B21]/30 flex items-center justify-center text-xs font-bold select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F26B21] focus:ring-offset-2 overflow-hidden"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-64 rounded-[12px] bg-white border border-[#E6DFD3] z-50 overflow-hidden focus:outline-none"
        >
          {/* User info & role */}
          <div className="px-4 py-3 min-h-[44px] flex flex-col justify-center">
            <p className="text-sm font-bold text-[#1B1B1B] truncate">{name}</p>
            <p className="text-xs text-[#5C5C5C] truncate">{email}</p>
            <p className="text-xs text-[#1B1B1B] font-medium mt-1">{roleLabel}</p>
          </div>

          {/* 1px Divider */}
          <div className="border-t border-[#E6DFD3]" />

          {/* Profile Link */}
          <Link
            href={profileLink}
            onClick={() => setIsOpen(false)}
            role="menuitem"
            className="flex items-center px-4 min-h-[44px] text-sm text-[#1B1B1B] hover:bg-[#FFF9F0] transition-colors font-medium"
          >
            {profileLabel}
          </Link>

          {/* 1px Divider */}
          <div className="border-t border-[#E6DFD3]" />

          {/* Logout Action */}
          <form action={logoutAction} className="w-full">
            <button
              type="submit"
              role="menuitem"
              className="w-full text-left flex items-center px-4 min-h-[44px] text-sm text-[#C0392B] hover:bg-red-50 font-bold transition-colors cursor-pointer"
            >
              Keluar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

