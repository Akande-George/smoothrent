"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
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
    <label className={cn("flex items-center gap-3 cursor-pointer", className)}>
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative h-6 w-11 rounded-full bg-black/15 transition data-[state=checked]:bg-foreground"
      >
        <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
      </SwitchPrimitive.Root>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
}
