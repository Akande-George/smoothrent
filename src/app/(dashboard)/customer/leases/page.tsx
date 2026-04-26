import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";
import { mockLeases } from "@/lib/mock-data";

const myLeases = mockLeases.filter((l) => l.tenantId === "u1");

export default function LeasesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">My Leases</h1>
        <p className="mt-1 text-muted">
          View and manage your active lease agreements.
        </p>
      </div>

      {myLeases.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {myLeases.map((lease) => (
            <Card key={lease.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg text-foreground">
                      {lease.propertyTitle}
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {lease.propertyAddress}
                    </p>
                  </div>
                  <StatusBadge status={lease.status} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted">Rent Amount</p>
                    <Currency
                      amount={lease.rentAmount}
                      suffix="/mo"
                      className="font-display text-lg text-foreground"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Landlord</p>
                    <p className="text-sm font-medium text-foreground">
                      {lease.landlordName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(lease.startDate)} &mdash;{" "}
                  {formatDate(lease.endDate)}
                </div>

                <div className="mt-auto pt-2">
                  <Link href={`/customer/leases/${lease.id}`}>
                    <Button variant="secondary" size="sm" className="gap-1">
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Calendar className="h-12 w-12" />}
          title="No active leases"
          description="Your lease agreements will appear here once you sign one."
        />
      )}
    </div>
  );
}
