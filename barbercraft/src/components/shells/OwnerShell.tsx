"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Store,
  LogOut,
  Scissors,
} from "lucide-react";
import { NavItem, BottomNavItem } from "@/components/shared/NavItem";
import { copy } from "@/lib/copy";

interface OwnerShellProps {
  children: React.ReactNode;
  shopName: string;
  city: string;
  userInitials: string;
}

export function OwnerShell({
  children,
  shopName,
  city,
  userInitials,
}: OwnerShellProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/owner",
      label: copy.ownerNav.summary,
      icon: <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />,
      isActive: pathname === "/owner",
    },
    {
      href: "/owner/shift",
      label: copy.ownerNav.shift,
      icon: <Calendar className="w-5 h-5" strokeWidth={1.5} />,
      isActive: pathname.startsWith("/owner/shift"),
    },
    {
      href: "/owner/pelamar",
      label: copy.ownerNav.applicants,
      icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
      isActive: pathname.startsWith("/owner/pelamar"),
    },
    {
      href: "/owner/barbershop",
      label: copy.ownerNav.barbershop,
      icon: <Store className="w-5 h-5" strokeWidth={1.5} />,
      isActive: pathname.startsWith("/owner/barbershop"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col md:flex-row text-[#1B1B1B]">
      {/* Desktop Sidebar: 240px, 1px right border */}
      <aside className="hidden md:flex flex-col w-[240px] shrink-0 bg-white border-r border-[#E6DFD3] min-h-screen p-4 justify-between">
        <div>
          {/* Brand */}
          <Link href="/owner" className="flex items-center gap-2.5 px-3 py-3 mb-6">
            <div className="w-8 h-8 rounded-[8px] bg-[#F26B21] flex items-center justify-center text-white">
              <Scissors className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-lg text-[#1B1B1B] tracking-tight">
              {copy.brand}
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={item.isActive}
              />
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-[#E6DFD3]">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm text-[#5C5C5C] hover:text-[#1B1B1B] hover:bg-black/5 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 text-[#5C5C5C]" strokeWidth={1.5} />
            <span>{copy.logout}</span>
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen pb-20 md:pb-8">
        {/* Top Bar: 72px */}
        <header className="h-[72px] bg-white border-b border-[#E6DFD3] px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#F26B21] flex items-center justify-center text-white">
              <Scissors className="w-3.5 h-3.5" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-base text-[#1B1B1B]">
              {copy.brand}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-bold px-2 py-1 border border-[#E6DFD3] rounded-[6px] text-[#5C5C5C]">
              {copy.roles.owner}
            </span>
            <span className="text-sm font-semibold text-[#1B1B1B]">
              {shopName || "Barbershop"} • {city || "Indonesia"}
            </span>
          </div>

          {/* User Initial Avatar */}
          <div className="flex items-center gap-3">
            <div className="md:hidden text-right">
              <span className="text-xs text-[#5C5C5C] block">
                {shopName || "Barbershop"}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FDE8D8] text-[#F26B21] border border-[#F26B21]/30 flex items-center justify-center text-xs font-bold select-none">
              {userInitials}
            </div>
          </div>
        </header>

        {/* Content Container max-w 960px centered */}
        <main className="flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 py-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E6DFD3] flex items-center justify-around z-40 px-2">
        {navItems.map((item) => (
          <BottomNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive}
          />
        ))}
      </nav>
    </div>
  );
}

