import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({
  href = "/",
  variant = "default",
  className,
}: {
  href?: string;
  variant?: "default" | "compact" | "ivory";
  className?: string;
}) {
  const isIvory = variant === "ivory";
  const isCompact = variant === "compact";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3",
        className
      )}
    >
      <span
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-2xl",
          isIvory
            ? "bg-ivory text-emerald-deep"
            : "bg-emerald text-ivory"
        )}
      >
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M5 26 L5 14 L16 5 L27 14 L27 26" strokeLinejoin="round" />
          <path d="M12 26 L12 18 L20 18 L20 26" strokeLinejoin="round" />
          <circle cx="16" cy="11" r="0.9" fill="currentColor" stroke="none" />
        </svg>
        <span
          className={cn(
            "absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full",
            isIvory ? "bg-saffron" : "bg-saffron"
          )}
        />
      </span>
      {!isCompact && (
        <span className="leading-tight">
          <span className="block font-display text-[20px] italic tracking-tight sm:text-[22px]">
            SmoothRent
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-muted sm:block">
            Lagos · Abuja · Port Harcourt
          </span>
        </span>
      )}
    </Link>
  );
}
