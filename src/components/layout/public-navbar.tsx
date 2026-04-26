"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Listings", href: "/listings", num: "01" },
  { label: "About", href: "/about", num: "02" },
  { label: "Pricing", href: "/pricing", num: "03" },
  { label: "Journal", href: "/faq", num: "04" },
  { label: "Contact", href: "/contact", num: "05" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-30">
      <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-paper/80 px-3 py-2 pr-2 backdrop-blur-md sm:gap-6 sm:px-4 sm:py-2.5 sm:pr-2.5 md:px-6">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-emerald text-ivory"
                    : "text-muted-strong hover:bg-emerald/[0.06] hover:text-foreground"
                )}
              >
                <span className="font-mono text-[10px] tracking-widest opacity-60">
                  {item.num}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-strong transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="btn-base btn-emerald inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm"
          >
            Get started
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-40 rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_80px_-50px_rgba(12,31,23,0.5)] lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-3 text-base"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-muted">
                    {item.num}
                  </span>
                  {item.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn-base btn-outline rounded-full h-11 text-sm"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-base btn-emerald rounded-full h-11 text-sm"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
