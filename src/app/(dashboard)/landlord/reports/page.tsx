"use client";

import { TrendingUp, Home, Users, Percent } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/ui/currency";
import { mockProperties } from "@/lib/mock-data";
import { formatNaira } from "@/lib/format";

const landlordProperties = mockProperties.filter((p) => p.landlordId === "u2");
const occupiedCount = landlordProperties.filter((p) => p.status === "Taken").length;
const occupancyRate = landlordProperties.length > 0
  ? Math.round((occupiedCount / landlordProperties.length) * 100)
  : 0;

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Reports</h1>
        <p className="text-sm text-muted">Performance overview and analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatNaira(7_830_000)}
          change={28}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Properties"
          value={landlordProperties.length.toString()}
          icon={<Home className="h-4 w-4" />}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={<Percent className="h-4 w-4" />}
        />
        <StatCard
          title="Total Tenants"
          value="1"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <RevenueChart />

      {/* Property Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Property Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {landlordProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{property.title}</p>
                  <p className="text-xs text-muted">
                    {property.area}, {property.city}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted">Views</p>
                    <p className="font-medium text-foreground">{property.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted">Inquiries</p>
                    <p className="font-medium text-foreground">{property.inquiries}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted">Rent</p>
                    <Currency amount={property.price} className="font-medium" />
                  </div>
                  <Badge variant={property.status === "Taken" ? "success" : "info"}>
                    {property.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
