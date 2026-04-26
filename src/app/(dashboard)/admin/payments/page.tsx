"use client";

import { CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/ui/currency";
import { StatCard } from "@/components/ui/stat-card";
import { formatDate } from "@/lib/format";
import { mockPayments } from "@/lib/mock-data";
import type { Payment } from "@/types/payment";

const totalAmount = mockPayments.reduce((sum, p) => sum + p.amount, 0);
const paidAmount = mockPayments
  .filter((p) => p.status === "paid")
  .reduce((sum, p) => sum + p.amount, 0);
const pendingAmount = mockPayments
  .filter((p) => p.status === "pending")
  .reduce((sum, p) => sum + p.amount, 0);

const typeLabels: Record<string, string> = {
  rent: "Rent",
  caution_fee: "Caution Fee",
  service_charge: "Service Charge",
  agent_commission: "Agent Commission",
  subscription: "Subscription",
};

const columns: Column<Payment>[] = [
  {
    key: "reference",
    header: "Reference",
    render: (payment) => (
      <span className="font-mono text-sm text-foreground">
        {payment.reference}
      </span>
    ),
  },
  {
    key: "tenant",
    header: "Payer",
    render: (payment) => (
      <div>
        <p className="text-sm font-medium text-foreground">
          {payment.tenantName}
        </p>
        <p className="text-xs text-muted">{payment.tenantEmail}</p>
      </div>
    ),
  },
  {
    key: "property",
    header: "Property",
    render: (payment) => (
      <span className="text-sm text-muted">{payment.propertyTitle}</span>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (payment) => (
      <Badge>{typeLabels[payment.type] || payment.type}</Badge>
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
    key: "date",
    header: "Date",
    render: (payment) => (
      <span className="text-sm text-muted">
        {payment.paidAt
          ? formatDate(payment.paidAt)
          : formatDate(payment.createdAt)}
      </span>
    ),
  },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Payments</h1>
        <p className="mt-1 text-muted">
          Platform transaction log and payment management.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Transactions"
          value={`₦${(totalAmount / 1_000_000).toFixed(1)}M`}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          title="Paid"
          value={`₦${(paidAmount / 1_000_000).toFixed(1)}M`}
          change={15}
          changeLabel="From last month"
        />
        <StatCard
          title="Pending"
          value={`₦${(pendingAmount / 1_000).toFixed(0)}K`}
        />
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockPayments}
            columns={columns}
            searchPlaceholder="Search transactions..."
            searchKey={(p) =>
              `${p.tenantName} ${p.propertyTitle} ${p.reference} ${p.type}`
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
