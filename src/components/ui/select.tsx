"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({
  label,
  error,
  placeholder,
  options,
  value,
  onValueChange,
  className,
}: {
  label?: string;
  error?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong">
          {label}
        </label>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger className="field-shell flex h-12 w-full items-center justify-between rounded-xl px-4 text-sm text-foreground focus:outline-none data-[placeholder]:text-muted/70">
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="h-4 w-4 text-muted" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-50 max-h-60 overflow-y-auto rounded-2xl border border-line bg-card p-1 shadow-[0_18px_40px_-25px_rgba(12,31,23,0.5)]">
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground outline-none hover:bg-emerald/[0.06] focus:bg-emerald/[0.06] data-[state=checked]:bg-emerald data-[state=checked]:text-ivory data-[state=checked]:font-medium"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ml-auto">
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <p className="text-xs text-clay">{error}</p>}
    </div>
  );
}
