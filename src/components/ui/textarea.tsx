import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-strong"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "field-shell flex min-h-[120px] w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea";

export { Textarea };
