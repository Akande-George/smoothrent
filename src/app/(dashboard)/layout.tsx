"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { RoleSwitcher } from "@/components/shared/role-switcher";
import { useSidebar } from "@/hooks/use-sidebar";
import { useMockAuthState, AuthContext } from "@/hooks/use-mock-auth";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed, isMobileOpen, toggle, toggleMobile, closeMobile } = useSidebar();
  const auth = useMockAuthState();

  return (
    <AuthContext.Provider value={auth}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            role={auth.role}
            isCollapsed={isCollapsed}
            onToggle={toggle}
          />
        </div>

        {/* Mobile Nav */}
        <MobileNav
          role={auth.role}
          isOpen={isMobileOpen}
          onClose={closeMobile}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar user={auth.user} onMenuClick={toggleMobile} />
          <main
            className={cn(
              "flex-1 overflow-y-auto p-6",
              "bg-[radial-gradient(circle_at_top,_#f9f4ef_0%,_#efe8df_42%,_#e7ded2_100%)]"
            )}
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>

        {/* Dev Role Switcher */}
        <RoleSwitcher />
      </div>
    </AuthContext.Provider>
  );
}
