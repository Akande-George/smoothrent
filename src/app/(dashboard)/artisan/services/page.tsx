"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatNaira } from "@/lib/format";

interface Offering {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
}

const SEED: Offering[] = [
  {
    id: "o1",
    title: "Leak diagnosis & fix",
    description:
      "Locate and fix water leaks in pipes, traps, and connections. Parts billed transparently.",
    price: 15000,
    unit: "per visit",
  },
  {
    id: "o2",
    title: "Water heater service",
    description: "Inspection, descaling, element check and minor repairs.",
    price: 18000,
    unit: "per visit",
  },
  {
    id: "o3",
    title: "Bathroom plumbing overhaul",
    description: "Full bathroom replumb — taps, drains, shower fittings.",
    price: 65000,
    unit: "per project",
  },
];

export default function ArtisanServicesPage() {
  const [offerings, setOfferings] = useState<Offering[]>(SEED);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    price: "",
    unit: "per visit",
  });

  const add = () => {
    if (!draft.title.trim() || !draft.price) return;
    setOfferings((prev) => [
      ...prev,
      {
        id: `o-${Date.now()}`,
        title: draft.title.trim(),
        description: draft.description.trim(),
        price: Number(draft.price),
        unit: draft.unit,
      },
    ]);
    setDraft({ title: "", description: "", price: "", unit: "per visit" });
  };

  const remove = (id: string) =>
    setOfferings((prev) => prev.filter((o) => o.id !== id));

  return (
    <div className="space-y-8">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Artisan · Services
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          What you offer.
        </h1>
        <p className="mt-1 text-sm text-muted-strong">
          List the specific jobs you take, with pricing and a quick description.
          Customers see this on your public profile.
        </p>
      </section>

      <section className="grid gap-3">
        {offerings.map((o) => (
          <article
            key={o.id}
            className="grid gap-3 rounded-2xl border border-line bg-paper p-5 sm:grid-cols-[1fr_auto_auto]"
          >
            <div>
              <p className="font-display text-lg text-foreground">{o.title}</p>
              <p className="mt-1 text-sm text-muted-strong">{o.description}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {o.unit}
              </p>
              <p className="font-display text-xl text-foreground">
                {formatNaira(o.price)}
              </p>
            </div>
            <Button
              type="button"
              variant="ivory"
              size="sm"
              onClick={() => remove(o.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </Button>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-line bg-card p-6">
        <p className="tag-eyebrow">Add a service</p>
        <h3 className="mt-1 font-display text-xl text-foreground">
          Define a new offering
        </h3>
        <div className="mt-4 grid gap-3">
          <Input
            label="Title"
            placeholder="e.g. Geyser installation"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          />
          <Textarea
            label="Description"
            rows={3}
            value={draft.description}
            onChange={(e) =>
              setDraft((d) => ({ ...d, description: e.target.value }))
            }
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Price (₦)"
              type="number"
              value={draft.price}
              onChange={(e) =>
                setDraft((d) => ({ ...d, price: e.target.value }))
              }
            />
            <Input
              label="Unit"
              hint="e.g. per visit, per project"
              value={draft.unit}
              onChange={(e) =>
                setDraft((d) => ({ ...d, unit: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={add}>
              <Plus className="h-4 w-4" />
              Add service
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
