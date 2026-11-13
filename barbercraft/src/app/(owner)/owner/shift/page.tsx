import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOwnerAllShifts } from "@/lib/queries/owner";
import { OwnerShiftList } from "@/components/owner/OwnerShiftList";

export default async function OwnerShiftPage() {
  const user = await getCurrentUser();
  let shopId = user?.barberProfile?.id;

  // Jika barberProfile di memory belum terisi ID asli, cari profile pertama di DB
  if (!shopId || shopId === "mock-barber-id") {
    try {
      const firstShop = await prisma.barberProfile.findFirst();
      if (firstShop) shopId = firstShop.id;
    } catch {
      // ignore
    }
  }

  const shifts = await getOwnerAllShifts(shopId ?? "mock-barber-id");

  return <OwnerShiftList shifts={shifts} />;
}
