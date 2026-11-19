"use server";

import { revalidatePath } from "next/cache";
import { runAction } from "@/server/action-helper";
import { requireCapster } from "@/server/auth";
import { applyShift, cancelBooking } from "@/server/services/bookings";
import type { ActionResult } from "@/server/types";

export async function applyShiftAction(shiftId: string): Promise<ActionResult> {
  return runAction(async () => {
    const { profile } = await requireCapster();

    await applyShift({
      shiftId,
      capsterProfileId: profile.id,
    });

    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");
    revalidatePath("/owner/pelamar");
    revalidatePath("/owner/shift");
  });
}

export async function cancelApplicationAction(bookingId: string): Promise<ActionResult> {
  return runAction(async () => {
    const { profile } = await requireCapster();

    await cancelBooking({
      bookingId,
      capsterProfileId: profile.id,
    });

    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");
    revalidatePath("/owner/pelamar");
  });
}
