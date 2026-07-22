export default function MemoryDetailsLoading() {
  return (
    <main className="mx-auto max-w-4xl p-6 md:p-8" aria-label="Loading memory ticket">
      <div className="h-5 w-36 animate-pulse rounded bg-muted" />
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
        <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
        <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border bg-card shadow-xl">
        <div className="h-14 animate-pulse bg-muted" />
        <div className="aspect-[16/9] animate-pulse bg-muted" />
        <div className="space-y-6 p-6 md:p-8">
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted" />
          <div className="border-t border-dashed border-border" />
          <div className="grid gap-5 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => <div key={index} className="h-10 animate-pulse rounded bg-muted" />)}
          </div>
        </div>
      </div>
    </main>
  );
}
