"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MessageSquare, PenLine, ShieldAlert } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TenantReview } from "@/types/property";

const TIMELINESS_OPTIONS = [
  { label: "Excellent — always early or on time", value: "excellent" },
  { label: "Good — usually on time", value: "good" },
  { label: "Fair — occasional lateness", value: "fair" },
  { label: "Poor — chronically late", value: "poor" },
];

const CARE_OPTIONS = [
  { label: "Excellent — left it better than they found it", value: "excellent" },
  { label: "Good — normal wear and tear", value: "good" },
  { label: "Fair — some neglect", value: "fair" },
  { label: "Poor — damaged or unkept", value: "poor" },
];

const RATING_LABEL: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

const RATING_TONE: Record<string, string> = {
  excellent: "border-emerald/40 bg-emerald/10 text-emerald-deep",
  good: "border-emerald/30 bg-card text-foreground",
  fair: "border-saffron/40 bg-saffron/10 text-emerald-deep",
  poor: "border-clay/40 bg-clay/10 text-clay",
};

export function TenantReviewsCard({
  tenantId,
  tenantName,
  reviewerId,
  reviewerName,
  reviewerRole,
  propertyId,
  propertyTitle,
  initialReviews,
  defaultOpen = false,
}: {
  tenantId: string;
  tenantName: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: "landlord" | "agent";
  propertyId?: string;
  propertyTitle?: string;
  initialReviews: TenantReview[];
  defaultOpen?: boolean;
}) {
  const [reviews, setReviews] = useState<TenantReview[]>(initialReviews);
  const [expanded, setExpanded] = useState(defaultOpen);
  const [composeOpen, setComposeOpen] = useState(false);
  const [draft, setDraft] = useState({
    rating: 5,
    comment: "",
    paymentTimeliness: "good" as TenantReview["paymentTimeliness"],
    propertyCare: "good" as TenantReview["propertyCare"],
  });

  const stats = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, total: 0 };
    return {
      avg: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
      total: reviews.length,
    };
  }, [reviews]);

  const submit = () => {
    if (!draft.comment.trim()) return;
    const next: TenantReview = {
      id: `tr-${Date.now()}`,
      tenantId,
      tenantName,
      reviewerId,
      reviewerName,
      reviewerRole,
      propertyId,
      propertyTitle,
      rating: draft.rating,
      comment: draft.comment.trim(),
      paymentTimeliness: draft.paymentTimeliness,
      propertyCare: draft.propertyCare,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [next, ...prev]);
    setDraft({
      rating: 5,
      comment: "",
      paymentTimeliness: "good",
      propertyCare: "good",
    });
    setComposeOpen(false);
  };

  return (
    <section className="rounded-2xl border border-line bg-card">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-ivory">
            <MessageSquare className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Tenant track record
            </p>
            <p className="font-display text-base text-foreground">
              {stats.total === 0
                ? "No reviews yet"
                : `${stats.avg.toFixed(1)} ★ from ${stats.total} landlord${stats.total === 1 ? "" : "s"}/agent${stats.total === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {stats.total > 0 && <RatingStars rating={stats.avg} />}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-line p-4">
          {reviews.length === 0 ? (
            <div className="flex items-start gap-3 rounded-xl border border-dashed border-line bg-paper p-4 text-sm text-muted-strong">
              <ShieldAlert className="mt-0.5 h-4 w-4 text-saffron-deep" />
              <p>
                No prior landlord or agent has reviewed{" "}
                <span className="text-foreground">{tenantName}</span> yet.
                Verify KYC and consider asking for previous-tenancy references.
              </p>
            </div>
          ) : (
            reviews.map((review) => {
              const initials = review.reviewerName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
              return (
                <article
                  key={review.id}
                  className="rounded-xl border border-line bg-paper p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar fallback={initials} size="md" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-base text-foreground">
                          {review.reviewerName}
                        </p>
                        <Badge variant="default" className="capitalize">
                          {review.reviewerRole}
                        </Badge>
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        {formatDate(review.createdAt)}
                        {review.propertyTitle ? ` · ${review.propertyTitle}` : ""}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-strong">
                        {review.comment}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {review.paymentTimeliness && (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                              RATING_TONE[review.paymentTimeliness]
                            )}
                          >
                            Payment · {RATING_LABEL[review.paymentTimeliness]}
                          </span>
                        )}
                        {review.propertyCare && (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                              RATING_TONE[review.propertyCare]
                            )}
                          >
                            Property care · {RATING_LABEL[review.propertyCare]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="ivory"
              size="sm"
              onClick={() => setComposeOpen(true)}
            >
              <PenLine className="h-3.5 w-3.5" />
              Leave a review for {tenantName.split(" ")[0]}
            </Button>
          </div>
        </div>
      )}

      <Modal open={composeOpen} onOpenChange={setComposeOpen}>
        <ModalContent
          eyebrow="Tenant review"
          title={`Review ${tenantName}`}
          description="Visible to other landlords and agents on future applications. Be fair and factual."
        >
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong">
                Overall rating
              </p>
              <RatingStars
                rating={draft.rating}
                size="md"
                interactive
                onRate={(r) => setDraft((d) => ({ ...d, rating: r }))}
              />
            </div>
            <Select
              label="Payment timeliness"
              options={TIMELINESS_OPTIONS}
              value={draft.paymentTimeliness ?? "good"}
              onValueChange={(v) =>
                setDraft((d) => ({
                  ...d,
                  paymentTimeliness: v as TenantReview["paymentTimeliness"],
                }))
              }
            />
            <Select
              label="Property care"
              options={CARE_OPTIONS}
              value={draft.propertyCare ?? "good"}
              onValueChange={(v) =>
                setDraft((d) => ({
                  ...d,
                  propertyCare: v as TenantReview["propertyCare"],
                }))
              }
            />
            <Textarea
              label="Comment"
              placeholder="How was the tenancy? Communication, respect for the property, neighbours, etc."
              rows={4}
              value={draft.comment}
              onChange={(e) =>
                setDraft((d) => ({ ...d, comment: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ivory"
                onClick={() => setComposeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={submit}>
                Publish review
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
}
