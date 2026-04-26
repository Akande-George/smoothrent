"use client";

import { Users, Building2, TrendingUp, CreditCard } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUsers, mockProperties, mockPayments, mockRevenueData } from "@/lib/mock-data";

const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
const usersByRole = {
  customer: mockUsers.filter((u) => u.role === "customer").length,
  landlord: mockUsers.filter((u) => u.role === "landlord").length,
  agent: mockUsers.filter((u) => u.role === "agent").length,
  admin: mockUsers.filter((u) => u.role === "admin").length,
};

const propertyByStatus = {
  Available: mockProperties.filter((p) => p.status === "Available").length,
  Taken: mockProperties.filter((p) => p.status === "Taken").length,
};

const maxRevenue = Math.max(...mockRevenueData.map((d) => d.income));

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Platform Analytics
        </h1>
        <p className="mt-1 text-muted">
          Insights into platform growth and performance.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={String(mockUsers.length)}
          icon={<Users className="h-4 w-4" />}
          change={14}
          changeLabel="From last month"
        />
        <StatCard
          title="Total Properties"
          value={String(mockProperties.length)}
          icon={<Building2 className="h-4 w-4" />}
          change={10}
          changeLabel="From last month"
        />
        <StatCard
          title="Revenue"
          value={`₦${(totalRevenue / 1_000_000).toFixed(1)}M`}
          icon={<CreditCard className="h-4 w-4" />}
          change={22}
          changeLabel="From last month"
        />
        <StatCard
          title="Avg. Growth"
          value="18%"
          icon={<TrendingUp className="h-4 w-4" />}
          change={5}
          changeLabel="Quarterly"
        />
      </div>

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRevenueData.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <span className="w-10 text-sm text-muted">{item.month}</span>
                <div className="flex-1">
                  <div className="h-8 overflow-hidden rounded-xl bg-black/5">
                    <div
                      className="h-full rounded-xl bg-green-600/80 transition-all"
                      style={{
                        width: `${maxRevenue > 0 ? (item.income / maxRevenue) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="w-28 text-right text-sm font-medium text-foreground">
                  ₦{(item.income / 1_000_000).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(usersByRole).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          role === "customer"
                            ? "#3b82f6"
                            : role === "landlord"
                              ? "#8b5cf6"
                              : role === "agent"
                                ? "#f59e0b"
                                : "#ef4444",
                      }}
                    />
                    <span className="text-sm capitalize text-foreground">
                      {role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-black/5">
                      <div
                        className="h-full rounded-full bg-foreground/60"
                        style={{
                          width: `${(count / mockUsers.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-6 text-right text-sm font-medium text-foreground">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Property Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Property Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/5 p-4 text-center">
                  <p className="font-display text-3xl text-foreground">
                    {propertyByStatus.Available}
                  </p>
                  <p className="mt-1 text-sm text-muted">Available</p>
                </div>
                <div className="rounded-2xl border border-black/5 p-4 text-center">
                  <p className="font-display text-3xl text-foreground">
                    {propertyByStatus.Taken}
                  </p>
                  <p className="mt-1 text-sm text-muted">Taken</p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">
                  Verified Listings
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/5">
                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{
                        width: `${
                          (mockProperties.filter((p) => p.isVerified).length /
                            mockProperties.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {mockProperties.filter((p) => p.isVerified).length}/
                    {mockProperties.length}
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">
                  By Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(mockProperties.map((p) => p.type))
                  ).map((type) => (
                    <Badge key={type}>
                      {type} ({mockProperties.filter((p) => p.type === type).length})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
