import { copy } from "@/lib/copy";

export default function CapsterProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1B1B]">
        {copy.capsterProfile.title}
      </h1>
      <div className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 text-sm text-[#5C5C5C]">
        Profil capster akan diimplementasikan pada Phase 5.
      </div>
    </div>
  );
}

