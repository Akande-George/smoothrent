import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <div className="rounded-3xl bg-foreground px-8 py-8 text-background">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-background/60">
              Premium
            </span>
          </div>
          <h2 className="font-display text-2xl">Enjoy Premium Features</h2>
          <p className="max-w-md text-sm text-background/70">
            Unlock advanced analytics, priority support, and automated rent
            collection to streamline your property management.
          </p>
        </div>
        <Button className="shrink-0 rounded-2xl bg-accent px-6 py-3 font-semibold text-foreground hover:bg-accent/90">
          Upgrade Now
        </Button>
      </div>
    </div>
  );
}
