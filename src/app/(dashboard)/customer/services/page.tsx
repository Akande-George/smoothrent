"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  History,
  Pause,
  Play,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ServiceRequestForm } from "@/components/services/service-request-form";
import {
  DAY_LABEL,
  FREQUENCY_LABEL,
  mockServiceRequests,
} from "@/lib/services-data";
import { useServiceCatalog } from "@/lib/service-catalog-store";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { mockLeases } from "@/lib/mock-data";
import type {
  ServiceCatalogItem,
  ServiceRequest,
  ServiceRequestStatus,
} from "@/types/service";

const TENANT_ID = "u1";

const CATEGORY_GRADIENT: Record<string, string> = {
  cleaning: "from-emerald via-emerald-soft to-saffron/40",
  laundry: "from-saffron via-clay/50 to-emerald-deep",
  fumigation: "from-clay via-saffron/60 to-sand",
  gardening: "from-emerald-deep via-emerald to-saffron/30",
  plumbing: "from-emerald-soft via-saffron/40 to-emerald",
  electrician: "from-saffron via-emerald-deep to-clay/40",
  ac_servicing: "from-emerald via-saffron/30 to-emerald-soft",
  chef: "from-clay via-saffron to-emerald-deep",
  security: "from-emerald-deep via-emerald to-clay/30",
  errand: "from-saffron via-emerald-soft to-clay/30",
};

const STATUS_VARIANT: Record<ServiceRequestStatus, "success" | "info" | "warning" | "default" | "danger"> = {
  scheduled: "info",
  in_progress: "info",
  completed: "success",
  paused: "warning",
  cancelled: "danger",
};

const STATUS_LABEL: Record<ServiceRequestStatus, string> = {
  scheduled: "Scheduled",
  in_progress: "In progress",
  completed: "Completed",
  paused: "Paused",
  cancelled: "Cancelled",
};

