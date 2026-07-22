import { notFound } from "next/navigation";
import MemoryTicket from "@/components/ticket/memory-ticket";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PublicTicketPageProps = {
  params: Promise<{ shareId: string }>;
};

export default async function PublicTicketPage({ params }: PublicTicketPageProps) {
  const { shareId } = await params;
  const memory = await prisma.memory.findFirst({
    where: {
      shareId,
      isPublic: true,
    },
    include: {
      user: true,
    },
  });

  if (!memory) {
    notFound();
  }

  const authorName =
    [memory.user.firstName, memory.user.lastName].filter(Boolean).join(" ") ||
    memory.user.email;

  return (
    <main className="mx-auto max-w-4xl p-6 md:p-8">
      <MemoryTicket memory={memory} authorName={authorName} />
    </main>
  );
}
