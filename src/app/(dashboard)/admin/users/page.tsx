"use client";

import Link from "next/link";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { mockUsers } from "@/lib/mock-data";
import type { User } from "@/types/user";

const roleVariant: Record<string, "default" | "accent" | "info" | "warning"> = {
  customer: "default",
  landlord: "info",
  agent: "accent",
  admin: "warning",
};

const columns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    render: (user) => (
      <Link
        href={`/admin/users/${user.id}`}
        className="flex items-center gap-3 hover:underline"
      >
        <Avatar
          fallback={`${user.firstName[0]}${user.lastName[0]}`}
          size="sm"
        />
        <span className="font-medium text-foreground">
          {user.firstName} {user.lastName}
        </span>
      </Link>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (user) => (
      <span className="text-sm text-muted">{user.email}</span>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (user) => (
      <Badge variant={roleVariant[user.role]}>
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </Badge>
    ),
  },
  {
    key: "kyc",
    header: "KYC Status",
    render: (user) => <StatusBadge status={user.kycStatus} />,
  },
  {
    key: "status",
    header: "Status",
    render: (user) => (
      <Badge variant={user.isActive ? "success" : "danger"}>
        {user.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "joined",
    header: "Joined",
    render: (user) => (
      <span className="text-sm text-muted">{formatDate(user.createdAt)}</span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (user) => (
      <Link href={`/admin/users/${user.id}`}>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </Link>
    ),
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Users</h1>
        <p className="mt-1 text-muted">
          Manage all platform users and their accounts.
        </p>
      </div>

      <DataTable
        data={mockUsers}
        columns={columns}
        searchPlaceholder="Search users..."
        searchKey={(user) =>
          `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
        }
      />
    </div>
  );
}
