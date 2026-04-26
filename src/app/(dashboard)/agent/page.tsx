import Link from "next/link";
import { DollarSign, Handshake, Building2, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { formatDate } from "@/lib/format";
import { mockDeals, mockActivity } from "@/lib/mock-data";

const recentDeals = mockDeals.slice(0, 4);
const recentActivity = mockActivity.slice(0, 5);

const activityIconMap: Record<string, string> = {
  payment: "text-green-600",
  application: "text-blue-600",
  maintenance: "text-orange-600",
  lease: "text-purple-600",
  listing: "text-accent",
  review: "text-pink-600",
};

export default function AgentDashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, Emeka
        </h1>
        <p className="mt-1 text-muted">
          Here&apos;s your agency overview for today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Commission"
          value="₦2,015,000"
          change={12}
          changeLabel="From last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Active Deals"
          value="3"
          change={50}
          changeLabel="From last month"
          icon={<Handshake className="h-4 w-4" />}
        />
        <StatCard
          title="Active Listings"
          value="5"
          change={25}
          changeLabel="From last month"
          icon={<Building2 className="h-4 w-4" />}
        />
      </div>

      {/* Recent Deals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Deals</CardTitle>
            <Link
              href="/agent/deals"
              className="text-sm text-muted hover:text-foreground"
            >
              View all
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDeals.map((deal) => (
              <Link
                key={deal.id}
                href={`/agent/deals/${deal.id}`}
                className="flex items-center justify-between rounded-2xl border border-black/5 p-4 transition-colors hover:bg-black/[0.02]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {deal.propertyTitle}
                  </p>
                  <p className="text-sm text-muted">{deal.clientName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Currency
                    amount={deal.value}
                    className="text-sm font-medium text-foreground"
                  />
                  <StatusBadge status={deal.stage} />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Pipeline Overview
          </p>
          <Link href="/agent/deals">
            <Button variant="ghost" size="sm" className="gap-1">
              View pipeline <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-5">
          {(["prospect", "viewing", "offer", "negotiation", "closed"] as const).map(
            (stage) => {
              const count = mockDeals.filter((d) => d.stage === stage).length;
              return (
                <Card key={stage} className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {stage}
                  </p>
                  <p className="mt-2 font-display text-2xl text-foreground">
                    {count}
                  </p>
                </Card>
              );
            }
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className={`mt-1 h-2 w-2 rounded-full ${activityIconMap[item.type] ?? "bg-muted"}`}
                  style={{ minWidth: 8 }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {formatDate(item.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
