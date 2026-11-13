import { CreateShiftForm } from "@/components/owner/CreateShiftForm";
import { copy } from "@/lib/copy";

export default function OwnerNewShiftPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1B1B]">
        {copy.ownerNewShift.title}
      </h1>
      <CreateShiftForm />
    </div>
  );
}
