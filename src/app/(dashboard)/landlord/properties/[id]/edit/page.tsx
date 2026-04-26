"use client";

import { useState, use } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mockProperties } from "@/lib/mock-data";
import { PROPERTY_TYPES, NIGERIAN_STATES, MAJOR_CITIES, AMENITIES } from "@/lib/constants";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = mockProperties.find((p) => p.id === id);

  const [form, setForm] = useState({
    type: property?.type || "",
    title: property?.title || "",
    description: property?.description || "",
    state: property?.state || "",
    city: property?.city || "",
    area: property?.area || "",
    address: property?.address || "",
    price: property?.price?.toString() || "",
    cautionFee: property?.cautionFee?.toString() || "",
    serviceCharge: property?.serviceCharge?.toString() || "",
    agentFee: property?.agentFee?.toString() || "",
    bedrooms: property?.bedrooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    toilets: property?.toilets?.toString() || "",
    amenities: property?.amenities || ([] as string[]),
  });

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

  if (!property) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-foreground">Property not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/landlord/properties/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl text-foreground">Edit Property</h1>
          <p className="text-sm text-muted">{property.title}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              label="Property Type"
              placeholder="Select type"
              options={PROPERTY_TYPES.map((t) => ({ label: t, value: t }))}
              value={form.type}
              onValueChange={(v) => update("type", v)}
            />
            <Input
              label="Property Title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
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
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
            />
            <Input
              label="Full Address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Annual Rent"
              type="number"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
            />
            <Input
              label="Caution Fee"
              type="number"
              value={form.cautionFee}
              onChange={(e) => update("cautionFee", e.target.value)}
            />
            <Input
              label="Service Charge"
              type="number"
              value={form.serviceCharge}
              onChange={(e) => update("serviceCharge", e.target.value)}
            />
            <Input
              label="Agent Fee"
              type="number"
              value={form.agentFee}
              onChange={(e) => update("agentFee", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Bedrooms"
                type="number"
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", e.target.value)}
              />
              <Input
                label="Bathrooms"
                type="number"
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", e.target.value)}
              />
              <Input
                label="Toilets"
                type="number"
                value={form.toilets}
                onChange={(e) => update("toilets", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-foreground">Amenities</p>
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
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href={`/landlord/properties/${id}`}>
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Button variant="primary">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
