"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { UserRole } from "@/types/user";
import { mockUsers } from "@/lib/mock-data";

interface MockAuthContext {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: (typeof mockUsers)[number];
}

const AuthContext = createContext<MockAuthContext | null>(null);

export function useMockAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useMockAuth must be used within MockAuthProvider");
  return ctx;
}

export function useMockAuthState() {
  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sr-role") as UserRole) || "customer";
    }
    return "customer";
  });

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("sr-role", newRole);
    }
  }, []);

  const user = mockUsers.find((u) => u.role === role) || mockUsers[0];

  return { role, setRole, user };
}

export { AuthContext };
