"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: "buyer" | "seller" | "landlord";
  lastContact: string;
}

const mockClients: Client[] = [
  { id: "c1", name: "Chinedu Okafor", phone: "08012345678", email: "chinedu@gmail.com", type: "buyer", lastContact: "2026-03-20" },
  { id: "c2", name: "Oluwaseun Adeyemi", phone: "09087654321", email: "seun@gmail.com", type: "buyer", lastContact: "2026-03-18" },
  { id: "c3", name: "Bola Tinubu Jr", phone: "08055667788", email: "bola.jr@gmail.com", type: "buyer", lastContact: "2026-03-20" },
  { id: "c4", name: "Ada Okonkwo", phone: "07099887766", email: "ada@gmail.com", type: "buyer", lastContact: "2026-03-19" },
  { id: "c5", name: "Aisha Abdullahi", phone: "08098765432", email: "aisha@gmail.com", type: "landlord", lastContact: "2026-03-15" },
  { id: "c6", name: "Amaka Eze", phone: "08167890123", email: "amaka@gmail.com", type: "landlord", lastContact: "2026-03-10" },
];

const typeVariant: Record<string, "info" | "accent" | "warning"> = {
  buyer: "info",
  seller: "accent",
  landlord: "warning",
};

const columns: Column<Client>[] = [
  {
    key: "name",
    header: "Name",
    render: (client) => (
      <Link
        href={`/agent/clients/${client.id}`}
        className="flex items-center gap-3 hover:underline"
      >
        <Avatar
          fallback={client.name.split(" ").map((n) => n[0]).join("")}
          size="sm"
        />
        <span className="font-medium text-foreground">{client.name}</span>
      </Link>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (client) => (
      <span className="text-sm text-muted">{client.phone}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (client) => (
      <span className="text-sm text-muted">{client.email}</span>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (client) => (
      <Badge variant={typeVariant[client.type]}>
        {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
      </Badge>
    ),
  },
  {
    key: "lastContact",
    header: "Last Contact",
    render: (client) => (
      <span className="text-sm text-muted">{formatDate(client.lastContact)}</span>
    ),
  },
];

export default function AgentClientsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Clients</h1>
        <p className="mt-1 text-muted">
          Manage your client relationships and contacts.
        </p>
      </div>

      <DataTable
        data={mockClients}
        columns={columns}
        searchPlaceholder="Search clients..."
        searchKey={(client) => `${client.name} ${client.email} ${client.phone}`}
      />
    </div>
  );
}
