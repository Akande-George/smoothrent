"use client";

import { useState } from "react";
import { FileText, CheckCircle, XCircle } from "lucide-react";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { mockApplications, mockProperties } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";
import type { PropertyApplication } from "@/types/property";

const landlordPropertyIds = mockProperties
  .filter((p) => p.landlordId === "u2")
  .map((p) => p.id);

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(
    mockApplications.filter((a) => landlordPropertyIds.includes(a.propertyId))
  );

  const handleAction = (id: string, status: "approved" | "rejected") => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, reviewedAt: new Date().toISOString().split("T")[0] } : a
      )
    );
  };

  const getPropertyTitle = (propertyId: string) =>
    mockProperties.find((p) => p.id === propertyId)?.title || "Unknown";

  const columns: Column<PropertyApplication>[] = [
    {
      key: "tenant",
      header: "Applicant",
      render: (app) => (
        <div className="flex items-center gap-3">
          <Avatar
            fallback={app.tenantName.split(" ").map((n) => n[0]).join("")}
            size="sm"
          />
          <div>
            <p className="font-medium text-foreground">{app.tenantName}</p>
            <p className="text-xs text-muted">{app.tenantEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: "property",
      header: "Property",
      render: (app) => (
        <span className="text-sm">{getPropertyTitle(app.propertyId)}</span>
      ),
    },
    {
      key: "date",
      header: "Date Applied",
      render: (app) => (
        <span className="text-sm text-muted">{formatDate(app.submittedAt)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (app) =>
        app.status === "submitted" || app.status === "under_review" ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(app.id, "approved")}
              className="text-green-600 hover:text-green-700"
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(app.id, "rejected")}
              className="text-red-600 hover:text-red-700"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-xs text-muted">
            {app.reviewedAt ? `Reviewed ${formatDate(app.reviewedAt)}` : "---"}
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Applications</h1>
        <p className="text-sm text-muted">
          {applications.length} incoming applications
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="mb-4 h-12 w-12 text-muted" />
          <h3 className="font-display text-xl text-foreground">No applications</h3>
          <p className="mt-2 text-sm text-muted">
            Applications from prospective tenants will appear here.
          </p>
        </div>
      ) : (
        <DataTable
          data={applications}
          columns={columns}
          searchPlaceholder="Search applications..."
          searchKey={(app) => `${app.tenantName} ${app.tenantEmail}`}
        />
      )}
    </div>
  );
}
