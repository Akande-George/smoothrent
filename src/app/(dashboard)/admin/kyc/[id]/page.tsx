import Link from "next/link";
import { ArrowLeft, FileText, CreditCard, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/format";
import { mockUsers } from "@/lib/mock-data";

export default async function AdminKYCDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="font-display text-xl text-foreground">
          User not found
        </h3>
        <Link href="/admin/kyc" className="mt-4">
          <Button variant="secondary">Back to KYC Queue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/kyc">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-3xl text-foreground">
            KYC Review: {user.firstName} {user.lastName}
          </h1>
          <p className="mt-1 text-muted">
            Review submitted verification documents.
          </p>
        </div>
        <StatusBadge status={user.kycStatus} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Applicant Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar
                fallback={`${user.firstName[0]}${user.lastName[0]}`}
                size="lg"
              />
              <div className="text-center">
                <h2 className="font-display text-xl text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <Badge variant="accent" className="mt-2">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted" />
                <span className="text-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted" />
                <span className="text-foreground">{user.phone}</span>
              </div>
              {user.city && user.state && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted" />
                  <span className="text-foreground">
                    {user.city}, {user.state}
                  </span>
                </div>
              )}
              <p className="text-xs text-muted">
                Registered {formatDate(user.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submitted Documents */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* NIN */}
                <div className="rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground/5">
                      <CreditCard className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        National Identity Number (NIN)
                      </p>
                      <p className="text-sm text-muted">
                        {user.kycStatus === "pending"
                          ? "Document submitted for review"
                          : "Not yet submitted"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        user.kycStatus === "pending" ? "warning" : "default"
                      }
                    >
                      {user.kycStatus === "pending" ? "Pending" : "Missing"}
                    </Badge>
                  </div>
                  {user.kycStatus === "pending" && (
                    <div className="mt-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-[#e7ded2] to-[#d4c8b8]">
                      <FileText className="h-8 w-8 text-muted/40" />
                    </div>
                  )}
                </div>

                {/* BVN */}
                <div className="rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground/5">
                      <CreditCard className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        Bank Verification Number (BVN)
                      </p>
                      <p className="text-sm text-muted">
                        {user.kycStatus === "pending"
                          ? "Document submitted for review"
                          : "Not yet submitted"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        user.kycStatus === "pending" ? "warning" : "default"
                      }
                    >
                      {user.kycStatus === "pending" ? "Pending" : "Missing"}
                    </Badge>
                  </div>
                  {user.kycStatus === "pending" && (
                    <div className="mt-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-[#e7ded2] to-[#d4c8b8]">
                      <FileText className="h-8 w-8 text-muted/40" />
                    </div>
                  )}
                </div>

                {/* Proof of Address */}
                <div className="rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground/5">
                      <FileText className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        Proof of Address
                      </p>
                      <p className="text-sm text-muted">
                        Utility bill or bank statement
                      </p>
                    </div>
                    <Badge variant="default">Missing</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Review Decision</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Button className="gap-2">Approve KYC</Button>
                <Button variant="destructive" className="gap-2">
                  Reject KYC
                </Button>
                <Button variant="secondary">Request More Documents</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
