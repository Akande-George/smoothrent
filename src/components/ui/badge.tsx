import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "border border-line bg-paper text-muted-strong",
        success: "bg-emerald text-ivory",
        warning: "bg-saffron text-emerald-deep",
        danger: "bg-clay text-ivory",
        accent: "bg-saffron text-emerald-deep",
        info: "bg-emerald-soft text-ivory",
        outline: "border border-emerald text-emerald-deep",
        ghost: "bg-transparent text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
