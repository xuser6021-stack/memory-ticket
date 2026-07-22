import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import EmptyState from "@/components/dashboard/empty-state";
import MemoryGrid from "@/components/dashboard/memory-grid";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  const memories = user
    ? await prisma.memory.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome {user?.firstName ?? "User"}</h1>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Create Memory
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="mt-8">
        {memories.length > 0 ? <MemoryGrid memories={memories} /> : <EmptyState />}
      </div>
    </main>
  );
}
