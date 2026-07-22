import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import MemoryForm from "@/components/memory/memory-form";
import { prisma } from "@/lib/prisma";

type EditMemoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMemoryPage({ params }: EditMemoryPageProps) {
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

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Memory</h1>
      <MemoryForm initialMemory={memory} />
    </main>
  );
}
