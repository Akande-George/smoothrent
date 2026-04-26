"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const propertyTypes = [
  { label: "Flat", value: "flat" },
  { label: "Duplex", value: "duplex" },
  { label: "Self-Contain", value: "self-contain" },
  { label: "Mini Flat", value: "mini-flat" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Terrace", value: "terrace" },
  { label: "Bungalow", value: "bungalow" },
  { label: "Event Hall", value: "event-hall" },
];

const nigerianStates = [
  { label: "Lagos", value: "Lagos" },
  { label: "FCT Abuja", value: "FCT Abuja" },
  { label: "Rivers", value: "Rivers" },
  { label: "Kano", value: "Kano" },
  { label: "Oyo", value: "Oyo" },
  { label: "Enugu", value: "Enugu" },
  { label: "Delta", value: "Delta" },
  { label: "Anambra", value: "Anambra" },
];

export default function NewListingPage() {
  const [type, setType] = useState("");
  const [state, setState] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/agent/listings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Add New Listing
          </h1>
          <p className="mt-1 text-muted">
            Fill in the details to create a new property listing.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Input
              id="title"
              label="Property Title"
              placeholder="e.g. Luxury 3 Bedroom Flat in Lekki Phase 1"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Select
                label="Property Type"
                placeholder="Select type"
                options={propertyTypes}
                value={type}
                onValueChange={setType}
              />
              <Input
                id="price"
                label="Annual Rent (₦)"
                type="number"
                placeholder="e.g. 3500000"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Select
                label="State"
                placeholder="Select state"
                options={nigerianStates}
                value={state}
                onValueChange={setState}
              />
              <Input
                id="city"
                label="City / Area"
                placeholder="e.g. Lekki Phase 1"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <Input id="bedrooms" label="Bedrooms" type="number" placeholder="0" />
              <Input id="bathrooms" label="Bathrooms" type="number" placeholder="0" />
              <Input id="sqft" label="Size (sqft)" type="number" placeholder="0" />
            </div>

            <Textarea
              id="description"
              label="Description"
              placeholder="Describe the property in detail..."
              rows={5}
            />

            {/* Photo Upload Placeholder */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Photos
              </label>
              <div className="flex min-h-[160px] items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-white/40">
                <div className="flex flex-col items-center gap-2 text-muted">
                  <Upload className="h-8 w-8" />
                  <p className="text-sm">
                    Drag photos here or click to upload
                  </p>
                  <p className="text-xs text-muted/60">
                    PNG, JPG up to 5MB each
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="button">Publish Listing</Button>
              <Button type="button" variant="secondary">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
