"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  alt,
  fallback,
  className,
  size = "md",
}: {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
    >
      <AvatarPrimitive.Image
        className="aspect-square h-full w-full object-cover"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald via-emerald-soft to-saffron font-display text-ivory">
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
