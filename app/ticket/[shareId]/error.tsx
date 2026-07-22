"use client";

type PublicTicketErrorProps = {
  reset: () => void;
};

export default function PublicTicketError({ reset }: PublicTicketErrorProps) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-2xl items-center p-6 md:p-8">
      <section className="w-full rounded-xl border bg-card p-6 text-center shadow-sm" role="alert">
        <h1 className="text-xl font-semibold">Unable to load this ticket</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again in a moment.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Try again
        </button>
      </section>
    </main>
  );
}
