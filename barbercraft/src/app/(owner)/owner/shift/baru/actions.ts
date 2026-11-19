"use server";

import { revalidatePath } from "next/cache";
import { runAction } from "@/server/action-helper";
import { requireOwner } from "@/server/auth";
import { createShift } from "@/server/services/shifts";
import { createShiftSchema, type CreateShiftInput } from "@/lib/validations/shift";
import { DomainError } from "@/server/errors";
import type { ActionResult } from "@/server/types";

export async function createShiftAction(input: CreateShiftInput): Promise<ActionResult> {
  return runAction(async () => {
    const { profile } = await requireOwner();

    const validation = createShiftSchema.safeParse(input);
    if (!validation.success) {
      throw new DomainError("VALIDATION_ERROR", "Data yang dimasukkan belum valid.");
    }

    await createShift({
      shopId: profile.id,
      data: validation.data,
    });

    revalidatePath("/owner");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");
  });
}
