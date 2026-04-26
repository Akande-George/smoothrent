"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, User, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/ui/data-table";
import { formatDate } from "@/lib/format";
import { mockLeases, mockPayments } from "@/lib/mock-data";
import type { Payment } from "@/types/payment";

const paymentColumns: Column<Payment>[] = [
  {
    key: "type",
    header: "Type",
    render: (item) => (
      <span className="text-sm capitalize text-foreground">
        {item.type.replace("_", " ")}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (item) => (
      <Currency amount={item.amount} className="font-medium text-foreground" />
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
    key: "paidAt",
    header: "Paid",
    render: (item) => (
      <span className="text-sm text-muted">
        {item.paidAt ? formatDate(item.paidAt) : "---"}
      </span>
    ),
  },
];

export default async function LeaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lease = mockLeases.find((l) => l.id === id);

  if (!lease) {
    notFound();
  }

  const leasePayments = mockPayments.filter(
    (p) => p.propertyId === lease.propertyId && p.tenantId === lease.tenantId
  );

  return (
    <div className="space-y-8">
      {/* Back nav */}
      <Link
        href="/customer/leases"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Leases
      </Link>

      {/* Lease Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">
            {lease.propertyTitle}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-muted">
            <MapPin className="h-4 w-4" /> {lease.propertyAddress}
          </p>
        </div>
        <StatusBadge status={lease.status} />
      </div>

      {/* Lease Info */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent>
            <p className="text-xs text-muted">Rent Amount</p>
            <Currency
              amount={lease.rentAmount}
              suffix="/mo"
              className="font-display text-xl text-foreground"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-muted">Caution Fee</p>
            <Currency
              amount={lease.cautionFee}
              className="font-display text-xl text-foreground"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-muted">Service Charge</p>
            <Currency
              amount={lease.serviceFee}
              className="font-display text-xl text-foreground"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-muted">Lease Period</p>
            <p className="flex items-center gap-1 font-display text-lg text-foreground">
              <Calendar className="h-4 w-4 text-muted" />
              {formatDate(lease.startDate)} &mdash; {formatDate(lease.endDate)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Landlord Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" /> Landlord
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium text-foreground">
            {lease.landlordName}
          </p>
          {lease.isSigned && lease.signedAt && (
            <p className="mt-1 text-xs text-muted">
              Lease signed on {formatDate(lease.signedAt)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
          Payment History
        </p>
        <DataTable data={leasePayments} columns={paymentColumns} />
      </div>
    </div>
  );
}
