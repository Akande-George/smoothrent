export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("234")) {
    const local = cleaned.slice(3);
    return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  if (cleaned.startsWith("0")) {
    const local = cleaned.slice(1);
    return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  return phone;
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

export type RentTypeLike = "Monthly" | "Daily" | "Per Event" | string;

export function rentSuffix(rentType?: RentTypeLike): string {
  switch (rentType) {
    case "Daily":
      return "/day";
    case "Per Event":
      return "/event";
    case "Monthly":
    default:
      return "/mo";
  }
}

export function rentLabel(rentType?: RentTypeLike): string {
  switch (rentType) {
    case "Daily":
      return "Daily rent";
    case "Per Event":
      return "Per event";
    case "Monthly":
    default:
      return "Monthly rent";
  }
}
