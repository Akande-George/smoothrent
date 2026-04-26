import Link from "next/link";
import { CheckCircle, Flag, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { mockProperties, mockUsers } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Properties</h1>
        <p className="mt-1 text-muted">
          Manage all platform property listings ({mockProperties.length} total).
        </p>
      </div>

      <div className="space-y-4">
        {mockProperties.map((property) => {
          const landlord = mockUsers.find((u) => u.id === property.landlordId);
          return (
            <Card
              key={property.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">
                    {property.title}
                  </h3>
                  {property.isVerified && (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {property.city}, {property.state} &middot;{" "}
                  {landlord
                    ? `${landlord.firstName} ${landlord.lastName}`
                    : "Unknown"}{" "}
                  &middot; Listed {formatDate(property.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Currency
                  amount={property.price}
                  className="text-sm font-medium text-foreground"
                  suffix="/yr"
                />
                <StatusBadge status={property.status} />
                <Badge>{property.type}</Badge>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="gap-1 text-amber-600">
                    <Flag className="h-3.5 w-3.5" />
                    Flag
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
