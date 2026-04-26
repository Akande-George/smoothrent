import { PropertyCard } from "./property-card";
import type { Property } from "@/types/property";

export function PropertyGrid({
  properties,
  basePath = "/listings",
}: {
  properties: Property[];
  basePath?: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          href={`${basePath}/${property.id}`}
        />
      ))}
    </div>
  );
}
