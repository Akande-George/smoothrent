"use client";

import { DollarSign, Clock, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { mockPayments } from "@/lib/mock-data";
import { formatDate, formatNaira } from "@/lib/format";
import type { Payment } from "@/types/payment";

const landlordPayments = mockPayments.filter((p) => p.landlordId === "u2");

const totalCollected = landlordPayments
  .filter((p) => p.status === "paid")
  .reduce((sum, p) => sum + p.amount, 0);

const totalPending = landlordPayments
  .filter((p) => p.status === "pending")
  .reduce((sum, p) => sum + p.amount, 0);

const totalOverdue = landlordPayments
  .filter((p) => p.status === "overdue")
  .reduce((sum, p) => sum + p.amount, 0);

const columns: Column<Payment>[] = [
  {
    key: "tenant",
    header: "Tenant",
    render: (p) => (
      <div>
        <p className="font-medium text-foreground">{p.tenantName}</p>
        <p className="text-xs text-muted">{p.tenantEmail}</p>
      </div>
    ),
  },
  {
    key: "property",
    header: "Property",
    render: (p) => <span className="text-sm">{p.propertyTitle}</span>,
  },
  {
    key: "type",
    header: "Type",
    render: (p) => (
      <span className="text-sm capitalize">{p.type.replace("_", " ")}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (p) => <Currency amount={p.amount} className="font-medium" />,
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (p) => <span className="text-sm text-muted">{formatDate(p.dueDate)}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (p) => <StatusBadge status={p.status} />,
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Payments</h1>
        <p className="text-sm text-muted">Track rent collection and payments</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Collected"
          value={formatNaira(totalCollected)}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Pending"
          value={formatNaira(totalPending)}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Overdue"
          value={formatNaira(totalOverdue)}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      <DataTable
        data={landlordPayments}
        columns={columns}
        searchPlaceholder="Search payments..."
        searchKey={(p) => `${p.tenantName} ${p.propertyTitle} ${p.reference}`}
      />
    </div>
  );
}
