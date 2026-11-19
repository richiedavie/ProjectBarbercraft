"use server";

import { revalidatePath } from "next/cache";
import { runAction } from "@/server/action-helper";
import { requireOwner } from "@/server/auth";
import { acceptApplicant, rejectApplicant } from "@/server/services/bookings";
import type { ActionResult } from "@/server/types";

export async function acceptApplicantAction(bookingId: string): Promise<ActionResult> {
  return runAction(async () => {
    const { profile } = await requireOwner();

    await acceptApplicant({
      bookingId,
      shopId: profile.id,
    });

    revalidatePath("/owner");
    revalidatePath("/owner/pelamar");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");
  });
}

export async function rejectApplicantAction(bookingId: string): Promise<ActionResult> {
  return runAction(async () => {
    const { profile } = await requireOwner();

    await rejectApplicant({
      bookingId,
      shopId: profile.id,
    });

    revalidatePath("/owner");
    revalidatePath("/owner/pelamar");
    revalidatePath("/owner/shift");
    revalidatePath("/capster");
    revalidatePath("/capster/lamaran");
  });
}
