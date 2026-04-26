"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal, ModalContent } from "@/components/ui/modal";
import { useServiceCatalog } from "@/lib/service-catalog-store";
import { FREQUENCY_LABEL } from "@/lib/services-data";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  ServiceCatalogItem,
  ServiceCategory,
  ServiceFrequency,
} from "@/types/service";

const CATEGORY_OPTIONS: { label: string; value: ServiceCategory }[] = [
  { label: "Cleaning", value: "cleaning" },
  { label: "Laundry", value: "laundry" },
  { label: "Fumigation", value: "fumigation" },
  { label: "Gardening", value: "gardening" },
  { label: "Plumbing", value: "plumbing" },
  { label: "Electrician", value: "electrician" },
  { label: "AC servicing", value: "ac_servicing" },
  { label: "Private chef", value: "chef" },
  { label: "Security", value: "security" },
  { label: "Errand", value: "errand" },
];

const UNIT_OPTIONS: { label: string; value: ServiceCatalogItem["unit"] }[] = [
  { label: "Per visit", value: "per visit" },
  { label: "Per kg", value: "per kg" },
  { label: "Per hour", value: "per hour" },
  { label: "Per day", value: "per day" },
];

const ALL_FREQUENCIES: ServiceFrequency[] = [
  "one_off",
  "daily",
  "weekly",
  "biweekly",
  "monthly",
];

const CATEGORY_GRADIENT: Record<string, string> = {
  cleaning: "from-emerald via-emerald-soft to-saffron/40",
  laundry: "from-saffron via-clay/50 to-emerald-deep",
  fumigation: "from-clay via-saffron/60 to-sand",
  gardening: "from-emerald-deep via-emerald to-saffron/30",
  plumbing: "from-emerald-soft via-saffron/40 to-emerald",
  electrician: "from-saffron via-emerald-deep to-clay/40",
  ac_servicing: "from-emerald via-saffron/30 to-emerald-soft",
  chef: "from-clay via-saffron to-emerald-deep",
  security: "from-emerald-deep via-emerald to-clay/30",
  errand: "from-saffron via-emerald-soft to-clay/30",
};

const EMPTY_SERVICE: ServiceCatalogItem = {
  id: "",
  name: "",
  category: "cleaning",
  tagline: "",
  description: "",
  basePrice: 0,
  unit: "per visit",
  durationMinutes: 60,
  supportedFrequencies: ["one_off"],
  features: [],
  popular: false,
};

