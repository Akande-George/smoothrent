import Link from "next/link";
import { Users, Building2, CreditCard, Shield } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { mockUsers, mockProperties, mockPayments, mockActivity } from "@/lib/mock-data";

const totalUsers = mockUsers.length;
const totalProperties = mockProperties.length;
const totalTransactions = mockPayments.reduce((sum, p) => sum + p.amount, 0);
const pendingKYC = mockUsers.filter((u) => u.kycStatus === "pending" || u.kycStatus === "not_started").length;

const recentActivity = mockActivity.slice(0, 6);

const activityIconMap: Record<string, string> = {
  payment: "text-green-600",
  application: "text-blue-600",
  maintenance: "text-orange-600",
  lease: "text-purple-600",
  listing: "text-accent",
  review: "text-pink-600",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-muted">
          Platform overview and management.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={String(totalUsers)}
          icon={<Users className="h-4 w-4" />}
          change={14}
          changeLabel="From last month"
        />
        <StatCard
          title="Total Properties"
          value={String(totalProperties)}
          icon={<Building2 className="h-4 w-4" />}
          change={10}
          changeLabel="From last month"
        />
        <StatCard
          title="Total Transactions"
          value={`₦${(totalTransactions / 1_000_000).toFixed(1)}M+`}
          icon={<CreditCard className="h-4 w-4" />}
          change={22}
          changeLabel="From last month"
        />
        <StatCard
          title="Pending KYC"
          value={String(pendingKYC)}
          icon={<Shield className="h-4 w-4" />}
        />
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Manage Users", href: "/admin/users", icon: Users },
          { label: "Review KYC", href: "/admin/kyc", icon: Shield },
          { label: "Properties", href: "/admin/properties", icon: Building2 },
          { label: "Payments", href: "/admin/payments", icon: CreditCard },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="flex items-center gap-3 transition-shadow hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground/5">
                <link.icon className="h-5 w-5 text-foreground" />
              </div>
              <span className="font-medium text-foreground">{link.label}</span>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Platform Activity</CardTitle>
            <Link
              href="/admin/reports"
              className="text-sm text-muted hover:text-foreground"
            >
              View reports
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
    </div>
  );
}
