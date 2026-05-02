"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { RoleSwitcher } from "@/components/shared/role-switcher";
import { useSidebar } from "@/hooks/use-sidebar";
import { useMockAuth } from "@/hooks/use-mock-auth";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isCollapsed, isMobileOpen, toggle, toggleMobile, closeMobile } =
    useSidebar();
  const { role, user, signedIn, logout } = useMockAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("sr-signed-in");
    if (!stored) {
      router.replace("/login");
    }
  }, [router]);

  if (!signedIn && typeof window !== "undefined" && !localStorage.getItem("sr-signed-in")) {
    return null;
  }

  return (
    <div className="dashboard-shell flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:block">
        <Sidebar
          role={role}
          isCollapsed={isCollapsed}
          onToggle={toggle}
          onLogout={handleLogout}
        />
      </div>

      <MobileNav
        role={role}
        isOpen={isMobileOpen}
        onClose={closeMobile}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          user={user}
          onMenuClick={toggleMobile}
          onLogout={handleLogout}
        />
        <main
          className={cn(
            "flex-1 overflow-y-auto bg-background p-6"
          )}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      <RoleSwitcher />
    </div>
  );
}
