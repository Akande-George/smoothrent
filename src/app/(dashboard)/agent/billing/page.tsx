"use client";

import { useState } from "react";
import { Check, Sparkles, Wallet, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalContent } from "@/components/ui/modal";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AgentTier, SubscriptionInterval } from "@/types/user";

const PLAN_PRICING: Record<
  AgentTier,
  Record<SubscriptionInterval, number>
> = {
  tier1: { monthly: 25_000, quarterly: 71_250, yearly: 270_000 },
  tier2: { monthly: 50_000, quarterly: 142_500, yearly: 540_000 },
};

const PLAN_DETAIL: Record<
  AgentTier,
  {
    name: string;
    headline: string;
    perks: string[];
    commissionLine: string;
  }
> = {
  tier1: {
    name: "Tier 1 · Starter",
    headline: "Lower fixed fee, SmoothRent retains a small slice of commission.",
    perks: [
      "List up to 25 active properties",
      "Verified Agent badge",
      "Pipeline tools & client CRM",
      "Standard support (48h response)",
    ],
    commissionLine:
      "SmoothRent retains 2.5% from the 10% commission on every closed deal — agent keeps 7.5%.",
  },
  tier2: {
    name: "Tier 2 · Premium",
    headline: "Higher fixed fee, you keep 100% of every commission.",
    perks: [
      "Unlimited active listings",
      "Priority placement in search",
      "Featured agent profile",
      "Priority support (4h response)",
      "Bulk listing import",
    ],
    commissionLine:
      "Agents retain 100% of the 10% rental commission on every closed deal.",
  },
};

const INTERVALS: {
  key: SubscriptionInterval;
  label: string;
  hint: string;
}[] = [
  { key: "monthly", label: "Monthly", hint: "billed every month" },
  { key: "quarterly", label: "Quarterly", hint: "save ~5%" },
  { key: "yearly", label: "Yearly", hint: "save ~10%" },
];

interface CurrentPlan {
  tier: AgentTier;
  interval: SubscriptionInterval;
  startedAt: string;
  renewsAt: string;
}

const CURRENT: CurrentPlan = {
  tier: "tier1",
  interval: "monthly",
  startedAt: "2026-04-01",
  renewsAt: "2026-05-01",
};

