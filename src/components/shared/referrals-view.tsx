"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Copy,
  Gift,
  Mail,
  MessageCircle,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

interface ReferralRecord {
  id: string;
  name: string;
  status: "completed" | "pending";
  date: string;
  reward: number;
  category: "tenant" | "landlord" | "agent" | "service";
}

interface RoleCopy {
  eyebrow: string;
  headline: string;
  subhead: string;
  rewardCopy: string;
  rewardAmount: number;
  eligibleTargets: { kind: ReferralRecord["category"]; label: string; reward: number; helper: string }[];
  records: ReferralRecord[];
  highlights: { label: string; value: string }[];
}

const PER_ROLE: Record<UserRole, RoleCopy> = {
  customer: {
    eyebrow: "Tenant rewards",
    headline: "Refer anyone — tenants, landlords, agents.",
    subhead:
      "Tenants can refer the whole ecosystem. Pull friends onto SmoothRent and earn rewards every time one of them takes their first verified action.",
    rewardCopy: "Up to ₦15,000 per successful referral",
    rewardAmount: 15_000,
    eligibleTargets: [
      { kind: "tenant", label: "Refer a tenant", reward: 5_000, helper: "Earn when they sign their first lease." },
      { kind: "landlord", label: "Refer a landlord", reward: 15_000, helper: "Earn when their first listing is leased." },
      { kind: "agent", label: "Refer an agent", reward: 10_000, helper: "Earn when they close their first deal." },
    ],
    records: [
      { id: "rc1", name: "Tobi Adekunle — Tenant", status: "completed", date: "2026-02-15", reward: 5_000, category: "tenant" },
      { id: "rc2", name: "Ngozi Uche — Tenant", status: "pending", date: "2026-03-10", reward: 5_000, category: "tenant" },
      { id: "rc3", name: "Yusuf Danjuma — Tenant", status: "completed", date: "2026-01-20", reward: 5_000, category: "tenant" },
      { id: "rc4", name: "Halima Bashir — Landlord", status: "pending", date: "2026-03-22", reward: 15_000, category: "landlord" },
    ],
    highlights: [
      { label: "Total referrals", value: "4" },
      { label: "Successful", value: "2" },
      { label: "Earned", value: formatNaira(10_000) },
    ],
  },
  landlord: {
    eyebrow: "Landlord rewards",
    headline: "Refer fellow landlords or agents.",
    subhead:
      "Landlords can refer other landlords and agents to the platform — strengthen the supply side and earn alongside it.",
    rewardCopy: "Up to ₦15,000 per successful referral",
    rewardAmount: 15_000,
    eligibleTargets: [
      { kind: "landlord", label: "Refer a landlord", reward: 15_000, helper: "Earn when their first listing is leased." },
      { kind: "agent", label: "Refer an agent", reward: 10_000, helper: "Earn when they close their first deal." },
    ],
    records: [
      { id: "rl1", name: "Olubunmi Fadeyi — Landlord", status: "completed", date: "2026-02-22", reward: 15_000, category: "landlord" },
      { id: "rl2", name: "Halima Yakubu — Landlord", status: "pending", date: "2026-03-15", reward: 15_000, category: "landlord" },
      { id: "rl3", name: "Sandra Eze — Agent", status: "completed", date: "2026-01-30", reward: 10_000, category: "agent" },
    ],
    highlights: [
      { label: "Total referrals", value: "3" },
      { label: "Successful", value: "2" },
      { label: "Earned", value: formatNaira(25_000) },
    ],
  },
  agent: {
    eyebrow: "Agent rewards",
    headline: "Refer fellow agents.",
    subhead:
      "Bring more vetted agents onto SmoothRent. ₦10,000 lands in your wallet for every agent who closes their first deal on the platform.",
    rewardCopy: "₦10,000 per agent who closes",
    rewardAmount: 10_000,
    eligibleTargets: [
      { kind: "agent", label: "Refer an agent", reward: 10_000, helper: "Earn when they close their first deal." },
    ],
    records: [
      { id: "ra1", name: "Musa Ibrahim — Agent", status: "completed", date: "2026-02-12", reward: 10_000, category: "agent" },
      { id: "ra4", name: "Sandra Eze — Agent", status: "completed", date: "2026-01-22", reward: 10_000, category: "agent" },
      { id: "ra5", name: "Tunde Akin — Agent", status: "pending", date: "2026-03-18", reward: 10_000, category: "agent" },
    ],
    highlights: [
      { label: "Total referrals", value: "3" },
      { label: "Successful", value: "2" },
      { label: "Earned", value: formatNaira(20_000) },
    ],
  },
  admin: {
    eyebrow: "Platform rewards",
    headline: "Track referral payouts.",
    subhead: "Monitor referrals across roles and approve withdrawals.",
    rewardCopy: "₦5,000–₦15,000 per qualifying referral",
    rewardAmount: 15_000,
    eligibleTargets: [
      { kind: "tenant", label: "Tenant", reward: 5_000, helper: "Tenants referring tenants." },
      { kind: "landlord", label: "Landlord", reward: 15_000, helper: "Tenant or landlord referrals." },
      { kind: "agent", label: "Agent", reward: 10_000, helper: "Any role referring agents." },
    ],
    records: [],
    highlights: [
      { label: "Total payouts (mo)", value: formatNaira(380_000) },
      { label: "Pending review", value: "12" },
      { label: "Top earner", value: "Emeka N." },
    ],
  },
};

