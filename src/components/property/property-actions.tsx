"use client";

import { useState } from "react";
import { ArrowUpRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplyNowModal } from "./apply-now-modal";
import { BookInspectionModal } from "./book-inspection-modal";
import { formatNaira } from "@/lib/format";
import type { Property } from "@/types/property";

export function PropertyActions({ property }: { property: Property }) {
  const [applyOpen, setApplyOpen] = useState(false);
  const [inspectOpen, setInspectOpen] = useState(false);
  const [virtualOpen, setVirtualOpen] = useState(false);

  return (
    <article className="relative overflow-hidden rounded-[24px] border border-emerald-deep bg-emerald p-6 text-ivory">
      <div className="grain-soft mix-blend-overlay" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full sun-gradient opacity-70" />
      <div className="relative">
        <span className="inline-flex rounded-full bg-saffron px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
          {property.type}
        </span>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/65">
          {property.rentType === "Per Event" ? "Per event" : "Annual rent"}
        </p>
        <p className="mt-1 font-display text-4xl">{formatNaira(property.price)}</p>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-ivory/15 bg-ivory/5 p-3 text-xs text-ivory/85">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              Service fee
            </p>
            <p className="font-display text-base text-ivory">
              {formatNaira(property.serviceFee)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
              Caution
            </p>
            <p className="font-display text-base text-ivory">
              {formatNaira(property.cautionFee)}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Button
            type="button"
            variant="accent"
            className="w-full"
            onClick={() => setApplyOpen(true)}
          >
            Apply now
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ivory"
            className="w-full"
            onClick={() => setInspectOpen(true)}
          >
            Book inspection
          </Button>
          <button
            type="button"
            onClick={() => setVirtualOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-ivory/85 transition hover:text-saffron"
          >
            <Video className="h-4 w-4" />
            Request virtual tour
          </button>
        </div>
      </div>

      <ApplyNowModal
        open={applyOpen}
        onOpenChange={setApplyOpen}
        property={property}
      />
      <BookInspectionModal
        open={inspectOpen}
        onOpenChange={setInspectOpen}
        property={property}
      />
      <BookInspectionModal
        open={virtualOpen}
        onOpenChange={setVirtualOpen}
        property={property}
      />
    </article>
  );
}
