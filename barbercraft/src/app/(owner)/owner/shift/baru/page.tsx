import { copy } from "@/lib/copy";

export default function OwnerNewShiftPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1B1B]">
        {copy.ownerNewShift.title}
      </h1>
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 text-sm text-[#5C5C5C]">
        Form buat shift harian akan diimplementasikan pada Phase 2.
      </div>
    </div>
  );
}

