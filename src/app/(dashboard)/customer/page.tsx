import Link from "next/link";
import { FileText, CreditCard, Home, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertyGrid } from "@/components/property/property-grid";
import { formatDate } from "@/lib/format";
import {
  mockApplications,
  mockPayments,
  mockLeases,
  mockActivity,
  mockProperties,
} from "@/lib/mock-data";

const activeApplications = mockApplications.filter(
  (a) => a.tenantId === "u1"
).length;
const pendingPayments = mockPayments.filter(
  (p) => p.tenantId === "u1" && p.status === "pending"
).length;
const activeLeases = mockLeases.filter(
  (l) => l.tenantId === "u1" && l.status === "active"
).length;

const recentActivity = mockActivity.slice(0, 5);
const savedProperties = mockProperties.slice(0, 3);

const activityIconMap: Record<string, string> = {
  payment: "text-green-600",
  application: "text-blue-600",
  maintenance: "text-orange-600",
  lease: "text-purple-600",
  listing: "text-accent",
  review: "text-pink-600",
};

export default function CustomerDashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, Chinedu
        </h1>
        <p className="mt-1 text-muted">
          Here&apos;s what&apos;s happening with your rentals.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Active Applications"
          value={String(activeApplications)}
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Upcoming Payments"
          value={String(pendingPayments)}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          title="Active Leases"
          value={String(activeLeases)}
          icon={<Home className="h-4 w-4" />}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link
              href="/customer/notifications"
              className="text-sm text-muted hover:text-foreground"
            >
              View all
            </Link>
          </div>
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

      {/* Saved Properties Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Saved Properties
          </p>
          <Link href="/customer/saved">
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <PropertyGrid properties={savedProperties} basePath="/customer/search" />
      </div>
    </div>
  );
}
