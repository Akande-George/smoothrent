"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { AuthContext } from "@/hooks/use-mock-auth";
import { mockUsers } from "@/lib/mock-data";
import type { UserRole } from "@/types/user";

const ROLE_KEY = "sr-role";
const SIGNED_IN_KEY = "sr-signed-in";

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("customer");
  const [signedIn, setSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem(ROLE_KEY) as UserRole | null;
      const storedSignedIn = localStorage.getItem(SIGNED_IN_KEY) === "1";
      if (storedRole) setRoleState(storedRole);
      setSignedIn(storedSignedIn);
    }
    setHydrated(true);
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem(ROLE_KEY, newRole);
    }
  }, []);

  const signIn = useCallback(
    (newRole: UserRole) => {
      setRole(newRole);
      setSignedIn(true);
      if (typeof window !== "undefined") {
        localStorage.setItem(SIGNED_IN_KEY, "1");
      }
    },
    [setRole]
  );

  const logout = useCallback(() => {
    setSignedIn(false);
    setRoleState("customer");
    if (typeof window !== "undefined") {
      localStorage.removeItem(SIGNED_IN_KEY);
      localStorage.removeItem(ROLE_KEY);
    }
  }, []);

  const user = mockUsers.find((u) => u.role === role) || mockUsers[0];

  const value = useMemo(
    () => ({
      role: hydrated ? role : "customer",
      setRole,
      user: hydrated ? user : mockUsers[0],
      signedIn: hydrated ? signedIn : false,
      signIn,
      logout,
    }),
    [hydrated, role, user, signedIn, setRole, signIn, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
