"use client";

import { useState } from "react";
import { Bell, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { mockNotifications } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  info: "text-blue-600",
  success: "text-green-600",
  warning: "text-amber-600",
  error: "text-red-600",
};

export function NotificationBell() {
  const [notifications] = useState(mockNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 transition hover:bg-black/5">
          <Bell className="h-4 w-4 text-muted" />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-foreground">
              {unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="border-b border-black/10 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 border-b border-black/5 px-4 py-3 last:border-0",
                  !notification.read && "bg-accent/5"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", colorMap[notification.type])} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-xs text-muted line-clamp-2">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted">{formatDate(notification.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
