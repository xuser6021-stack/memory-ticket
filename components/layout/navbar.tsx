import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <h1 className="text-xl font-bold">🎫 Memory Ticket</h1>

      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>

          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>

          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
