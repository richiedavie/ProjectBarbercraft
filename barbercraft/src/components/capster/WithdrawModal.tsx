"use client";

import * as React from "react";
import { X, AlertCircle } from "lucide-react";
import { MoneyInput } from "@/components/shared/FormComponents";
import { formatRupiah } from "@/lib/format";
import { copy } from "@/lib/copy";
import { requestWithdrawalAction } from "@/app/(capster)/capster/dompet/actions";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
}

const DESTINATION_OPTIONS = [
  "BCA",
  "Bank Mandiri",
  "BRI",
  "BNI",
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
];

export function WithdrawModal({ isOpen, onClose, maxAmount }: WithdrawModalProps) {
  const [amount, setAmount] = React.useState<number>(0);
  const [destination, setDestination] = React.useState<string>("BCA");
  const [accountNumber, setAccountNumber] = React.useState<string>("");
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickAmount = (ratio: number) => {
    setAmount(Math.floor(maxAmount * ratio));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Masukkan nominal penarikan dana.");
      return;
    }
    if (amount > maxAmount) {
      setError(`Nominal melebihi saldo tersedia (${formatRupiah(maxAmount)}).`);
      return;
    }
    if (!accountNumber.trim()) {
      setError("Masukkan nomor rekening atau e-wallet.");
      return;
    }

    setError(null);
    startTransition(async () => {
      const res = await requestWithdrawalAction({
        amount,
        destination,
        accountNumber,
      });

      if (res.success) {
        onClose();
      } else {
        setError(res.error || "Gagal memproses penarikan.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#E6DFD3] rounded-[16px] w-full max-w-md p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6DFD3]">
          <div>
            <h2 className="text-lg font-bold text-[#1B1B1B]">{copy.capsterWallet.withdrawModalTitle}</h2>
            <p className="text-xs text-[#5C5C5C] mt-0.5">
              Saldo tersedia: <span className="font-bold text-[#F26B21]">{formatRupiah(maxAmount)}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#5C5C5C] hover:text-[#1B1B1B] hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-3 rounded-[8px] bg-[#C0392B]/10 border border-[#C0392B]/20 text-[#C0392B] text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Nominal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1B1B1B] block">
              {copy.capsterWallet.fields.amount}
            </label>
            <MoneyInput
              value={amount}
              onChange={setAmount}
              placeholder="0"
              className="w-full"
            />
            {/* Quick Amount Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickAmount(0.5)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] hover:border-[#F26B21] cursor-pointer"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handleQuickAmount(1)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-[#FFF9F0] border border-[#E6DFD3] text-[#1B1B1B] hover:border-[#F26B21] cursor-pointer"
              >
                Tarik Semua
              </button>
            </div>
          </div>

          {/* Tujuan Rekening / E-Wallet */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1B1B1B] block">
              {copy.capsterWallet.fields.destination}
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-12 px-3 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] font-medium outline-none focus:border-[#F26B21] transition-colors cursor-pointer"
            >
              {DESTINATION_OPTIONS.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Nomor Rekening */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1B1B1B] block">
              {copy.capsterWallet.fields.accountNumber}
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Contoh: 1234567890 / 08123456789"
              className="w-full h-12 px-3 bg-white border border-[#E6DFD3] rounded-[10px] text-sm text-[#1B1B1B] font-medium outline-none focus:border-[#F26B21] transition-colors placeholder:text-[#5C5C5C]/50"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-[10px] border border-[#E6DFD3] text-xs font-bold text-[#5C5C5C] hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending || maxAmount <= 0}
              className="flex-1 py-3 rounded-[10px] bg-[#F26B21] hover:bg-[#D85812] active:scale-95 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Memproses..." : copy.capsterWallet.confirmWithdrawBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

