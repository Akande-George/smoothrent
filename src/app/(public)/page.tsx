import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Compass,
  Building2,
  Receipt,
  Wrench,
  Star,
  Quote,
} from "lucide-react";
import { mockProperties } from "@/lib/mock-data";
import { AIRecommender } from "@/components/property/ai-recommender";

const featured = mockProperties.filter((p) => p.isFeatured).slice(0, 3);

const partners = [
  "Paystack",
  "Sterling Bank",
  "GTBank",
  "NIN/NIMC",
  "Lagos State",
  "Cowrywise",
  "Chaka",
  "Flutterwave",
];

const formatNGN = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1.45fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] sm:text-[11px] sm:tracking-[0.32em]">
              <span className="font-mono uppercase text-saffron-deep">
                Issue Nº 09 · 2026
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="hidden font-mono uppercase text-muted sm:inline">
                Lekki · Maitama · Eko Atlantic
              </span>
            </div>

            <h1 className="animate-fade-up mt-6 font-display text-[40px] leading-[1.04] tracking-tight text-foreground sm:text-[60px] md:text-[80px] lg:text-[96px]">
              The quiet
              <span className="italic text-emerald"> revolution </span>
              <br className="hidden md:block" />
              in Nigerian
              <span className="relative ml-2 inline-block">
                <span className="relative z-10 italic">renting.</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-2 bg-saffron/80 sm:bottom-2 sm:h-3" />
              </span>
            </h1>

            <p className="animate-fade-up-2 mt-7 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
              SmoothRent connects verified landlords, agents and tenants on a single
              platform — from Yaba self-contains to Eko Atlantic penthouses. Digital
              leases, escrowed rent, and a transparent service fee — set by SmoothRent, no surprises.
            </p>

            <div className="animate-fade-up-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/listings"
                className="btn-base btn-emerald inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm sm:h-13 sm:px-7"
              >
                Browse 312 listings
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <AIRecommender className="h-12 px-6 sm:h-13 sm:px-7" />
              <Link
                href="/register"
                className="btn-base btn-outline inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm sm:h-13 sm:px-7"
              >
                Open a SmoothRent account
              </Link>
            </div>

            <div className="animate-fade-up-4 mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
              {[
                { stat: "48 hrs", label: "average approval" },
                { stat: "98%", label: "verified accuracy" },
                { stat: "₦14B+", label: "rent processed" },
              ].map((item) => (
                <div key={item.stat}>
                  <p className="font-display text-3xl text-foreground">{item.stat}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="pointer-events-none absolute -right-2 top-4 h-24 w-24 animate-slow-spin sm:-right-6 sm:top-6 sm:h-32 sm:w-32">
              <svg viewBox="0 0 100 100" className="h-full w-full text-emerald-deep">
                <defs>
                  <path
                    id="circle"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text fill="currentColor" fontSize="9.5" letterSpacing="2">
                  <textPath href="#circle">
                    EST · LAGOS · 2026 · SMOOTHRENT · TRUSTED · KEYS · SINCE ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron" />
            </div>

            <article className="relative animate-fade-up-2 overflow-hidden rounded-[28px] border border-line bg-paper p-2">
              <div className="relative h-72 overflow-hidden rounded-[22px] bg-gradient-to-br from-emerald-deep via-emerald to-emerald-soft">
                <div className="grain-soft mix-blend-overlay" />
                <svg
                  className="absolute inset-0 h-full w-full text-saffron/70"
                  viewBox="0 0 400 280"
                  fill="none"
                >
                  <circle cx="80" cy="80" r="46" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="80" cy="80" r="26" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="80" cy="80" r="6" fill="currentColor" />
                  <path
                    d="M0 220 L70 180 L140 200 L220 150 L300 175 L400 130 L400 280 L0 280 Z"
                    fill="rgba(217, 154, 43, 0.18)"
                  />
                  <path
                    d="M0 220 L70 180 L140 200 L220 150 L300 175 L400 130"
                    stroke="rgba(245, 236, 214, 0.45)"
                    strokeWidth="1"
                  />
                  <g stroke="rgba(245, 236, 214, 0.55)" strokeWidth="1">
                    <rect x="170" y="170" width="60" height="80" />
                    <rect x="180" y="180" width="14" height="14" />
                    <rect x="206" y="180" width="14" height="14" />
                    <rect x="180" y="206" width="14" height="14" />
                    <rect x="206" y="206" width="14" height="14" />
                    <path d="M170 170 L200 145 L230 170" />
                    <rect x="194" y="226" width="12" height="24" fill="rgba(217, 154, 43, 0.4)" />
                  </g>
                </svg>
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ivory/95 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron" /> Listing of the week
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-foreground">
                    Azuri Tower · Eko Atlantic
                  </h3>
                  <span className="rounded-full bg-emerald px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-ivory">
                    Verified
                  </span>
                </div>
                <p className="text-sm text-muted-strong">
                  3 bed · 3 bath · 2,800 sqft · concierge · ocean view
                </p>
                <div className="flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      Monthly rent
                    </p>
                    <p className="font-display text-3xl text-foreground">
                      ₦1,250,000
                      <span className="ml-1 text-base text-muted">/mo</span>
                    </p>
                  </div>
                  <Link
                    href="/listings/p5"
                    className="btn-base btn-saffron inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs"
                  >
                    View tour <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>Tour today · 3:30 PM</span>
                  <span>Decision in 48 hrs</span>
                  <span>2 of 3 steps done</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-mask relative mt-16 overflow-hidden border-y border-line py-5">
          <div className="flex animate-ticker gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.32em] text-muted-strong">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <span key={i} className="flex items-center gap-12">
                {p}
                <span className="h-1 w-1 rounded-full bg-saffron" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE-PANE ROLE SWITCHER ────────────────── */}
      <section className="relative">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="tag-eyebrow">Built for everyone in the deal</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              One platform.
              <span className="italic text-emerald"> Three points of view.</span>
            </h2>
          </div>
          <Link
            href="/register"
            className="btn-base btn-link inline-flex items-center gap-2 text-sm"
          >
            Compare plans <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              eyebrow: "For tenants",
              icon: Compass,
              title: "Move in with quiet certainty.",
              points: [
                "Verified listings only — no fake DMs",
                "Submit KYC once, reuse across applications",
                "Pay rent in escrow, get a real receipt",
              ],
              cta: "Find a home",
              href: "/listings",
              tone: "paper",
            },
            {
              eyebrow: "For landlords",
              icon: Building2,
              title: "Lease without the noise.",
              points: [
                "Tenant screening with NIN + BVN checks",
                "Digital lease packets your lawyer trusts",
                "Renewal reminders that pay themselves",
              ],
              cta: "List a property",
              href: "/register",
              tone: "emerald",
            },
            {
              eyebrow: "For agents",
              icon: KeyRound,
              title: "Build a brand. Keep the commission.",
              points: [
                "100% retention on Premium plan",
                "Pipeline tools, not WhatsApp chaos",
                "Verified agent badge for trust",
              ],
              cta: "Become an agent",
              href: "/register",
              tone: "paper",
            },
          ].map((card) => {
            const isEmerald = card.tone === "emerald";
            return (
              <article
                key={card.title}
                className={
                  isEmerald
                    ? "relative overflow-hidden rounded-[24px] border border-emerald-deep bg-emerald p-7 text-ivory"
                    : "relative overflow-hidden rounded-[24px] border border-line bg-paper p-7"
                }
              >
                {isEmerald && (
                  <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 sun-gradient opacity-70" />
                )}
                <div className="relative flex items-center gap-2">
                  <span
                    className={
                      isEmerald
                        ? "flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-emerald-deep"
                        : "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald text-ivory"
                    }
                  >
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span
                    className={
                      isEmerald
                        ? "font-mono text-[11px] uppercase tracking-[0.28em] text-saffron"
                        : "font-mono text-[11px] uppercase tracking-[0.28em] text-muted-strong"
                    }
                  >
                    {card.eyebrow}
                  </span>
                </div>
                <h3
                  className={
                    isEmerald
                      ? "relative mt-6 font-display text-3xl italic leading-tight"
                      : "relative mt-6 font-display text-3xl leading-tight text-foreground"
                  }
                >
                  {card.title}
                </h3>
                <ul
                  className={
                    isEmerald
                      ? "relative mt-6 space-y-3 text-sm text-ivory/90"
                      : "relative mt-6 space-y-3 text-sm text-muted-strong"
                  }
                >
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2
                        className={
                          isEmerald
                            ? "mt-0.5 h-4 w-4 shrink-0 text-saffron"
                            : "mt-0.5 h-4 w-4 shrink-0 text-emerald"
                        }
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={card.href}
                  className={
                    isEmerald
                      ? "btn-base btn-saffron relative mt-8 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm"
                      : "btn-base btn-emerald relative mt-8 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm"
                  }
                >
                  {card.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED LISTINGS ───────────────────────── */}
      <section>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <p className="tag-eyebrow">Curated this week</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              Verified rentals,
              <span className="italic text-emerald"> hand-checked.</span>
            </h2>
          </div>
          <Link
            href="/listings"
            className="btn-base btn-outline inline-flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm"
          >
            View all listings <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              href={`/listings/${p.id}`}
              className="group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-all hover:-translate-y-1 hover:border-emerald/50"
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className={
                    i === 0
                      ? "absolute inset-0 bg-gradient-to-br from-emerald via-emerald-soft to-saffron/40"
                      : i === 1
                      ? "absolute inset-0 bg-gradient-to-br from-clay via-saffron/60 to-sand"
                      : "absolute inset-0 bg-gradient-to-br from-emerald-deep via-emerald to-clay/30"
                  }
                />
                <div className="grain-soft mix-blend-overlay" />
                <svg
                  className="absolute inset-0 h-full w-full text-ivory/70"
                  viewBox="0 0 400 220"
                  fill="none"
                >
                  <g stroke="currentColor" strokeWidth="0.8">
                    <path d="M40 180 L40 120 L100 80 L160 120 L160 180" />
                    <path d="M160 180 L160 100 L240 60 L320 100 L320 180" />
                    <rect x="60" y="140" width="20" height="40" />
                    <rect x="120" y="140" width="20" height="40" />
                    <rect x="180" y="120" width="22" height="22" />
                    <rect x="220" y="120" width="22" height="22" />
                    <rect x="260" y="120" width="22" height="22" />
                    <rect x="180" y="150" width="22" height="22" />
                    <rect x="220" y="150" width="22" height="22" />
                    <rect x="260" y="150" width="22" height="22" />
                  </g>
                  <circle cx="340" cy="50" r="22" fill="rgba(245,236,214,0.55)" />
                </svg>
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </div>
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-deep px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ivory">
                  {p.type}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {p.area} · {p.city}
                  </p>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-foreground">
                    {p.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
                  <span>{p.bedrooms} bed</span>
                  <span className="h-1 w-1 rounded-full bg-line-strong" />
                  <span>{p.bathrooms} bath</span>
                  {p.sqft ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-line-strong" />
                      <span>{p.sqft.toLocaleString()} sqft</span>
                    </>
                  ) : null}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {p.rentType === "Per Event" ? "Per event" : p.rentType === "Daily" ? "Daily rent" : "Monthly rent"}
                    </p>
                    <p className="font-display text-2xl text-foreground">
                      {formatNGN(p.price)}
                      <span className="ml-1 text-sm text-muted">
                        {p.rentType === "Per Event" ? "/event" : p.rentType === "Daily" ? "/day" : "/mo"}
                      </span>
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-ivory transition group-hover:bg-saffron group-hover:text-emerald-deep">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WORKFLOW STORY (numbered editorial) ─────── */}
      <section className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="tag-eyebrow">The SmoothRent flow</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            From first look to
            <br />
            <span className="italic text-emerald">handed-over keys.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-strong">
            We replaced the inspection-fee shuffle with a single, transparent flow.
            Every step is timestamped, every receipt is digital.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-strong">
            <Sparkles className="h-3.5 w-3.5 text-saffron-deep" />
            Average completion: 7 days
          </div>
        </div>

        <ol className="space-y-3">
          {[
            {
              num: "01",
              title: "Browse, shortlist, and book a tour",
              text: "Every listing carries an inspection time slot, agent contact, and verified ownership trail. No back-and-forth on WhatsApp.",
              icon: Compass,
            },
            {
              num: "02",
              title: "Submit a single, reusable application",
              text: "NIN, BVN, employment letter, guarantor — uploaded once, linked everywhere. Landlords decide in 48 hours, not 4 weeks.",
              icon: ShieldCheck,
            },
            {
              num: "03",
              title: "Sign your lease digitally",
              text: "E-signed by you, your landlord, and your agent. Lease is stored in your dashboard for the full tenure and beyond.",
              icon: Receipt,
            },
            {
              num: "04",
              title: "Pay rent in escrow. Maintenance in app.",
              text: "Paystack-powered escrow, scheduled service-fee debits, and one-tap maintenance tickets with photo evidence.",
              icon: Wrench,
            },
          ].map((step, i) => (
            <li
              key={step.num}
              className="group relative grid grid-cols-[auto_1fr] gap-6 rounded-2xl border border-line bg-paper p-6 transition hover:border-emerald/50"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-ivory">
                  <step.icon className="h-5 w-5" />
                </span>
                {i < 3 && <span className="h-full w-px bg-line" />}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
                  Step {step.num}
                </p>
                <h3 className="mt-1.5 font-display text-2xl leading-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-strong">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── EDITORIAL QUOTE ─────────────────────────── */}
      <section className="relative">
        <article className="relative grid gap-8 overflow-hidden rounded-[28px] border border-line bg-paper p-6 sm:p-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="pointer-events-none absolute -left-10 top-2 h-40 w-40 rounded-full sun-gradient opacity-50" />

          <div className="relative">
            <Quote className="h-9 w-9 text-saffron-deep" strokeWidth={1.5} />
            <p className="mt-5 font-display text-2xl italic leading-snug text-foreground sm:text-3xl md:text-4xl">
              “For the first time, finding a flat in Lekki felt like ordering a
              meal — clear menu, real prices, real reviews. SmoothRent handled
              everything from inspection to keys in nine days.”
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-ivory font-display text-xl">
                CO
              </div>
              <div>
                <p className="font-medium text-foreground">Chinedu Okafor</p>
                <p className="text-sm text-muted">Tenant · Lekki Phase 1</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-saffron-deep">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="relative grid gap-3">
            {[
              { name: "Aisha Abdullahi", role: "Landlord, Maitama", line: "₦24M placed in 6 months." },
              { name: "Emeka Nwosu", role: "Premium Agent", line: "Closed 9 deals on platform." },
              { name: "Amaka Eze", role: "Landlord, Ikoyi", line: "Renewals up 38%." },
            ].map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron font-display text-emerald-deep">
                  {t.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
                <p className="font-display text-sm italic text-emerald">{t.line}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[28px] border border-line bg-card p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute inset-0 dotgrid opacity-50" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full canopy-gradient opacity-70" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="tag-eyebrow">Ready when you are</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              Find a home.
              <br />
              <span className="italic text-emerald">Or lease yours out, calmly.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-strong">
              Open a SmoothRent account in under two minutes. Browse 312 verified
              listings or list your own — your dashboard is ready.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/register"
                className="btn-base btn-emerald inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm sm:h-13 sm:px-7"
              >
                Create an account
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="btn-base btn-outline inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm sm:h-13 sm:px-7"
              >
                Sign in to dashboard
              </Link>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-3 text-sm">
            {[
              { num: "312", label: "Live listings" },
              { num: "₦14B+", label: "Rent processed" },
              { num: "2,400", label: "Verified tenants" },
              { num: "15", label: "Cities live" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-line bg-paper p-5"
              >
                <p className="font-display text-3xl text-foreground">{item.num}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
