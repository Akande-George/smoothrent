import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Shield,
  Users,
  Zap,
  Compass,
  Star,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & transparency",
    description:
      "Every listing is physically inspected. Every transaction is on the record. No hidden fees. No fake DMs.",
  },
  {
    icon: Zap,
    title: "Speed & precision",
    description:
      "Search to keys in days, not weeks. Our digital-first process replaces the inspection-fee shuffle.",
  },
  {
    icon: Heart,
    title: "Tenant-first design",
    description:
      "Built for the people who actually live in these homes. Comfort, dignity, and security come first.",
  },
  {
    icon: Users,
    title: "Community driven",
    description:
      "Connecting landlords, tenants, and agents in a marketplace built on mutual respect — not gatekeeping.",
  },
];

const team = [
  { name: "Tunde Ogundipe", role: "Co-founder & CEO", initials: "TO" },
  { name: "Funke Adeleke", role: "Head of Trust & Safety", initials: "FA" },
  { name: "Kelechi Madu", role: "Head of Engineering", initials: "KM" },
  { name: "Hauwa Sani", role: "Head of Operations, Abuja", initials: "HS" },
];

export default function AboutPage() {
  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            About SmoothRent
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
            Renting in Nigeria,
            <br className="hidden sm:block" />{" "}
            <span className="italic text-emerald">written down honestly.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong">
            We started SmoothRent because every Nigerian renter has the same story —
            inspection fees with no inspections, agent commissions with no agents,
            paper leases that nobody reads. We built a marketplace that writes it all
            down: every listing, every payment, every signature.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/listings"
              className="btn-base btn-emerald inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm"
            >
              Browse listings
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-base btn-outline inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm"
            >
              Talk to the team
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-line bg-emerald p-6 text-ivory sm:p-8">
          <div className="grain-soft mix-blend-overlay" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full sun-gradient opacity-70" />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.32em] text-saffron">
            Our promise
          </p>
          <h2 className="relative mt-3 font-display text-3xl italic leading-tight">
            “Every Nigerian deserves a calm, transparent way to find or let a home.”
          </h2>
          <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-ivory/15 pt-6">
            {[
              { stat: "500+", label: "Verified listings" },
              { stat: "2,400", label: "Happy tenants" },
              { stat: "15", label: "Cities live" },
            ].map((item) => (
              <div key={item.stat}>
                <p className="font-display text-3xl">{item.stat}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <p className="tag-eyebrow">Our values</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground">
            What we believe.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <article
              key={v.title}
              className="group flex gap-5 rounded-2xl border border-line bg-paper p-6 transition hover:border-emerald/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald text-ivory">
                <v.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-strong">
                  {v.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="tag-eyebrow">The team</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground">
              Built in Lagos. Written for Nigeria.
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-strong">
            Lagos · Abuja · Port Harcourt
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <article
              key={m.name}
              className="rounded-2xl border border-line bg-card p-5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald via-emerald-soft to-saffron font-display text-2xl text-ivory">
                {m.initials}
              </div>
              <p className="mt-4 font-display text-xl text-foreground">{m.name}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {m.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: Compass,
            title: "Backed by Nigerian operators",
            text: "Industry veterans from Paystack, Flutterwave, and Sterling Bank.",
          },
          {
            icon: Star,
            title: "Rated 4.9 / 5",
            text: "From over 1,400 verified tenants and landlords across the country.",
          },
          {
            icon: Shield,
            title: "Lagos State compliant",
            text: "Compliant with the Lagos Tenancy Law and the FCT Real Estate Code.",
          },
        ].map((b) => (
          <div
            key={b.title}
            className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron text-emerald-deep">
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-xl text-foreground">{b.title}</p>
              <p className="mt-1.5 text-sm text-muted-strong">{b.text}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
