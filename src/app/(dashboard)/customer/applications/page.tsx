"use client";

import Link from "next/link";
import { FileText, Eye } from "lucide-react";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { mockApplications, mockProperties } from "@/lib/mock-data";
import type { PropertyApplication } from "@/types/property";

const myApplications = mockApplications.filter((a) => a.tenantId === "u1");

const columns: Column<PropertyApplication>[] = [
  {
    key: "property",
    header: "Property",
    render: (item) => {
      const property = mockProperties.find((p) => p.id === item.propertyId);
      return (
        <div>
          <p className="font-medium text-foreground">
            {property?.title ?? "Unknown Property"}
          </p>
          <p className="text-xs text-muted">
            {property?.area}, {property?.city}
          </p>
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "submittedAt",
    header: "Submitted",
    render: (item) => (
      <span className="text-sm text-muted">{formatDate(item.submittedAt)}</span>
    ),
  },
  {
    key: "actions",
    header: "",
    render: (item) => (
      <Link href={`/customer/applications/${item.id}`}>
        <Button variant="ghost" size="sm" className="gap-1">
          <Eye className="h-3.5 w-3.5" /> View
        </Button>
      </Link>
    ),
  },
];

export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          My Applications
        </h1>
        <p className="mt-1 text-muted">
          Track the status of your rental applications.
        </p>
      </div>

      <DataTable
        data={myApplications}
        columns={columns}
        searchPlaceholder="Search applications..."
        searchKey={(item) => {
          const property = mockProperties.find((p) => p.id === item.propertyId);
          return property?.title ?? "";
        }}
      />
    </div>
  );
}
