"use client";

import { useMemo, useState } from "react";
import {
  Hammer,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { mockArtisans, mockUserReviews } from "@/lib/mock-data";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ArtisanCategory, ArtisanProfile } from "@/types/user";

const CATEGORIES: { value: ArtisanCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrician", label: "Electrician" },
  { value: "ac_servicing", label: "AC servicing" },
  { value: "carpentry", label: "Carpentry" },
  { value: "tiling", label: "Tiling" },
  { value: "painting", label: "Painting" },
  { value: "cleaning", label: "Cleaning" },
  { value: "fumigation", label: "Fumigation" },
  { value: "gardening", label: "Gardening" },
  { value: "generator_repair", label: "Generator" },
  { value: "satellite", label: "Satellite" },
];

export default function CustomerArtisansPage() {
  const [category, setCategory] = useState<ArtisanCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [requestFor, setRequestFor] = useState<ArtisanProfile | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    when: "",
  });
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockArtisans.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (!q) return true;
      const hay =
        `${a.firstName} ${a.lastName} ${a.bio} ${a.serviceAreas.join(" ")} ${a.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  const sendRequest = () => {
    if (!requestFor) return;
    setConfirmation(`Request sent to ${requestFor.firstName}.`);
    setRequestFor(null);
    setDraft({ title: "", description: "", when: "" });
    setTimeout(() => setConfirmation(null), 2500);
  };

  return (
    <div className="space-y-8">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Customer · Artisans
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
          Find a vetted pro.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-strong">
          KYC-verified plumbers, electricians, cleaners and more — request a job
          directly and pay through SmoothRent.
        </p>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search by name, area, or trade…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {confirmation && (
          <span className="rounded-full bg-emerald px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory">
            {confirmation}
          </span>
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-emerald bg-emerald text-ivory"
                  : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-paper p-12 text-center text-sm text-muted-strong">
          No artisans match that filter yet.
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((artisan) => {
            const reviews = mockUserReviews.filter(
              (r) =>
                r.subjectId === artisan.id && r.subjectRole === "artisan"
            );
            const reviewCount = reviews.length;
            const avg =
              reviewCount > 0
                ? reviews.reduce((s, r) => s + r.rating, 0) / reviewCount
                : artisan.rating;
            return (
              <article
                key={artisan.id}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-5 transition hover:border-emerald/40"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    fallback={`${artisan.firstName[0]}${artisan.lastName[0]}`}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-xl text-foreground">
                        {artisan.firstName} {artisan.lastName}
                      </p>
                      {artisan.kycStatus === "verified" && (
                        <Badge variant="success" className="gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {CATEGORIES.find((c) => c.value === artisan.category)
                        ?.label ?? artisan.category}{" "}
                      · {artisan.yearsExperience} yrs
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 text-xs">
                      <Star className="h-3.5 w-3.5 text-saffron-deep" />
                      <span className="font-medium text-foreground">
                        {avg.toFixed(1)}
                      </span>
                      <span className="text-muted">
                        · {artisan.jobsCompleted} jobs
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-strong line-clamp-3">
                  {artisan.bio}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {artisan.serviceAreas.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-strong"
                    >
                      <MapPin className="h-3 w-3" /> {a}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-line pt-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      From
                    </p>
                    <p className="font-display text-xl text-foreground">
                      {formatNaira(artisan.baseRate)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setRequestFor(artisan)}
                  >
                    <Hammer className="h-3.5 w-3.5" />
                    Request job
                  </Button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <Modal
        open={!!requestFor}
        onOpenChange={(o) => {
          if (!o) {
            setRequestFor(null);
            setDraft({ title: "", description: "", when: "" });
          }
        }}
      >
        <ModalContent
          eyebrow="New job request"
          title={
            requestFor
              ? `Request a job from ${requestFor.firstName}`
              : "Request a job"
          }
          description="Describe what you need. The artisan will accept or propose a different time."
        >
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="e.g. Fix leaking sink"
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({ ...d, title: e.target.value }))
              }
            />
            <Textarea
              label="Describe the job"
              rows={4}
              placeholder="Where exactly is the issue? When did it start? Anything you've already tried."
              value={draft.description}
              onChange={(e) =>
                setDraft((d) => ({ ...d, description: e.target.value }))
              }
            />
            <Input
              label="Preferred date & time"
              type="datetime-local"
              value={draft.when}
              onChange={(e) =>
                setDraft((d) => ({ ...d, when: e.target.value }))
              }
            />
            <div className="rounded-xl border border-line bg-card p-3 text-xs text-muted-strong">
              <Sparkles className="mr-1 inline h-3.5 w-3.5 text-saffron-deep" />
              You only pay after the artisan accepts and the job is completed.
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ivory"
                onClick={() => setRequestFor(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={sendRequest}
                disabled={!draft.title.trim() || !draft.description.trim()}
              >
                Send request
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
