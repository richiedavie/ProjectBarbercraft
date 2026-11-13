import { getCurrentUser } from "@/lib/auth";
import { BarberProfileForm } from "@/components/forms/BarberProfileForm";
import { copy } from "@/lib/copy";

export default async function OwnerBarbershopPage() {
  const user = await getCurrentUser();

  const initialData = user?.barberProfile ?? {
    shopName: "",
    address: "",
    city: "",
    whatsapp: "",
    chairCount: 1,
    openTime: "09.00",
    closeTime: "21.00",
    openDays: [1, 2, 3, 4, 5, 6, 7],
    sop: "",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1B1B]">
        {copy.ownerBarbershop.title}
      </h1>

      <BarberProfileForm
        initialData={initialData}
        userEmail={user?.email ?? ""}
      />
    </div>
  );
}
