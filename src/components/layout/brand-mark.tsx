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
      aria-label="SmoothRent home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        isIvory ? "text-ivory" : "text-emerald",
        className
      )}
    >
      <span
        className={cn(
          "brand-logo shrink-0",
          isCompact ? "h-9 w-9" : "h-10 w-10 sm:h-11 sm:w-11"
        )}
        role="img"
        aria-hidden="true"
      />
      {!isCompact && (
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-muted sm:block">
          Lagos · Abuja · Port Harcourt
        </span>
      )}
    </Link>
  );
}
