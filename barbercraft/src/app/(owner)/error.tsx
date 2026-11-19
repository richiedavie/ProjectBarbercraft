"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function OwnerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Owner Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="bg-white border border-[#E6DFD3] rounded-[16px] max-w-md w-full p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#C0392B]/10 text-[#C0392B] mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1B1B1B]">Terjadi Kendala</h2>
          <p className="text-xs text-[#5C5C5C] mt-1.5 leading-relaxed">
            Tidak dapat memuat data dasbor owner saat ini. Silakan coba kembali.
          </p>
        </div>

        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#F26B21] hover:bg-[#D85812] text-white text-xs font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Muat Ulang</span>
        </button>
      </div>
    </div>
  );
}

