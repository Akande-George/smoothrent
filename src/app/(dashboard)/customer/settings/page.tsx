"use client";

import { useState } from "react";
import { Bell, Lock, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [maintenanceUpdates, setMaintenanceUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Settings</h1>
        <p className="mt-1 text-muted">
          Manage your notification preferences and account settings.
        </p>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <Switch
              label="Email notifications"
              checked={emailNotifs}
              onCheckedChange={setEmailNotifs}
            />
            <Switch
              label="SMS notifications"
              checked={smsNotifs}
              onCheckedChange={setSmsNotifs}
            />
            <Switch
              label="Payment reminders"
              checked={paymentReminders}
              onCheckedChange={setPaymentReminders}
            />
            <Switch
              label="Maintenance updates"
              checked={maintenanceUpdates}
              onCheckedChange={setMaintenanceUpdates}
            />
            <Switch
              label="Marketing emails"
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="max-w-md space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="button">Update Password</Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-4 w-4" /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
