"use client";

import { createContext, useContext } from "react";
import type { UserRole } from "@/types/user";
import { mockUsers } from "@/lib/mock-data";

export interface MockAuthContext {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: (typeof mockUsers)[number];
  signedIn: boolean;
  signIn: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<MockAuthContext | null>(null);

export function useMockAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useMockAuth must be used within MockAuthProvider");
  return ctx;
}

export { AuthContext };
