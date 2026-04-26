import Link from "next/link";
import { Eye, MessageSquare, FileText, Edit, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Currency } from "@/components/ui/currency";
import { mockProperties, mockLeases, mockApplications } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-foreground">Property not found</h1>
      </div>
    );
  }

  const lease = mockLeases.find((l) => l.propertyId === id && l.status === "active");
  const applications = mockApplications.filter((a) => a.propertyId === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">{property.title}</h1>
          <p className="flex items-center gap-1 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {property.address}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={property.status} />
          <Link href={`/landlord/properties/${id}/edit`}>
            <Button variant="secondary" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Views"
          value={property.views.toLocaleString()}
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          title="Inquiries"
          value={property.inquiries.toString()}
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard
          title="Applications"
          value={applications.length.toString()}
          icon={<FileText className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Type</span>
                <Badge>{property.type}</Badge>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Rent</span>
                <Currency amount={property.price} suffix="/yr" className="font-medium" />
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-muted">Caution Fee</span>
                <Currency amount={property.cautionFee} className="font-medium" />
              </div>
              {property.serviceCharge > 0 && (
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-muted">Service Charge</span>
                  <Currency amount={property.serviceCharge} className="font-medium" />
                </div>
              )}
              <div className="flex items-center gap-6 pt-2">
                {property.bedrooms > 0 && (
                  <span className="flex items-center gap-1 text-muted">
                    <Bed className="h-4 w-4" /> {property.bedrooms} Bed
                  </span>
                )}
                <span className="flex items-center gap-1 text-muted">
                  <Bath className="h-4 w-4" /> {property.bathrooms} Bath
                </span>
                {property.sqft && (
                  <span className="flex items-center gap-1 text-muted">
                    <Maximize className="h-4 w-4" /> {property.sqft.toLocaleString()} sqft
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {property.amenities.map((a) => (
                  <Badge key={a} variant="default">{a}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Tenant */}
        <Card>
          <CardHeader>
            <CardTitle>Current Tenant</CardTitle>
          </CardHeader>
          <CardContent>
            {lease ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    fallback={lease.tenantName.split(" ").map((n) => n[0]).join("")}
                    size="lg"
                  />
                  <div>
                    <p className="font-medium text-foreground">{lease.tenantName}</p>
                    <StatusBadge status={lease.status} />
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Lease Period</span>
                    <span className="text-foreground">
                      {formatDate(lease.startDate)} &mdash; {formatDate(lease.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Monthly Rent</span>
                    <Currency amount={lease.rentAmount} className="font-medium" />
                  </div>
                </div>
                <Link href={`/landlord/tenants/${lease.tenantId}`}>
                  <Button variant="secondary" size="sm" className="w-full">
                    View Tenant Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted">
                No active tenant for this property.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Applications */}
      {applications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      fallback={app.tenantName.split(" ").map((n) => n[0]).join("")}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{app.tenantName}</p>
                      <p className="text-xs text-muted">Applied {formatDate(app.submittedAt)}</p>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
