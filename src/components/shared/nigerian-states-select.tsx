"use client";

import { Select } from "@/components/ui/select";
import { NIGERIAN_STATES } from "@/lib/constants";

export function NigerianStatesSelect({
  value,
  onValueChange,
  label = "State",
  className,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
}) {
  const options = NIGERIAN_STATES.map((s) => ({ label: s, value: s }));
  return (
    <Select
      label={label}
      placeholder="Select state"
      options={options}
      value={value}
      onValueChange={onValueChange}
      className={className}
    />
  );
}
