import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteMemoryButton from "@/components/memory/delete-memory-button";
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

  const createdAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(memory.createdAt);

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

      <article className="mt-6 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
        <Image
          src={memory.imageUrl}
          alt={memory.title}
          width={1200}
          height={750}
          unoptimized
          className="h-auto w-full object-cover"
          priority
        />
        <div className="space-y-5 p-6 md:p-8">
          <div>
            <h1 className="text-3xl font-bold">{memory.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Created {createdAt}</p>
          </div>
          <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
            {memory.description || "No description provided."}
          </p>
        </div>
      </article>
    </main>
  );
}
