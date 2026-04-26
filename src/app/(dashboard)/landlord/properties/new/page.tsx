"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import {
  PROPERTY_TYPES,
  NIGERIAN_STATES,
  MAJOR_CITIES,
  AMENITIES,
  RENT_TYPES,
  type RentType,
} from "@/lib/constants";
import { formatNaira, rentSuffix } from "@/lib/format";
import {
  computeServiceFee,
  readServiceFeeConfig,
  type ServiceFeeConfig,
} from "@/lib/service-fee-config";
import { cn } from "@/lib/utils";

const STEPS = [
  "Property Type",
  "Location",
  "Pricing",
  "Features",
  "Photos",
  "Review",
];

const RENT_TYPE_HELPER: Record<RentType, string> = {
  Monthly: "Standard for residential rentals.",
  Daily: "Best for short-stays and serviced apartments.",
  "Per Event": "Single-day venue or event hire.",
};

function defaultRentTypeFor(propertyType: string): RentType {
  if (propertyType === "Event Hall") return "Per Event";
  return "Monthly";
}

export default function NewPropertyPage() {
  const [step, setStep] = useState(0);
  const [feeConfig, setFeeConfig] = useState<ServiceFeeConfig | null>(null);
  const [feeAutofilled, setFeeAutofilled] = useState(false);
  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    state: "",
    city: "",
    area: "",
    address: "",
    rentType: "Monthly" as RentType,
    price: "",
    cautionFee: "",
    serviceFee: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    powerSupplyHours: "",
    amenities: [] as string[],
    photos: [] as File[],
  });

  useEffect(() => {
    setFeeConfig(readServiceFeeConfig());
  }, []);

  useEffect(() => {
    if (form.type) {
      setForm((prev) => ({ ...prev, rentType: defaultRentTypeFor(prev.type) }));
    }
  }, [form.type]);

  useEffect(() => {
    if (!feeConfig) return;
    if (feeAutofilled) return;
    const rent = Number(form.price || 0);
    if (rent > 0) {
      setForm((prev) => ({
        ...prev,
        serviceFee: String(computeServiceFee(rent, feeConfig)),
      }));
      setFeeAutofilled(true);
    }
  }, [form.price, feeConfig, feeAutofilled]);

  const recommendedFee =
    feeConfig && form.price
      ? computeServiceFee(Number(form.price), feeConfig)
      : null;

  const update = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const cities = form.state ? MAJOR_CITIES[form.state] || [] : [];
  const rentSuffixDisplay = rentSuffix(form.rentType);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          Add a property.
        </h1>
        <p className="text-sm text-muted-strong">{STEPS[step]}</p>
      </div>

      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-emerald" : "bg-line"
            )}
          />
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          {step === 0 && (
            <div className="space-y-4">
              <Select
                label="Property type"
                placeholder="Select type"
                options={PROPERTY_TYPES.map((t) => ({ label: t, value: t }))}
                value={form.type}
                onValueChange={(v) => update("type", v)}
              />
              <Input
                label="Property title"
                placeholder="e.g. Luxury 3 Bedroom Flat in Lekki"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
              <Textarea
                label="Description"
                placeholder="Describe the property…"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Select
                label="State"
                placeholder="Select state"
                options={NIGERIAN_STATES.map((s) => ({ label: s, value: s }))}
                value={form.state}
                onValueChange={(v) => {
                  update("state", v);
                  update("city", "");
                }}
              />
              <Select
                label="City"
                placeholder="Select city"
                options={cities.map((c) => ({ label: c, value: c }))}
                value={form.city}
                onValueChange={(v) => update("city", v)}
              />
              <Input
                label="Area"
                placeholder="e.g. Phase 1"
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
              />
              <Input
                label="Full address"
                placeholder="e.g. 12 Admiralty Way"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-strong">
                  Rent type
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {RENT_TYPES.map((r) => {
                    const active = form.rentType === r;
                    return (
                      <button
                        type="button"
                        key={r}
                        onClick={() => update("rentType", r)}
                        className={cn(
                          "rounded-2xl border p-3 text-left transition",
                          active
                            ? "border-emerald bg-emerald text-ivory"
                            : "border-line bg-paper hover:-translate-y-0.5 hover:border-emerald/40"
                        )}
                      >
                        <p
                          className={cn(
                            "font-display text-lg",
                            active ? "text-ivory" : "text-foreground"
                          )}
                        >
                          {r}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            active ? "text-ivory/80" : "text-muted-strong"
                          )}
                        >
                          {RENT_TYPE_HELPER[r]}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Input
                label={`Rent (${rentSuffixDisplay.replace("/", "per ")})`}
                type="number"
                placeholder="e.g. 290000"
                hint={`Quoted ${rentSuffixDisplay}`}
                value={form.price}
                onChange={(e) => {
                  setFeeAutofilled(false);
                  update("price", e.target.value);
                }}
              />
              <Input
                label="Caution fee (refundable)"
                type="number"
                placeholder="e.g. 290000"
                value={form.cautionFee}
                onChange={(e) => update("cautionFee", e.target.value)}
              />
              <Input
                label="Service fee"
                type="number"
                placeholder="e.g. 350000"
                hint={
                  recommendedFee
                    ? `SmoothRent suggests ${formatNaira(recommendedFee)}`
                    : "Set by admin"
                }
                value={form.serviceFee}
                onChange={(e) => update("serviceFee", e.target.value)}
              />
              {feeConfig && (
                <div className="rounded-2xl border border-line bg-paper p-4 text-xs text-muted-strong">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-saffron-deep" />
                    <p className="font-mono uppercase tracking-[0.32em] text-muted">
                      Admin-set platform fee
                    </p>
                  </div>
                  <p className="mt-2 leading-5">
                    {feeConfig.mode === "percent"
                      ? `Default ${feeConfig.percentOfRent}% of rent (min ${formatNaira(feeConfig.minAmount)} · max ${formatNaira(feeConfig.maxAmount)}).`
                      : `Flat ${formatNaira(feeConfig.fixedAmount)} per listing.`}{" "}
                    Override here if needed.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Bedrooms"
                  type="number"
                  placeholder="0"
                  value={form.bedrooms}
                  onChange={(e) => update("bedrooms", e.target.value)}
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  placeholder="0"
                  value={form.bathrooms}
                  onChange={(e) => update("bathrooms", e.target.value)}
                />
                <Input
                  label="Toilets"
                  type="number"
                  placeholder="0"
                  value={form.toilets}
                  onChange={(e) => update("toilets", e.target.value)}
                />
              </div>
              <Input
                label="Average power supply (hours / day)"
                type="number"
                min={0}
                max={24}
                placeholder="e.g. 18"
                hint="Honest estimate over a typical week"
                value={form.powerSupplyHours}
                onChange={(e) => update("powerSupplyHours", e.target.value)}
              />
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-strong">
                  Amenities
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITIES.map((amenity) => (
                    <Checkbox
                      key={amenity}
                      label={amenity}
                      checked={form.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <FileUpload
              label="Property photos"
              multiple
              maxFiles={10}
              onChange={(files) => update("photos", files)}
            />
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                Review your listing
              </h2>
              <div className="space-y-3 text-sm">
                {[
                  ["Type", form.type || "—"],
                  ["Title", form.title || "—"],
                  [
                    "Location",
                    [form.area, form.city, form.state].filter(Boolean).join(", ") ||
                      "—",
                  ],
                  ["Rent type", form.rentType],
                  [
                    "Rent",
                    form.price
                      ? `${formatNaira(Number(form.price))}${rentSuffixDisplay}`
                      : "—",
                  ],
                  [
                    "Caution",
                    form.cautionFee ? formatNaira(Number(form.cautionFee)) : "—",
                  ],
                  [
                    "Service fee",
                    form.serviceFee
                      ? formatNaira(Number(form.serviceFee))
                      : "—",
                  ],
                  ["Bedrooms / Baths", `${form.bedrooms || 0} / ${form.bathrooms || 0}`],
                  [
                    "Power supply",
                    form.powerSupplyHours
                      ? `${form.powerSupplyHours} hrs / day`
                      : "—",
                  ],
                  ["Amenities", `${form.amenities.length} selected`],
                  ["Photos", `${form.photos.length} uploaded`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-line pb-2 last:border-none"
                  >
                    <span className="text-muted-strong">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="ivory"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="accent">
            <Check className="h-4 w-4" />
            Submit listing
          </Button>
        )}
      </div>
    </div>
  );
}
