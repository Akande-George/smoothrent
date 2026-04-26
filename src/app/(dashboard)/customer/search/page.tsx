"use client";

import { PropertyFilters } from "@/components/property/property-filters";
import { PropertyGrid } from "@/components/property/property-grid";
import { mockProperties } from "@/lib/mock-data";

const availableProperties = mockProperties.filter(
  (p) => p.status === "Available"
);

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Find Your Next Home
        </h1>
        <p className="mt-1 text-muted">
          Browse verified properties across Nigeria.
        </p>
      </div>

      <PropertyFilters />

      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
          {availableProperties.length} Properties Available
        </p>
        <PropertyGrid
          properties={availableProperties}
          basePath="/customer/search"
        />
      </div>
    </div>
  );
}
