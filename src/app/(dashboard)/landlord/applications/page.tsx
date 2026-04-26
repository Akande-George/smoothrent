"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { TenantReviewsCard } from "@/components/property/tenant-reviews-card";
import {
  mockApplications,
  mockProperties,
  mockTenantReviews,
  mockUsers,
} from "@/lib/mock-data";
import { formatDate, formatNaira, rentSuffix } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PropertyApplication } from "@/types/property";

const LANDLORD_ID = "u2";

const FILTERS: {
  key: "all" | "submitted" | "under_review" | "approved" | "rejected";
  label: string;
}[] = [
  { key: "all", label: "All" },
  { key: "submitted", label: "New" },
  { key: "under_review", label: "Reviewing" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

interface DecisionModalState {
  application: PropertyApplication;
  decision: "approved" | "rejected";
}

export default function ApplicationsPage() {
  const landlordPropertyIds = useMemo(
    () =>
      mockProperties.filter((p) => p.landlordId === LANDLORD_ID).map((p) => p.id),
    []
  );

  const [applications, setApplications] = useState<PropertyApplication[]>(
    mockApplications.filter((a) => landlordPropertyIds.includes(a.propertyId))
  );
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]["key"]>("all");
  const [pendingDecision, setPendingDecision] =
    useState<DecisionModalState | null>(null);
  const [decisionNote, setDecisionNote] = useState("");

  const counts = useMemo(() => {
    const all = applications.length;
    const newApps = applications.filter((a) => a.status === "submitted").length;
    const reviewing = applications.filter(
      (a) => a.status === "under_review"
    ).length;
    const approved = applications.filter((a) => a.status === "approved").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    return { all, newApps, reviewing, approved, rejected };
  }, [applications]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return applications;
    return applications.filter((a) => a.status === activeFilter);
  }, [applications, activeFilter]);

  const findProperty = (id: string) => mockProperties.find((p) => p.id === id);
  const findTenant = (email: string) =>
    mockUsers.find((u) => u.email === email);

  const setStatus = (
    id: string,
    status: PropertyApplication["status"],
    notes?: string
  ) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              reviewedAt: new Date().toISOString().split("T")[0],
              notes: notes ?? a.notes,
            }
          : a
      )
    );
  };

  const startReview = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (!app || app.status !== "submitted") return;
    setStatus(id, "under_review");
  };

  const confirmDecision = () => {
    if (!pendingDecision) return;
    setStatus(pendingDecision.application.id, pendingDecision.decision, decisionNote || undefined);
    setPendingDecision(null);
    setDecisionNote("");
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            Landlord · Applications
          </p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
            Review applicants.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-strong">
            Approve, reject, or open a conversation. Verified KYC details only —
            we won&rsquo;t share documents until you act.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-strong">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-saffron" />
          {counts.newApps} awaiting review
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.all, icon: Filter, tone: "paper" },
          { label: "Awaiting", value: counts.newApps, icon: Clock, tone: "paper" },
          { label: "Approved", value: counts.approved, icon: CheckCircle2, tone: "emerald" },
          { label: "Rejected", value: counts.rejected, icon: XCircle, tone: "paper" },
        ].map((s) => {
          const isEmerald = s.tone === "emerald";
          return (
            <article
              key={s.label}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-5",
                isEmerald
                  ? "border-emerald-deep bg-emerald text-ivory"
                  : "border-line bg-paper"
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  isEmerald ? "bg-ivory text-emerald-deep" : "bg-emerald text-ivory"
                )}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.28em]",
                    isEmerald ? "text-ivory/65" : "text-muted"
                  )}
                >
                  {s.label}
                </p>
                <p
                  className={cn(
                    "font-display text-2xl",
                    isEmerald ? "text-ivory" : "text-foreground"
                  )}
                >
                  {s.value}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = activeFilter === f.key;
          const count =
            f.key === "all"
              ? counts.all
              : f.key === "submitted"
              ? counts.newApps
              : f.key === "under_review"
              ? counts.reviewing
              : f.key === "approved"
              ? counts.approved
              : counts.rejected;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition",
                active
                  ? "border-emerald bg-emerald text-ivory"
                  : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 font-mono text-[10px]",
                  active ? "bg-ivory/20" : "bg-card"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-paper p-12 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-saffron-deep" />
          <p className="mt-3 font-display text-2xl text-foreground">
            No applications here yet.
          </p>
          <p className="mt-1 text-sm text-muted-strong">
            Once tenants apply, they&rsquo;ll appear in this view for review.
          </p>
        </div>
      ) : (
        <section className="grid gap-3">
          {filtered.map((app) => {
            const property = findProperty(app.propertyId);
            const tenant = findTenant(app.tenantEmail);
            const initials = app.tenantName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");
            const canDecide =
              app.status === "submitted" || app.status === "under_review";

            const tenantReviews = mockTenantReviews.filter(
              (r) => r.tenantId === app.tenantId
            );
            const landlord = mockUsers.find((u) => u.id === LANDLORD_ID);
            return (
              <article
                key={app.id}
                className="space-y-5 rounded-2xl border border-line bg-paper p-5 transition hover:border-emerald/40"
              >
                <div className="grid gap-5 lg:grid-cols-[2fr_1.4fr_auto]">
                <div className="flex items-start gap-4">
                  <Avatar fallback={initials} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-xl text-foreground">
                        {app.tenantName}
                      </p>
                      <StatusBadge status={app.status} />
                      {tenant?.kycStatus === "verified" && (
                        <Badge variant="success" className="gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          KYC verified
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted">{app.tenantEmail}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-strong">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-emerald" />
                        Applied {formatDate(app.submittedAt)}
                      </span>
                      {app.reviewedAt && (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald" />
                          Reviewed {formatDate(app.reviewedAt)}
                        </span>
                      )}
                    </div>
                    {app.notes && (
                      <p className="mt-3 rounded-lg border border-dashed border-line bg-card px-3 py-2 text-xs italic text-muted-strong">
                        “{app.notes}”
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-line pt-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      Applied for
                    </p>
                    <p className="font-display text-base text-foreground">
                      {property?.title ?? "Listing removed"}
                    </p>
                    {property && (
                      <p className="text-xs text-muted">
                        {property.area}, {property.city}
                      </p>
                    )}
                  </div>
                  {property && (
                    <div className="flex items-center gap-3 text-xs">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                          Rent
                        </p>
                        <p className="font-display text-sm text-foreground">
                          {formatNaira(property.price)}
                          <span className="text-muted">
                            {rentSuffix(property.rentType)}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                          Service fee
                        </p>
                        <p className="font-display text-sm text-foreground">
                          {formatNaira(property.serviceFee)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {tenant?.phone && (
                      <a
                        href={`tel:${tenant.phone}`}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1 text-muted-strong hover:border-emerald hover:text-emerald"
                      >
                        <Phone className="h-3 w-3" /> Call
                      </a>
                    )}
                    <a
                      href={`mailto:${app.tenantEmail}`}
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1 text-muted-strong hover:border-emerald hover:text-emerald"
                    >
                      <Mail className="h-3 w-3" /> Email
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1 text-muted-strong hover:border-emerald hover:text-emerald"
                    >
                      <MessageSquare className="h-3 w-3" /> Chat
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-line pt-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  {canDecide ? (
                    <>
                      {app.status === "submitted" && (
                        <Button
                          variant="ivory"
                          size="sm"
                          type="button"
                          onClick={() => startReview(app.id)}
                        >
                          <Clock className="h-3.5 w-3.5" /> Mark reviewing
                        </Button>
                      )}
                      <Button
                        size="sm"
                        type="button"
                        onClick={() =>
                          setPendingDecision({ application: app, decision: "approved" })
                        }
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() =>
                          setPendingDecision({ application: app, decision: "rejected" })
                        }
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {app.status === "approved" ? "Approved" : "Rejected"}{" "}
                      {app.reviewedAt && `on ${formatDate(app.reviewedAt)}`}
                    </p>
                  )}
                </div>
                </div>
                <TenantReviewsCard
                  tenantId={app.tenantId}
                  tenantName={app.tenantName}
                  reviewerId={LANDLORD_ID}
                  reviewerName={
                    landlord
                      ? `${landlord.firstName} ${landlord.lastName}`
                      : "Landlord"
                  }
                  reviewerRole="landlord"
                  propertyId={property?.id}
                  propertyTitle={property?.title}
                  initialReviews={tenantReviews}
                />
              </article>
            );
          })}
        </section>
      )}

      <Modal
        open={!!pendingDecision}
        onOpenChange={(o) => {
          if (!o) {
            setPendingDecision(null);
            setDecisionNote("");
          }
        }}
      >
        <ModalContent
          eyebrow={pendingDecision?.decision === "approved" ? "Approve" : "Reject"}
          title={
            pendingDecision?.decision === "approved"
              ? `Approve ${pendingDecision?.application.tenantName}?`
              : `Reject ${pendingDecision?.application.tenantName}?`
          }
          description={
            pendingDecision?.decision === "approved"
              ? "We'll move them to lease drafting. The tenant will be notified by email."
              : "The tenant will be notified. They can apply for other properties."
          }
        >
          <div className="space-y-4">
            <Textarea
              label="Note to the tenant (optional)"
              placeholder={
                pendingDecision?.decision === "approved"
                  ? "Welcome! Looking forward to having you."
                  : "Sorry — this property has been taken."
              }
              rows={3}
              value={decisionNote}
              onChange={(e) => setDecisionNote(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ivory"
                onClick={() => {
                  setPendingDecision(null);
                  setDecisionNote("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant={
                  pendingDecision?.decision === "approved"
                    ? "primary"
                    : "destructive"
                }
                onClick={confirmDecision}
              >
                {pendingDecision?.decision === "approved" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Approve application
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Reject application
                  </>
                )}
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
