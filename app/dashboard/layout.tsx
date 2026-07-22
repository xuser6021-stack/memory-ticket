import { syncUser } from "@/lib/sync-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();

  return <>{children}</>;
}
