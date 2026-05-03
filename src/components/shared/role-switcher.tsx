"use client";

import { useMockAuth } from "@/hooks/use-mock-auth";
import type { UserRole } from "@/types/user";

const roles: { value: UserRole; label: string }[] = [
  { value: "customer", label: "Customer" },
  { value: "landlord", label: "Landlord" },
  { value: "agent", label: "Agent" },
  { value: "artisan", label: "Artisan" },
  { value: "admin", label: "Admin" },
];

export function RoleSwitcher() {
  const { role, setRole } = useMockAuth();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-lg backdrop-blur">
      {roles.map((r) => (
        <button
          key={r.value}
          onClick={() => setRole(r.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            role === r.value
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