export default function CustomerServicesPage() {
  const { items: catalog } = useServiceCatalog();
  const myLease = mockLeases.find((l) => l.tenantId === TENANT_ID && l.status === "active");
  const propertyTitle =
    myLease?.propertyTitle ?? "Luxury 3 Bedroom Flat in Lekki Phase 1";

  const [requests, setRequests] = useState<ServiceRequest[]>(
    mockServiceRequests.filter((r) => r.tenantId === TENANT_ID)
  );
  const [selected, setSelected] = useState<ServiceCatalogItem | null>(null);

  const stats = useMemo(() => {
    const active = requests.filter((r) => r.status === "scheduled" || r.status === "in_progress").length;
    const monthlySpend = requests
      .filter((r) => r.status === "scheduled" || r.status === "in_progress")
      .reduce((acc, r) => {
        const visits =
          r.frequency === "weekly"
            ? r.daysOfWeek.length * 4
            : r.frequency === "biweekly"
            ? r.daysOfWeek.length * 2
            : r.frequency === "monthly"
            ? r.daysOfWeek.length || 1
            : r.frequency === "daily"
            ? r.daysOfWeek.length * 4
            : 1;
        return acc + r.pricePerVisit * visits;
      }, 0);
    const completed = requests.reduce((acc, r) => acc + r.visitsCompleted, 0);
    return { active, monthlySpend, completed };
  }, [requests]);

  const togglePause = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === "paused" ? "scheduled" : "paused",
            }
          : r
      )
    );
  };

  const cancelRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "cancelled" as const } : r))
    );
  };

  const noLease = !myLease;

  if (selected) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-strong transition hover:border-emerald hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
        <div className="rounded-[24px] border border-line bg-paper p-6 sm:p-9">
          <ServiceRequestForm
            service={selected}
            propertyTitle={propertyTitle}
            onCancel={() => setSelected(null)}
            onComplete={() => setSelected(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Resident services
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Run your home,
          <span className="italic text-emerald"> hands-free.</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-strong">
          Book vetted laundry, cleaning, gardening and more — on the days and at
          the frequencies that fit your week.
        </p>

        {noLease && (
          <div className="mt-6 rounded-2xl border border-clay/40 bg-clay/10 p-5 text-sm text-clay-deep">
            <p className="font-display text-lg text-foreground">
              No active lease yet.
            </p>
            <p className="mt-1">
              You&rsquo;ll be able to schedule resident services as soon as your
              lease is active. Browse the catalog below to plan ahead.
            </p>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Active services", value: stats.active.toString(), icon: Sparkles },
          { label: "Visits completed", value: stats.completed.toString(), icon: CheckCircle2 },
          {
            label: "Monthly estimate",
            value: formatNaira(stats.monthlySpend),
            icon: History,
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

      {/* Active requests */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="tag-eyebrow">My services</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              Scheduled & recent
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-strong">
            {requests.length} request{requests.length === 1 ? "" : "s"}
          </p>
        </div>

        {requests.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="h-12 w-12" />}
            title="No services yet"
            description="Browse the catalog below and schedule your first home service."
          />
        ) : (
          <div className="grid gap-3">
            {requests.map((req) => {
              const isActive = req.status === "scheduled" || req.status === "in_progress";
              const isPaused = req.status === "paused";
              const monthly =
                req.frequency === "weekly"
                  ? req.daysOfWeek.length * 4 * req.pricePerVisit
                  : req.frequency === "biweekly"
                  ? req.daysOfWeek.length * 2 * req.pricePerVisit
                  : req.frequency === "monthly"
                  ? (req.daysOfWeek.length || 1) * req.pricePerVisit
                  : req.frequency === "daily"
                  ? req.daysOfWeek.length * 4 * req.pricePerVisit
                  : req.pricePerVisit;
              return (
                <article
                  key={req.id}
                  className={cn(
                    "grid grid-cols-1 gap-5 overflow-hidden rounded-2xl border bg-paper p-5 transition lg:grid-cols-[2fr_1fr_auto]",
                    isPaused
                      ? "border-line opacity-70"
                      : "border-line hover:border-emerald/40"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br",
                        CATEGORY_GRADIENT[req.category] ?? "from-emerald to-saffron"
                      )}
                    >
                      <div className="grain-soft mix-blend-overlay" />
                      <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-ivory">
                        {req.serviceName[0]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl text-foreground">
                          {req.serviceName}
                        </h3>
                        <Badge variant={STATUS_VARIANT[req.status]}>
                          {STATUS_LABEL[req.status]}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {req.propertyTitle}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-strong">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-emerald" />
                          {FREQUENCY_LABEL[req.frequency]}
                          {req.daysOfWeek.length > 0 &&
                            ` · ${req.daysOfWeek
                              .map((d) => DAY_LABEL[d].short)
                              .join(" · ")}`}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-emerald" />
                          {req.preferredTime}
                        </span>
                        {req.vendorName && (
                          <span className="rounded-full border border-line bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                            {req.vendorName}
                          </span>
                        )}
                      </div>
                      {req.notes && (
                        <p className="mt-2 rounded-lg border border-dashed border-line bg-card px-3 py-2 text-[11px] italic text-muted-strong">
                          “{req.notes}”
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-line pt-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Next visit
                      </p>
                      <p className="font-display text-lg text-foreground">
                        {req.nextVisit && req.status !== "cancelled" && req.status !== "completed"
                          ? formatDate(req.nextVisit)
                          : req.lastVisit
                          ? `Last · ${formatDate(req.lastVisit)}`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Monthly est.
                      </p>
                      <p className="font-display text-lg text-foreground">
                        {formatNaira(monthly)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-stretch gap-2 border-t border-line pt-3 lg:flex-col lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                    {req.status !== "cancelled" && req.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() => togglePause(req.id)}
                        className={cn(
                          "flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition",
                          isActive
                            ? "border-line bg-card text-muted-strong hover:border-emerald hover:text-emerald"
                            : "border-emerald bg-emerald text-ivory"
                        )}
                      >
                        {isActive ? (
                          <>
                            <Pause className="h-3.5 w-3.5" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5" /> Resume
                          </>
                        )}
                      </button>
                    )}
                    {req.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() => cancelRequest(req.id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs font-medium text-clay transition hover:border-clay hover:bg-clay/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Cancel
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Catalog */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="tag-eyebrow">Catalog</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              Add a new service
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-strong">
            {catalog.length} vetted vendors
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {catalog.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all hover:-translate-y-1 hover:border-emerald/50"
            >
              <div
                className={cn(
                  "relative h-32 overflow-hidden bg-gradient-to-br",
                  CATEGORY_GRADIENT[service.category] ?? "from-emerald to-saffron"
                )}
              >
                <div className="grain-soft mix-blend-overlay" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                  {service.unit}
                </span>
                {service.popular && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-saffron px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                    <Sparkles className="h-3 w-3" /> Popular
                  </span>
                )}
                <span className="absolute bottom-3 left-3 font-display text-3xl italic text-ivory">
                  {service.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-sm text-muted-strong">{service.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-strong"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      From
                    </p>
                    <p className="font-display text-2xl text-foreground">
                      {formatNaira(service.basePrice)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setSelected(service)}
                    disabled={noLease}
                    className="gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Schedule
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footnote */}
      <section className="relative overflow-hidden rounded-[24px] border border-emerald-deep bg-emerald p-6 text-ivory sm:p-8">
        <div className="grain-soft mix-blend-overlay" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full sun-gradient opacity-70" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
              Concierge desk
            </p>
            <h3 className="mt-2 font-display text-2xl italic leading-snug">
              Need something not on the list?
            </h3>
            <p className="mt-2 text-sm text-ivory/85">
              Window cleaning, tinting, AC reinstallation, party setups — write
              to your concierge and we&rsquo;ll source a vetted vendor.
            </p>
          </div>
          <Button variant="accent">
            Talk to concierge
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Bottom hint */}
      <p className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
        <ChevronRight className="h-3 w-3" />
        All vendors are NIN-verified and insured by SmoothRent
      </p>
    </div>
  );
}
