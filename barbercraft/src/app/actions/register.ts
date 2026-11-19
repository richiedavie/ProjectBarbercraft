"use server";

import { cookies } from "next/headers";
import { runAction } from "@/server/action-helper";
import { registerCapster, registerOwner } from "@/server/services/auth";
import type { ActionResult } from "@/server/types";

export interface RegisterBarberInput {
  fullName: string;
  email: string;
  password?: string;
  experienceYears?: number;
  whatsapp: string;
  skills: string[];
  expectedRate?: number;
}

export async function registerBarberAction(input: RegisterBarberInput): Promise<ActionResult> {
  return runAction(async () => {
    const cookieStore = await cookies();
    const email = input.email.trim().toLowerCase();
    const name = input.fullName.trim();
    const cleanPhone = input.whatsapp.replace(/\D/g, "");
    const whatsapp = cleanPhone.startsWith("0")
      ? "62" + cleanPhone.slice(1)
      : cleanPhone.startsWith("62")
      ? cleanPhone
      : "62" + cleanPhone;

    const user = await registerCapster({
      email,
      name,
      whatsapp,
      experienceYears: input.experienceYears,
      skills: input.skills,
      expectedRate: input.expectedRate,
    });

    cookieStore.set("userId", user.id, { path: "/" });
    cookieStore.set("userRole", "CAPSTER", { path: "/" });
  });
}

export interface RegisterOwnerInput {
  shopName: string;
  email: string;
  password?: string;
  address: string;
  city: string;
  whatsapp: string;
  chairCount: number;
}

export async function registerOwnerAction(input: RegisterOwnerInput): Promise<ActionResult> {
  return runAction(async () => {
    const cookieStore = await cookies();
    const email = input.email.trim().toLowerCase();
    const cleanPhone = input.whatsapp.replace(/\D/g, "");
    const whatsapp = cleanPhone.startsWith("0")
      ? "62" + cleanPhone.slice(1)
      : cleanPhone.startsWith("62")
      ? cleanPhone
      : "62" + cleanPhone;

    const user = await registerOwner({
      email,
      shopName: input.shopName.trim(),
      address: input.address.trim(),
      city: input.city.trim(),
      whatsapp,
      chairCount: input.chairCount || 2,
    });

    cookieStore.set("userId", user.id, { path: "/" });
    cookieStore.set("userRole", "OWNER", { path: "/" });
  });
}
