"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Filter,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockArtisanJobs } from "@/lib/mock-data";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ArtisanJob, ArtisanJobStatus } from "@/types/user";

const ARTISAN_ID = "a1";

const FILTERS: { key: "all" | ArtisanJobStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "requested", label: "New" },
  { key: "accepted", label: "Accepted" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
];

const STATUS_VARIANT: Record<
  ArtisanJobStatus,
  "warning" | "info" | "success" | "default" | "danger"
> = {
  requested: "warning",
  accepted: "info",
  in_progress: "info",
  completed: "success",
  cancelled: "danger",
};

export default function ArtisanJobsPage() {
  const [jobs, setJobs] = useState<ArtisanJob[]>(
    mockArtisanJobs.filter((j) => j.artisanId === ARTISAN_ID)
  );
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: jobs.length };
    for (const j of jobs) map[j.status] = (map[j.status] ?? 0) + 1;
    return map;
  }, [jobs]);

  const filtered = useMemo(
    () => (filter === "all" ? jobs : jobs.filter((j) => j.status === filter)),
    [jobs, filter]
  );

  const updateStatus = (id: string, status: ArtisanJobStatus) =>
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status,
              completedAt:
                status === "completed"
                  ? new Date().toISOString().split("T")[0]
                  : j.completedAt,
            }
          : j
      )
    );

  return (
    <div className="space-y-6">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Artisan · Jobs
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          Your job pipeline.
        </h1>
        <p className="mt-1 text-sm text-muted-strong">
          Accept new requests, mark in-progress jobs, and close out completed ones.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition",
                active
                  ? "border-emerald bg-emerald text-ivory"
                  : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
              )}
            >
              <Filter className="h-3 w-3" />
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 font-mono text-[10px]",
                  active ? "bg-ivory/20" : "bg-card"
                )}
              >
                {counts[f.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-paper p-12 text-center text-sm text-muted-strong">
          No jobs in this view.
        </div>
      ) : (
        <section className="grid gap-3">
          {filtered.map((job) => (
            <article
              key={job.id}
              className="grid gap-4 rounded-2xl border border-line bg-paper p-5 lg:grid-cols-[2fr_1.2fr_auto]"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  fallback={job.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                  size="md"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg text-foreground">
                      {job.title}
                    </p>
                    <Badge variant={STATUS_VARIANT[job.status]}>
                      {job.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-strong">
                    {job.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald" />
                      {formatDate(job.scheduledFor)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-emerald" />
                      {job.city}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-line pt-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    Customer
                  </p>
                  <p className="font-medium text-foreground">{job.customerName}</p>
                  {job.customerPhone && (
                    <a
                      href={`tel:${job.customerPhone}`}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-deep hover:underline"
                    >
                      <Phone className="h-3 w-3" /> {job.customerPhone}
                    </a>
                  )}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    Agreed
                  </p>
                  <p className="font-display text-base text-foreground">
                    {formatNaira(job.agreedAmount)}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    Payout {formatNaira(job.payout)} · fee {formatNaira(job.platformFee)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-line pt-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                {job.status === "requested" && (
                  <>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => updateStatus(job.id, "accepted")}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                    </Button>
                    <Button
                      type="button"
                      variant="ivory"
                      size="sm"
                      onClick={() => updateStatus(job.id, "cancelled")}
                    >
                      <XCircle className="h-3.5 w-3.5" /> Decline
                    </Button>
                  </>
                )}
                {job.status === "accepted" && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => updateStatus(job.id, "in_progress")}
                  >
                    Start work
                  </Button>
                )}
                {job.status === "in_progress" && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => updateStatus(job.id, "completed")}
                  >
                    Mark done
                  </Button>
                )}
                {(job.status === "completed" || job.status === "cancelled") && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {job.status === "completed"
                      ? `Closed ${job.completedAt ? formatDate(job.completedAt) : ""}`
                      : "Cancelled"}
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
