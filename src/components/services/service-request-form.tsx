"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  DAY_LABEL,
  DAYS_OF_WEEK,
  FREQUENCY_LABEL,
} from "@/lib/services-data";
import type {
  DayOfWeek,
  ServiceCatalogItem,
  ServiceFrequency,
} from "@/types/service";

const FREQUENCY_DESC: Record<ServiceFrequency, string> = {
  one_off: "One scheduled visit. No recurring charges.",
  daily: "Every day on selected days.",
  weekly: "Every week on the selected day(s).",
  biweekly: "Every two weeks on the selected day(s).",
  monthly: "Once a month on the selected day(s).",
};

const TIME_SLOTS = [
  { value: "07:00", label: "07:00 AM" },
  { value: "08:00", label: "08:00 AM" },
  { value: "09:00", label: "09:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "17:00", label: "05:00 PM" },
];

export function ServiceRequestForm({
  service,
  propertyTitle,
  onCancel,
  onComplete,
}: {
  service: ServiceCatalogItem;
  propertyTitle: string;
  onCancel: () => void;
  onComplete: () => void;
}) {
  const defaultFrequency = service.supportedFrequencies[0];
  const [frequency, setFrequency] = useState<ServiceFrequency>(defaultFrequency);
  const [days, setDays] = useState<DayOfWeek[]>(
    defaultFrequency === "one_off" ? [] : [6]
  );
  const [time, setTime] = useState("09:00");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  });
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isOneOff = frequency === "one_off";
  const visitsPerMonth = useMemo(() => {
    if (frequency === "one_off") return 1;
    if (frequency === "daily") return Math.max(days.length, 1) * 4;
    if (frequency === "weekly") return Math.max(days.length, 1) * 4;
    if (frequency === "biweekly") return Math.max(days.length, 1) * 2;
    return Math.max(days.length, 1);
  }, [frequency, days]);

  const monthlyEstimate = service.basePrice * visitsPerMonth;

  const toggleDay = (day: DayOfWeek) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  const canSubmit =
    !!startDate && (isOneOff || days.length > 0) && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-saffron/30 animate-pulse" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-ivory">
            <CheckCircle2 className="h-8 w-8" />
          </span>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            Request received
          </p>
          <h3 className="mt-2 font-display text-3xl italic leading-tight text-foreground">
            {service.name} is on the way.
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-strong">
            We&rsquo;re matching a vetted vendor for{" "}
            <span className="text-foreground">{propertyTitle}</span>. You&rsquo;ll
            get a confirmation email within 30 minutes with the assigned crew and
            arrival window.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={onComplete} variant="primary">
            Back to services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          New service request
        </p>
        <h2 className="mt-2 font-display text-3xl italic leading-tight text-foreground sm:text-4xl">
          Schedule {service.name.toLowerCase()}.
        </h2>
        <p className="mt-2 text-sm text-muted-strong">
          For{" "}
          <span className="font-medium text-foreground">{propertyTitle}</span> ·{" "}
          {formatNaira(service.basePrice)} {service.unit}
        </p>
      </div>

      <section>
        <p className="tag-eyebrow">01 · Frequency</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {service.supportedFrequencies.map((f) => {
            const active = frequency === f;
            return (
              <button
                type="button"
                key={f}
                onClick={() => {
                  setFrequency(f);
                  if (f === "one_off") setDays([]);
                  else if (days.length === 0) setDays([6]);
                }}
                className={cn(
                  "rounded-2xl border p-4 text-left transition",
                  active
                    ? "border-emerald bg-emerald text-ivory shadow-[0_18px_40px_-30px_rgba(12,31,23,0.6)]"
                    : "border-line bg-paper hover:-translate-y-0.5 hover:border-emerald/40"
                )}
              >
                <p
                  className={cn(
                    "font-display text-xl",
                    active ? "text-ivory" : "text-foreground"
                  )}
                >
                  {FREQUENCY_LABEL[f]}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    active ? "text-ivory/80" : "text-muted-strong"
                  )}
                >
                  {FREQUENCY_DESC[f]}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {!isOneOff && (
        <section>
          <p className="tag-eyebrow">02 · Days of the week</p>
          <p className="mt-1 text-xs text-muted-strong">
            Pick one or more — we&rsquo;ll send the same crew on every selected
            day.
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {DAYS_OF_WEEK.map((d) => {
              const active = days.includes(d);
              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => toggleDay(d)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-2xl border px-2 py-3 transition",
                    active
                      ? "border-emerald bg-emerald text-ivory"
                      : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    {DAY_LABEL[d].short}
                  </span>
                  <span
                    className={cn(
                      "font-display text-lg",
                      active ? "text-ivory" : "text-foreground"
                    )}
                  >
                    {d}
                  </span>
                </button>
              );
            })}
          </div>
          {days.length === 0 && (
            <p className="mt-2 text-xs text-clay">
              Pick at least one day to continue.
            </p>
          )}
        </section>
      )}

      <section>
        <p className="tag-eyebrow">{isOneOff ? "02" : "03"} · Time window</p>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {TIME_SLOTS.map((slot) => {
            const active = slot.value === time;
            return (
              <button
                type="button"
                key={slot.value}
                onClick={() => setTime(slot.value)}
                className={cn(
                  "rounded-xl border px-2 py-2 text-xs font-medium transition",
                  active
                    ? "border-emerald bg-emerald text-ivory"
                    : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
                )}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Input
          id="start-date"
          label={isOneOff ? "Visit date" : "Start date"}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <div className="flex items-end gap-3 rounded-2xl border border-line bg-paper p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald text-ivory">
            <Clock className="h-4 w-4" />
          </span>
          <div className="text-xs leading-5 text-muted-strong">
            <p className="font-mono uppercase tracking-[0.22em] text-muted">
              Estimated arrival
            </p>
            <p className="font-display text-base text-foreground">
              ±15 min of {time.slice(0, 2)}:{time.slice(3)}
            </p>
          </div>
        </div>
      </section>

      <section>
        <Textarea
          id="notes"
          label="Notes for the crew (optional)"
          placeholder="Eco-detergent only · Gate code 2244 · Don't water orchids."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </section>

      {/* Summary */}
      <section className="overflow-hidden rounded-[20px] border border-emerald-deep bg-emerald p-6 text-ivory">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-saffron" />
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
            Summary
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              Frequency
            </p>
            <p className="font-display text-xl">{FREQUENCY_LABEL[frequency]}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              Days
            </p>
            <p className="font-display text-xl">
              {isOneOff
                ? "Single visit"
                : days.length === 0
                ? "—"
                : days.map((d) => DAY_LABEL[d].short).join(" · ")}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              Monthly estimate
            </p>
            <p className="font-display text-xl">
              {formatNaira(monthlyEstimate)}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              {visitsPerMonth} visit{visitsPerMonth > 1 ? "s" : ""}/mo ·{" "}
              {formatNaira(service.basePrice)} {service.unit}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ivory" type="button" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
          Choose another service
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Confirm request
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
