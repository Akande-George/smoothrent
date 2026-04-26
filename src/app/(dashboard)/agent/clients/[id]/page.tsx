import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { formatDate } from "@/lib/format";
import { mockDeals, mockProperties } from "@/lib/mock-data";

const mockClientDetails: Record<
  string,
  { name: string; phone: string; email: string; type: string; location: string; joinedAt: string }
> = {
  c1: { name: "Chinedu Okafor", phone: "08012345678", email: "chinedu@gmail.com", type: "buyer", location: "Lekki, Lagos", joinedAt: "2025-09-15" },
  c2: { name: "Oluwaseun Adeyemi", phone: "09087654321", email: "seun@gmail.com", type: "buyer", location: "Yaba, Lagos", joinedAt: "2026-01-05" },
  c3: { name: "Bola Tinubu Jr", phone: "08055667788", email: "bola.jr@gmail.com", type: "buyer", location: "Victoria Island, Lagos", joinedAt: "2026-03-05" },
  c4: { name: "Ada Okonkwo", phone: "07099887766", email: "ada@gmail.com", type: "buyer", location: "GRA Phase 2, Rivers", joinedAt: "2026-03-19" },
  c5: { name: "Aisha Abdullahi", phone: "08098765432", email: "aisha@gmail.com", type: "landlord", location: "Maitama, FCT Abuja", joinedAt: "2025-06-10" },
  c6: { name: "Amaka Eze", phone: "08167890123", email: "amaka@gmail.com", type: "landlord", location: "Ikoyi, Lagos", joinedAt: "2025-08-12" },
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = mockClientDetails[id];

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="font-display text-xl text-foreground">
          Client not found
        </h3>
        <Link href="/agent/clients" className="mt-4">
          <Button variant="secondary">Back to Clients</Button>
        </Link>
      </div>
    );
  }

  const clientDeals = mockDeals.filter((d) => d.clientName === client.name);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/agent/clients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl text-foreground">
            {client.name}
          </h1>
          <p className="mt-1 text-muted">Client details and history</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar
                fallback={client.name.split(" ").map((n) => n[0]).join("")}
                size="lg"
              />
              <Badge variant="info">
                {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
              </Badge>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted" />
                <span className="text-foreground">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted" />
                <span className="text-foreground">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted" />
                <span className="text-foreground">{client.location}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted">
              Client since {formatDate(client.joinedAt)}
            </p>
          </CardContent>
        </Card>

        {/* Associated Properties & Deals */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Deal History</CardTitle>
            </CardHeader>
            <CardContent>
              {clientDeals.length > 0 ? (
                <div className="space-y-4">
                  {clientDeals.map((deal) => {
                    const property = mockProperties.find(
                      (p) => p.id === deal.propertyId
                    );
                    return (
                      <Link
                        key={deal.id}
                        href={`/agent/deals/${deal.id}`}
                        className="flex items-center justify-between rounded-2xl border border-black/5 p-4 transition-colors hover:bg-black/[0.02]"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {deal.propertyTitle}
                          </p>
                          <p className="text-xs text-muted">
                            {property?.city}, {property?.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Currency
                            amount={deal.value}
                            className="text-sm font-medium text-foreground"
                          />
                          <StatusBadge status={deal.stage} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-muted">
                  No deals with this client yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
