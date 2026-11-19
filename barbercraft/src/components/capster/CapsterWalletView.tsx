"use client";

import * as React from "react";
import { Wallet, TrendingUp, ArrowDownRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { WithdrawModal } from "@/components/capster/WithdrawModal";
import { formatRupiah, formatDateId } from "@/lib/format";
import { copy } from "@/lib/copy";
import type { WalletMetrics, WalletTransactionItem } from "@/lib/queries/capster";

interface CapsterWalletViewProps {
  metrics: WalletMetrics;
  transactions: WalletTransactionItem[];
}

export function CapsterWalletView({ metrics, transactions }: CapsterWalletViewProps) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = React.useState(false);

  const earningsList = transactions.filter((t) => t.type === "EARNING");
  const withdrawalList = transactions.filter((t) => t.type === "WITHDRAWAL");

  const [activeTab, setActiveTab] = React.useState<"all" | "earnings" | "withdrawals">("all");

  const displayedTransactions = React.useMemo(() => {
    if (activeTab === "earnings") return earningsList;
    if (activeTab === "withdrawals") return withdrawalList;
    return transactions;
  }, [activeTab, earningsList, withdrawalList, transactions]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.capsterWallet.title}</h1>
        <p className="text-sm text-[#5C5C5C] mt-1">
          Pantau penghasilan kerja shift dan kelola penarikan dana Anda.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title={copy.capsterWallet.weekEarnings}
          value={formatRupiah(metrics.weekEarnings)}
          helper="Dihitung dari shift selesai minggu ini"
          icon={<TrendingUp className="w-5 h-5 text-[#0F5C3A]" />}
        />

        {/* Saldo Dapat Ditarik Card with Action */}
        <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5C5C5C] text-sm">
            <span>{copy.capsterWallet.withdrawableBalance}</span>
            <Wallet className="w-5 h-5 text-[#F26B21]" />
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-[#F26B21]">
                {formatRupiah(metrics.withdrawableBalance)}
              </div>
              <div className="text-xs text-[#5C5C5C] mt-1">
                Total penghasilan: {formatRupiah(metrics.totalEarnings)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={metrics.withdrawableBalance <= 0}
              className="px-4 py-2 bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs font-bold rounded-[8px] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {copy.capsterWallet.withdrawBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Riwayat Transaksi */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-[#1B1B1B]">
            {copy.capsterWallet.historyTitle}
          </h2>

          {/* Sub-tabs Filter */}
          <div className="flex items-center gap-1.5 bg-[#FFF9F0] p-1 border border-[#E6DFD3] rounded-[8px] w-fit text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                activeTab === "all" ? "bg-white text-[#1B1B1B] shadow-2xs font-bold" : "text-[#5C5C5C] hover:text-[#1B1B1B]"
              }`}
            >
              Semua ({transactions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("earnings")}
              className={`px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                activeTab === "earnings" ? "bg-white text-[#1B1B1B] shadow-2xs font-bold" : "text-[#5C5C5C] hover:text-[#1B1B1B]"
              }`}
            >
              Bayaran ({earningsList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("withdrawals")}
              className={`px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                activeTab === "withdrawals" ? "bg-white text-[#1B1B1B] shadow-2xs font-bold" : "text-[#5C5C5C] hover:text-[#1B1B1B]"
              }`}
            >
              Penarikan ({withdrawalList.length})
            </button>
          </div>
        </div>

        {/* Transactions List */}
        {displayedTransactions.length === 0 ? (
          <EmptyState
            heading="Belum ada riwayat transaksi dompet."
            actionLabel="Cari Shift Lowongan"
            actionHref="/capster"
          />
        ) : (
          <div className="bg-white border border-[#E6DFD3] rounded-[12px] divide-y divide-[#E6DFD3] overflow-hidden">
            {displayedTransactions.map((tx) => {
              const isEarning = tx.type === "EARNING";

              return (
                <div key={tx.id} className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isEarning
                          ? "bg-[#0F5C3A]/10 text-[#0F5C3A]"
                          : "bg-[#FDE8D8] text-[#F26B21]"
                      }`}
                    >
                      {isEarning ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#1B1B1B]">
                        {isEarning
                          ? tx.booking?.shift.title ?? "Bayaran Shift"
                          : `Penarikan ke ${tx.bankName ?? "Rekening"}`}
                      </p>

                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#5C5C5C] flex-wrap">
                        {isEarning && tx.booking?.shift.shop.shopName && (
                          <span>{tx.booking.shift.shop.shopName} • </span>
                        )}
                        {!isEarning && tx.accountNumber && (
                          <span>{tx.accountNumber} • </span>
                        )}
                        <span>{formatDateId(tx.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`text-sm sm:text-base font-extrabold ${
                        isEarning ? "text-[#0F5C3A]" : "text-[#1B1B1B]"
                      }`}
                    >
                      {isEarning ? `+${formatRupiah(tx.amount)}` : `-${formatRupiah(tx.amount)}`}
                    </div>

                    <div className="mt-1 flex items-center justify-end gap-1 text-[11px] font-medium">
                      {tx.status === "COMPLETED" && (
                        <span className="inline-flex items-center gap-1 text-[#0F5C3A]">
                          <CheckCircle2 className="w-3 h-3" />
                          Selesai
                        </span>
                      )}
                      {tx.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1 text-[#D85812]">
                          <Clock className="w-3 h-3" />
                          Diproses
                        </span>
                      )}
                      {tx.status === "FAILED" && (
                        <span className="inline-flex items-center gap-1 text-[#C0392B]">
                          <XCircle className="w-3 h-3" />
                          Gagal
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Penarikan Dana */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        maxAmount={metrics.withdrawableBalance}
      />
    </div>
  );
}

