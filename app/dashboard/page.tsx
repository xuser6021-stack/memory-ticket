import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p>Welcome to Memory Ticket 🎉</p>

      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
