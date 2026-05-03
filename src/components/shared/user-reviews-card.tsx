"use client";

import { useMemo, useState } from "react";
import { MessageSquare, PenLine } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatDate } from "@/lib/format";
import type { UserReview, UserReviewRole } from "@/types/property";

const ROLE_LABEL: Record<UserReviewRole, string> = {
  customer: "Tenant",
  landlord: "Landlord",
  agent: "Agent",
  artisan: "Artisan",
};

export function UserReviewsCard({
  subject,
  reviewer,
  initialReviews,
  canReview = true,
  compact = false,
  emptyMessage,
}: {
  subject: {
    id: string;
    name: string;
    role: UserReviewRole;
  };
  reviewer?: {
    id: string;
    name: string;
    role: UserReviewRole;
  };
  initialReviews: UserReview[];
  canReview?: boolean;
  compact?: boolean;
  emptyMessage?: string;
}) {
  const [reviews, setReviews] = useState<UserReview[]>(initialReviews);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    rating: 5,
    comment: "",
    context: "",
  });

  const stats = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, total: 0 };
    return {
      avg: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
      total: reviews.length,
    };
  }, [reviews]);

  const submit = () => {
    if (!reviewer || !draft.comment.trim()) return;
    const next: UserReview = {
      id: `ur-${Date.now()}`,
      subjectId: subject.id,
      subjectName: subject.name,
      subjectRole: subject.role,
      reviewerId: reviewer.id,
      reviewerName: reviewer.name,
      reviewerRole: reviewer.role,
      rating: draft.rating,
      comment: draft.comment.trim(),
      context: draft.context.trim() || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [next, ...prev]);
    setDraft({ rating: 5, comment: "", context: "" });
    setOpen(false);
  };

  return (
    <article
      className={
        compact
          ? "rounded-2xl border border-line bg-paper p-5"
          : "editorial-card p-6"
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            Reviews · {ROLE_LABEL[subject.role]}
          </p>
          <h3 className="mt-1 font-display text-xl text-foreground">
            What people say about {subject.name.split(" ")[0]}.
          </h3>
        </div>
        {canReview && reviewer && (
          <Button
            type="button"
            variant="ivory"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <PenLine className="h-3.5 w-3.5" />
            Leave a review
          </Button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-line bg-card p-4 text-sm text-muted-strong">
          <MessageSquare className="h-4 w-4 text-emerald" />
          {emptyMessage ?? "No reviews yet — be the first to leave one."}
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-3">
            <p className="font-display text-3xl text-foreground">
              {stats.avg.toFixed(1)}
            </p>
            <div>
              <RatingStars rating={stats.avg} />
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {stats.total} review{stats.total === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {reviews.map((review) => {
              const initials = review.reviewerName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
              return (
                <div
                  key={review.id}
                  className="rounded-xl border border-line bg-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar fallback={initials} size="sm" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-foreground">
                          {review.reviewerName}
                        </p>
                        <Badge variant="default">
                          {ROLE_LABEL[review.reviewerRole]}
                        </Badge>
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        {formatDate(review.createdAt)}
                        {review.context ? ` · ${review.context}` : ""}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-strong">
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
          eyebrow={`Review ${ROLE_LABEL[subject.role]}`}
          title={`Review ${subject.name}`}
          description="Be specific and fair. Your review is visible to other users on the platform."
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
            <Textarea
              label="Your review"
              placeholder="What was the experience like? Communication, fairness, follow-through?"
              rows={4}
              value={draft.comment}
              onChange={(e) =>
                setDraft((d) => ({ ...d, comment: e.target.value }))
              }
            />
            <Input
              label="Context (optional)"
              placeholder="e.g. Tenant in Lekki Phase 1"
              value={draft.context}
              onChange={(e) =>
                setDraft((d) => ({ ...d, context: e.target.value }))
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
