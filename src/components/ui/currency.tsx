import { formatNaira } from "@/lib/format";

export function Currency({
  amount,
  className,
  suffix,
}: {
  amount: number;
  className?: string;
  suffix?: string;
}) {
  return (
    <span className={className}>
      {formatNaira(amount)}
      {suffix && <span className="text-muted">{suffix}</span>}
    </span>
  );
}
