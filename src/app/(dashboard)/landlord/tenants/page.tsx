"use client";

import { Users } from "lucide-react";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { mockLeases, mockUsers } from "@/lib/mock-data";
import Link from "next/link";

interface TenantRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  leaseStatus: string;
  rentAmount: number;
}

const landlordLeases = mockLeases.filter((l) => l.landlordId === "u2");

const tenantRows: TenantRow[] = landlordLeases.map((lease) => {
  const user = mockUsers.find((u) => u.id === lease.tenantId);
  return {
    id: lease.tenantId,
    name: lease.tenantName,
    email: user?.email || "",
    phone: user?.phone || "",
    property: lease.propertyTitle,
    leaseStatus: lease.status,
    rentAmount: lease.rentAmount,
  };
});

const columns: Column<TenantRow>[] = [
  {
    key: "name",
    header: "Tenant",
    render: (row) => (
      <Link href={`/landlord/tenants/${row.id}`} className="flex items-center gap-3 hover:underline">
        <Avatar fallback={row.name.split(" ").map((n) => n[0]).join("")} size="sm" />
        <div>
          <p className="font-medium text-foreground">{row.name}</p>
          <p className="text-xs text-muted">{row.email}</p>
        </div>
      </Link>
    ),
  },
  {
    key: "property",
    header: "Property",
    render: (row) => <span className="text-sm">{row.property}</span>,
  },
  {
    key: "leaseStatus",
    header: "Lease Status",
    render: (row) => <StatusBadge status={row.leaseStatus} />,
  },
  {
    key: "rentAmount",
    header: "Rent Amount",
    render: (row) => <Currency amount={row.rentAmount} className="font-medium" />,
  },
  {
    key: "phone",
    header: "Contact",
    render: (row) => <span className="text-sm text-muted">{row.phone}</span>,
  },
];

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Tenants</h1>
        <p className="text-sm text-muted">{tenantRows.length} active tenants</p>
      </div>

      {tenantRows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="mb-4 h-12 w-12 text-muted" />
          <h3 className="font-display text-xl text-foreground">No tenants yet</h3>
          <p className="mt-2 text-sm text-muted">
            Tenants will appear here once they sign a lease.
          </p>
        </div>
      ) : (
        <DataTable
          data={tenantRows}
          columns={columns}
          searchPlaceholder="Search tenants..."
          searchKey={(row) => `${row.name} ${row.email} ${row.property}`}
        />
      )}
    </div>
  );
}
