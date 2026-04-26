import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { mockMaintenanceRequests } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

const priorityVariant: Record<string, "danger" | "warning" | "default"> = {
  high: "danger",
  medium: "warning",
  low: "default",
};

export default async function MaintenanceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = mockMaintenanceRequests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-foreground">Request not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/landlord/maintenance">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-3xl text-foreground">{request.title}</h1>
          <p className="text-sm text-muted">{request.propertyTitle}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Description */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">
              {request.description}
            </p>

            {/* Images placeholder */}
            {request.images && request.images.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {request.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-gradient-to-br from-[#e7ded2] to-[#d4c8b8]"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border-2 border-dashed border-black/10 p-8 text-center">
                <p className="text-sm text-muted">No images attached</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-xs text-muted">Category</p>
                    <p className="capitalize text-foreground">{request.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4" />
                  <div>
                    <p className="text-xs text-muted">Priority</p>
                    <Badge variant={priorityVariant[request.priority] || "default"}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-xs text-muted">Reported By</p>
                    <p className="text-foreground">{request.tenantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-xs text-muted">Created</p>
                    <p className="text-foreground">{formatDate(request.createdAt)}</p>
                  </div>
                </div>
                {request.resolvedAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted" />
                    <div>
                      <p className="text-xs text-muted">Resolved</p>
                      <p className="text-foreground">{formatDate(request.resolvedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">
                No notes added yet. Use notes to track progress and communicate with the maintenance team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
