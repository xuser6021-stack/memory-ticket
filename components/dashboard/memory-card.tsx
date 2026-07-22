import type { Memory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type MemoryCardProps = {
  memory: Memory;
};

function shortenDescription(description: string | null) {
  if (!description) return "No description provided.";

  return description.length > 120
    ? `${description.slice(0, 120).trimEnd()}...`
    : description;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const createdAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(memory.createdAt);

  return (
    <Link href={`/dashboard/memories/${memory.id}`} className="block">
      <article className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
        <Image
          src={memory.imageUrl}
          alt={memory.title}
          width={800}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-48 w-full object-cover"
        />
        <div className="space-y-3 p-5">
          <h2 className="text-lg font-semibold">{memory.title}</h2>
          <p className="text-sm text-muted-foreground">
            {shortenDescription(memory.description)}
          </p>
          <p className="text-xs text-muted-foreground">Created {createdAt}</p>
        </div>
      </article>
    </Link>
  );
}
