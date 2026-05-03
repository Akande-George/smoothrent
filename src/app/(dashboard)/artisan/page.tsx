"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Star,
  Wallet,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { mockArtisanJobs, mockArtisans, mockUserReviews } from "@/lib/mock-data";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const ARTISAN_ID = "a1";

export default function ArtisanDashboard() {
  const artisan = mockArtisans.find((a) => a.id === ARTISAN_ID) ?? mockArtisans[0];
  const jobs = mockArtisanJobs.filter((j) => j.artisanId === ARTISAN_ID);
  const upcoming = jobs.filter(
    (j) => j.status === "accepted" || j.status === "in_progress"
  );
  const requested = jobs.filter((j) => j.status === "requested");
  const completed = jobs.filter((j) => j.status === "completed");
  const monthEarnings = completed.reduce((acc, j) => acc + j.payout, 0);
  const reviews = mockUserReviews.filter(
    (r) => r.subjectId === ARTISAN_ID && r.subjectRole === "artisan"
  );

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            Artisan · Dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            Welcome back, {artisan.firstName}.
          </h1>
          <p className="mt-1 text-sm text-muted">
            {artisan.category.replace("_", " ")} · {artisan.serviceAreas.join(", ")}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-strong">
          <Star className="h-3.5 w-3.5 text-saffron-deep" />
          {artisan.rating.toFixed(1)} · {artisan.jobsCompleted} jobs
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard
          title="New requests"
          value={requested.length.toString()}
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatCard
          title="In progress"
          value={upcoming.length.toString()}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Completed"
          value={completed.length.toString()}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatCard
          title="Earned this month"
          value={formatNaira(monthEarnings)}
          icon={<Wallet className="h-4 w-4" />}
        />
      </section>

      <section className="rounded-2xl border border-line bg-paper p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="tag-eyebrow">Up next</p>
            <h2 className="mt-1 font-display text-2xl text-foreground">
              Your active jobs
            </h2>
          </div>
          <Link href="/artisan/jobs">
            <Button variant="ivory" size="sm" type="button">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {[...upcoming, ...requested].slice(0, 4).map((job) => (
            <article
              key={job.id}
              className={cn(
                "grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-[1fr_auto]",
                job.status === "requested"
                  ? "border-saffron/40"
                  : "border-line"
              )}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-base text-foreground">
                    {job.title}
                  </p>
                  <Badge
                    variant={
                      job.status === "requested"
                        ? "warning"
                        : job.status === "in_progress"
                        ? "info"
                        : "success"
                    }
                  >
                    {job.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-strong">
                  {job.description}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {job.customerName} · {job.city} · {formatDate(job.scheduledFor)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="font-display text-lg text-foreground">
                  {formatNaira(job.agreedAmount)}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Payout {formatNaira(job.payout)}
                </p>
              </div>
            </article>
          ))}
          {upcoming.length + requested.length === 0 && (
            <div className="rounded-xl border border-dashed border-line bg-card p-6 text-center text-sm text-muted-strong">
              No active jobs right now. New requests will land here.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper p-6">
          <p className="tag-eyebrow">Recent reviews</p>
          <h3 className="mt-1 font-display text-xl text-foreground">
            How customers rate you.
          </h3>
          <div className="mt-4 space-y-3">
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-strong">
                No reviews yet. Complete a few jobs and customers will leave them here.
              </p>
            ) : (
              reviews.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className="flex items-start gap-3 rounded-xl border border-line bg-card p-3"
                >
                  <Avatar
                    fallback={r.reviewerName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                    size="sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">
                        {r.reviewerName}
                      </p>
                      <span className="font-mono text-[10px] text-saffron-deep">
                        {r.rating.toFixed(1)} ★
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-strong">{r.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-deep bg-emerald p-6 text-ivory">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron">
            Your pricing plan
          </p>
          <h3 className="mt-2 font-display text-2xl">
            {artisan.pricingModel === "commission"
              ? "Commission · 15% per job"
              : "Annual subscription · ₦70,000 / year"}
          </h3>
          <p className="mt-3 text-sm text-ivory/85">
            {artisan.pricingModel === "commission"
              ? "SmoothRent retains 15% of each completed job. No fixed fees, scales with your volume."
              : `Renews ${
                  artisan.pricingActiveUntil
                    ? formatDate(artisan.pricingActiveUntil)
                    : "next year"
                }. You keep 100% of every job.`}
          </p>
          <Link href="/artisan/billing">
            <Button variant="accent" size="sm" type="button" className="mt-5">
              Manage plan <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
