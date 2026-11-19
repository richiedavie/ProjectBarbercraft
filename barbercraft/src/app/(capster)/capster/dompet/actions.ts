"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface WithdrawInput {
  amount: number;
  destination: string;
  accountNumber: string;
}

export async function requestWithdrawalAction(input: WithdrawInput) {
  const user = await getCurrentUser();

  if (!user || user.role !== "CAPSTER") {
    return {
      success: false,
      error: "Hanya Capster yang dapat melakukan penarikan dana.",
    };
  }

  const { amount, destination, accountNumber } = input;

  if (!amount || amount < 10000) {
    return {
      success: false,
      error: "Nominal penarikan minimal Rp 10.000.",
    };
  }

  if (!destination || !destination.trim()) {
    return {
      success: false,
      error: "Pilih tujuan pencairan dana.",
    };
  }

  if (!accountNumber || accountNumber.trim().length < 4) {
    return {
      success: false,
      error: "Nomor rekening atau e-wallet tidak valid.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Hitung total saldo yang dapat ditarik saat ini
      const transactions = await tx.transaction.findMany({
        where: { userId: user.id },
      });

      let totalEarnings = 0;
      let totalWithdrawn = 0;

      for (const t of transactions) {
        if (t.type === "EARNING" && t.status === "COMPLETED") {
          totalEarnings += t.amount;
        } else if (t.type === "WITHDRAWAL" && (t.status === "COMPLETED" || t.status === "PENDING")) {
          totalWithdrawn += t.amount;
        }
      }

      const availableBalance = Math.max(0, totalEarnings - totalWithdrawn);

      if (amount > availableBalance) {
        return {
          success: false,
          error: "Saldo tidak mencukupi untuk melakukan penarikan ini.",
        };
      }

      // 2. Buat transaksi penarikan dana baru
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: "WITHDRAWAL",
          amount,
          status: "PENDING",
          bankName: destination.trim(),
          accountNumber: accountNumber.trim(),
        },
      });

      return { success: true };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/capster/dompet");
    return { success: true };
  } catch (err) {
    console.error("Gagal request penarikan dana:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal memproses penarikan dana.",
    };
  }
}

