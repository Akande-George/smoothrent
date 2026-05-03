"use client";

import { useState } from "react";
import { Check, Sparkles, Wallet, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalContent } from "@/components/ui/modal";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ArtisanPricingModel } from "@/types/user";
import { mockArtisans } from "@/lib/mock-data";

const ARTISAN_ID = "a1";

const PLAN_DETAIL: Record<
  ArtisanPricingModel,
  {
    name: string;
    headline: string;
    perks: string[];
    feeLine: string;
    priceLabel: string;
  }
> = {
  commission: {
    name: "Pay-as-you-earn",
    headline:
      "No fixed fees. SmoothRent retains a share of each completed job.",
    perks: [
      "No upfront commitment",
      "Scales with your volume",
      "Withdraw earnings any time",
      "Best for occasional jobs",
    ],
    feeLine: "SmoothRent takes 15% of every completed job's earnings.",
    priceLabel: "15% per job",
  },
  annual_subscription: {
    name: "Annual subscription",
    headline:
      "Pay once, keep 100% of every job for the next 12 months.",
    perks: [
      "Keep 100% of job earnings",
      "Priority placement in artisan directory",
      "Verified-pro badge",
      "Best for full-time artisans",
    ],
    feeLine:
      "₦70,000 paid once, renewable annually. SmoothRent collects nothing per job.",
    priceLabel: "₦70,000 / year",
  },
};

interface CurrentPlan {
  model: ArtisanPricingModel;
  startedAt?: string;
  renewsAt?: string;
}

export default function ArtisanBillingPage() {
  const artisan =
    mockArtisans.find((a) => a.id === ARTISAN_ID) ?? mockArtisans[0];
  const [current, setCurrent] = useState<CurrentPlan>({
    model: artisan.pricingModel,
    renewsAt: artisan.pricingActiveUntil,
    startedAt:
      artisan.pricingModel === "annual_subscription" ? artisan.createdAt : undefined,
  });
  const [pending, setPending] = useState<ArtisanPricingModel | null>(null);

  const confirm = () => {
    if (!pending) return;
    const today = new Date().toISOString().split("T")[0];
    if (pending === "annual_subscription") {
      const renews = new Date();
      renews.setFullYear(renews.getFullYear() + 1);
      setCurrent({
        model: pending,
        startedAt: today,
        renewsAt: renews.toISOString().split("T")[0],
      });
    } else {
      setCurrent({ model: pending });
    }
    setPending(null);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            Artisan · Billing
          </p>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            Choose how you pay SmoothRent.
          </h1>
          <p className="mt-1 text-sm text-muted-strong">
            Two simple options. Switch any time.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-strong">
          <Wallet className="h-3.5 w-3.5 text-emerald" />
          {PLAN_DETAIL[current.model].name}
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-deep bg-emerald p-6 text-ivory">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
              Active plan
            </p>
            <h2 className="mt-2 font-display text-3xl">
              {PLAN_DETAIL[current.model].name}
            </h2>
            <p className="mt-1 text-sm text-ivory/85">
              {PLAN_DETAIL[current.model].feeLine}
            </p>
          </div>
          {current.model === "annual_subscription" && current.renewsAt && (
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
                Renews
              </p>
              <p className="font-display text-2xl">
                {formatDate(current.renewsAt)}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {(Object.keys(PLAN_DETAIL) as ArtisanPricingModel[]).map((model) => {
          const detail = PLAN_DETAIL[model];
          const isCurrent = current.model === model;
          const isAnnual = model === "annual_subscription";
          return (
            <article
              key={model}
              className={cn(
                "relative flex flex-col gap-5 rounded-3xl border p-7",
                isAnnual ? "border-saffron/60 bg-paper" : "border-line bg-paper"
              )}
            >
              {isAnnual && (
                <span className="absolute right-5 top-5">
                  <Badge variant="warning" className="gap-1">
                    <Sparkles className="h-3 w-3" /> Best for full-timers
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

              <p className="font-display text-4xl text-foreground">
                {detail.priceLabel}
              </p>

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
                    variant={isAnnual ? "accent" : "primary"}
                    className="w-full"
                    onClick={() => setPending(model)}
                  >
                    Switch to {detail.name}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-line bg-paper p-6">
        <p className="tag-eyebrow">A worked example</p>
        <h3 className="mt-1 font-display text-xl text-foreground">
          ₦600,000 in jobs over a year
        </h3>
        <div className="mt-4 grid gap-3 text-sm text-muted-strong sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Commission model
            </p>
            <p className="mt-1 font-display text-foreground">15% of each job</p>
            <p>Total billed · ₦600,000</p>
            <p>SmoothRent fee · ₦90,000</p>
            <p className="mt-1 font-medium text-foreground">
              Take-home · ₦510,000
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Annual subscription
            </p>
            <p className="mt-1 font-display text-foreground">₦70,000 / year</p>
            <p>Total billed · ₦600,000</p>
            <p>SmoothRent fee · ₦70,000</p>
            <p className="mt-1 font-medium text-foreground">
              Take-home · ₦530,000
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          Tip: the subscription beats commission once your annual billing crosses
          roughly ₦470,000. Below that, pay-as-you-earn is the smarter pick.
        </p>
      </section>

      <Modal
        open={!!pending}
        onOpenChange={(o) => {
          if (!o) setPending(null);
        }}
      >
        <ModalContent
          eyebrow="Switch plan"
          title={pending ? `Confirm ${PLAN_DETAIL[pending].name}` : "Confirm"}
          description="You can change plans again anytime."
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-card p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-strong">Plan</span>
                <span className="font-medium text-foreground">
                  {pending && PLAN_DETAIL[pending].name}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-strong">Charge today</span>
                <span className="font-display text-foreground">
                  {pending === "annual_subscription"
                    ? formatNaira(70_000)
                    : "₦0 (per-job fee applies)"}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ivory"
                onClick={() => setPending(null)}
              >
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={confirm}>
                Confirm & switch
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
