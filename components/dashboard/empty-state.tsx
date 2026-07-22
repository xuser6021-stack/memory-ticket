import Link from "next/link";

export default function EmptyState() {
  return (
    <section className="rounded-xl border border-dashed p-12 text-center">
      <h2 className="text-xl font-semibold">No memories yet</h2>
      <p className="mt-2 text-muted-foreground">
        Create your first memory to start building your collection.
      </p>
      <Link
        href="/dashboard/new"
        className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
      >
        Create your first memory
      </Link>
    </section>
  );
}
