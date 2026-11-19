import { getCurrentUser } from "@/lib/auth";
import { getOwnerApplicants, getOwnerApplicantCounts, getFirstBarberProfile } from "@/lib/queries/owner";
import { OwnerApplicantList } from "@/components/owner/OwnerApplicantList";

export default async function OwnerApplicantsPage() {
  const user = await getCurrentUser();
  let shopId = user?.barberProfile?.id;

  if (!shopId || shopId === "mock-barber-id") {
    try {
      const firstShop = await getFirstBarberProfile();
      if (firstShop) shopId = firstShop.id;
    } catch {
      // ignore
    }
  }

  const resolvedShopId = shopId ?? "mock-barber-id";
  const [applicants, counts] = await Promise.all([
    getOwnerApplicants(resolvedShopId),
    getOwnerApplicantCounts(resolvedShopId),
  ]);

  return <OwnerApplicantList applicants={applicants} counts={counts} />;
}
