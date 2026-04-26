"use client";

import { useMemo, useState } from "react";
import { MessageSquare, PenLine } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatDate } from "@/lib/format";
import type { PropertyReview } from "@/types/property";

export function PropertyReviews({
  propertyId,
  initialReviews,
  canReview = true,
}: {
  propertyId: string;
  initialReviews: PropertyReview[];
  canReview?: boolean;
}) {
  const [reviews, setReviews] = useState<PropertyReview[]>(initialReviews);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    rating: 5,
    title: "",
    comment: "",
    stayLength: "",
  });

  const stats = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, total: 0, breakdown: [] as { stars: number; count: number }[] };
    const total = reviews.length;
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
    const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: reviews.filter(
        (r) => Math.round(r.rating) === stars
      ).length,
    }));
    return { avg, total, breakdown };
  }, [reviews]);

  const submit = () => {
    if (!draft.title.trim() || !draft.comment.trim()) return;
    const next: PropertyReview = {
      id: `pr-${Date.now()}`,
      propertyId,
      tenantId: "u1",
      tenantName: "You",
      rating: draft.rating,
      title: draft.title.trim(),
      comment: draft.comment.trim(),
      stayLength: draft.stayLength.trim() || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [next, ...prev]);
    setDraft({ rating: 5, title: "", comment: "", stayLength: "" });
    setOpen(false);
  };

  return (
    <article className="editorial-card p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            Tenant reviews
          </p>
          <h3 className="mt-1 font-display text-2xl text-foreground">
            What past tenants say.
          </h3>
        </div>
        {canReview && (
          <Button
            type="button"
            variant="ivory"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <PenLine className="h-3.5 w-3.5" />
            Write a review
          </Button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-line bg-paper p-5 text-sm text-muted-strong">
          <MessageSquare className="h-4 w-4 text-emerald" />
          No reviews yet — be the first to share your experience.
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-5 rounded-2xl border border-line bg-paper p-5 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-start gap-2">
              <p className="font-display text-5xl text-foreground">
                {stats.avg.toFixed(1)}
              </p>
              <RatingStars rating={stats.avg} size="md" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {stats.total} review{stats.total === 1 ? "" : "s"}
              </p>
            </div>
            <div className="grid gap-1.5 self-center">
              {stats.breakdown.map((row) => {
                const pct =
                  stats.total === 0 ? 0 : (row.count / stats.total) * 100;
                return (
                  <div
                    key={row.stars}
                    className="flex items-center gap-2 text-xs text-muted-strong"
                  >
                    <span className="w-6 font-mono">{row.stars}★</span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-emerald"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-6 text-right font-mono text-[10px] text-muted">
                      {row.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {reviews.map((review) => {
              const initials = review.tenantName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
              return (
                <div
                  key={review.id}
                  className="rounded-2xl border border-line bg-paper p-5"
                >
                  <div className="flex items-start gap-3">
                    <Avatar fallback={initials} size="md" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-lg text-foreground">
                          {review.tenantName}
                        </p>
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        {formatDate(review.createdAt)}
                        {review.stayLength
                          ? ` · stayed ${review.stayLength}`
                          : ""}
                      </p>
                      <p className="mt-2 font-display text-base text-foreground">
                        {review.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-strong">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent
          eyebrow="Share your experience"
          title="Review this property"
          description="Be honest — your review helps other tenants make a good call."
        >
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong">
                Your rating
              </p>
              <RatingStars
                rating={draft.rating}
                size="md"
                interactive
                onRate={(r) => setDraft((d) => ({ ...d, rating: r }))}
              />
            </div>
            <Input
              label="Headline"
              placeholder="e.g. Genuinely a peaceful home"
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({ ...d, title: e.target.value }))
              }
            />
            <Textarea
              label="Your review"
              placeholder="What was the power supply like? Security? Anything you'd warn a future tenant about?"
              rows={4}
              value={draft.comment}
              onChange={(e) =>
                setDraft((d) => ({ ...d, comment: e.target.value }))
              }
            />
            <Input
              label="How long did you stay? (optional)"
              placeholder="e.g. 8 months"
              value={draft.stayLength}
              onChange={(e) =>
                setDraft((d) => ({ ...d, stayLength: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ivory"
                onClick={() => setOpen(false)}
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
    </article>
  );
}
