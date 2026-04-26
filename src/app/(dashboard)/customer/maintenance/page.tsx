import Link from "next/link";
import { Wrench, Plus, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";
import { mockMaintenanceRequests } from "@/lib/mock-data";

const myRequests = mockMaintenanceRequests.filter(
  (r) => r.tenantId === "u1"
);

const priorityVariant: Record<string, "danger" | "warning" | "default"> = {
  high: "danger",
  medium: "warning",
  low: "default",
};

export default function MaintenancePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Maintenance Requests
          </h1>
          <p className="mt-1 text-muted">
            Report and track maintenance issues for your property.
          </p>
        </div>
        <Link href="/customer/maintenance/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Request
          </Button>
        </Link>
      </div>

      {myRequests.length > 0 ? (
        <div className="space-y-4">
          {myRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-black/5 p-3">
                    <Wrench className="h-5 w-5 text-muted" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {request.title}
                    </h3>
                    <p className="text-sm text-muted">
                      {request.propertyTitle}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <StatusBadge status={request.status} />
                      <Badge variant={priorityVariant[request.priority]}>
                        {request.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted sm:flex-col sm:items-end">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatDate(request.createdAt)}</span>
                  {request.resolvedAt && (
                    <span className="text-green-600">
                      Resolved {formatDate(request.resolvedAt)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Wrench className="h-12 w-12" />}
          title="No maintenance requests"
          description="Submit a request when you need something fixed in your property."
          action={
            <Link href="/customer/maintenance/new">
              <Button>Submit Request</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
