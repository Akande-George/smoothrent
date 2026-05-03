"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function ArtisanSettingsPage() {
  const [prefs, setPrefs] = useState({
    smsAlerts: true,
    emailAlerts: true,
    weekendJobs: false,
    radiusKm: "15",
    autoAccept: false,
  });
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
          Artisan · Settings
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground">
          Preferences.
        </h1>
        <p className="mt-1 text-sm text-muted-strong">
          Choose how you receive jobs and notifications.
        </p>
      </section>

      <form onSubmit={submit} className="space-y-4">
        <section className="rounded-2xl border border-line bg-paper p-6">
          <p className="tag-eyebrow">Notifications</p>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm text-foreground">SMS alerts</span>
              <Switch
                checked={prefs.smsAlerts}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, smsAlerts: v }))
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm text-foreground">Email alerts</span>
              <Switch
                checked={prefs.emailAlerts}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, emailAlerts: v }))
                }
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-paper p-6">
          <p className="tag-eyebrow">Jobs</p>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm text-foreground">Accept weekend jobs</span>
              <Switch
                checked={prefs.weekendJobs}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, weekendJobs: v }))
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm text-foreground">
                Auto-accept new requests
              </span>
              <Switch
                checked={prefs.autoAccept}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, autoAccept: v }))
                }
              />
            </label>
            <Input
              label="Service radius (km)"
              type="number"
              value={prefs.radiusKm}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, radiusKm: e.target.value }))
              }
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
            <Save className="h-4 w-4" /> Save preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
