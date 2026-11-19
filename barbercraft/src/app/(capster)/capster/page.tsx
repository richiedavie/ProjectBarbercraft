import { getCurrentUser } from "@/lib/auth";
import { getCapsterFeedShifts } from "@/lib/queries/capster";
import { CapsterFeedList } from "@/components/capster/CapsterFeedList";

export default async function CapsterFeedPage() {
  const user = await getCurrentUser();
  const shifts = await getCapsterFeedShifts(user?.capsterProfile?.id);

  return (
    <CapsterFeedList
      initialShifts={shifts}
      userCity={user?.phone ? "Jakarta" : undefined}
    />
  );
}
