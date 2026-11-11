import { EmptyState } from "@/components/shared/EmptyState";
import { copy } from "@/lib/copy";

export default function OwnerApplicantsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1B1B]">
        {copy.ownerApplicants.title}
      </h1>

      <EmptyState
        heading={copy.ownerApplicants.emptyHeading}
        actionLabel={copy.ownerApplicants.viewShiftBtn}
        actionHref="/owner/shift"
      />
    </div>
  );
}