const PROGRAM_TIERS: { count: string; label: string; reward: string }[] = [
  { count: "1–4", label: "Starter", reward: "Standard reward" },
  { count: "5–14", label: "Builder", reward: "+10% bonus" },
  { count: "15+", label: "Ambassador", reward: "+25% bonus + featured badge" },
];

export function ReferralsView({
  role,
  firstName,
}: {
  role: UserRole;
  firstName: string;
}) {
  const copy = PER_ROLE[role];
  const code = useMemo(
    () => `${firstName.toUpperCase()}-SR2026`,
    [firstName]
  );
  const link = `https://smoothrent.io/ref/${code}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(link);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = copy.records
    .filter((r) => r.status === "completed")
    .reduce((acc, r) => acc + r.reward, 0);

  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Find your next home or list yours on SmoothRent — use my code ${code}: ${link}`)}`,
    email: `mailto:?subject=${encodeURIComponent("Try SmoothRent")}&body=${encodeURIComponent(`Use my code ${code} to sign up: ${link}`)}`,
  };

  return (
    <div className="space-y-10">
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          {copy.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-foreground sm:text-5xl">
          {copy.headline}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-strong">
          {copy.subhead}
        </p>
      </section>

      <section className="relative overflow-hidden rounded-[24px] border border-emerald-deep bg-emerald p-6 text-ivory sm:p-8">
        <div className="grain-soft mix-blend-overlay" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full sun-gradient opacity-70" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-saffron px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
              <Sparkles className="h-3 w-3" />
              {copy.rewardCopy}
            </span>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/65">
              Your code
            </p>
            <p className="mt-1 font-display text-4xl tracking-wider">{code}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <code className="rounded-full bg-ivory/10 px-3 py-1.5 font-mono text-xs text-ivory/85">
                {link}
              </code>
              <Button variant="accent" size="sm" type="button" onClick={handleCopy}>
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ivory/10 px-4 text-xs font-medium text-ivory transition hover:bg-ivory/20"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href={shareUrls.email}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ivory/10 px-4 text-xs font-medium text-ivory transition hover:bg-ivory/20"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ivory/10 px-4 text-xs font-medium text-ivory transition hover:bg-ivory/20"
              >
                <Share2 className="h-3.5 w-3.5" /> More
              </button>
            </div>
          </div>
          <div className="grid gap-3 self-end">
            {copy.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-ivory/15 bg-ivory/5 p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/65">
                  {h.label}
                </p>
                <p className="mt-1 font-display text-2xl">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {PROGRAM_TIERS.map((t) => (
          <article
            key={t.label}
            className="rounded-2xl border border-line bg-paper p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-saffron-deep">
              {t.count} referrals
            </p>
            <p className="mt-1 font-display text-2xl text-foreground">{t.label}</p>
            <p className="mt-2 text-xs text-muted-strong">{t.reward}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="tag-eyebrow">Activity</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              Referral history
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-strong">
            Earned · {formatNaira(totalEarned)}
          </p>
        </div>

        {copy.records.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper p-8 text-center text-sm text-muted">
            No referrals yet — share your code to get started.
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-paper">
            {copy.records.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5",
                  i < copy.records.length - 1 && "border-b border-line"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald font-display text-base text-ivory">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {r.category} · {formatDate(r.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-display text-base text-foreground">
                    {formatNaira(r.reward)}
                  </p>
                  {r.status === "completed" ? (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Earned
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-line bg-card p-5 text-sm text-muted-strong">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald" />
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            How rewards work
          </p>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          <li className="flex items-start gap-2">
            <Gift className="mt-0.5 h-4 w-4 shrink-0 text-saffron-deep" />
            Share your code by link, WhatsApp, or email.
          </li>
          <li className="flex items-start gap-2">
            <Gift className="mt-0.5 h-4 w-4 shrink-0 text-saffron-deep" />
            Reward unlocks once they complete their first verified action.
          </li>
          <li className="flex items-start gap-2">
            <Gift className="mt-0.5 h-4 w-4 shrink-0 text-saffron-deep" />
            Pay out to your bank, or apply against your next SmoothRent invoice.
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted">
          Want a custom code? Email{" "}
          <a
            href="mailto:partnerships@smoothrent.io"
            className="text-emerald underline underline-offset-2"
          >
            partnerships@smoothrent.io
          </a>
          .
        </p>
      </section>

      <Input
        id="ref-link"
        label="Your full referral link"
        readOnly
        value={link}
        onClick={(e) => (e.target as HTMLInputElement).select()}
      />
    </div>
  );
}
