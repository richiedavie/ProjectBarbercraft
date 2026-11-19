"use server";

import { revalidatePath } from "next/cache";
import { runAction } from "@/server/action-helper";
import { requireOwner, requireCapster } from "@/server/auth";
import { updateBarberProfile, updateCapsterProfile } from "@/server/services/profiles";
import {
  barberProfileSchema,
  capsterProfileSchema,
  type BarberProfileInput,
  type CapsterProfileInput,
} from "@/lib/validations/profile";
import { DomainError } from "@/server/errors";
import type { ActionResult } from "@/server/types";

// 1. Update Profile Barbershop (Owner)
export async function updateBarberProfileAction(
  input: BarberProfileInput
): Promise<ActionResult> {
  return runAction(async () => {
    const { user } = await requireOwner();

    const validation = barberProfileSchema.safeParse(input);
    if (!validation.success) {
      throw new DomainError("VALIDATION_ERROR", "Data yang dimasukkan belum valid.");
    }

    await updateBarberProfile({
      userId: user.id,
      data: validation.data,
    });

    revalidatePath("/owner/barbershop");
    revalidatePath("/owner");
  });
}

// 2. Update Profile Capster
export async function updateCapsterProfileAction(
  input: CapsterProfileInput
): Promise<ActionResult> {
  return runAction(async () => {
    const { user } = await requireCapster();

    const validation = capsterProfileSchema.safeParse(input);
    if (!validation.success) {
      throw new DomainError("VALIDATION_ERROR", "Data yang dimasukkan belum valid.");
    }

    await updateCapsterProfile({
      userId: user.id,
      data: validation.data,
    });

    revalidatePath("/capster/profil");
    revalidatePath("/capster");
  });
}
