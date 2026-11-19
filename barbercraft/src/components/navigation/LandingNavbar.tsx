import { getCurrentUser } from "@/lib/auth";
import { getInitials } from "@/lib/format";
import { LandingNavbarClient, LandingNavbarUser } from "./LandingNavbarClient";

/**
 * Server Component: reads user session and provides plain props to client parts.
 * Prevents client-side flash of logged-out state.
 */
export async function LandingNavbar() {
  const user = await getCurrentUser();

  const userProp: LandingNavbarUser | null = user
    ? {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role as "OWNER" | "CAPSTER" | "UNASSIGNED",
        initials: getInitials(
          user.role === "OWNER" && user.barberProfile?.shopName
            ? user.barberProfile.shopName
            : user.name
        ),
      }
    : null;

  return <LandingNavbarClient user={userProp} />;
}
