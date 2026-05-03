"use client";

import { useMemo } from "react";
import { TrendingUp, Wallet, Receipt, Layers } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { mockArtisanJobs, mockArtisans } from "@/lib/mock-data";
import { formatNaira, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const ARTISAN_ID = "a1";

export default function ArtisanEarningsPage() {
  const artisan =
    mockArtisans.find((a) => a.id === ARTISAN_ID) ?? mockArtisans[0];
  const jobs = mockArtisanJobs.filter((j) => j.artisanId === ARTISAN_ID);
  const completed = jobs.filter((j) => j.status === "completed");

  const totals = useMemo(() => {
    const gross = completed.reduce((acc, j) => acc + j.agreedAmount, 0);
    const fees = completed.reduce((acc, j) => acc + j.platformFee, 0);
    const payout = completed.reduce((acc, j) => acc + j.payout, 0);
    return { gross, fees, payout, jobs: completed.length };
  }, [completed]);

  const monthly = useMemo(() => {
    const map = new Map<string, number>();
    for (const j of completed) {
      const month = (j.completedAt ?? j.scheduledFor).slice(0, 7);
      map.set(month, (map.get(month) ?? 0) + j.payout);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [completed]);

  return (
    <div className="space-y-8">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Artisan · Earnings
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          Your payout summary.
        </h1>
        <p className="mt-1 text-sm text-muted-strong">
          {artisan.pricingModel === "commission"
            ? "Earnings net of SmoothRent's 15% per-job commission."
            : "You're on the annual subscription — every naira from a completed job is yours."}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard
          title="Gross billed"
          value={formatNaira(totals.gross)}
          icon={<Receipt className="h-4 w-4" />}
        />
        <StatCard
          title="Platform fees"
          value={formatNaira(totals.fees)}
          icon={<Layers className="h-4 w-4" />}
        />
        <StatCard
          title="Total payout"
          value={formatNaira(totals.payout)}
          icon={<Wallet className="h-4 w-4" />}
        />
        <StatCard
          title="Jobs completed"
          value={totals.jobs.toString()}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </section>

      {monthly.length > 0 && (
        <section className="rounded-2xl border border-line bg-paper p-6">
          <p className="tag-eyebrow">Payouts by month</p>
          <h3 className="mt-1 font-display text-xl text-foreground">
            Month-on-month income
          </h3>
          <div className="mt-4 space-y-3">
            {monthly.map(([month, amount]) => {
              const max = Math.max(...monthly.map(([, a]) => a));
              const pct = (amount / max) * 100;
              return (
                <div key={month} className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted-strong">
                    <span>{month}</span>
                    <span className="text-foreground">{formatNaira(amount)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-emerald"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-paper p-6">
        <p className="tag-eyebrow">Recent payouts</p>
        <h3 className="mt-1 font-display text-xl text-foreground">
          Last completed jobs
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                <th className="py-2 pr-4">Job</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4 text-right">Gross</th>
                <th className="py-2 pr-4 text-right">Fee</th>
                <th className="py-2 text-right">Payout</th>
              </tr>
            </thead>
            <tbody>
              {completed.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-muted-strong"
                  >
                    No completed jobs yet.
                  </td>
                </tr>
              ) : (
                completed.map((j, i) => (
                  <tr
                    key={j.id}
                    className={cn(
                      "border-b border-line/60",
                      i === completed.length - 1 && "border-none"
                    )}
                  >
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {j.title}
                    </td>
                    <td className="py-3 pr-4 text-muted-strong">
                      {j.customerName}
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      {j.completedAt ? formatDate(j.completedAt) : "—"}
                    </td>
                    <td className="py-3 pr-4 text-right text-muted-strong">
                      {formatNaira(j.agreedAmount)}
                    </td>
                    <td className="py-3 pr-4 text-right text-muted-strong">
                      {formatNaira(j.platformFee)}
                    </td>
                    <td className="py-3 text-right font-display text-foreground">
                      {formatNaira(j.payout)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