export default function AgentBillingPage() {
  const [interval, setInterval] = useState<SubscriptionInterval>("monthly");
  const [pendingTier, setPendingTier] = useState<AgentTier | null>(null);
  const [current, setCurrent] = useState<CurrentPlan>(CURRENT);

  const confirmSwitch = () => {
    if (!pendingTier) return;
    const today = new Date().toISOString().split("T")[0];
    const renews = new Date();
    renews.setMonth(
      renews.getMonth() +
        (interval === "monthly" ? 1 : interval === "quarterly" ? 3 : 12)
    );
    setCurrent({
      tier: pendingTier,
      interval,
      startedAt: today,
      renewsAt: renews.toISOString().split("T")[0],
    });
    setPendingTier(null);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            Agent · Billing
          </p>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            Your subscription.
          </h1>
          <p className="mt-1 text-sm text-muted-strong">
            SmoothRent for Agents has two tiers. Pick the plan that matches the
            volume you close.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-strong">
          <Wallet className="h-3.5 w-3.5 text-emerald" />
          {PLAN_DETAIL[current.tier].name} · {current.interval}
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-deep bg-emerald p-6 text-ivory">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
              Active plan
            </p>
            <h2 className="mt-2 font-display text-3xl">
              {PLAN_DETAIL[current.tier].name}
            </h2>
            <p className="mt-1 text-sm text-ivory/85">
              {PLAN_DETAIL[current.tier].commissionLine}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl">
              {formatNaira(PLAN_PRICING[current.tier][current.interval])}
              <span className="ml-1 text-sm text-ivory/65">
                /{current.interval === "monthly" ? "mo" : current.interval === "quarterly" ? "qtr" : "yr"}
              </span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              Renews {formatDate(current.renewsAt)}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-line bg-paper p-1">
          {INTERVALS.map((i) => {
            const active = interval === i.key;
            return (
              <button
                key={i.key}
                type="button"
                onClick={() => setInterval(i.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition",
                  active
                    ? "bg-emerald text-ivory"
                    : "text-muted-strong hover:text-foreground"
                )}
              >
                {i.label}
                <span
                  className={cn(
                    "ml-2 font-mono text-[9px] uppercase",
                    active ? "text-ivory/70" : "text-muted"
                  )}
                >
                  {i.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {(Object.keys(PLAN_DETAIL) as AgentTier[]).map((tier) => {
          const detail = PLAN_DETAIL[tier];
          const price = PLAN_PRICING[tier][interval];
          const isCurrent =
            tier === current.tier && interval === current.interval;
          const isHigher = tier === "tier2";
          return (
            <article
              key={tier}
              className={cn(
                "relative flex flex-col gap-5 rounded-3xl border p-7",
                isHigher
                  ? "border-saffron/60 bg-paper"
                  : "border-line bg-paper"
              )}
            >
              {isHigher && (
                <span className="absolute right-5 top-5">
                  <Badge variant="warning" className="gap-1">
                    <Sparkles className="h-3 w-3" /> Top earners
                  </Badge>
                </span>
              )}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
                  {detail.name}
                </p>
                <h3 className="mt-2 font-display text-2xl text-foreground">
                  {detail.headline}
                </h3>
              </div>

              <div className="flex items-end gap-2">
                <p className="font-display text-5xl text-foreground">
                  {formatNaira(price)}
                </p>
                <p className="pb-2 text-sm text-muted">
                  /
                  {interval === "monthly"
                    ? "month"
                    : interval === "quarterly"
                    ? "quarter"
                    : "year"}
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-card p-4 text-sm text-muted-strong">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Commission split
                </p>
                <p className="mt-1 leading-6">{detail.commissionLine}</p>
              </div>

              <ul className="space-y-2 text-sm text-foreground">
                {detail.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {isCurrent ? (
                  <Button
                    type="button"
                    variant="ivory"
                    className="w-full"
                    disabled
                  >
                    Current plan
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant={isHigher ? "accent" : "primary"}
                    className="w-full"
                    onClick={() => setPendingTier(tier)}
                  >
                    {tier === "tier2" && current.tier === "tier1"
                      ? "Upgrade to Premium"
                      : tier === "tier1" && current.tier === "tier2"
                      ? "Switch to Starter"
                      : "Choose this plan"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-line bg-paper p-6">
        <p className="tag-eyebrow">How commission works</p>
        <h3 className="mt-1 font-display text-xl text-foreground">
          A clear example.
        </h3>
        <div className="mt-4 grid gap-3 text-sm text-muted-strong sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              On a ₦5,000,000 yearly rent
            </p>
            <p className="mt-1 font-display text-foreground">Tier 1 · Starter</p>
            <p>10% agent commission = ₦500,000</p>
            <p>SmoothRent retains 2.5% (₦125,000)</p>
            <p className="mt-1 font-medium text-foreground">
              Agent take-home: ₦375,000
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              On a ₦5,000,000 yearly rent
            </p>
            <p className="mt-1 font-display text-foreground">Tier 2 · Premium</p>
            <p>10% agent commission = ₦500,000</p>
            <p>Agent retains 100%</p>
            <p className="mt-1 font-medium text-foreground">
              Agent take-home: ₦500,000
            </p>
          </div>
        </div>
      </section>

      <Modal
        open={!!pendingTier}
        onOpenChange={(o) => {
          if (!o) setPendingTier(null);
        }}
      >
        <ModalContent
          eyebrow="Switch plan"
          title={
            pendingTier
              ? `Confirm ${PLAN_DETAIL[pendingTier].name}`
              : "Confirm plan"
          }
          description="You can change plans again anytime. Pro-rating is automatic."
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-card p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-strong">Plan</span>
                <span className="font-medium text-foreground">
                  {pendingTier ? PLAN_DETAIL[pendingTier].name : ""}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-strong">Interval</span>
                <span className="font-medium text-foreground capitalize">
                  {interval}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-strong">Total</span>
                <span className="font-display text-foreground">
                  {pendingTier &&
                    formatNaira(PLAN_PRICING[pendingTier][interval])}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ivory"
                onClick={() => setPendingTier(null)}
              >
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={confirmSwitch}>
                Confirm & switch
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
