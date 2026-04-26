"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { mockLeases } from "@/lib/mock-data";

const myLeases = mockLeases.filter((l) => l.tenantId === "u1");

const propertyOptions = myLeases.map((l) => ({
  label: l.propertyTitle,
  value: l.propertyId,
}));

const categoryOptions = [
  { label: "Plumbing", value: "plumbing" },
  { label: "Electrical", value: "electrical" },
  { label: "Generator", value: "generator" },
  { label: "Painting", value: "painting" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Pest Control", value: "pest_control" },
  { label: "Other", value: "other" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function NewMaintenanceRequestPage() {
  const [property, setProperty] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  return (
    <div className="space-y-8">
      <Link
        href="/customer/maintenance"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Maintenance
      </Link>

      <div>
        <h1 className="font-display text-3xl text-foreground">
          New Maintenance Request
        </h1>
        <p className="mt-1 text-muted">
          Describe the issue and we&apos;ll notify your landlord.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Select
                label="Property"
                placeholder="Select property"
                options={propertyOptions}
                value={property}
                onValueChange={setProperty}
              />
              <Select
                label="Category"
                placeholder="Select category"
                options={categoryOptions}
                value={category}
                onValueChange={setCategory}
              />
            </div>

            <Input
              label="Title"
              placeholder="Brief description of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              label="Description"
              placeholder="Provide more details about the issue, including when it started and any relevant context."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
              label="Priority"
              placeholder="Select priority"
              options={priorityOptions}
              value={priority}
              onValueChange={setPriority}
            />

            <FileUpload
              label="Photos (optional)"
              multiple
              maxFiles={5}
              accept="image/*"
            />

            <div className="flex gap-3 pt-2">
              <Button type="button">Submit Request</Button>
              <Link href="/customer/maintenance">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
