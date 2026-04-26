"use client";

import { DollarSign, Wrench } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PromoBanner } from "@/components/dashboard/promo-banner";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SalesTable } from "@/components/dashboard/sales-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/lib/mock-data";
import { formatNaira } from "@/lib/format";
import Link from "next/link";

const landlordProperties = mockProperties.filter((p) => p.landlordId === "u2").slice(0, 2);

export default function LandlordDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted">Welcome back, Aisha</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          <PromoBanner />

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              title="Total Revenue"
              value={formatNaira(7_830_000)}
              change={28}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <StatCard
              title="Maintenance Cost"
              value={formatNaira(582_473)}
              change={15}
              icon={<Wrench className="h-4 w-4" />}
            />
          </div>

          <RevenueChart />
          <SalesTable />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Properties</CardTitle>
                <Link
                  href="/landlord/properties"
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {landlordProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/landlord/properties/${property.id}`}
                    className="block"
                  >
                    <div className="flex gap-3 rounded-2xl p-2 transition-colors hover:bg-black/[0.03]">
                      <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-[#e7ded2] to-[#d4c8b8]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {property.title}
                        </p>
                        <p className="text-xs text-muted">
                          {property.area}, {property.city}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {formatNaira(property.price)}
                          </span>
                          {property.inquiries > 0 && (
                            <Badge variant="accent">
                              {property.inquiries} offers
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { region: "Lagos", pct: 45 },
                  { region: "FCT Abuja", pct: 30 },
                  { region: "Rivers", pct: 15 },
                  { region: "Others", pct: 10 },
                ].map((item) => (
                  <div key={item.region} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.region}</span>
                      <span className="text-muted">{item.pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-black/5">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
