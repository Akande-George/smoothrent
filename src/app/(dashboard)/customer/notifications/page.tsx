import Link from "next/link";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { mockNotifications } from "@/lib/mock-data";

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="h-5 w-5 text-blue-600" />,
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
  error: <AlertCircle className="h-5 w-5 text-red-600" />,
};

const typeBg: Record<string, string> = {
  info: "bg-blue-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
  error: "bg-red-50",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Notifications
        </h1>
        <p className="mt-1 text-muted">
          Stay updated on your rentals and applications.
        </p>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notification) => {
          const content = (
            <Card
              key={notification.id}
              className={!notification.read ? "border-accent/30" : ""}
            >
              <CardContent className="flex items-start gap-4">
                <div
                  className={`rounded-2xl p-2.5 ${typeBg[notification.type] ?? "bg-black/5"}`}
                >
                  {typeIcons[notification.type] ?? (
                    <Bell className="h-5 w-5 text-muted" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <Badge variant="accent" className="text-[10px]">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );

          if (notification.link) {
            return (
              <Link
                key={notification.id}
                href={notification.link}
                className="block transition-opacity hover:opacity-80"
              >
                {content}
              </Link>
            );
          }

          return <div key={notification.id}>{content}</div>;
        })}
      </div>
    </div>
  );
}
