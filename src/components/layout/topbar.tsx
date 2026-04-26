"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, Menu, Search, Settings, UserCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBell } from "@/components/shared/notification-bell";
import { SearchCommand } from "@/components/shared/search-command";
import type { User } from "@/types/user";

export function Topbar({
  user,
  onMenuClick,
  onLogout,
}: {
  user: User;
  onMenuClick?: () => void;
  onLogout?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const greeting = getGreeting();
  const profileHref = `/${user.role}/profile`;
  const settingsHref = `/${user.role}/settings`;

  return (
    <>
      <div className="flex items-center justify-between border-b border-line bg-paper/80 px-4 py-3.5 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card transition hover:border-emerald lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-saffron-deep">
              {greeting}
            </p>
            <h1 className="font-display text-2xl text-foreground">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden h-10 items-center gap-2 rounded-full border border-line bg-card px-3 transition hover:border-emerald sm:flex"
            title="Search (⌘K)"
          >
            <Search className="h-4 w-4 text-muted" />
            <span className="text-xs text-muted-strong">Search…</span>
            <span className="font-mono text-[10px] text-muted">⌘K</span>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card transition hover:border-emerald sm:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-muted" />
          </button>
          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full border border-line bg-card p-1 pr-3 transition hover:border-emerald"
                aria-label="Account menu"
              >
                <Avatar
                  fallback={`${user.firstName[0]}${user.lastName[0]}`}
                  alt={`${user.firstName} ${user.lastName}`}
                  size="sm"
                />
                <span className="hidden text-xs font-medium text-foreground md:inline">
                  {user.firstName}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
              <div className="flex items-center gap-3 px-3 pb-2">
                <Avatar
                  fallback={`${user.firstName[0]}${user.lastName[0]}`}
                  size="md"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {user.role} · {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={profileHref}>
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={settingsHref}>
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  onLogout?.();
                }}
                className="text-clay hover:bg-clay/10 hover:text-clay-deep focus:bg-clay/10 focus:text-clay-deep"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
