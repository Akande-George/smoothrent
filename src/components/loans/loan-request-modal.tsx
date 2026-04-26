"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  PURPOSE_HELPER,
  PURPOSE_LABEL,
  RENTAL_LOAN_MONTHLY_RATE,
  TERM_OPTIONS,
  computeRepaymentSchedule,
} from "@/lib/loan-data";
import type { LoanPurpose, LoanTerm } from "@/types/loan";

interface LoanLeaseOption {
  leaseId: string;
  propertyTitle: string;
  monthlyRent: number;
}

interface LoanRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaseOptions: LoanLeaseOption[];
  defaultPurpose?: LoanPurpose;
  maxAmount: number;
}

export function LoanRequestModal({
  open,
  onOpenChange,
  leaseOptions,
  defaultPurpose = "rent_upfront",
  maxAmount,
}: LoanRequestModalProps) {
  const firstLease = leaseOptions[0];
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const [form, setForm] = useState<{
    leaseId: string;
    purpose: LoanPurpose;
    amount: string;
    term: LoanTerm;
    notes: string;
  }>(() => ({
    leaseId: firstLease?.leaseId ?? "",
    purpose: defaultPurpose,
    amount: firstLease ? String(firstLease.monthlyRent * 3) : "",
    term: 6,
    notes: "",
  }));

  useEffect(() => {
    if (firstLease && !form.leaseId) {
      setForm((p) => ({
        ...p,
        leaseId: firstLease.leaseId,
        amount: String(firstLease.monthlyRent * 3),
      }));
    }
  }, [firstLease, form.leaseId]);

  const update = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key as string]: undefined }));
  };

  const amountNumber = Number(form.amount || 0);
  const schedule = useMemo(
    () =>
      amountNumber > 0
        ? computeRepaymentSchedule(amountNumber, form.term)
        : null,
    [amountNumber, form.term]
  );

  const validate = () => {
    const next: Partial<Record<string, string>> = {};
    if (leaseOptions.length > 0 && !form.leaseId) next.leaseId = "Pick a lease.";
    if (amountNumber < 50_000)
      next.amount = "Minimum loan amount is ₦50,000.";
    if (amountNumber > maxAmount)
      next.amount = `Above your limit of ${formatNaira(maxAmount)}.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setReference(`SR-LN-${Date.now().toString().slice(-6)}`);
    setLoading(false);
    setStep("submitted");
  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setStep("form");
        setReference(null);
        setErrors({});
      }, 200);
    }
  };

  const purposeOptions = (Object.keys(PURPOSE_LABEL) as LoanPurpose[]).map(
    (p) => ({ label: PURPOSE_LABEL[p], value: p })
  );

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent
        eyebrow="Rental loan"
        title={
          step === "submitted"
            ? "Your application is in."
            : "Request a rental loan."
        }
        description={
          step === "submitted"
            ? "We're reviewing your application. Approved loans disburse within 24 hours of approval."
            : `Borrow up to ${formatNaira(maxAmount)} at ${RENTAL_LOAN_MONTHLY_RATE}% / month flat. Repay alongside your rent.`
        }
        className="max-w-xl"
      >
        {step === "submitted" ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-emerald-deep bg-emerald p-5 text-ivory">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-saffron" />
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
                  Submitted
                </p>
              </div>
              <p className="mt-2 font-display text-2xl italic">{reference}</p>
              <p className="mt-2 text-sm text-ivory/85">
                Decision in under 24 hours. We&rsquo;ll text and email you.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-strong">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                Our underwriter cross-checks your KYC, BVN and lease.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                Approved funds land in your linked bank account in under 24
                hours.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                Repayments auto-debit on your rent due date.
              </li>
            </ul>
            <div className="flex justify-end">
              <Button onClick={() => handleClose(false)}>Done</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {leaseOptions.length > 0 && (
              <Select
                label="Apply against lease"
                options={leaseOptions.map((l) => ({
                  label: l.propertyTitle,
                  value: l.leaseId,
                }))}
                value={form.leaseId}
                onValueChange={(v) => update("leaseId", v)}
                error={errors.leaseId}
              />
            )}

            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-strong">
                What's it for?
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {purposeOptions.map((opt) => {
                  const active = form.purpose === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => update("purpose", opt.value)}
                      className={cn(
                        "rounded-2xl border p-3 text-left transition",
                        active
                          ? "border-emerald bg-emerald text-ivory"
                          : "border-line bg-paper hover:-translate-y-0.5 hover:border-emerald/40"
                      )}
                    >
                      <p
                        className={cn(
                          "font-display text-base",
                          active ? "text-ivory" : "text-foreground"
                        )}
                      >
                        {opt.label}
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          active ? "text-ivory/80" : "text-muted-strong"
                        )}
                      >
                        {PURPOSE_HELPER[opt.value]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              id="amount"
              label="Amount needed (₦)"
              type="number"
              hint={`Min ₦50,000 · Max ${formatNaira(maxAmount)}`}
              value={form.amount}
              error={errors.amount}
              onChange={(e) => update("amount", e.target.value)}
            />

            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-strong">
                Repayment term
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {TERM_OPTIONS.map((t) => {
                  const active = form.term === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => update("term", t)}
                      className={cn(
                        "rounded-xl border px-2 py-2 text-xs font-medium transition",
                        active
                          ? "border-emerald bg-emerald text-ivory"
                          : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
                      )}
                    >
                      {t} mo
                    </button>
                  );
                })}
              </div>
            </div>

            <Textarea
              id="loan-notes"
              label="Anything we should know? (optional)"
              rows={3}
              placeholder="e.g. landlord offered a 15% discount on annual upfront."
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />

            {schedule && (
              <div className="rounded-2xl border border-emerald-deep bg-emerald p-5 text-ivory">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-saffron" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
                    Repayment plan
                  </p>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
                      Monthly
                    </p>
                    <p className="font-display text-2xl">
                      {formatNaira(schedule.monthlyRepayment)}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
                      Total interest
                    </p>
                    <p className="font-display text-2xl">
                      {formatNaira(schedule.interest)}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
                      Total repayable
                    </p>
                    <p className="font-display text-2xl">
                      {formatNaira(schedule.totalRepayable)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-line bg-card p-3 text-xs text-muted-strong">
              <div className="flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5 text-emerald" />
                <span className="font-mono uppercase tracking-[0.28em] text-muted">
                  How it works
                </span>
              </div>
              <p className="mt-2 leading-5">
                We auto-debit the monthly repayment from your linked bank on
                rent day. No prepayment penalty — pay off any time.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="ivory" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Submit application
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
