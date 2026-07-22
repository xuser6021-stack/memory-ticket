import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteMemoryButton from "@/components/memory/delete-memory-button";
import ShareMemoryControls from "@/components/memory/share-memory-controls";
import MemoryTicket from "@/components/ticket/memory-ticket";
import { prisma } from "@/lib/prisma";

type MemoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MemoryDetailsPage({ params }: MemoryDetailsPageProps) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    notFound();
  }

  const memory = await prisma.memory.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!memory) {
    notFound();
  }

  const authorName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  return (
    <main className="mx-auto max-w-4xl p-6 md:p-8">
      <Link
        href="/dashboard"
        className="inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to Dashboard
      </Link>
      <Link
        href={`/dashboard/memories/${memory.id}/edit`}
        className="ml-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
      >
        Edit Memory
      </Link>
      <span className="ml-4 inline-flex">
        <DeleteMemoryButton memoryId={memory.id} />
      </span>

      <ShareMemoryControls
        memoryId={memory.id}
        shareId={memory.shareId}
        initialIsPublic={memory.isPublic}
      />

      <MemoryTicket memory={memory} authorName={authorName} />
    </main>
  );
}
