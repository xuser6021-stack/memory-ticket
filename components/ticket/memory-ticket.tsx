import type { Memory } from "@prisma/client";
import Image from "next/image";

type MemoryTicketProps = {
  memory: Memory;
  authorName: string;
};

export default function MemoryTicket({ memory, authorName }: MemoryTicketProps) {
  const createdAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(memory.createdAt);
  const ticketId = `MT-${memory.id.toUpperCase()}`;

  return (
    <article
      aria-labelledby="memory-ticket-title"
      className="group relative mx-auto mt-6 max-w-3xl transition-transform duration-300 hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 z-10 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-inner"
      />
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 z-10 size-8 translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-inner"
      />

      <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xl transition-shadow duration-300 group-hover:shadow-2xl">
        <header className="flex items-center justify-between bg-gradient-to-r from-primary via-primary/90 to-primary/70 px-6 py-4 text-primary-foreground md:px-8">
          <p className="text-sm font-semibold tracking-[0.22em]">MEMORY TICKET</p>
          <p className="text-xs font-medium opacity-80">ADMIT ONE</p>
        </header>

        <div className="relative aspect-[16/9] w-full bg-muted">
          <Image
            src={memory.imageUrl}
            alt={memory.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div>
            <h1 id="memory-ticket-title" className="text-3xl font-bold tracking-tight md:text-4xl">
              {memory.title}
            </h1>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-muted-foreground">
              {memory.description || "No description provided."}
            </p>
          </div>

          <div className="border-t border-dashed border-border" />

          <dl className="grid gap-5 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Created
              </dt>
              <dd className="mt-1 font-medium">{createdAt}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Author
              </dt>
              <dd className="mt-1 font-medium">{authorName}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Ticket ID
              </dt>
              <dd className="mt-1 break-all font-mono text-xs font-semibold">{ticketId}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
