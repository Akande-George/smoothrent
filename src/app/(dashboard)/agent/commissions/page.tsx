"use client";

import { DollarSign, TrendingUp, Clock } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { formatDate } from "@/lib/format";
import { mockPayments } from "@/lib/mock-data";
import type { Payment } from "@/types/payment";

const commissions = mockPayments.filter((p) => p.type === "agent_commission");
const totalEarned = commissions
  .filter((p) => p.status === "paid")
  .reduce((sum, p) => sum + p.amount, 0);
const pendingAmount = commissions
  .filter((p) => p.status === "pending")
  .reduce((sum, p) => sum + p.amount, 0);

const columns: Column<Payment>[] = [
  {
    key: "property",
    header: "Property",
    render: (payment) => (
      <span className="font-medium text-foreground">
        {payment.propertyTitle}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (payment) => (
      <Currency
        amount={payment.amount}
        className="font-medium text-foreground"
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (payment) => <StatusBadge status={payment.status} />,
  },
  {
    key: "reference",
    header: "Reference",
    render: (payment) => (
      <span className="text-sm text-muted">{payment.reference}</span>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (payment) => (
      <span className="text-sm text-muted">
        {payment.paidAt ? formatDate(payment.paidAt) : formatDate(payment.dueDate)}
      </span>
    ),
  },
];

export default function AgentCommissionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Commissions</h1>
        <p className="mt-1 text-muted">
          Track your commission earnings and payouts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Earned"
          value={`₦${(totalEarned / 1000).toFixed(0)}K`}
          icon={<DollarSign className="h-4 w-4" />}
          change={15}
          changeLabel="From last month"
        />
        <StatCard
          title="Pending Payout"
          value={`₦${(pendingAmount / 1000).toFixed(0)}K`}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Total Deals"
          value={String(commissions.length)}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Commissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={commissions}
            columns={columns}
            searchPlaceholder="Search commissions..."
            searchKey={(p) => `${p.propertyTitle} ${p.reference}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
