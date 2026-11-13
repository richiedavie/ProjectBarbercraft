import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { OwnerShell } from "@/components/shells/OwnerShell";
import { getInitials } from "@/lib/format";

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "UNASSIGNED") {
    redirect("/register/role");
  }

  if (user.role === "CAPSTER") {
    redirect("/capster");
  }

  const shopName = user.barberProfile?.shopName ?? "Barbershop";
  const city = user.barberProfile?.city ?? "Indonesia";
  // Avatar shows initials of shopName for owner, or User.name as fallback
  const userInitials = getInitials(user.barberProfile?.shopName || user.name);

  return (
    <OwnerShell
      shopName={shopName}
      city={city}
      userInitials={userInitials}
      userName={user.name}
      userEmail={user.email}
      avatarUrl={user.avatarUrl}
    >
      {children}
    </OwnerShell>
  );
}

