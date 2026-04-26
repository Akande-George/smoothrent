import Link from "next/link";
import { ArrowLeft, ShieldCheck, Star, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grain" />

      <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* Left — Editorial panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-emerald p-10 text-ivory lg:flex">
          <div className="pointer-events-none absolute inset-0 tropical-stripes opacity-30 mix-blend-overlay" />
          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full sun-gradient opacity-70" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full terracotta-glow opacity-50" />
          <div className="grain-soft mix-blend-overlay" />

          <div className="relative z-10 flex items-center justify-between">
            <BrandMark href="/" variant="ivory" />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-ivory/75 transition hover:text-saffron"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back home
            </Link>
          </div>

          <div className="relative z-10 max-w-md space-y-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron">
              Welcome to issue Nº 09
            </p>
            <h2 className="font-display text-5xl italic leading-tight">
              The Nigerian rental market,
              <br />
              <span className="not-italic">finally written down.</span>
            </h2>
            <p className="text-base leading-7 text-ivory/85">
              Verified listings. Digital leases. Escrowed rent. SmoothRent is the
              quiet revolution your next move deserves.
            </p>

            <div className="grid gap-3 pt-2 text-sm">
              {[
                { icon: ShieldCheck, label: "NIN + BVN screening on every account" },
                { icon: Sparkles, label: "Decisions in 48 hours, not 4 weeks" },
                { icon: Star, label: "4.9 average tenant satisfaction" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-ivory/85">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 text-saffron">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/5 p-4 backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron font-display text-xl text-emerald-deep">
              AA
            </div>
            <div className="flex-1 text-sm">
              <p className="font-display italic text-ivory">
                “Listed three flats in Maitama. All leased in six weeks.”
              </p>
              <p className="mt-1 text-xs text-ivory/60">
                Aisha Abdullahi · Landlord, Abuja
              </p>
            </div>
          </div>
        </aside>

        {/* Right — Form */}
        <section className="relative flex flex-col items-center justify-center px-5 py-10 sm:px-10">
          <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full sun-gradient opacity-40 lg:hidden" />

          <div className="relative w-full max-w-md">
            <div className="mb-7 flex items-center justify-between lg:hidden">
              <BrandMark variant="default" />
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-muted-strong"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Home
              </Link>
            </div>

            <div className="relative rounded-[24px] border border-line bg-paper p-6 shadow-[0_30px_80px_-60px_rgba(12,31,23,0.4)] sm:p-8 md:p-9">
              {children}
            </div>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
              Protected by Paystack-grade encryption
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
