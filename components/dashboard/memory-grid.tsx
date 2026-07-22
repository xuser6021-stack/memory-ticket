import type { Memory } from "@prisma/client";
import MemoryCard from "./memory-card";

type MemoryGridProps = {
  memories: Memory[];
};

export default function MemoryGrid({ memories }: MemoryGridProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </section>
  );
}
