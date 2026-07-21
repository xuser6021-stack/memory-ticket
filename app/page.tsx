import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-foreground">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}