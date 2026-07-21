import FadeIn from "./fade-in";
import TicketPreview from "@/components/ticket/ticket-preview";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <FadeIn>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-between gap-20 px-6 md:flex-row">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            Turn Your Memories Into Beautiful Tickets
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Preserve your favorite moments by transforming photos into elegant,
            collectible memory tickets that tell your story.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg">Create Your First Ticket</Button>

            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-pink-400/30 blur-3xl" />

          <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl" />

          <TicketPreview />
        </div>
      </section>
    </FadeIn>
  );
}
