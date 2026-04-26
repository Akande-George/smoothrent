import Link from "next/link";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Tenant",
    badge: "Always free",
    price: "₦0",
    cadence: "forever",
    description:
      "Browse, apply, lease, pay rent. SmoothRent is free for tenants — full stop.",
    features: [
      "Unlimited verified listings",
      "Reusable KYC profile",
      "Digital lease signing",
      "Rent payment in escrow",
      "One-tap maintenance tickets",
    ],
    cta: "Create tenant account",
    href: "/register",
    featured: false,
    tone: "paper",
  },
  {
    name: "Premium Agent",
    badge: "Most popular",
    price: "₦25,000",
    cadence: "per month",
    description:
      "Keep 100% of your commission. Build a real agent brand with verified listings.",
    features: [
      "Unlimited property listings",
      "Priority lead routing",
      "100% commission retention",
      "Verified agent badge",
      "Pipeline & deal manager",
      "Referral bonus program",
      "Priority phone support",
    ],
    cta: "Upgrade to Premium",
    href: "/register",
    featured: true,
    tone: "emerald",
  },
  {
    name: "Landlord Pro",
    badge: "For owners",
    price: "₦15,000",
    cadence: "per month",
    description:
      "Professional tools to lease, screen, and renew with zero inbox chaos.",
    features: [
      "Unlimited listings",
      "Tenant screening (NIN/BVN)",
      "Digital lease packets",
      "Maintenance dashboard",
      "Rent & renewal analytics",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/register",
    featured: false,
    tone: "paper",
  },
];

const faqs = [
  {
    q: "Is SmoothRent really free for tenants?",
    a: "Yes. Tenants pay nothing to use SmoothRent. We monetise via Premium plans for landlords and agents — never through hidden fees.",
  },
  {
    q: "Can I cancel my Premium plan anytime?",
    a: "Yes. Cancel from your dashboard at any time. You keep access to Premium features until the end of your billing cycle.",
  },
  {
    q: "Do you take a cut of the rent?",
    a: "No. Rent flows from tenant escrow directly to landlord. We never take a percentage of rent or caution fees.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Pricing
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Simple, written-down,
          <span className="italic text-emerald"> Nigerian pricing.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-strong">
          Free for tenants. Two professional tiers for landlords and agents. Pay in
          Naira, cancel any time.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isEmerald = plan.tone === "emerald";
          return (
            <article
              key={plan.name}
              className={
                isEmerald
                  ? "relative flex flex-col overflow-hidden rounded-[24px] border border-emerald-deep bg-emerald p-7 text-ivory shadow-[0_30px_60px_-30px_rgba(12,31,23,0.6)]"
                  : "relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-paper p-7"
              }
            >
              {isEmerald && (
                <>
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full sun-gradient opacity-70" />
                  <div className="grain-soft mix-blend-overlay" />
                </>
              )}

              <div className="relative flex items-center justify-between">
                <p
                  className={
                    isEmerald
                      ? "font-mono text-[11px] uppercase tracking-[0.28em] text-saffron"
                      : "font-mono text-[11px] uppercase tracking-[0.28em] text-saffron-deep"
                  }
                >
                  {plan.name}
                </p>
                {plan.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-saffron px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </span>
                )}
                {!plan.featured && (
                  <span
                    className={
                      isEmerald
                        ? "rounded-full border border-ivory/20 bg-ivory/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-ivory/80"
                        : "rounded-full border border-line bg-card px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-muted-strong"
                    }
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              <h3
                className={
                  isEmerald
                    ? "relative mt-5 font-display text-3xl italic"
                    : "relative mt-5 font-display text-3xl text-foreground"
                }
              >
                {plan.name}
              </h3>
              <p
                className={
                  isEmerald
                    ? "relative mt-2 text-sm text-ivory/85"
                    : "relative mt-2 text-sm text-muted-strong"
                }
              >
                {plan.description}
              </p>

              <div
                className={
                  isEmerald
                    ? "relative mt-6 flex items-baseline gap-2 border-y border-ivory/15 py-5"
                    : "relative mt-6 flex items-baseline gap-2 border-y border-line py-5"
                }
              >
                <span
                  className={
                    isEmerald
                      ? "font-display text-5xl"
                      : "font-display text-5xl text-foreground"
                  }
                >
                  {plan.price}
                </span>
                <span
                  className={
                    isEmerald
                      ? "font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/70"
                      : "font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
                  }
                >
                  {plan.cadence}
                </span>
              </div>

              <ul className="relative mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={
                      isEmerald
                        ? "flex items-start gap-2 text-ivory/90"
                        : "flex items-start gap-2 text-muted-strong"
                    }
                  >
                    <Check
                      className={
                        isEmerald
                          ? "mt-0.5 h-4 w-4 shrink-0 text-saffron"
                          : "mt-0.5 h-4 w-4 shrink-0 text-emerald"
                      }
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={
                  isEmerald
                    ? "btn-base btn-saffron relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm"
                    : "btn-base btn-emerald relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm"
                }
              >
                {plan.cta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </section>

      <section className="rounded-[24px] border border-line bg-paper p-6 sm:p-10 md:p-12">
        <p className="tag-eyebrow">Pricing FAQ</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          Read this before you upgrade.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="space-y-3">
              <p className="font-display text-xl text-foreground">{faq.q}</p>
              <p className="text-sm leading-6 text-muted-strong">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
