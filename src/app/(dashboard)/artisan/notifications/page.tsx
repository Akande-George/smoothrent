"use client";

import { Bell, CheckCircle2, Sparkles, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

const NOTIFICATIONS = [
  {
    id: "n1",
    title: "New job request",
    body: "Chinedu Okafor requested a kitchen sink leak fix in Lekki.",
    icon: Sparkles,
    unread: true,
    when: "2026-05-02",
    href: "/artisan/jobs",
  },
  {
    id: "n2",
    title: "Payout settled",
    body: "₦18,700 paid out for the inverter job at Surulere.",
    icon: Wallet,
    unread: false,
    when: "2026-04-29",
    href: "/artisan/earnings",
  },
  {
    id: "n3",
    title: "Job completed",
    body: "Marked the hot-water pressure job as done. Awaiting customer review.",
    icon: CheckCircle2,
    unread: false,
    when: "2026-04-28",
    href: "/artisan/jobs",
  },
];

export default function ArtisanNotificationsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Artisan · Notifications
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          What&rsquo;s new.
        </h1>
      </section>
      <section className="space-y-3">
        {NOTIFICATIONS.map((n) => {
          const Icon = n.icon;
          return (
            <article
              key={n.id}
              className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-ivory">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{n.title}</p>
                  {n.unread && <Badge variant="warning">New</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted-strong">{n.body}</p>
                <p className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  <Bell className="h-3 w-3" />
                  {formatDate(n.when)}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
