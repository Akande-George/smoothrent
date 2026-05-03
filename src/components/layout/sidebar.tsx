"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Heart,
  FileText,
  CreditCard,
  ScrollText,
  Wrench,
  UserCircle,
  Settings,
  Building2,
  Users,
  ClipboardList,
  BarChart3,
  Handshake,
  DollarSign,
  Shield,
  AlertTriangle,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  Sparkles,
  Coins,
  Hammer,
  Briefcase,
  Wallet,
} from "lucide-react";
import type { UserRole } from "@/types/user";
import { SidebarItem } from "./sidebar-item";
import { cn } from "@/lib/utils";

const navConfig: Record<UserRole, { href: string; icon: React.ComponentType<{ className?: string }>; label: string }[]> = {
  customer: [
    { href: "/customer", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/customer/search", icon: Search, label: "Search" },
    { href: "/customer/saved", icon: Heart, label: "Saved" },
    { href: "/customer/applications", icon: FileText, label: "Applications" },
    { href: "/customer/payments", icon: CreditCard, label: "Payments" },
    { href: "/customer/leases", icon: ScrollText, label: "Leases" },
    { href: "/customer/services", icon: Sparkles, label: "Services" },
    { href: "/customer/artisans", icon: Hammer, label: "Find artisans" },
    { href: "/customer/loans", icon: Coins, label: "Rental loans" },
    { href: "/customer/maintenance", icon: Wrench, label: "Maintenance" },
    { href: "/customer/referrals", icon: Handshake, label: "Referrals" },
    { href: "/customer/notifications", icon: Bell, label: "Notifications" },
    { href: "/customer/profile", icon: UserCircle, label: "Profile" },
    { href: "/customer/settings", icon: Settings, label: "Settings" },
  ],
  landlord: [
    { href: "/landlord", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/landlord/properties", icon: Building2, label: "Properties" },
    { href: "/landlord/tenants", icon: Users, label: "Tenants" },
    { href: "/landlord/applications", icon: ClipboardList, label: "Applications" },
    { href: "/landlord/leases", icon: ScrollText, label: "Leases" },
    { href: "/landlord/payments", icon: CreditCard, label: "Payments" },
    { href: "/landlord/maintenance", icon: Wrench, label: "Maintenance" },
    { href: "/landlord/referrals", icon: Handshake, label: "Referrals" },
    { href: "/landlord/reports", icon: BarChart3, label: "Reports" },
    { href: "/landlord/notifications", icon: Bell, label: "Notifications" },
    { href: "/landlord/profile", icon: UserCircle, label: "Profile" },
    { href: "/landlord/settings", icon: Settings, label: "Settings" },
  ],
  agent: [
    { href: "/agent", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/agent/listings", icon: Building2, label: "Listings" },
    { href: "/agent/clients", icon: Users, label: "Clients" },
    { href: "/agent/deals", icon: Handshake, label: "Deals" },
    { href: "/agent/referrals", icon: DollarSign, label: "Referrals" },
    { href: "/agent/billing", icon: Wallet, label: "Billing" },
    { href: "/agent/reports", icon: BarChart3, label: "Reports" },
    { href: "/agent/notifications", icon: Bell, label: "Notifications" },
    { href: "/agent/profile", icon: UserCircle, label: "Profile" },
    { href: "/agent/settings", icon: Settings, label: "Settings" },
  ],
  artisan: [
    { href: "/artisan", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/artisan/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/artisan/earnings", icon: Wallet, label: "Earnings" },
    { href: "/artisan/services", icon: Hammer, label: "My services" },
    { href: "/artisan/billing", icon: Coins, label: "Billing" },
    { href: "/artisan/notifications", icon: Bell, label: "Notifications" },
    { href: "/artisan/profile", icon: UserCircle, label: "Profile" },
    { href: "/artisan/settings", icon: Settings, label: "Settings" },
  ],
  admin: [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/properties", icon: Building2, label: "Properties" },
    { href: "/admin/services", icon: Sparkles, label: "Services" },
    { href: "/admin/kyc", icon: Shield, label: "KYC Reviews" },
    { href: "/admin/payments", icon: CreditCard, label: "Payments" },
    { href: "/admin/reports", icon: BarChart3, label: "Reports" },
    { href: "/admin/disputes", icon: AlertTriangle, label: "Disputes" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ],
};

export function Sidebar({
  role,
  isCollapsed,
  onToggle,
  onCloseMobile,
  onLogout,
}: {
  role: UserRole;
  isCollapsed: boolean;
  onToggle: () => void;
  onCloseMobile?: () => void;
  onLogout?: () => void;
}) {
  const items = navConfig[role];

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/10 bg-black text-white transition-all duration-200",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 p-4", isCollapsed && "justify-center")}>
        <Link
          href={`/${role}`}
          aria-label="SmoothRent dashboard"
          className="flex items-center gap-2.5 text-saffron-deep"
        >
          <span className="brand-logo h-10 w-10 shrink-0" role="img" aria-hidden="true" />
          {!isCollapsed && (
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/50">
              Lagos · Abuja
            </span>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            onClick={onCloseMobile}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white [&_svg]:text-saffron-deep",
            isCollapsed && "justify-center px-2"
          )}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            onCloseMobile?.();
            onLogout?.();
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-clay/20 hover:text-white [&_svg]:text-clay",
            isCollapsed && "justify-center px-2"
          )}
          title="Sign out"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
