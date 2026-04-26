"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [newUserAlerts, setNewUserAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [disputeAlerts, setDisputeAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Platform Settings
        </h1>
        <p className="mt-1 text-muted">
          Configure platform-wide settings and pricing.
        </p>
      </div>

      {/* Commission Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="agentCommission"
                label="Agent Commission Rate (%)"
                type="number"
                defaultValue="10"
                placeholder="e.g. 10"
              />
              <Input
                id="platformFee"
                label="Platform Fee (%)"
                type="number"
                defaultValue="2.5"
                placeholder="e.g. 2.5"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="cautionFeeMultiplier"
                label="Caution Fee Multiplier"
                type="number"
                defaultValue="1"
                placeholder="e.g. 1 (= 1x annual rent)"
              />
              <Input
                id="lateFeePercent"
                label="Late Payment Fee (%)"
                type="number"
                defaultValue="5"
                placeholder="e.g. 5"
              />
            </div>
            <Button type="button">Save Commission Settings</Button>
          </form>
        </CardContent>
      </Card>

      {/* Subscription Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Agent Plans
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="basicPlanPrice"
                label="Basic Plan (Monthly, ₦)"
                type="number"
                defaultValue="5000"
              />
              <Input
                id="premiumPlanPrice"
                label="Premium Plan (Monthly, ₦)"
                type="number"
                defaultValue="15000"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Landlord Plans
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="landlordBasic"
                label="Basic Plan (Monthly, ₦)"
                type="number"
                defaultValue="3000"
              />
              <Input
                id="landlordPremium"
                label="Premium Plan (Monthly, ₦)"
                type="number"
                defaultValue="10000"
              />
            </div>
            <Button type="button">Save Pricing</Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Switch
              label="Email Notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
            <Switch
              label="SMS Notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
            <Switch
              label="New User Registration Alerts"
              checked={newUserAlerts}
              onCheckedChange={setNewUserAlerts}
            />
            <Switch
              label="Payment Alerts"
              checked={paymentAlerts}
              onCheckedChange={setPaymentAlerts}
            />
            <Switch
              label="Dispute Alerts"
              checked={disputeAlerts}
              onCheckedChange={setDisputeAlerts}
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Switch
              label="Maintenance Mode"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
            {maintenanceMode && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
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
