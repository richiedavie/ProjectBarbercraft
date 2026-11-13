import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { CapsterShell } from "@/components/shells/CapsterShell";
import { getInitials } from "@/lib/format";

export default async function CapsterLayout({
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

  if (user.role === "OWNER") {
    redirect("/owner");
  }

  const userInitials = getInitials(user.name);

  return (
    <CapsterShell
      userInitials={userInitials}
      userName={user.name}
      userEmail={user.email}
      avatarUrl={user.avatarUrl}
    >
      {children}
    </CapsterShell>
  );
}

