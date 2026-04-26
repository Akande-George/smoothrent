"use client";

import { useEffect, useState, useCallback } from "react";
import type { ServiceCatalogItem } from "@/types/service";
import { DEFAULT_SERVICE_CATALOG } from "./services-data";

const KEY = "sr-service-catalog";

export function readCatalog(): ServiceCatalogItem[] {
  if (typeof window === "undefined") return DEFAULT_SERVICE_CATALOG;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SERVICE_CATALOG;
    const parsed = JSON.parse(raw) as ServiceCatalogItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_SERVICE_CATALOG;
    }
    return parsed;
  } catch {
    return DEFAULT_SERVICE_CATALOG;
  }
}

export function writeCatalog(items: ServiceCatalogItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("sr-service-catalog-changed"));
}

export function resetCatalog() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("sr-service-catalog-changed"));
}

export function useServiceCatalog() {
  const [items, setItems] = useState<ServiceCatalogItem[]>(DEFAULT_SERVICE_CATALOG);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCatalog());
    setHydrated(true);
    const handler = () => setItems(readCatalog());
    window.addEventListener("sr-service-catalog-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("sr-service-catalog-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const save = useCallback((next: ServiceCatalogItem[]) => {
    writeCatalog(next);
    setItems(next);
  }, []);

  const upsert = useCallback(
    (item: ServiceCatalogItem) => {
      const next = [...items];
      const idx = next.findIndex((x) => x.id === item.id);
      if (idx >= 0) next[idx] = item;
      else next.push(item);
      save(next);
    },
    [items, save]
  );

  const remove = useCallback(
    (id: string) => {
      save(items.filter((x) => x.id !== id));
    },
    [items, save]
  );

  const reset = useCallback(() => {
    resetCatalog();
    setItems(DEFAULT_SERVICE_CATALOG);
  }, []);

  return { items, hydrated, upsert, remove, reset, save };
}
