"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { formatNaira } from "@/lib/format";
import type { Property } from "@/types/property";

const employmentOptions = [
  { label: "Salaried — full time", value: "salaried" },
  { label: "Self-employed", value: "self_employed" },
  { label: "Business owner", value: "business" },
  { label: "Contract / freelance", value: "contract" },
  { label: "Student", value: "student" },
  { label: "Other", value: "other" },
];

const occupantOptions = [
  { label: "Just me", value: "1" },
  { label: "2 adults", value: "2" },
  { label: "3 adults", value: "3" },
  { label: "Family with kids", value: "family" },
  { label: "Shared (roommates)", value: "shared" },
];

interface ApplyNowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
}

export function ApplyNowModal({ open, onOpenChange, property }: ApplyNowModalProps) {
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const today = new Date();
  const defaultMoveIn = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .slice(0, 10);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nin: "",
    employment: "salaried",
    employer: "",
    monthlyIncome: "",
    occupants: "1",
    moveInDate: defaultMoveIn,
    notes: "",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const total =
    property.price + property.cautionFee + property.serviceCharge + property.serviceFee;

  const validate = () => {
    const next: Partial<Record<string, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required.";
    if (!form.email.includes("@")) next.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number.";
    if (form.nin.replace(/\D/g, "").length < 9)
      next.nin = "NIN must be at least 11 digits.";
    if (!form.employer.trim() && form.employment !== "student" && form.employment !== "other")
      next.employer = "Please tell us your employer.";
    if (Number(form.monthlyIncome) <= 0)
      next.monthlyIncome = "Enter a monthly income.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 850));
    const ref = `SR-APP-${Date.now().toString().slice(-6)}`;
    setReferenceId(ref);
    setLoading(false);
    setStep("submitted");
  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setStep("form");
        setReferenceId(null);
        setErrors({});
      }, 200);
    }
  };

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent
        eyebrow="Tenant application"
        title={
          step === "submitted"
            ? "Application received."
            : `Apply for ${property.title}`
        }
        description={
          step === "submitted"
            ? "We've routed your application to the landlord. You'll hear back within 48 hours."
            : `Submit once, reuse everywhere. Move-in cost: ${formatNaira(total)} (${formatNaira(property.serviceFee)} service fee).`
        }
        className="max-w-xl"
      >
        {step === "submitted" ? (
          <div className="space-y-5 text-center">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-saffron/30 animate-pulse" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-ivory">
                <CheckCircle2 className="h-6 w-6" />
              </span>
            </div>
            <div className="rounded-2xl border border-line bg-card p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                Reference
              </p>
              <p className="mt-1 font-display text-2xl text-foreground">{referenceId}</p>
            </div>
            <ul className="space-y-2 text-left text-sm text-muted-strong">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                You&rsquo;ll receive a confirmation email at{" "}
                <span className="font-medium text-foreground">{form.email}</span>.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                The landlord has 48 hours to review and respond.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                Track this application from your tenant dashboard.
              </li>
            </ul>
            <div className="flex justify-end gap-2">
              <Button onClick={() => handleClose(false)}>Done</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id="fullName"
                label="Full name"
                placeholder="Chinedu Okafor"
                value={form.fullName}
                error={errors.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@smoothrent.ng"
                value={form.email}
                error={errors.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id="phone"
                label="Phone"
                type="tel"
                placeholder="+234 801 234 5678"
                value={form.phone}
                error={errors.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              <Input
                id="nin"
                label="NIN"
                hint="11 digits"
                placeholder="12345678901"
                value={form.nin}
                error={errors.nin}
                onChange={(e) => update("nin", e.target.value)}
              />
            </div>
            <Select
              label="Employment"
              options={employmentOptions}
              value={form.employment}
              onValueChange={(v) => update("employment", v)}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id="employer"
                label="Employer / business"
                placeholder="e.g. Paystack"
                value={form.employer}
                error={errors.employer}
                onChange={(e) => update("employer", e.target.value)}
              />
              <Input
                id="monthlyIncome"
                label="Monthly income (₦)"
                type="number"
                placeholder="e.g. 850000"
                value={form.monthlyIncome}
                error={errors.monthlyIncome}
                onChange={(e) => update("monthlyIncome", e.target.value)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                label="Who will live here?"
                options={occupantOptions}
                value={form.occupants}
                onValueChange={(v) => update("occupants", v)}
              />
              <Input
                id="moveInDate"
                label="Preferred move-in"
                type="date"
                value={form.moveInDate}
                onChange={(e) => update("moveInDate", e.target.value)}
              />
            </div>
            <Textarea
              id="notes"
              label="Note to the landlord (optional)"
              rows={3}
              placeholder="Any context about pets, working from home, lease length…"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />

            <div className="rounded-2xl border border-line bg-card p-3 text-xs text-muted-strong">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                <span className="font-mono uppercase tracking-[0.28em] text-muted">
                  Verified application
                </span>
              </div>
              <p className="mt-2 leading-5">
                We&rsquo;ll run NIN + BVN checks and only share approved details with
                the landlord. No documents are sent without your consent.
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
