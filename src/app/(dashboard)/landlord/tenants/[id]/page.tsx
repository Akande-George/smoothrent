import { ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { mockUsers, mockLeases, mockPayments } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

export default async function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);
  const leases = mockLeases.filter((l) => l.tenantId === id);
  const payments = mockPayments.filter((p) => p.tenantId === id);

  if (!user) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-foreground">Tenant not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/landlord/tenants">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-display text-3xl text-foreground">Tenant Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Avatar
              fallback={`${user.firstName[0]}${user.lastName[0]}`}
              size="lg"
            />
            <h2 className="mt-3 font-display text-xl text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <StatusBadge status={user.kycStatus} />
            <div className="mt-4 w-full space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Phone className="h-4 w-4" />
                {user.phone}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lease Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lease Information</CardTitle>
          </CardHeader>
          <CardContent>
            {leases.length === 0 ? (
              <p className="text-sm text-muted">No active leases.</p>
            ) : (
              <div className="space-y-4">
                {leases.map((lease) => (
                  <div
                    key={lease.id}
                    className="rounded-2xl border border-black/5 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{lease.propertyTitle}</p>
                      <StatusBadge status={lease.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted">Start Date</span>
                        <p className="text-foreground">{formatDate(lease.startDate)}</p>
                      </div>
                      <div>
                        <span className="text-muted">End Date</span>
                        <p className="text-foreground">{formatDate(lease.endDate)}</p>
                      </div>
                      <div>
                        <span className="text-muted">Rent</span>
                        <Currency amount={lease.rentAmount} className="block font-medium" />
                      </div>
                      <div>
                        <span className="text-muted">Service Charge</span>
                        <Currency amount={lease.serviceFee} className="block font-medium" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-sm text-muted">No payments recorded.</p>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {payment.propertyTitle}
                    </p>
                    <p className="text-xs text-muted capitalize">
                      {payment.type.replace("_", " ")} &mdash; {payment.reference}
                    </p>
                  </div>
                  <div className="text-right">
                    <Currency amount={payment.amount} className="font-medium" />
                    <div className="mt-1">
                      <StatusBadge status={payment.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
