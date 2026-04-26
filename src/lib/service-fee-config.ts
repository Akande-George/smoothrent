"use client";

const KEY = "sr-service-fee-config";

export type ServiceFeeMode = "fixed" | "percent";

export interface ServiceFeeConfig {
  mode: ServiceFeeMode;
  fixedAmount: number;
  percentOfRent: number;
  minAmount: number;
  maxAmount: number;
  description: string;
}

export const DEFAULT_SERVICE_FEE: ServiceFeeConfig = {
  mode: "percent",
  fixedAmount: 75_000,
  percentOfRent: 10,
  minAmount: 25_000,
  maxAmount: 1_500_000,
  description:
    "A flat platform fee covering KYC, escrow, digital lease, and SmoothRent support throughout the tenancy.",
};

export function readServiceFeeConfig(): ServiceFeeConfig {
  if (typeof window === "undefined") return DEFAULT_SERVICE_FEE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SERVICE_FEE;
    const parsed = JSON.parse(raw) as Partial<ServiceFeeConfig>;
    return { ...DEFAULT_SERVICE_FEE, ...parsed };
  } catch {
    return DEFAULT_SERVICE_FEE;
  }
}

export function writeServiceFeeConfig(config: ServiceFeeConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(config));
}

export function computeServiceFee(rent: number, config?: ServiceFeeConfig): number {
  const c = config ?? readServiceFeeConfig();
  let raw =
    c.mode === "fixed" ? c.fixedAmount : Math.round((rent * c.percentOfRent) / 100);
  raw = Math.max(c.minAmount, Math.min(c.maxAmount, raw));
  return raw;
}
