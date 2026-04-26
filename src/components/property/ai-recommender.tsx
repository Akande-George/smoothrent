"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bath,
  Bed,
  Loader2,
  MapPin,
  Maximize,
  Send,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { mockProperties } from "@/lib/mock-data";
import { formatNaira, rentSuffix } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

const QUICK_PROMPTS = [
  "Quiet 2 bed flat in Lekki under ₦400k with 24/7 power",
  "Self-contain in Yaba near UNILAG, prepaid meter",
  "Family-friendly 3 bed terrace in Abuja with security",
  "Penthouse in VI with ocean view and a gym",
];

const STATE_KEYWORDS = ["lagos", "abuja", "fct", "rivers", "oyo", "kano", "enugu", "delta", "edo"];

interface Match {
  property: Property;
  score: number;
  reasons: string[];
}

function parseBudget(prompt: string): number | null {
  const lower = prompt.toLowerCase();
  const match = lower.match(/(\d+(?:\.\d+)?)\s*(k|m|million|thousand)?/g);
  if (!match) return null;
  for (const raw of match) {
    const m = raw.match(/(\d+(?:\.\d+)?)\s*(k|m|million|thousand)?/);
    if (!m) continue;
    const n = parseFloat(m[1]);
    const unit = (m[2] || "").toLowerCase();
    if (unit === "m" || unit === "million") return n * 1_000_000;
    if (unit === "k" || unit === "thousand") return n * 1_000;
    if (n >= 10_000) return n;
  }
  return null;
}

function parseBedrooms(prompt: string): number | null {
  const lower = prompt.toLowerCase();
  const m = lower.match(/(\d+)\s*(?:bed|bedroom|br|-?bed)/);
  if (m) return parseInt(m[1], 10);
  if (/studio|self[\s-]?contain/.test(lower)) return 0;
  return null;
}

function score(prompt: string, property: Property): Match {
  const lower = prompt.toLowerCase();
  let s = 0;
  const reasons: string[] = [];

  // Type match
  const typeLower = property.type.toLowerCase();
  if (lower.includes(typeLower)) {
    s += 25;
    reasons.push(`Matches "${property.type}"`);
  }
  // Special: self-contain
  if (/self[\s-]?contain/.test(lower) && /self-?contain/.test(typeLower)) {
    s += 20;
  }

  // Location
  if (lower.includes(property.city.toLowerCase())) {
    s += 22;
    reasons.push(`In ${property.city}`);
  }
  if (lower.includes(property.area.toLowerCase()) && property.area.length > 2) {
    s += 12;
  }
  if (lower.includes(property.state.toLowerCase())) {
    s += 8;
  }
  for (const k of STATE_KEYWORDS) {
    if (lower.includes(k) && property.state.toLowerCase().includes(k)) {
      s += 4;
      break;
    }
  }

  // Bedrooms
  const wantBeds = parseBedrooms(prompt);
  if (wantBeds !== null) {
    if (property.bedrooms === wantBeds) {
      s += 18;
      reasons.push(`${property.bedrooms} bedroom${property.bedrooms === 1 ? "" : "s"}`);
    } else if (Math.abs(property.bedrooms - wantBeds) === 1) {
      s += 8;
    }
  }

  // Budget
  const budget = parseBudget(prompt);
  if (budget) {
    if (property.price <= budget) {
      s += 15;
      reasons.push(`Within ${formatNaira(budget)} budget`);
    } else if (property.price <= budget * 1.15) {
      s += 5;
    } else {
      s -= 10;
    }
  }

  // Power supply mentions
  if (/(power|nepa|electric|24\/?7|24 hours)/.test(lower)) {
    if ((property.powerSupplyHours ?? 0) >= 22) {
      s += 14;
      reasons.push(`${property.powerSupplyHours}h power / day`);
    } else if ((property.powerSupplyHours ?? 0) >= 16) {
      s += 6;
    }
    if (property.amenities.includes("24/7 Power Supply")) {
      s += 6;
    }
    if (property.amenities.includes("Generator")) {
      s += 4;
    }
  }

  // Amenity / lifestyle keywords
  const amenityKeywords: { match: RegExp; amenity: string; bonus: number; reason?: string }[] = [
    { match: /(pool|swim)/, amenity: "Swimming Pool", bonus: 8, reason: "Has a pool" },
    { match: /(gym|fitness)/, amenity: "Gym", bonus: 8, reason: "Gym on site" },
    { match: /(secur|gated|safe)/, amenity: "Security", bonus: 6, reason: "Secure compound" },
    { match: /(park|garage)/, amenity: "Parking Space", bonus: 4 },
    { match: /(bq|boys quarters)/, amenity: "Boys Quarters (BQ)", bonus: 6, reason: "Has BQ" },
    { match: /(cctv|camera)/, amenity: "CCTV", bonus: 5 },
    { match: /(prepaid|meter)/, amenity: "Prepaid Meter", bonus: 5, reason: "Prepaid meter" },
    { match: /(playground|kids|children|family)/, amenity: "Children Playground", bonus: 5, reason: "Family-friendly" },
    { match: /(serviced|concierge)/, amenity: "Serviced", bonus: 6, reason: "Fully serviced" },
    { match: /(new|newly)/, amenity: "Newly Built", bonus: 4 },
  ];
  for (const ak of amenityKeywords) {
    if (ak.match.test(lower) && property.amenities.includes(ak.amenity as Property["amenities"][number])) {
      s += ak.bonus;
      if (ak.reason && !reasons.includes(ak.reason)) reasons.push(ak.reason);
    }
  }

  // Lifestyle: quiet / luxury
  if (/(quiet|peaceful|serene)/.test(lower) && (property.area.toLowerCase().includes("phase") || property.amenities.includes("Security"))) {
    s += 4;
  }
  if (/(luxury|premium|high[\s-]?end|posh)/.test(lower) && property.price >= 500_000) {
    s += 6;
    reasons.push("Premium tier");
  }
  if (/(affordable|cheap|budget|low)/.test(lower) && property.price <= 100_000) {
    s += 8;
    reasons.push("Budget-friendly");
  }

  // Verified bias
  if (property.isVerified) s += 3;

  return { property, score: s, reasons: [...new Set(reasons)].slice(0, 4) };
}

