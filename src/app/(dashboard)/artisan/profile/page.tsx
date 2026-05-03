"use client";

import { useState } from "react";
import { Save, ShieldCheck, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { mockArtisans } from "@/lib/mock-data";
import type { ArtisanCategory } from "@/types/user";

const ARTISAN_ID = "a1";

const CATEGORY_OPTIONS: { label: string; value: ArtisanCategory }[] = [
  { label: "Plumbing", value: "plumbing" },
  { label: "Electrician", value: "electrician" },
  { label: "AC servicing", value: "ac_servicing" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Tiling", value: "tiling" },
  { label: "Painting", value: "painting" },
  { label: "Cleaning", value: "cleaning" },
  { label: "Fumigation", value: "fumigation" },
  { label: "Gardening", value: "gardening" },
  { label: "Generator repair", value: "generator_repair" },
  { label: "Satellite / cable", value: "satellite" },
];

export default function ArtisanProfilePage() {
  const artisan =
    mockArtisans.find((a) => a.id === ARTISAN_ID) ?? mockArtisans[0];
  const [form, setForm] = useState({
    firstName: artisan.firstName,
    lastName: artisan.lastName,
    email: artisan.email,
    phone: artisan.phone,
    category: artisan.category,
    yearsExperience: String(artisan.yearsExperience),
    bio: artisan.bio,
    hourlyRate: String(artisan.hourlyRate),
    baseRate: String(artisan.baseRate),
    serviceAreas: artisan.serviceAreas.join(", "),
  });
  const [saved, setSaved] = useState(false);

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-paper p-6">
        <Avatar
          fallback={`${artisan.firstName[0]}${artisan.lastName[0]}`}
          size="lg"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl text-foreground">
              {artisan.firstName} {artisan.lastName}
            </h1>
            {artisan.kycStatus === "verified" && (
              <Badge variant="success" className="gap-1">
                <ShieldCheck className="h-3 w-3" /> KYC verified
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-strong">
            {CATEGORY_OPTIONS.find((c) => c.value === artisan.category)?.label} ·{" "}
            {artisan.yearsExperience} years experience
          </p>
          <div className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-strong">
            <Star className="h-3.5 w-3.5 text-saffron-deep" />
            {artisan.rating.toFixed(1)} · {artisan.jobsCompleted} jobs completed
          </div>
        </div>
      </section>

      <form onSubmit={submit} className="space-y-6">
        <section className="rounded-2xl border border-line bg-paper p-6">
          <p className="tag-eyebrow">Contact</p>
          <h3 className="mt-1 font-display text-xl text-foreground">
            How customers reach you
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
            <Input
              label="Last name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <Input
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-paper p-6">
          <p className="tag-eyebrow">Trade</p>
          <h3 className="mt-1 font-display text-xl text-foreground">
            What you do
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Select
              label="Category"
              options={CATEGORY_OPTIONS}
              value={form.category}
              onValueChange={(v) =>
                update("category", v as ArtisanCategory)
              }
            />
            <Input
              label="Years of experience"
              type="number"
              value={form.yearsExperience}
              onChange={(e) => update("yearsExperience", e.target.value)}
            />
            <Input
              label="Hourly rate (₦)"
              type="number"
              value={form.hourlyRate}
              onChange={(e) => update("hourlyRate", e.target.value)}
            />
            <Input
              label="Base callout (₦)"
              type="number"
              value={form.baseRate}
              onChange={(e) => update("baseRate", e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Service areas"
              hint="Comma-separated"
              value={form.serviceAreas}
              onChange={(e) => update("serviceAreas", e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Textarea
              label="Bio"
              rows={4}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
              Saved
            </span>
          )}
          <Button type="submit">
            <Save className="h-4 w-4" /> Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
