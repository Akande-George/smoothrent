import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

export function StatCard({
  title,
  value,
  change,
  changeLabel = "From last week",
  icon,
  className,
}: {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const isPositive = change && change > 0;

  return (
    <Card className={cn("relative", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted">
          {icon}
          <span>{title}</span>
        </div>
        <button className="rounded-full p-1 hover:bg-black/5">
          <MoreHorizontal className="h-4 w-4 text-muted" />
        </button>
      </div>
      <div className="mt-3 flex items-end gap-3">
        <p className="font-display text-3xl text-foreground">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-1 pb-1">
            <span
              className={cn(
                "flex items-center gap-0.5 text-sm font-semibold",
                isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-muted">{changeLabel}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
