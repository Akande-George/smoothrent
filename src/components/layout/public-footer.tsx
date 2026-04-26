import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const cols = [
  {
    title: "Browse",
    links: [
      { label: "All listings", href: "/listings" },
      { label: "Lagos rentals", href: "/listings" },
      { label: "Abuja rentals", href: "/listings" },
      { label: "Featured homes", href: "/listings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Journal", href: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Become an agent", href: "/register" },
      { label: "List a property", href: "/register" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden rounded-[28px] border border-line bg-emerald text-ivory">
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full sun-gradient opacity-60" />
      <div className="pointer-events-none absolute inset-0 tropical-stripes opacity-40 mix-blend-overlay" />
      <div className="grain-soft mix-blend-overlay" />

      <div className="relative grid gap-12 p-6 sm:p-10 md:p-12 lg:grid-cols-[1.4fr_2.6fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron">
            Smoothrent · Est. 2026
          </p>
          <h3 className="mt-3 font-display text-3xl italic leading-tight sm:text-4xl md:text-5xl">
            A quieter place
            <br />
            to find a home.
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/80">
            SmoothRent is a digital marketplace for verified Nigerian real estate.
            Built in Lagos, written for the country.
          </p>
          <Link
            href="/register"
            className="btn-base btn-saffron mt-7 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm"
          >
            Open an account
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ivory/60">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-ivory/85 transition hover:text-saffron"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col gap-3 border-t border-ivory/15 px-6 py-5 text-xs text-ivory/65 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-12">
        <p className="font-mono uppercase tracking-[0.28em]">
          © 2026 SmoothRent NG · Built with care
        </p>
        <div className="flex flex-wrap items-center gap-6 font-mono uppercase tracking-[0.22em]">
          <Link href="#" className="hover:text-saffron">Privacy</Link>
          <Link href="#" className="hover:text-saffron">Terms</Link>
          <Link href="/contact" className="hover:text-saffron">Support</Link>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            All systems online
          </span>
        </div>
      </div>
    </footer>
  );
}
