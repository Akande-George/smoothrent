"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";
import { mockUsers } from "@/lib/mock-data";
import type { User } from "@/types/user";

const pendingKYCUsers = mockUsers.filter(
  (u) => u.kycStatus === "pending" || u.kycStatus === "not_started"
);

const columns: Column<User>[] = [
  {
    key: "name",
    header: "Applicant",
    render: (user) => (
      <Link
        href={`/admin/kyc/${user.id}`}
        className="flex items-center gap-3 hover:underline"
      >
        <Avatar
          fallback={`${user.firstName[0]}${user.lastName[0]}`}
          size="sm"
        />
        <div>
          <span className="font-medium text-foreground">
            {user.firstName} {user.lastName}
          </span>
          <p className="text-xs text-muted">{user.email}</p>
        </div>
      </Link>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (user) => (
      <Badge variant="accent">
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "KYC Status",
    render: (user) => <StatusBadge status={user.kycStatus} />,
  },
  {
    key: "location",
    header: "Location",
    render: (user) => (
      <span className="text-sm text-muted">
        {user.city}, {user.state}
      </span>
    ),
  },
  {
    key: "joined",
    header: "Registered",
    render: (user) => (
      <span className="text-sm text-muted">{formatDate(user.createdAt)}</span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (user) => (
      <Link href={`/admin/kyc/${user.id}`}>
        <Button variant="secondary" size="sm">
          Review
        </Button>
      </Link>
    ),
  },
];

export default function AdminKYCPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          KYC Verification Queue
        </h1>
        <p className="mt-1 text-muted">
          Review and approve pending identity verifications.
        </p>
      </div>

      {pendingKYCUsers.length > 0 ? (
        <DataTable
          data={pendingKYCUsers}
          columns={columns}
          searchPlaceholder="Search applicants..."
          searchKey={(user) =>
            `${user.firstName} ${user.lastName} ${user.email}`
          }
        />
      ) : (
        <EmptyState
          icon={<Shield className="h-10 w-10" />}
          title="No pending verifications"
          description="All KYC submissions have been reviewed."
        />
      )}
    </div>
  );
}
