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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome {user?.firstName ?? "User"}</h1>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
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
