import Link from "next/link";
import { Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";
import { mockNotifications } from "@/lib/mock-data";

const agentNotifications = mockNotifications.filter(
  (n) => n.link?.startsWith("/agent") || n.id === "n5"
);

const iconMap: Record<string, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
};

const badgeVariantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
  success: "success",
  warning: "warning",
  info: "info",
  error: "danger",
};

export default function AgentNotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Notifications</h1>
        <p className="mt-1 text-muted">
          Stay updated on your deals, listings, and commissions.
        </p>
      </div>

      {agentNotifications.length > 0 ? (
        <div className="space-y-3">
          {agentNotifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.link ?? "#"}
            >
              <Card
                className={`flex items-start gap-4 transition-colors hover:bg-black/[0.02] ${
                  !notification.read ? "border-l-4 border-l-foreground" : ""
                }`}
              >
                <div className="shrink-0 pt-0.5">
                  {iconMap[notification.type]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <Badge variant={badgeVariantMap[notification.type]}>
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="h-10 w-10" />}
          title="No notifications"
          description="You're all caught up! New notifications will appear here."
        />
      )}
    </div>
  );
}
