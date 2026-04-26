import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="grain" />
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full sun-gradient opacity-60" />
      <div className="pointer-events-none absolute right-[-12rem] bottom-32 h-[520px] w-[520px] rounded-full canopy-gradient opacity-50" />

      <div className="relative max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Error · 404 · Page not found
        </p>
        <h1 className="mt-4 font-display text-[112px] leading-none italic text-emerald sm:text-[160px]">
          404
        </h1>
        <h2 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
          The keys you’re looking for
          <br />
          aren’t at this address.
        </h2>
        <p className="mt-5 text-sm leading-7 text-muted-strong">
          The page may have moved, the listing may have been taken, or the URL may
          have a typo. Let’s get you back to a verified one.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button>
              <Home className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
          <Link href="/listings">
            <Button variant="ivory">
              Browse listings
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
