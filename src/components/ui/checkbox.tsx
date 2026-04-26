"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  label,
  checked,
  onCheckedChange,
  className,
}: {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(v) => onCheckedChange?.(v === true)}
        className="flex h-5 w-5 items-center justify-center rounded-lg border border-black/15 bg-white/80 transition data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
      >
        <CheckboxPrimitive.Indicator>
          <Check className="h-3 w-3 text-background" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
}
