"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Coins,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoanRequestModal } from "@/components/loans/loan-request-modal";
import {
  RENTAL_LOAN_MAX_MULTIPLIER,
  RENTAL_LOAN_MONTHLY_RATE,
  PURPOSE_LABEL,
  mockRentalLoans,
} from "@/lib/loan-data";
import { mockLeases } from "@/lib/mock-data";
import { formatDate, formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { LoanApplication, LoanStatus } from "@/types/loan";

const TENANT_ID = "u1";

const STATUS_VARIANT: Record<LoanStatus, "success" | "info" | "warning" | "danger" | "default"> = {
  draft: "default",
  submitted: "info",
  under_review: "info",
  approved: "warning",
  disbursed: "success",
  repaying: "info",
  paid_off: "success",
  rejected: "danger",
  overdue: "danger",
};

const STATUS_LABEL: Record<LoanStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Reviewing",
  approved: "Approved",
  disbursed: "Disbursed",
  repaying: "Repaying",
  paid_off: "Paid off",
  rejected: "Rejected",
  overdue: "Overdue",
};

export default function CustomerLoansPage() {
  const [loans] = useState<LoanApplication[]>(
    mockRentalLoans.filter((l) => l.tenantId === TENANT_ID)
  );
  const [requestOpen, setRequestOpen] = useState(false);

  const myLeases = mockLeases.filter(
    (l) => l.tenantId === TENANT_ID && l.status === "active"
  );

  const leaseOptions = myLeases.map((l) => ({
    leaseId: l.id,
    propertyTitle: l.propertyTitle,
    monthlyRent: l.rentAmount,
  }));

  const monthlyRent = leaseOptions[0]?.monthlyRent ?? 290_000;
  const maxLoan = monthlyRent * RENTAL_LOAN_MAX_MULTIPLIER;

  const stats = useMemo(() => {
    const repaying = loans.filter((l) => l.status === "repaying" || l.status === "disbursed");
    const totalOutstanding = repaying.reduce(
      (acc, l) => acc + (l.totalRepayable - l.amountRepaid),
      0
    );
    const lifetimeBorrowed = loans.reduce(
      (acc, l) => acc + (l.amountApproved ?? 0),
      0
    );
    const onTimeRepayments = loans
      .filter((l) => l.status === "paid_off")
      .length;
    return {
      activeLoans: repaying.length,
      totalOutstanding,
      lifetimeBorrowed,
      onTimeRepayments,
    };
  }, [loans]);

  const activeLoans = loans.filter(
    (l) => l.status === "repaying" || l.status === "disbursed"
  );
  const otherLoans = loans.filter(
    (l) => l.status !== "repaying" && l.status !== "disbursed"
  );

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[28px] border border-emerald-deep bg-emerald p-6 text-ivory sm:p-9">
        <div className="grain-soft mix-blend-overlay" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full sun-gradient opacity-70" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
              Rental loans
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Borrow against your rent.
              <br />
              <span className="italic">Pay it back, monthly.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-ivory/85">
              Pay your rent upfront for a discount, cover the caution fee, or
              fund your move — at {RENTAL_LOAN_MONTHLY_RATE}% / month flat. No
              prepayment penalty.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                variant="accent"
                onClick={() => setRequestOpen(true)}
                disabled={leaseOptions.length === 0}
              >
                <Plus className="h-4 w-4" />
                Request a loan
              </Button>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/65">
                Borrow up to {formatNaira(maxLoan)} · 3 to 24 months
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              {
                icon: Wallet,
                label: "Available limit",
                value: formatNaira(maxLoan - stats.totalOutstanding),
              },
              {
                icon: TrendingUp,
                label: "Outstanding",
                value: formatNaira(stats.totalOutstanding),
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/5 p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-emerald-deep">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/65">
                    {s.label}
                  </p>
                  <p className="font-display text-2xl">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {leaseOptions.length === 0 && (
        <div className="rounded-2xl border border-clay/40 bg-clay/10 p-5 text-sm text-clay-deep">
          <p className="font-display text-lg text-foreground">
            No active lease yet.
          </p>
          <p className="mt-1">
            Rental loans are tied to an active SmoothRent lease. Sign your first
            lease and we&rsquo;ll unlock loans automatically.
          </p>
        </div>
      )}

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          {
            icon: CircleDollarSign,
            label: "Active loans",
            value: stats.activeLoans.toString(),
          },
          {
            icon: Coins,
            label: "Lifetime borrowed",
            value: formatNaira(stats.lifetimeBorrowed),
          },
          {
            icon: CheckCircle2,
            label: "On-time payments",
            value: stats.onTimeRepayments.toString(),
          },
          {
            icon: ShieldCheck,
            label: "Credit score",
            value: "742",
          },
        ].map((s) => (
          <article
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald text-ivory">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                {s.label}
              </p>
              <p className="font-display text-2xl text-foreground">{s.value}</p>
            </div>
          </article>
        ))}
      </section>

      {activeLoans.length > 0 && (
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="tag-eyebrow">Repaying</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">
                Your active loans
              </h2>
            </div>
          </div>
          <div className="grid gap-4">
            {activeLoans.map((loan) => {
              const progress = loan.totalRepayable
                ? Math.min(100, (loan.amountRepaid / loan.totalRepayable) * 100)
                : 0;
              return (
                <article
                  key={loan.id}
                  className="overflow-hidden rounded-2xl border border-line bg-paper p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={STATUS_VARIANT[loan.status]}>
                          {STATUS_LABEL[loan.status]}
                        </Badge>
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                          {loan.reference}
                        </p>
                      </div>
                      <h3 className="mt-2 font-display text-2xl text-foreground">
                        {PURPOSE_LABEL[loan.purpose]}
                      </h3>
                      <p className="text-sm text-muted">{loan.propertyTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Borrowed
                      </p>
                      <p className="font-display text-2xl text-foreground">
                        {formatNaira(loan.amountApproved ?? loan.amountRequested)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-muted-strong">
                      <span>
                        {formatNaira(loan.amountRepaid)} of{" "}
                        {formatNaira(loan.totalRepayable)} repaid
                      </span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-emerald"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-line bg-card p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Monthly
                      </p>
                      <p className="font-display text-lg text-foreground">
                        {formatNaira(loan.monthlyRepayment)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-line bg-card p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Term
                      </p>
                      <p className="font-display text-lg text-foreground">
                        {loan.termMonths} months
                      </p>
                    </div>
                    <div className="rounded-xl border border-line bg-card p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Next payment
                      </p>
                      <p className="font-display text-lg text-foreground">
                        {loan.nextRepaymentDate
                          ? formatDate(loan.nextRepaymentDate)
                          : "—"}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {otherLoans.length > 0 && (
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="tag-eyebrow">History</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">
                Past applications
              </h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-paper">
            {otherLoans.map((loan, i) => (
              <div
                key={loan.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5",
                  i < otherLoans.length - 1 && "border-b border-line"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-ivory">
                    <Coins className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base text-foreground">
                      {PURPOSE_LABEL[loan.purpose]}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {loan.reference} · {formatDate(loan.submittedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-display text-base text-foreground">
                    {formatNaira(loan.amountRequested)}
                  </p>
                  <Badge variant={STATUS_VARIANT[loan.status]} className="gap-1">
                    {loan.status === "paid_off" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : loan.status === "rejected" ? null : (
                      <Clock className="h-3 w-3" />
                    )}
                    {STATUS_LABEL[loan.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden rounded-[24px] border border-line bg-paper p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full sun-gradient opacity-50" />
        <p className="tag-eyebrow">How rental loans work</p>
        <h3 className="mt-2 font-display text-3xl text-foreground">
          Built for Nigerian renters.
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Calendar,
              title: "Apply in 3 minutes",
              text: "Pick the amount and term. We confirm against your KYC + lease.",
            },
            {
              icon: ShieldCheck,
              title: "Approved in 24 hours",
              text: "Decision via email + SMS. Funds disburse to your bank within a day.",
            },
            {
              icon: TrendingUp,
              title: "Repay alongside rent",
              text: "Auto-debit on rent day. Pay off early — no penalty.",
            },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald text-ivory">
                <b.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-lg text-foreground">{b.title}</p>
                <p className="text-sm text-muted-strong">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <Sparkles className="h-4 w-4 text-saffron-deep" />
          <p className="text-sm text-muted-strong">
            Need a custom limit? Email{" "}
            <a
              href="mailto:loans@smoothrent.io"
              className="text-emerald underline underline-offset-2"
            >
              loans@smoothrent.io
            </a>
          </p>
          <Button
            variant="ivory"
            className="ml-auto"
            onClick={() => setRequestOpen(true)}
            disabled={leaseOptions.length === 0}
          >
            New loan
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <LoanRequestModal
        open={requestOpen}
        onOpenChange={setRequestOpen}
        leaseOptions={leaseOptions}
        maxAmount={maxLoan}
      />
    </div>
  );
}
