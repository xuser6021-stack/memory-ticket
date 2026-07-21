import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <h1 className="text-xl font-bold">🎫 Memory Ticket</h1>

      <div className="flex gap-3">
        <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button>
      </div>
    </nav>
  );
}
