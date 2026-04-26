"use client";

import { useState } from "react";
import { Camera, Mail, Phone, MapPin, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockUsers } from "@/lib/mock-data";

const user = mockUsers.find((u) => u.id === "u2")!;

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    state: user.state,
    city: user.city,
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Profile</h1>
        <p className="text-sm text-muted">Manage your personal information</p>
      </div>

      {/* Avatar Section */}
      <Card>
        <CardContent className="flex items-center gap-6 pt-0">
          <div className="relative">
            <Avatar
              fallback={`${user.firstName[0]}${user.lastName[0]}`}
              size="lg"
            />
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge>Landlord</Badge>
              <StatusBadge status={user.kycStatus} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
              <Input
                label="Last Name"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="State"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            />
            <Input
              label="City"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Member Since</span>
              <span className="text-foreground">{user.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Account Status</span>
              <Badge variant={user.isActive ? "success" : "danger"}>
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
