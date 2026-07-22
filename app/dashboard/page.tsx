import { syncUser } from "@/lib/sync-user";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await syncUser();

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Welcome {user?.firstName ?? "User"} 👋
        </h1>

        <UserButton afterSignOutUrl="/" />
      </div>

      <p className="mt-6 text-muted-foreground">
        Your account is now synced with the database.
      </p>
    </main>
  );
}