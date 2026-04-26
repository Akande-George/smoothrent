"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  NIGERIAN_STATES,
  PROPERTY_TYPES,
  PRICE_RANGES,
  BEDROOM_OPTIONS,
  MAJOR_CITIES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PropertyFilters({
  className,
  onSearch,
}: {
  className?: string;
  onSearch?: (filters: Record<string, string>) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const cities = state && MAJOR_CITIES[state] ? MAJOR_CITIES[state] : [];

  const stateOptions = NIGERIAN_STATES.map((s) => ({ label: s, value: s }));
  const cityOptions = cities.map((c) => ({ label: c, value: c }));
  const typeOptions = PROPERTY_TYPES.map((t) => ({ label: t, value: t }));
  const priceOptions = PRICE_RANGES.map((p) => ({ label: p.label, value: p.label }));
  const bedroomOptions = BEDROOM_OPTIONS.map((b) => ({
    label: b === "Studio" ? "Studio" : `${b} Bedroom`,
    value: b,
  }));

  const activeCount = [state, city, type, price, bedrooms].filter(Boolean).length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="field-shell relative flex-1 rounded-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by neighbourhood, address or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-13 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm text-foreground placeholder:text-muted/70 focus:outline-none"
          />
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => setShowFilters((v) => !v)}
          className="gap-2"
          type="button"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-saffron px-1.5 text-[10px] font-semibold text-emerald-deep">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="rounded-2xl border border-line bg-paper p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                Refine
              </p>
              <h3 className="mt-1 font-display text-2xl text-foreground">
                Filter properties
              </h3>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="rounded-full border border-line bg-card p-2 transition hover:border-emerald hover:text-emerald"
              aria-label="Close filters"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Select
              label="State"
              placeholder="Select state"
              options={stateOptions}
              value={state}
              onValueChange={(v) => {
                setState(v);
                setCity("");
              }}
            />
            <Select
              label="City / Area"
              placeholder="Select city"
              options={cityOptions}
              value={city}
              onValueChange={setCity}
            />
            <Select
              label="Property type"
              placeholder="All types"
              options={typeOptions}
              value={type}
              onValueChange={setType}
            />
            <Select
              label="Price range"
              placeholder="Any price"
              options={priceOptions}
              value={price}
              onValueChange={setPrice}
            />
            <Select
              label="Bedrooms"
              placeholder="Any"
              options={bedroomOptions}
              value={bedrooms}
              onValueChange={setBedrooms}
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() =>
                onSearch?.({ search, state, city, type, price, bedrooms })
              }
            >
              Apply filters
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setSearch("");
                setState("");
                setCity("");
                setType("");
                setPrice("");
                setBedrooms("");
              }}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
