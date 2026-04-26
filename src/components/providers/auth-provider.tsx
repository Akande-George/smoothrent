"use client";

import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/hooks/use-mock-auth";
import { mockUsers } from "@/lib/mock-data";
import type { UserRole } from "@/types/user";

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("customer");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sr-role") as UserRole | null;
      if (stored) setRoleState(stored);
    }
    setHydrated(true);
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("sr-role", newRole);
    }
  }, []);

  const user = mockUsers.find((u) => u.role === role) || mockUsers[0];

  if (!hydrated) {
    return (
      <AuthContext.Provider value={{ role: "customer", setRole, user: mockUsers[0] }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ role, setRole, user }}>
      {children}
    </AuthContext.Provider>
  );
}
