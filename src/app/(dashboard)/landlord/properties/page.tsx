import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { mockProperties } from "@/lib/mock-data";

const landlordProperties = mockProperties.filter((p) => p.landlordId === "u2");

export default function LandlordPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Properties</h1>
          <p className="text-sm text-muted">
            {landlordProperties.length} properties listed
          </p>
        </div>
        <Link href="/landlord/properties/new">
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {landlordProperties.length === 0 ? (
        <EmptyState
          title="No properties yet"
          description="List your first property to start receiving applications."
          action={
            <Link href="/landlord/properties/new">
              <Button variant="primary">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {landlordProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              href={`/landlord/properties/${property.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
