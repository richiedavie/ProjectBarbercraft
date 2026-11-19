import { getCurrentUser } from "@/lib/auth";
import { getCapsterApplications } from "@/lib/queries/capster";
import { CapsterApplicationList } from "@/components/capster/CapsterApplicationList";

export default async function CapsterApplicationsPage() {
  const user = await getCurrentUser();
  const capsterId = user?.capsterProfile?.id ?? "mock-capster-id";
  const applications = await getCapsterApplications(capsterId);

  return <CapsterApplicationList applications={applications} />;
}
