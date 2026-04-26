"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Save, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/format";
import {
  DEFAULT_SERVICE_FEE,
  computeServiceFee,
  readServiceFeeConfig,
  writeServiceFeeConfig,
  type ServiceFeeConfig,
  type ServiceFeeMode,
} from "@/lib/service-fee-config";

export default function AdminSettingsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [config, setConfig] = useState<ServiceFeeConfig>(DEFAULT_SERVICE_FEE);
  const [saved, setSaved] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [newUserAlerts, setNewUserAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [disputeAlerts, setDisputeAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    setConfig(readServiceFeeConfig());
    setHydrated(true);
  }, []);

  const update = <K extends keyof ServiceFeeConfig>(key: K, value: ServiceFeeConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    writeServiceFeeConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const previewRows = useMemo(() => {
    if (!hydrated) return [];
    return [500_000, 1_500_000, 3_500_000, 8_000_000, 15_000_000].map((rent) => ({
      rent,
      fee: computeServiceFee(rent, config),
    }));
  }, [config, hydrated]);

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          Admin · Platform settings
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
          Platform settings.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-strong">
          Configure the platform-wide service fee, subscription pricing, and
          notification rules. Changes apply to every new listing immediately.
        </p>
      </div>

      <section>
        <Card>
          <CardHeader>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
              01 · Service fee
            </p>
            <CardTitle>SmoothRent service fee</CardTitle>
            <p className="mt-1 text-sm text-muted-strong">
              Charged on each successful tenancy. Applied as the default to every
              new listing — landlords can override per property.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {(["percent", "fixed"] as ServiceFeeMode[]).map((mode) => {
                const active = config.mode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => update("mode", mode)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      active
                        ? "border-emerald bg-emerald text-ivory shadow-[0_18px_40px_-30px_rgba(0,0,0,0.6)]"
                        : "border-line bg-paper hover:-translate-y-0.5 hover:border-emerald/40"
                    )}
                  >
                    <p
                      className={cn(
                        "font-display text-xl",
                        active ? "text-ivory" : "text-foreground"
                      )}
                    >
                      {mode === "percent" ? "Percentage of rent" : "Fixed amount"}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        active ? "text-ivory/80" : "text-muted-strong"
                      )}
                    >
                      {mode === "percent"
                        ? "Scales with the rent. Best for fairness."
                        : "Same fee regardless of rent. Predictable."}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {config.mode === "percent" ? (
                <Input
                  label="Service fee rate (% of annual rent)"
                  type="number"
                  step="0.5"
                  value={String(config.percentOfRent)}
                  onChange={(e) =>
                    update("percentOfRent", Number(e.target.value || 0))
                  }
                  hint="0–25%"
                />
              ) : (
                <Input
                  label="Fixed service fee (₦)"
                  type="number"
                  value={String(config.fixedAmount)}
                  onChange={(e) =>
                    update("fixedAmount", Number(e.target.value || 0))
                  }
                />
              )}
              <Input
                label={
                  config.mode === "percent"
                    ? "Minimum service fee (₦)"
                    : "Floor (ignored)"
                }
                type="number"
                disabled={config.mode === "fixed"}
                value={String(config.minAmount)}
                onChange={(e) =>
                  update("minAmount", Number(e.target.value || 0))
                }
              />
              <Input
                label={
                  config.mode === "percent"
                    ? "Maximum service fee (₦)"
                    : "Cap (ignored)"
                }
                type="number"
                disabled={config.mode === "fixed"}
                value={String(config.maxAmount)}
                onChange={(e) =>
                  update("maxAmount", Number(e.target.value || 0))
                }
              />
            </div>

            <Textarea
              label="Description shown to tenants"
              rows={3}
              value={config.description}
              onChange={(e) => update("description", e.target.value)}
            />

            <div className="rounded-2xl border border-line bg-paper p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-saffron-deep" />
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-strong">
                  Live preview
                </p>
              </div>
              <p className="mt-1 text-xs text-muted">
                What landlords will see suggested as the default service fee for
                each rent tier.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {previewRows.map((row) => (
                  <div
                    key={row.rent}
                    className="rounded-xl border border-line bg-card p-3 text-center"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      Rent
                    </p>
                    <p className="font-display text-base text-foreground">
                      {formatNaira(row.rent)}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      Service fee
                    </p>
                    <p className="font-display text-lg text-emerald">
                      {formatNaira(row.fee)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" onClick={handleSave}>
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save service fee settings
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ivory"
                onClick={() => {
                  setConfig(DEFAULT_SERVICE_FEE);
                  setSaved(false);
                }}
              >
                Reset to defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            02 · Subscription pricing
          </p>
          <CardTitle>Subscription pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
              Agent plans
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="basicPlanPrice"
                label="Basic plan (monthly, ₦)"
                type="number"
                defaultValue="5000"
              />
              <Input
                id="premiumPlanPrice"
                label="Premium plan (monthly, ₦)"
                type="number"
                defaultValue="25000"
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
              Landlord plans
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="landlordBasic"
                label="Basic plan (monthly, ₦)"
                type="number"
                defaultValue="3000"
              />
              <Input
                id="landlordPremium"
                label="Premium plan (monthly, ₦)"
                type="number"
                defaultValue="15000"
              />
            </div>
            <Button type="button">Save pricing</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            03 · Notifications
          </p>
          <CardTitle>Notification rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <Switch
              label="Email notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
            <Switch
              label="SMS notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
            <Switch
              label="New user registration alerts"
              checked={newUserAlerts}
              onCheckedChange={setNewUserAlerts}
            />
            <Switch
              label="Payment alerts"
              checked={paymentAlerts}
              onCheckedChange={setPaymentAlerts}
            />
            <Switch
              label="Dispute alerts"
              checked={disputeAlerts}
              onCheckedChange={setDisputeAlerts}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            04 · System
          </p>
          <CardTitle>System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <Switch
              label="Maintenance mode"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
            {maintenanceMode && (
              <p className="rounded-2xl border border-saffron bg-saffron/15 p-4 text-sm text-emerald-deep">
                Maintenance mode is enabled. Users will see a maintenance page
                instead of the platform.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
