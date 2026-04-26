import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/format";
import { mockUsers, mockActivity } from "@/lib/mock-data";

export default async function AdminUserDetailPage({
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
        <Link href="/admin/users" className="mt-4">
          <Button variant="secondary">Back to Users</Button>
        </Link>
      </div>
    );
  }

  const userActivity = mockActivity.slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-3xl text-foreground">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-1 text-muted">User management and details</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            Suspend
          </Button>
          <Button variant="destructive" size="sm">
            Ban User
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
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
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted" />
                <span className="text-foreground">
                  Joined {formatDate(user.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted" />
                <StatusBadge status={user.kycStatus} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity & Status */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/5 p-4 text-center">
                  <Badge variant={user.isActive ? "success" : "danger"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <p className="mt-2 text-xs text-muted">Account Status</p>
                </div>
                <div className="rounded-2xl border border-black/5 p-4 text-center">
                  <StatusBadge status={user.kycStatus} />
                  <p className="mt-2 text-xs text-muted">KYC Status</p>
                </div>
                <div className="rounded-2xl border border-black/5 p-4 text-center">
                  <Badge variant="accent">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <p className="mt-2 text-xs text-muted">User Role</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-2xl border border-black/5 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted">{item.description}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