export default function AdminServicesPage() {
  const { items, upsert, remove, reset } = useServiceCatalog();
  const [editing, setEditing] = useState<ServiceCatalogItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const openNew = () =>
    setEditing({ ...EMPTY_SERVICE, id: `svc-${Date.now().toString(36)}` });

  const openEdit = (item: ServiceCatalogItem) => setEditing({ ...item });

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            Admin · Resident services
          </p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
            Service catalog.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-strong">
            Add, edit, and remove the services tenants can request from their
            dashboard. Changes apply across the platform instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ivory" type="button" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset to defaults
          </Button>
          <Button type="button" onClick={openNew}>
            <Plus className="h-4 w-4" />
            Add service
          </Button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Active services", value: items.length.toString() },
          {
            label: "Featured",
            value: items.filter((i) => i.popular).length.toString(),
          },
          {
            label: "Avg starting price",
            value:
              items.length > 0
                ? formatNaira(
                    Math.round(
                      items.reduce((acc, i) => acc + i.basePrice, 0) / items.length
                    )
                  )
                : "—",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-paper p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              {s.label}
            </p>
            <p className="mt-1 font-display text-2xl text-foreground">{s.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((service) => (
          <article
            key={service.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition hover:border-emerald/50"
          >
            <div
              className={cn(
                "relative h-28 overflow-hidden bg-gradient-to-br",
                CATEGORY_GRADIENT[service.category] ?? "from-emerald to-saffron"
              )}
            >
              <div className="grain-soft mix-blend-overlay" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ivory/95 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                {service.unit}
              </span>
              {service.popular && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-saffron px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
                  <Star className="h-3 w-3" />
                  Featured
                </span>
              )}
              <p className="absolute bottom-3 left-3 font-display text-2xl italic text-ivory">
                {service.name || "Untitled"}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="text-sm text-muted-strong">{service.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {service.supportedFrequencies.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-line bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-strong"
                  >
                    {FREQUENCY_LABEL[f]}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    From
                  </p>
                  <p className="font-display text-2xl text-foreground">
                    {formatNaira(service.basePrice)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(service)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card transition hover:border-emerald hover:text-emerald"
                    aria-label={`Edit ${service.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(service.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-clay transition hover:border-clay hover:bg-clay/10"
                    aria-label={`Delete ${service.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={openNew}
          className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-paper/50 px-6 py-8 text-muted-strong transition hover:border-emerald hover:text-emerald"
        >
          <Plus className="h-8 w-8" />
          <p className="font-display text-xl">Add a new service</p>
          <p className="text-xs">Visible to tenants once saved.</p>
        </button>
      </section>

      <ServiceFormModal
        editing={editing}
        onClose={() => setEditing(null)}
        onSave={(item) => {
          upsert(item);
          setEditing(null);
        }}
      />

      <Modal open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <ModalContent
          eyebrow="Confirm"
          title="Remove this service?"
          description="Tenants won't be able to schedule this service after removal. Active subscriptions stay running."
        >
          <div className="flex justify-end gap-2">
            <Button
              variant="ivory"
              type="button"
              onClick={() => setConfirmDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                if (confirmDelete) remove(confirmDelete);
                setConfirmDelete(null);
              }}
            >
              <Trash2 className="h-4 w-4" />
              Remove service
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

function ServiceFormModal({
  editing,
  onClose,
  onSave,
}: {
  editing: ServiceCatalogItem | null;
  onClose: () => void;
  onSave: (item: ServiceCatalogItem) => void;
}) {
  const [draft, setDraft] = useState<ServiceCatalogItem | null>(editing);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  // Sync draft when editing target changes
  if (editing && (!draft || draft.id !== editing.id)) {
    setDraft(editing);
  }

  if (!editing || !draft) {
    return (
      <Modal open={false} onOpenChange={onClose}>
        <span />
      </Modal>
    );
  }

  const update = <K extends keyof ServiceCatalogItem>(
    key: K,
    value: ServiceCatalogItem[K]
  ) => setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));

  const toggleFrequency = (f: ServiceFrequency) => {
    if (!draft) return;
    const next = draft.supportedFrequencies.includes(f)
      ? draft.supportedFrequencies.filter((x) => x !== f)
      : [...draft.supportedFrequencies, f];
    update("supportedFrequencies", next);
  };

  const addFeature = () => {
    const v = featureInput.trim();
    if (!v) return;
    update("features", [...draft.features, v]);
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    update(
      "features",
      draft.features.filter((_, i) => i !== idx)
    );
  };

  const handleSave = async () => {
    if (!draft.name.trim() || draft.basePrice <= 0) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 350));
    onSave(draft);
    setSaving(false);
  };

  const isNew = !editing.name;

  return (
    <Modal open={!!editing} onOpenChange={(o) => !o && onClose()}>
      <ModalContent
        eyebrow={isNew ? "Add service" : "Edit service"}
        title={
          isNew ? "Add a new service" : `Edit ${editing.name || "service"}`
        }
        description="Tenants see these details on their services page when selecting a vendor."
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <Input
            id="svc-name"
            label="Name"
            placeholder="e.g. House cleaning"
            value={draft.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Category"
              options={CATEGORY_OPTIONS}
              value={draft.category}
              onValueChange={(v) => update("category", v as ServiceCategory)}
            />
            <Select
              label="Unit"
              options={UNIT_OPTIONS}
              value={draft.unit}
              onValueChange={(v) =>
                update("unit", v as ServiceCatalogItem["unit"])
              }
            />
          </div>
          <Input
            id="svc-tagline"
            label="Tagline"
            placeholder="Vetted cleaners, eco-friendly products."
            value={draft.tagline}
            onChange={(e) => update("tagline", e.target.value)}
          />
          <Textarea
            id="svc-desc"
            label="Description"
            rows={3}
            placeholder="Describe what's included…"
            value={draft.description}
            onChange={(e) => update("description", e.target.value)}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              id="svc-price"
              label="Base price (₦)"
              type="number"
              value={String(draft.basePrice)}
              onChange={(e) => update("basePrice", Number(e.target.value || 0))}
            />
            <Input
              id="svc-duration"
              label="Duration (minutes)"
              type="number"
              value={String(draft.durationMinutes)}
              onChange={(e) =>
                update("durationMinutes", Number(e.target.value || 0))
              }
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong">
              Supported frequencies
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {ALL_FREQUENCIES.map((f) => {
                const active = draft.supportedFrequencies.includes(f);
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => toggleFrequency(f)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-medium transition",
                      active
                        ? "border-emerald bg-emerald text-ivory"
                        : "border-line bg-paper text-muted-strong hover:border-emerald/40 hover:text-foreground"
                    )}
                  >
                    {FREQUENCY_LABEL[f]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong">
              Features
            </p>
            <div className="flex flex-wrap gap-2">
              {draft.features.map((f, i) => (
                <span
                  key={`${f}-${i}`}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1 text-xs text-foreground"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="text-muted hover:text-clay"
                    aria-label="Remove feature"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                id="svc-feature"
                placeholder="Add a feature, then press Enter"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <Button type="button" variant="ivory" onClick={addFeature}>
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          <Checkbox
            label="Mark as featured (shows a 'Popular' badge to tenants)"
            checked={!!draft.popular}
            onCheckedChange={(checked) => update("popular", Boolean(checked))}
          />

          <div className="rounded-2xl border border-line bg-paper p-4 text-xs text-muted-strong">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-saffron-deep" />
              <p className="font-mono uppercase tracking-[0.28em] text-muted">
                Live preview
              </p>
            </div>
            <p className="mt-2 leading-5">
              {draft.name || "Untitled"} · {formatNaira(draft.basePrice || 0)}{" "}
              {draft.unit} ·{" "}
              {draft.supportedFrequencies.length || 0} frequenc
              {draft.supportedFrequencies.length === 1 ? "y" : "ies"}
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="ivory"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isNew ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                  {isNew ? "Add service" : "Save changes"}
                </>
              )}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
