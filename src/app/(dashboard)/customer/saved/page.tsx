import Link from "next/link";
import { Heart } from "lucide-react";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { mockProperties } from "@/lib/mock-data";

const savedProperties = mockProperties.slice(0, 4);

export default function SavedPropertiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Saved Properties
        </h1>
        <p className="mt-1 text-muted">
          Properties you&apos;ve bookmarked for later.
        </p>
      </div>

      {savedProperties.length > 0 ? (
        <PropertyGrid
          properties={savedProperties}
          basePath="/customer/search"
        />
      ) : (
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="No saved properties yet"
          description="Browse listings and save properties you're interested in."
          action={
            <Link href="/customer/search">
              <Button>Browse Properties</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
