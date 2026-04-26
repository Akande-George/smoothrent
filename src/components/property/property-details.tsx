import { Bed, Bath, Maximize, Toilet, Check } from "lucide-react";
import { Currency } from "@/components/ui/currency";
import type { Property } from "@/types/property";

export function PropertyDetails({ property }: { property: Property }) {
  const total =
    property.price + property.cautionFee + property.serviceCharge + property.serviceFee;

  const specs = [
    property.bedrooms > 0 && {
      icon: Bed,
      label: "Bedrooms",
      value: property.bedrooms,
    },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Toilet, label: "Toilets", value: property.toilets },
    property.sqft && {
      icon: Maximize,
      label: "Sq ft",
      value: property.sqft.toLocaleString(),
    },
  ].filter(Boolean) as { icon: typeof Bed; label: string; value: string | number }[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {specs.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald text-ivory">
              <s.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-xl text-foreground">{s.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <article className="editorial-card p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Pricing breakdown
        </p>
        <h3 className="mt-1 font-display text-2xl text-foreground">
          What you’ll pay on day one.
        </h3>
        <div className="mt-5 space-y-3 text-sm">
          {[
            { label: "Annual rent", value: property.price },
            { label: "Caution fee (refundable)", value: property.cautionFee },
            { label: "Service charge", value: property.serviceCharge },
            { label: "Service fee", value: property.serviceFee },
          ]
            .filter((row) => row.value > 0)
            .map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-line pb-3 last:border-none last:pb-0"
              >
                <span className="text-muted-strong">{row.label}</span>
                <Currency amount={row.value} className="font-medium text-foreground" />
              </div>
            ))}
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-emerald p-4 text-ivory">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-saffron">
            Total move-in cost
          </span>
          <Currency amount={total} className="font-display text-2xl" />
        </div>
      </article>

      <article className="editorial-card p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          About the property
        </p>
        <h3 className="mt-1 font-display text-2xl text-foreground">Description</h3>
        <p className="mt-4 text-sm leading-7 text-muted-strong">{property.description}</p>
      </article>

      <article className="editorial-card p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          What’s included
        </p>
        <h3 className="mt-1 font-display text-2xl text-foreground">Amenities</h3>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {property.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-2.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-ivory">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-sm text-foreground">{amenity}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
