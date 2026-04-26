"use client";

import { CreditCard, Calendar, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { mockPayments } from "@/lib/mock-data";
import type { Payment } from "@/types/payment";

const myPayments = mockPayments.filter((p) => p.tenantId === "u1");
const upcomingPayment = myPayments.find((p) => p.status === "pending");

const columns: Column<Payment>[] = [
  {
    key: "property",
    header: "Property",
    render: (item) => (
      <div>
        <p className="font-medium text-foreground">{item.propertyTitle}</p>
        <p className="text-xs capitalize text-muted">
          {item.type.replace("_", " ")}
        </p>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (item) => (
      <Currency
        amount={item.amount}
        className="font-medium text-foreground"
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (item) => (
      <span className="text-sm text-muted">{formatDate(item.dueDate)}</span>
    ),
  },
  {
    key: "reference",
    header: "Reference",
    render: (item) => (
      <span className="text-xs font-mono text-muted">{item.reference}</span>
    ),
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Payments</h1>
        <p className="mt-1 text-muted">
          View and manage your rental payments.
        </p>
      </div>

      {/* Upcoming Payment Card */}
      {upcomingPayment ? (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-accent/20 p-3">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Upcoming Payment
                </p>
                <p className="mt-1 font-display text-2xl text-foreground">
                  <Currency amount={upcomingPayment.amount} />
                </p>
                <p className="text-sm text-muted">
                  {upcomingPayment.propertyTitle} &middot; Due{" "}
                  {formatDate(upcomingPayment.dueDate)}
                </p>
              </div>
            </div>
            <Button className="gap-2">
              <CreditCard className="h-4 w-4" /> Pay Now
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex items-center gap-3 py-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-muted">
              You&apos;re all caught up! No pending payments.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
          Payment History
        </p>
        <DataTable
          data={myPayments}
          columns={columns}
          searchPlaceholder="Search payments..."
          searchKey={(item) => `${item.propertyTitle} ${item.reference}`}
        />
      </div>
    </div>
  );
}
