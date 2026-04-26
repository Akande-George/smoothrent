"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, Building2, Users, FileText } from "lucide-react";
import { mockProperties, mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function SearchCommand({
  open: controlledOpen,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const open = controlledOpen ?? internalOpen;
  const setOpen = (val: boolean) => {
    setInternalOpen(val);
    onOpenChange?.(val);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(!open);
    }
    if (e.key === "Escape") setOpen(false);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  const q = query.toLowerCase();
  const properties = mockProperties.filter(
    (p) => p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)
  ).slice(0, 4);
  const users = mockUsers.filter(
    (u) => `${u.firstName} ${u.lastName}`.toLowerCase().includes(q)
  ).slice(0, 3);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fixed inset-x-0 top-[20%] z-50 mx-auto w-full max-w-lg px-4">
        <div className="rounded-3xl border border-black/10 bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3">
            <Search className="h-5 w-5 text-muted" />
            <input
              autoFocus
              type="text"
              placeholder="Search properties, users, pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
            />
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-black/5">
              <X className="h-4 w-4 text-muted" />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {query && properties.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  Properties
                </p>
                {properties.map((p) => (
                  <button
                    key={p.id}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-black/5"
                  >
                    <Building2 className="h-4 w-4 text-muted" />
                    <div className="text-left">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-xs text-muted">{p.city}, {p.state}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {query && users.length > 0 && (
              <div className="mt-2">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  Users
                </p>
                {users.map((u) => (
                  <button
                    key={u.id}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-black/5"
                  >
                    <Users className="h-4 w-4 text-muted" />
                    <div className="text-left">
                      <p className="font-medium">{u.firstName} {u.lastName}</p>
                      <p className="text-xs text-muted capitalize">{u.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {!query && (
              <div className="px-3 py-8 text-center text-sm text-muted">
                Start typing to search...
              </div>
            )}
            {query && properties.length === 0 && users.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-muted">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>

          <div className="border-t border-black/10 px-4 py-2 text-xs text-muted">
            Press <kbd className="rounded border border-black/10 px-1.5 py-0.5 font-mono">ESC</kbd> to close
          </div>
        </div>
      </div>
    </>
  );
}
