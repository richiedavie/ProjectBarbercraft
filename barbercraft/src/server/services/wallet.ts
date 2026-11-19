import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { DomainError } from "../errors";

export type PrismaTransaction = Prisma.TransactionClient;

export interface RequestWithdrawalParams {
  userId: string;
  amount: number;
  destination: string;
  accountNumber: string;
}

export async function requestWithdrawal(
  params: RequestWithdrawalParams,
  tx?: PrismaTransaction
) {
  const execute = async (client: PrismaTransaction) => {
    const { userId, amount, destination, accountNumber } = params;

    const transactions = await client.transaction.findMany({
      where: { userId },
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
      throw new DomainError("INSUFFICIENT_BALANCE", "Saldo tidak mencukupi untuk melakukan penarikan ini.");
    }

    return await client.transaction.create({
      data: {
        userId,
        type: "WITHDRAWAL",
        amount,
        status: "PENDING",
        bankName: destination.trim(),
        accountNumber: accountNumber.trim(),
      },
    });
  };

  if (tx) {
    return await execute(tx);
  } else {
    return await prisma.$transaction(execute);
  }
}

