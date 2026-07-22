import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteMemoryButton from "@/components/memory/delete-memory-button";
import ShareMemoryControls from "@/components/memory/share-memory-controls";
import DownloadTicketButton from "@/components/ticket/download-ticket-button";
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

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    notFound();
  }

  const memory = await prisma.memory.findFirst({
    where: { id, userId: user.id },
  });

  if (!memory) {
    notFound();
  }

  const authorName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  return (
    <main className="mx-auto max-w-4xl p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Back to Dashboard
        </Link>
        <Link
          href={`/dashboard/memories/${memory.id}/edit`}
          className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Edit Memory
        </Link>
        <DeleteMemoryButton memoryId={memory.id} />
        <DownloadTicketButton title={memory.title} />
        <ShareMemoryControls
          memoryId={memory.id}
          shareId={memory.shareId}
          initialIsPublic={memory.isPublic}
        />
      </div>

      <MemoryTicket memory={memory} authorName={authorName} />
    </main>
  );
}
