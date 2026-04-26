import Link from "next/link";
import { ArrowLeft, Eye, MessageSquare, MapPin, Bed, Bath, Maximize, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { StatCard } from "@/components/ui/stat-card";
import { formatDate, rentLabel, rentSuffix } from "@/lib/format";
import { mockProperties } from "@/lib/mock-data";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="font-display text-xl text-foreground">
          Listing not found
        </h3>
        <Link href="/agent/listings" className="mt-4">
          <Button variant="secondary">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/agent/listings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl text-foreground">
              {property.title}
            </h1>
            {property.isVerified && (
              <Badge variant="success" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <p className="mt-1 flex items-center gap-1 text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {property.address}, {property.city}, {property.state}
          </p>
        </div>
        <StatusBadge status={property.status} />
      </div>

      {/* Performance Stats */}
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
          Performance
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Views"
            value={String(property.views)}
            icon={<Eye className="h-4 w-4" />}
            change={18}
            changeLabel="From last week"
          />
          <StatCard
            title="Inquiries"
            value={String(property.inquiries)}
            icon={<MessageSquare className="h-4 w-4" />}
            change={8}
            changeLabel="From last week"
          />
          <StatCard
            title="Conversion Rate"
            value={
              property.views > 0
                ? `${((property.inquiries / property.views) * 100).toFixed(1)}%`
                : "0%"
            }
            icon={<Maximize className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="h-64 overflow-hidden rounded-3xl bg-gradient-to-br from-[#e7ded2] to-[#d4c8b8]">
        <div className="flex h-full items-center justify-center text-muted/40">
          <Maximize className="h-12 w-12" />
        </div>
      </div>

      {/* Property Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Type</span>
                <Badge>{property.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Rent Type</span>
                <span className="text-sm font-medium text-foreground">
                  {property.rentType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Bedrooms</span>
                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Bathrooms</span>
                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
                </span>
              </div>
              {property.sqft && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Size</span>
                  <span className="text-sm font-medium text-foreground">
                    {property.sqft.toLocaleString()} sqft
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted">Listed</span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(property.createdAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted">{rentLabel(property.rentType)}</span>
                <Currency
                  amount={property.price}
                  suffix={rentSuffix(property.rentType)}
                  className="text-sm font-medium text-foreground"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Caution fee</span>
                <Currency
                  amount={property.cautionFee}
                  className="text-sm font-medium text-foreground"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Service fee</span>
                <Currency
                  amount={property.serviceFee}
                  className="text-sm font-medium text-foreground"
                />
              </div>
              <div className="border-t border-line pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Move-in total
                  </span>
                  <Currency
                    amount={
                      property.price +
                      property.cautionFee +
                      property.serviceFee
                    }
                    className="font-display text-lg text-foreground"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted">
            {property.description}
          </p>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Badge key={amenity}>{amenity}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
