"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Clock,
  Loader2,
  MapPin,
  PhoneCall,
  Video,
} from "lucide-react";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

const TIME_SLOTS = [
  { value: "09:00", label: "09:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "17:00", label: "05:00 PM" },
];

type InspectionMode = "in_person" | "virtual";

interface BookInspectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
}

function buildUpcomingDates(): { value: string; weekday: string; day: string; month: string }[] {
  const out: { value: string; weekday: string; day: string; month: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      value: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return out;
}

export function BookInspectionModal({
  open,
  onOpenChange,
  property,
}: BookInspectionModalProps) {
  const dates = useMemo(buildUpcomingDates, []);
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [loading, setLoading] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const [form, setForm] = useState({
    mode: "in_person" as InspectionMode,
    date: dates[0]?.value || "",
    time: "11:00",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key as string]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<string, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required.";
    if (!form.email.includes("@")) next.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number.";
    if (!form.date) next.date = "Pick a date.";
    if (!form.time) next.time = "Pick a time.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 750));
    setConfirmationId(`SR-INSP-${Date.now().toString().slice(-6)}`);
    setLoading(false);
    setStep("submitted");
  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setStep("form");
        setConfirmationId(null);
        setErrors({});
      }, 200);
    }
  };

  const formattedDate = form.date
    ? new Date(form.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";
  const timeLabel =
    TIME_SLOTS.find((t) => t.value === form.time)?.label ?? form.time;

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent
        eyebrow="Inspection"
        title={
          step === "submitted"
            ? "You're booked."
            : "Book an inspection"
        }
        description={
          step === "submitted"
            ? "We've notified the landlord and added the visit to your dashboard."
            : `Choose a time to walk ${property.title} — in-person or virtual.`
        }
        className="max-w-xl"
      >
        {step === "submitted" ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-emerald-deep bg-emerald p-5 text-ivory">
              <div className="flex items-center gap-2">
                <CalendarCheck2 className="h-4 w-4 text-saffron" />
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
                  Confirmed
                </p>
              </div>
              <p className="mt-2 font-display text-2xl italic">{formattedDate}</p>
              <p className="font-display text-xl">at {timeLabel}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-ivory/85">
                {form.mode === "virtual" ? (
                  <>
                    <Video className="h-4 w-4" /> Virtual tour link will arrive 30
                    min before
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" />
                    {property.address}, {property.city}
                  </>
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-4 text-sm text-muted-strong">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                Confirmation
              </p>
              <p className="mt-1 font-display text-xl text-foreground">
                {confirmationId}
              </p>
              <p className="mt-2 text-xs">
                A reminder will go to{" "}
                <span className="font-medium text-foreground">{form.email}</span>{" "}
                and{" "}
                <span className="font-medium text-foreground">{form.phone}</span>{" "}
                an hour before.
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleClose(false)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                01 · How would you like to inspect?
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([
                  { value: "in_person", label: "In person", icon: MapPin, hint: "Meet the landlord on site" },
                  { value: "virtual", label: "Virtual", icon: Video, hint: "Live video walk-through" },
                ] as { value: InspectionMode; label: string; icon: typeof MapPin; hint: string }[]).map((opt) => {
                  const active = form.mode === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => update("mode", opt.value)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition",
                        active
                          ? "border-emerald bg-emerald text-ivory"
                          : "border-line bg-paper hover:-translate-y-0.5 hover:border-emerald/40"
                      )}
                    >
                      <opt.icon
                        className={cn(
                          "h-5 w-5",
                          active ? "text-saffron" : "text-emerald"
                        )}
                      />
                      <p
                        className={cn(
                          "mt-2 font-display text-lg",
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
                        {opt.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                02 · Pick a date
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {dates.map((d) => {
                  const active = form.date === d.value;
                  return (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => update("date", d.value)}
                      className={cn(
                        "flex flex-col items-center gap-0.5 rounded-2xl border px-2 py-3 transition",
                        active
                          ? "border-emerald bg-emerald text-ivory"
                          : "border-line bg-paper hover:border-emerald/40"
                      )}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        {d.weekday}
                      </span>
                      <span
                        className={cn(
                          "font-display text-lg",
                          active ? "text-ivory" : "text-foreground"
                        )}
                      >
                        {d.day}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-[0.2em]",
                          active ? "text-ivory/70" : "text-muted"
                        )}
                      >
                        {d.month}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.date && <p className="mt-1 text-xs text-clay">{errors.date}</p>}
            </section>

            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                03 · Time slot
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const active = form.time === slot.value;
                  return (
                    <button
                      type="button"
                      key={slot.value}
                      onClick={() => update("time", slot.value)}
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

            <section className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                04 · Your details
              </p>
              <Input
                id="fullName"
                label="Full name"
                placeholder="Chinedu Okafor"
                value={form.fullName}
                error={errors.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@smoothrent.io"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => update("email", e.target.value)}
                />
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <Textarea
                id="notes"
                label="Anything we should tell the landlord? (optional)"
                rows={2}
                placeholder="Bringing my partner · Need step-free access · Etc."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </section>

            <div className="rounded-2xl border border-line bg-card p-4 text-xs text-muted-strong">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-emerald" />
                <span className="font-mono uppercase tracking-[0.28em] text-muted">
                  Selected
                </span>
              </div>
              <p className="mt-2 font-display text-base text-foreground">
                {formattedDate || "Pick a date"} · {timeLabel}{" "}
                <span className="text-muted">
                  · {form.mode === "virtual" ? "Virtual tour" : "In person"}
                </span>
              </p>
              <p className="mt-1 flex items-center gap-1.5">
                <PhoneCall className="h-3 w-3" />
                Landlord typically responds in under 2 hours.
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
                    Confirm inspection
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
