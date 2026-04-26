"use client";

import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/shared/notification-bell";
import { SearchCommand } from "@/components/shared/search-command";
import type { User } from "@/types/user";

export function Topbar({
  user,
  onMenuClick,
}: {
  user: User;
  onMenuClick?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const greeting = getGreeting();

  return (
    <>
      <div className="flex items-center justify-between border-b border-black/10 bg-white/70 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="rounded-xl p-2 hover:bg-black/5 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-xl text-foreground">
              {greeting} {user.firstName} 👋
            </h1>
            <p className="text-sm text-muted">
              Welcome back to your dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 transition hover:bg-black/5"
            title="Search (⌘K)"
          >
            <Search className="h-4 w-4 text-muted" />
          </button>
          <NotificationBell />
          <Avatar
            fallback={`${user.firstName[0]}${user.lastName[0]}`}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </div>
      </div>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning,";
  if (hour < 17) return "Good Afternoon,";
  return "Good Evening,";
}
