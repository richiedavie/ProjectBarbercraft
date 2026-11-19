"use server";

import { revalidatePath } from "next/cache";
import { runAction } from "@/server/action-helper";
import { requireOwner } from "@/server/auth";
import { deleteShift } from "@/server/services/shifts";
import type { ActionResult } from "@/server/types";

export async function deleteShiftAction(shiftId: string): Promise<ActionResult> {
  return runAction(async () => {
    const { profile } = await requireOwner();

    await deleteShift({
      shiftId,
      shopId: profile.id,
    });

    revalidatePath("/owner");
    revalidatePath("/owner/shift");
    revalidatePath("/owner/pelamar");
    revalidatePath("/capster");
  });
}
