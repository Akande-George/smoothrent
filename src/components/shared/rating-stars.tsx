"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  maxStars = 5,
  size = "sm",
  interactive = false,
  onRate,
}: {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(i + 1)}
          className={cn(interactive && "cursor-pointer")}
        >
          <Star
            className={cn(
              sizeClass,
              i < Math.floor(rating)
                ? "fill-accent text-accent"
                : i < rating
                  ? "fill-accent/50 text-accent"
                  : "fill-transparent text-black/15"
            )}
          />
        </button>
      ))}
    </div>
  );
}
