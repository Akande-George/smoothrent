"use client";

import { BarChart3, TrendingUp, Building2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Currency } from "@/components/ui/currency";
import { Badge } from "@/components/ui/badge";
import { mockDeals, mockProperties, mockPayments } from "@/lib/mock-data";

const closedDeals = mockDeals.filter((d) => d.stage === "closed");
const totalCommission = mockPayments
  .filter((p) => p.type === "referral_reward")
  .reduce((sum, p) => sum + p.amount, 0);
const agentListings = mockProperties.filter((p) => p.agentId === "u3");

const commissionByMonth = [
  { month: "Oct", amount: 0 },
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 0 },
  { month: "Jan", amount: 120_000 },
  { month: "Feb", amount: 350_000 },
  { month: "Mar", amount: 45_000 },
];

const topProperties = [...agentListings]
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

export default function AgentReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Reports</h1>
        <p className="mt-1 text-muted">
          Insights on your deals, commissions, and listings.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Deals Closed"
          value={String(closedDeals.length)}
          icon={<BarChart3 className="h-4 w-4" />}
          change={100}
          changeLabel="This quarter"
        />
        <StatCard
          title="Total Commission"
          value={`₦${(totalCommission / 1000).toFixed(0)}K`}
          icon={<TrendingUp className="h-4 w-4" />}
          change={12}
          changeLabel="From last month"
        />
        <StatCard
          title="Active Listings"
          value={String(agentListings.length)}
          icon={<Building2 className="h-4 w-4" />}
        />
      </div>

      {/* Commission Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commissionByMonth.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <span className="w-10 text-sm text-muted">{item.month}</span>
                <div className="flex-1">
                  <div className="h-8 overflow-hidden rounded-xl bg-black/5">
                    <div
                      className="h-full rounded-xl bg-foreground/80 transition-all"
                      style={{
                        width: `${
                          totalCommission > 0
                            ? (item.amount / totalCommission) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <Currency
                  amount={item.amount}
                  className="w-24 text-right text-sm font-medium text-foreground"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProperties.map((property, index) => (
              <div
                key={property.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-display text-sm text-background">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">
                      {property.title}
                    </p>
                    <p className="text-sm text-muted">
                      {property.city}, {property.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {property.views} views
                    </p>
                    <p className="text-muted">
                      {property.inquiries} inquiries
                    </p>
                  </div>
                  <Badge>{property.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deals by Stage */}
      <Card>
        <CardHeader>
          <CardTitle>Deals by Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-5">
            {(["prospect", "viewing", "offer", "negotiation", "closed"] as const).map(
              (stage) => {
                const count = mockDeals.filter((d) => d.stage === stage).length;
                const total = mockDeals.length;
                return (
                  <div key={stage} className="text-center">
                    <div className="mx-auto mb-2 h-24 w-full overflow-hidden rounded-xl bg-black/5">
                      <div
                        className="w-full rounded-xl bg-foreground/80 transition-all"
                        style={{
                          height: `${total > 0 ? (count / total) * 100 : 0}%`,
                          marginTop: `${total > 0 ? 100 - (count / total) * 100 : 100}%`,
                        }}
                      />
                    </div>
                    <p className="font-display text-xl text-foreground">
                      {count}
                    </p>
                    <p className="text-xs capitalize text-muted">{stage}</p>
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
