"use client";

import { X } from "lucide-react";
import { Sidebar } from "./sidebar";
import type { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";

export function MobileNav({
  role,
  isOpen,
  onClose,
}: {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-200 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute right-2 top-3 z-10">
          <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <Sidebar
          role={role}
          isCollapsed={false}
          onToggle={() => {}}
          onCloseMobile={onClose}
        />
      </div>
    </>
  );
}
