import { EmptyState } from "@/components/shared/EmptyState";
import { copy } from "@/lib/copy";

export default function CapsterFeedPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1B1B]">{copy.capsterFeed.title}</h1>
      <EmptyState heading={copy.capsterFeed.emptyHeading} />
    </div>
  );
}

