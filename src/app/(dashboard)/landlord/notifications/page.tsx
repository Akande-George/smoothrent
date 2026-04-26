"use client";

import { useState } from "react";
import { Bell, Check, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-amber-100 text-amber-700",
  success: "bg-green-100 text-green-700",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Notifications</h1>
          <p className="text-sm text-muted">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            <Check className="h-4 w-4" />
            Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bell className="mb-4 h-12 w-12 text-muted" />
          <h3 className="font-display text-xl text-foreground">No notifications</h3>
          <p className="mt-2 text-sm text-muted">
            You&apos;re all caught up! New notifications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-colors ${
                !notification.read ? "border-accent/30 bg-accent/5" : ""
              }`}
              onClick={() => markRead(notification.id)}
            >
              <CardContent className="flex items-start gap-4 pt-0">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    typeColors[notification.type] || "bg-black/5 text-muted"
                  }`}
                >
                  {typeIcons[notification.type]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{notification.title}</p>
                    {!notification.read && (
                      <Badge variant="accent" className="h-5 px-1.5 text-[10px]">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
