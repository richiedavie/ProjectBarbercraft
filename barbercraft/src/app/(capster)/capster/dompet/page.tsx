import { getCurrentUser } from "@/lib/auth";
import { getCapsterWalletData } from "@/lib/queries/capster";
import { CapsterWalletView } from "@/components/capster/CapsterWalletView";

export default async function CapsterWalletPage() {
  const user = await getCurrentUser();
  const userId = user?.id ?? "mock-capster-id";
  const { metrics, transactions } = await getCapsterWalletData(userId);

  return <CapsterWalletView metrics={metrics} transactions={transactions} />;
}
