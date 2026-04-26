"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck, Sparkles, Bed, Bath, Maximize } from "lucide-react";
import { PropertyFilters } from "@/components/property/property-filters";
import { PropertyGrid } from "@/components/property/property-grid";
import { AIRecommender } from "@/components/property/ai-recommender";
import { mockProperties } from "@/lib/mock-data";
import { formatNaira, rentLabel, rentSuffix } from "@/lib/format";

export default function ListingsPage() {
  const availableProperties = mockProperties.filter((p) => p.status === "Available");
  const hero = availableProperties.find((p) => p.isFeatured) ?? availableProperties[0];
  const cities = [...new Set(availableProperties.map((p) => p.city))];

  return (
    <>
      <section className="relative">
        <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
              Browse · Issue Nº 09
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              The current
              <span className="italic text-emerald"> rental column.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-strong">
              {availableProperties.length} verified properties across {cities.length}{" "}
              Nigerian cities. Each listing is hand-checked, ownership-verified, and
              transparently priced.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <AIRecommender />
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-strong">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-saffron" />
              Updated 4 minutes ago
            </div>
          </div>
        </div>
      </section>

      {hero && (
        <section className="relative">
          <Link
            href={`/listings/${hero.id}`}
            className="group grid overflow-hidden rounded-[28px] border border-line bg-paper md:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative h-72 overflow-hidden md:h-full md:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep via-emerald to-saffron/40" />
              <div className="grain-soft mix-blend-overlay" />
              <svg
                className="absolute inset-0 h-full w-full text-ivory/70"
                viewBox="0 0 400 280"
                fill="none"
              >
                <circle cx="80" cy="80" r="50" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="80" cy="80" r="28" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="80" cy="80" r="6" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="0.9">
                  <path d="M150 220 L150 130 L240 80 L330 130 L330 220" />
                  <rect x="180" y="160" width="22" height="22" />
                  <rect x="220" y="160" width="22" height="22" />
                  <rect x="260" y="160" width="22" height="22" />
                  <rect x="180" y="190" width="22" height="22" />
                  <rect x="220" y="190" width="22" height="22" />
                  <rect x="260" y="190" width="22" height="22" />
                </g>
              </svg>
              <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                <Sparkles className="h-3 w-3" /> Featured this week
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6 sm:p-9">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  <MapPin className="-mt-1 mr-1 inline h-3 w-3" />
                  {hero.area} · {hero.city} · {hero.state}
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                  {hero.title}
                </h2>
              </div>
              <p className="line-clamp-3 text-sm leading-6 text-muted-strong">
                {hero.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
                <span className="inline-flex items-center gap-1">
                  <Bed className="h-3 w-3" /> {hero.bedrooms} bed
                </span>
                <span className="h-1 w-1 rounded-full bg-line-strong" />
                <span className="inline-flex items-center gap-1">
                  <Bath className="h-3 w-3" /> {hero.bathrooms} bath
                </span>
                {hero.sqft && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-line-strong" />
                    <span className="inline-flex items-center gap-1">
                      <Maximize className="h-3 w-3" /> {hero.sqft.toLocaleString()} sqft
                    </span>
                  </>
                )}
                {hero.isVerified && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-line-strong" />
                    <span className="inline-flex items-center gap-1 text-emerald">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </span>
                  </>
                )}
              </div>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-line pt-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {rentLabel(hero.rentType)}
                  </p>
                  <p className="font-display text-3xl text-foreground sm:text-4xl">
                    {formatNaira(hero.price)}
                    <span className="ml-1 text-base text-muted">
                      {rentSuffix(hero.rentType)}
                    </span>
                  </p>
                </div>
                <span className="btn-base btn-emerald inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm transition group-hover:bg-saffron group-hover:text-emerald-deep">
                  See full listing
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="space-y-6">
        <PropertyFilters />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted-strong">
            Showing {availableProperties.length} verified properties
          </p>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-strong">
            {cities.slice(0, 6).map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-paper px-2.5 py-1"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <PropertyGrid properties={availableProperties} />
      </section>
    </>
  );
}
