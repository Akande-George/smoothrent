import { ArrowLeft, CheckCircle, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockLeases } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

export default async function LeaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lease = mockLeases.find((l) => l.id === id);

  if (!lease) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-foreground">Lease not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/landlord/leases">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl text-foreground">Lease Details</h1>
          <p className="text-sm text-muted">{lease.propertyTitle}</p>
        </div>
      </div>

      {/* Signing Status */}
      <Card>
        <CardContent className="flex items-center gap-4 pt-0">
          {lease.isSigned ? (
            <CheckCircle className="h-8 w-8 text-green-600" />
          ) : (
            <Clock className="h-8 w-8 text-amber-500" />
          )}
          <div>
            <p className="font-display text-lg text-foreground">
              {lease.isSigned ? "Lease Signed" : "Pending Signature"}
            </p>
            <p className="text-sm text-muted">
              {lease.isSigned && lease.signedAt
                ? `Signed on ${formatDate(lease.signedAt)}`
                : "Awaiting tenant signature"}
            </p>
          </div>
          <div className="ml-auto">
            <StatusBadge status={lease.status} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Lease Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Property</span>
                <span className="font-medium text-foreground">{lease.propertyTitle}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Address</span>
                <span className="text-foreground">{lease.propertyAddress}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Start Date</span>
                <span className="text-foreground">{formatDate(lease.startDate)}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">End Date</span>
                <span className="text-foreground">{formatDate(lease.endDate)}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Rent Amount</span>
                <Currency amount={lease.rentAmount} className="font-medium" />
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Caution Fee</span>
                <Currency amount={lease.cautionFee} className="font-medium" />
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Service Charge</span>
                <Currency amount={lease.serviceCharge} className="font-medium" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parties */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar
                  fallback={lease.tenantName.split(" ").map((n) => n[0]).join("")}
                  size="md"
                />
                <div>
                  <p className="font-medium text-foreground">{lease.tenantName}</p>
                  <Link
                    href={`/landlord/tenants/${lease.tenantId}`}
                    className="text-xs text-accent hover:underline"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Lease Agreement", "Property Inspection Report", "ID Verification"].map(
                  (doc) => (
                    <div
                      key={doc}
                      className="flex items-center gap-3 rounded-2xl border border-black/5 p-3"
                    >
                      <FileText className="h-5 w-5 text-muted" />
                      <span className="flex-1 text-sm text-foreground">{doc}</span>
                      <Badge variant="success">Uploaded</Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
