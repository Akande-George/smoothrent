"use client";

import { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All", count: 8 },
  { id: "trust", label: "Trust & verification", count: 2 },
  { id: "fees", label: "Fees & payments", count: 2 },
  { id: "leases", label: "Leases & maintenance", count: 2 },
  { id: "agents", label: "Agents & landlords", count: 2 },
];

const faqs = [
  {
    cat: "trust",
    q: "How does SmoothRent verify property listings?",
    a: "Our team physically inspects each property and verifies ownership documents before a listing receives the Verified badge. We also use NIN and BVN verification for landlords and agents.",
  },
  {
    cat: "fees",
    q: "What fees does SmoothRent charge tenants?",
    a: "SmoothRent is free for tenants to browse and apply. You only pay your standard rent components — monthly rent, a refundable caution fee, and a transparent service fee — all displayed up-front before you apply.",
  },
  {
    cat: "trust",
    q: "How does the KYC process work?",
    a: "During your application you'll provide your NIN, BVN, employment details, and a guarantor. This builds a portable profile you reuse across applications, and helps landlords verify identity quickly.",
  },
  {
    cat: "fees",
    q: "What payment methods are accepted?",
    a: "Payments flow through Paystack, which supports bank transfers, debit cards, and USSD. Rent is held in escrow and released to landlords on a clear schedule. All transactions are tracked on the platform.",
  },
  {
    cat: "leases",
    q: "Can I sign leases digitally on SmoothRent?",
    a: "Yes. SmoothRent supports digital lease agreements with e-signatures. Both landlords and tenants can review, sign, and download lease documents from their dashboards at any time.",
  },
  {
    cat: "leases",
    q: "How do maintenance requests work?",
    a: "Tenants submit maintenance requests with photos and descriptions. Landlords receive notifications and can track, assign, and resolve requests with status updates from their dashboard.",
  },
  {
    cat: "trust",
    q: "What cities does SmoothRent operate in?",
    a: "We currently operate in Lagos, Abuja, Port Harcourt, Ibadan, Enugu, and Kano, with plans to expand to all major Nigerian cities through 2026.",
  },
  {
    cat: "agents",
    q: "How do I become a verified agent?",
    a: "Register as an agent, complete your KYC verification, and choose either our Basic (commission sharing) or Premium plan. Premium agents retain 100% of their commissions and earn the Verified badge.",
  },
];

export default function FAQPage() {
  const [active, setActive] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) => {
    if (active !== "all" && f.cat !== active) return false;
    if (
      query &&
      !`${f.q} ${f.a}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      <section className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Journal · Reader’s questions
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Everything we get
          <span className="italic text-emerald"> asked, often.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-strong">
          A living document. If your question isn’t here, write to us — we’ll add it.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl space-y-5">
        <div className="field-shell relative rounded-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the journal…"
            className="h-13 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition",
                active === c.id
                  ? "border-emerald bg-emerald text-ivory"
                  : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
              )}
            >
              {c.label}
              <span
                className={cn(
                  "rounded-full px-1.5 font-mono text-[10px]",
                  active === c.id ? "bg-ivory/20" : "bg-card"
                )}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-paper p-8 text-center text-sm text-muted">
              No questions match that search yet.
            </div>
          )}
          {filtered.map((faq, i) => {
            const open = openIndex === i;
            return (
              <article
                key={faq.q}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-paper transition-all",
                  open
                    ? "border-emerald shadow-[0_18px_40px_-30px_rgba(12,31,23,0.5)]"
                    : "border-line hover:border-line-strong"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl leading-snug text-foreground">
                      {faq.q}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                      open
                        ? "bg-emerald text-ivory"
                        : "border border-line text-muted-strong"
                    )}
                  >
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {open && (
                  <div className="border-t border-line px-5 pb-6 pl-[3.25rem] pt-4">
                    <p className="text-sm leading-7 text-muted-strong">{faq.a}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
