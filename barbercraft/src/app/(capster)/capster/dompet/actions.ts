"use server";

import { revalidatePath } from "next/cache";
import { runAction } from "@/server/action-helper";
import { requireCapster } from "@/server/auth";
import { requestWithdrawal } from "@/server/services/wallet";
import { DomainError } from "@/server/errors";
import type { ActionResult } from "@/server/types";

export interface WithdrawInput {
  amount: number;
  destination: string;
  accountNumber: string;
}

export async function requestWithdrawalAction(input: WithdrawInput): Promise<ActionResult> {
  return runAction(async () => {
    const { user } = await requireCapster();

    const { amount, destination, accountNumber } = input;

    if (!amount || amount < 10000) {
      throw new DomainError("VALIDATION_ERROR", "Nominal penarikan minimal Rp 10.000.");
    }

    if (!destination || !destination.trim()) {
      throw new DomainError("VALIDATION_ERROR", "Pilih tujuan pencairan dana.");
    }

    if (!accountNumber || accountNumber.trim().length < 4) {
      throw new DomainError("VALIDATION_ERROR", "Nomor rekening atau e-wallet tidak valid.");
    }

    await requestWithdrawal({
      userId: user.id,
      amount,
      destination,
      accountNumber,
    });

    revalidatePath("/capster/dompet");
  });
}
