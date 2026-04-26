"use client";

import { Wrench } from "lucide-react";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { mockMaintenanceRequests, mockProperties } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";
import type { MaintenanceRequest } from "@/types/maintenance";
import Link from "next/link";

const landlordPropertyIds = mockProperties
  .filter((p) => p.landlordId === "u2")
  .map((p) => p.id);

const requests = mockMaintenanceRequests.filter((r) =>
  landlordPropertyIds.includes(r.propertyId)
);

const priorityVariant: Record<string, "danger" | "warning" | "default"> = {
  high: "danger",
  medium: "warning",
  low: "default",
};

const columns: Column<MaintenanceRequest>[] = [
  {
    key: "title",
    header: "Request",
    render: (r) => (
      <Link href={`/landlord/maintenance/${r.id}`} className="hover:underline">
        <p className="font-medium text-foreground">{r.title}</p>
        <p className="text-xs text-muted">{r.propertyTitle}</p>
      </Link>
    ),
  },
  {
    key: "tenant",
    header: "Tenant",
    render: (r) => <span className="text-sm">{r.tenantName}</span>,
  },
  {
    key: "category",
    header: "Category",
    render: (r) => (
      <span className="text-sm capitalize">{r.category}</span>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    render: (r) => (
      <Badge variant={priorityVariant[r.priority] || "default"}>
        {r.priority.charAt(0).toUpperCase() + r.priority.slice(1)}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
  {
    key: "date",
    header: "Date",
    render: (r) => (
      <span className="text-sm text-muted">{formatDate(r.createdAt)}</span>
    ),
  },
];

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Maintenance</h1>
        <p className="text-sm text-muted">{requests.length} maintenance requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Wrench className="mb-4 h-12 w-12 text-muted" />
          <h3 className="font-display text-xl text-foreground">No maintenance requests</h3>
          <p className="mt-2 text-sm text-muted">
            Maintenance requests from tenants will appear here.
          </p>
        </div>
      ) : (
        <DataTable
          data={requests}
          columns={columns}
          searchPlaceholder="Search requests..."
          searchKey={(r) => `${r.title} ${r.tenantName} ${r.category}`}
        />
      )}
    </div>
  );
}
