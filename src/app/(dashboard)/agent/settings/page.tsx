"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AgentSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [listingUpdates, setListingUpdates] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Settings</h1>
        <p className="mt-1 text-muted">
          Manage your account preferences and notifications.
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="firstName"
                label="First Name"
                defaultValue="Emeka"
              />
              <Input
                id="lastName"
                label="Last Name"
                defaultValue="Nwosu"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="email"
                label="Email"
                type="email"
                defaultValue="emeka@gmail.com"
              />
              <Input
                id="phone"
                label="Phone"
                defaultValue="07034567890"
              />
            </div>
            <Button type="button">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
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
              label="Deal Alerts"
              checked={dealAlerts}
              onCheckedChange={setDealAlerts}
            />
            <Switch
              label="Listing Update Notifications"
              checked={listingUpdates}
              onCheckedChange={setListingUpdates}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Input
              id="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
            />
            <Input
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />
            <Input
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
            />
            <Button type="button">Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
