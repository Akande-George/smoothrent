import Link from "next/link";
import { ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { mockLeases } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

const landlordLeases = mockLeases.filter((l) => l.landlordId === "u2");

export default function LeasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Leases</h1>
        <p className="text-sm text-muted">{landlordLeases.length} leases</p>
      </div>

      {landlordLeases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ScrollText className="mb-4 h-12 w-12 text-muted" />
          <h3 className="font-display text-xl text-foreground">No leases yet</h3>
          <p className="mt-2 text-sm text-muted">
            Leases will appear here when tenants are approved.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {landlordLeases.map((lease) => (
            <Link key={lease.id} href={`/landlord/leases/${lease.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="pt-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {lease.propertyTitle}
                      </h3>
                      <p className="text-xs text-muted">{lease.propertyAddress}</p>
                    </div>
                    <StatusBadge status={lease.status} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs uppercase tracking-[0.3em] text-muted">
                        Tenant
                      </span>
                      <p className="font-medium text-foreground">{lease.tenantName}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.3em] text-muted">
                        Rent
                      </span>
                      <Currency
                        amount={lease.rentAmount}
                        className="block font-medium text-foreground"
                      />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.3em] text-muted">
                        Start
                      </span>
                      <p className="text-foreground">{formatDate(lease.startDate)}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.3em] text-muted">
                        End
                      </span>
                      <p className="text-foreground">{formatDate(lease.endDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
