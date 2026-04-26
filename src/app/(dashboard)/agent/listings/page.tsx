import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";
import { mockProperties } from "@/lib/mock-data";

const agentListings = mockProperties.filter((p) => p.agentId === "u3");

export default function AgentListingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">My Listings</h1>
          <p className="mt-1 text-muted">
            Manage your property listings ({agentListings.length} properties)
          </p>
        </div>
        <Link href="/agent/listings/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agentListings.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            href={`/agent/listings/${property.id}`}
          />
        ))}
      </div>

      {agentListings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="font-display text-xl text-foreground">
            No listings yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Start adding properties to grow your portfolio.
          </p>
          <Link href="/agent/listings/new" className="mt-6">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Listing
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
