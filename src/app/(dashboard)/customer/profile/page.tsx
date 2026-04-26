"use client";

import { useState } from "react";
import { User, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockUsers } from "@/lib/mock-data";

const currentUser = mockUsers.find((u) => u.id === "u1")!;

export default function ProfilePage() {
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [nin, setNin] = useState("");
  const [bvn, setBvn] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">My Profile</h1>
        <p className="mt-1 text-muted">
          Manage your personal information and identity verification.
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08012345678"
              />
            </div>
            <Button type="button">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      {/* KYC Verification */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Identity Verification (KYC)
            </CardTitle>
            <StatusBadge status={currentUser.kycStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted">
            Complete your identity verification to apply for properties and sign
            leases. This is required by Nigerian law for rental agreements.
          </p>
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="National Identification Number (NIN)"
                placeholder="12345678901"
                maxLength={11}
                value={nin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setNin(val);
                }}
              />
              <Input
                label="Bank Verification Number (BVN)"
                placeholder="12345678901"
                maxLength={11}
                value={bvn}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setBvn(val);
                }}
              />
            </div>

            <FileUpload
              label="Government-issued ID (NIN Slip, Voter's Card, or Int'l Passport)"
              accept="image/*,.pdf"
              maxFiles={2}
            />

            <Button type="button">Submit for Verification</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
