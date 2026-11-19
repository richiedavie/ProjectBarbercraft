import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
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
    redirect("/register/role");
  }

  return <>{children}</>;
}