function recommend(prompt: string): Match[] {
  return mockProperties
    .filter((p) => p.status === "Available")
    .map((p) => score(prompt, p))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export function AIRecommender({
  trigger,
  className,
}: {
  trigger?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [results, setResults] = useState<Match[] | null>(null);
  const [intro, setIntro] = useState<string>("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const submit = (text?: string) => {
    const value = (text ?? prompt).trim();
    if (!value) return;
    setPrompt(value);
    setThinking(true);
    setResults(null);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const matches = recommend(value);
      setResults(matches);
      setIntro(buildIntro(value, matches));
      setThinking(false);
    }, 900);
  };

  const reset = () => {
    setPrompt("");
    setResults(null);
    setIntro("");
  };

  const triggerEl = trigger ?? (
    <Button
      type="button"
      variant="accent"
      onClick={() => setOpen(true)}
      className={className}
    >
      <Wand2 className="h-4 w-4" />
      Ask AI to find me a home
    </Button>
  );

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents">
        {triggerEl}
      </span>
      <Modal
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            if (timer.current) clearTimeout(timer.current);
            setThinking(false);
          }
        }}
      >
        <ModalContent
          eyebrow="SmoothRent · AI concierge"
          title="Describe your dream home."
          description="Tell us what you want — neighbourhood, budget, vibe, anything. We'll match you against verified listings."
          className="max-w-2xl"
        >
          <div className="space-y-5">
            {!results && (
              <>
                <Textarea
                  label="Your wishlist"
                  rows={4}
                  placeholder="e.g. A 2 bedroom flat in Lekki with 24/7 power, security, and a pool, under ₦400k a month."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  }}
                />
                <div className="space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                    Or try one of these
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => submit(q)}
                        className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-muted-strong transition hover:border-emerald hover:text-emerald-deep"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => submit()}
                    disabled={!prompt.trim() || thinking}
                  >
                    {thinking ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Find my home
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {thinking && (
              <ThinkingState prompt={prompt} />
            )}

            {results && !thinking && (
              <ResultsView
                intro={intro}
                results={results}
                prompt={prompt}
                onReset={reset}
                onClose={() => setOpen(false)}
              />
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

function ThinkingState({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-line bg-paper p-5">
      <div className="flex items-center gap-2 text-emerald-deep">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <p className="font-mono text-[11px] uppercase tracking-[0.28em]">
          Searching listings…
        </p>
      </div>
      <p className="text-sm italic text-muted-strong">&ldquo;{prompt}&rdquo;</p>
      <div className="space-y-2">
        {[0.6, 0.8, 0.5].map((w, i) => (
          <div
            key={i}
            className="h-2.5 animate-pulse rounded-full bg-line"
            style={{ width: `${w * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ResultsView({
  intro,
  results,
  prompt,
  onReset,
  onClose,
}: {
  intro: string;
  results: Match[];
  prompt: string;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-emerald p-5 text-ivory">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-saffron">
          <Sparkles className="h-3.5 w-3.5" />
          AI concierge
        </div>
        <p className="mt-2 text-sm leading-6 text-ivory/90">{intro}</p>
        <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-ivory/10 px-2.5 py-1 font-mono text-[10px] text-ivory/80">
          You said: &ldquo;{prompt}&rdquo;
        </p>
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-paper p-6 text-center text-sm text-muted-strong">
          No clear matches yet — try widening your budget or location.
        </div>
      ) : (
        <ol className="space-y-3">
          {results.map((m, idx) => (
            <RecommendationCard key={m.property.id} match={m} rank={idx + 1} onClose={onClose} />
          ))}
        </ol>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="ivory" onClick={onReset}>
          Refine search
        </Button>
        <Link
          href="/listings"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-strong hover:text-emerald-deep"
        >
          Browse all listings <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function RecommendationCard({
  match,
  rank,
  onClose,
}: {
  match: Match;
  rank: number;
  onClose: () => void;
}) {
  const p = match.property;
  return (
    <li className="rounded-2xl border border-line bg-paper p-4 transition hover:border-emerald/50">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald font-display text-base text-ivory">
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <MapPin className="-mt-0.5 mr-1 inline h-3 w-3" />
            {p.area} · {p.city}
          </p>
          <p className="font-display text-lg leading-tight text-foreground">
            {p.title}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-strong">
            {p.bedrooms > 0 && (
              <span className="inline-flex items-center gap-1">
                <Bed className="h-3 w-3" /> {p.bedrooms}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3 w-3" /> {p.bathrooms}
            </span>
            {p.sqft && (
              <span className="inline-flex items-center gap-1">
                <Maximize className="h-3 w-3" /> {p.sqft.toLocaleString()}
              </span>
            )}
            {p.powerSupplyHours !== undefined && (
              <span className="inline-flex items-center gap-1 text-emerald">
                <Zap className="h-3 w-3" /> {p.powerSupplyHours}h
              </span>
            )}
          </div>
          {match.reasons.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {match.reasons.map((r) => (
                <span
                  key={r}
                  className={cn(
                    "rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-[10px] font-medium text-emerald-deep"
                  )}
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-display text-lg text-foreground">
            {formatNaira(p.price)}
            <span className="text-xs text-muted">{rentSuffix(p.rentType)}</span>
          </p>
          <Link
            href={`/listings/${p.id}`}
            onClick={onClose}
            className="btn-base btn-emerald inline-flex h-9 items-center gap-1 rounded-full px-3 text-xs"
          >
            View <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </li>
  );
}

function buildIntro(prompt: string, matches: Match[]): string {
  if (matches.length === 0) {
    return "I couldn't find a confident match. Try mentioning a city, a budget, and the number of bedrooms — that helps me narrow things down.";
  }
  const top = matches[0].property;
  const budget = parseBudget(prompt);
  const beds = parseBedrooms(prompt);
  const bits: string[] = [];
  if (beds !== null) bits.push(`${beds === 0 ? "studio-style" : `${beds}-bedroom`} space`);
  if (budget) bits.push(`under ${formatNaira(budget)}`);
  const wishline = bits.length > 0 ? `looking for a ${bits.join(", ")}` : "based on what you described";
  return `Got it — ${wishline}. I shortlisted ${matches.length} listing${matches.length === 1 ? "" : "s"}. The top pick is ${top.title} in ${top.city}.`;
}
