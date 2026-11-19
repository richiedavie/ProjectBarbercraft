import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) {
    if (user.role === "OWNER") {
      redirect("/owner");
    }
    if (user.role === "CAPSTER") {
      redirect("/capster");
    }
    // If role is UNASSIGNED, the user can stay on /register/* to complete registration
  }

  return <>{children}</>;
}

