import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong"
        >
          <span>{label}</span>
          {hint && (
            <span className="font-mono text-[10px] tracking-normal normal-case text-muted">
              {hint}
            </span>
          )}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "field-shell flex h-12 w-full rounded-xl px-4 text-sm text-foreground placeholder:text-muted/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-clay focus-within:border-clay",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-xs text-clay">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";

export { Input };
