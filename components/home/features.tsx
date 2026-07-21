import { Camera, Shield, Ticket } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Capture Memories",
    description: "Upload your favorite moments and keep them forever.",
  },
  {
    icon: Ticket,
    title: "Create Tickets",
    description: "Transform every memory into a beautiful collectible ticket.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your memories stay safe and are accessible anytime.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Everything You Need</h2>

        <p className="mt-4 text-muted-foreground">
          Designed to preserve your memories in a unique way.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <feature.icon className="mb-4 h-8 w-8" />

            <h3 className="text-xl font-semibold">{feature.title}</h3>

            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
