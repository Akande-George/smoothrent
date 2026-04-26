"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    paymentReminders: true,
    maintenanceAlerts: true,
    applicationAlerts: true,
    currency: "NGN",
    language: "en",
    twoFactor: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Settings</h1>
        <p className="text-sm text-muted">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Switch
              label="Email Notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => toggle("emailNotifications")}
            />
            <Switch
              label="SMS Notifications"
              checked={settings.smsNotifications}
              onCheckedChange={() => toggle("smsNotifications")}
            />
            <Switch
              label="Push Notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => toggle("pushNotifications")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alert Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Switch
              label="Payment Reminders"
              checked={settings.paymentReminders}
              onCheckedChange={() => toggle("paymentReminders")}
            />
            <Switch
              label="Maintenance Alerts"
              checked={settings.maintenanceAlerts}
              onCheckedChange={() => toggle("maintenanceAlerts")}
            />
            <Switch
              label="New Application Alerts"
              checked={settings.applicationAlerts}
              onCheckedChange={() => toggle("applicationAlerts")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              label="Currency"
              options={[
                { label: "Nigerian Naira (NGN)", value: "NGN" },
                { label: "US Dollar (USD)", value: "USD" },
              ]}
              value={settings.currency}
              onValueChange={(v) =>
                setSettings((prev) => ({ ...prev, currency: v }))
              }
            />
            <Select
              label="Language"
              options={[
                { label: "English", value: "en" },
                { label: "Hausa", value: "ha" },
                { label: "Yoruba", value: "yo" },
                { label: "Igbo", value: "ig" },
              ]}
              value={settings.language}
              onValueChange={(v) =>
                setSettings((prev) => ({ ...prev, language: v }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Switch
              label="Two-Factor Authentication"
              checked={settings.twoFactor}
              onCheckedChange={() => toggle("twoFactor")}
            />
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
