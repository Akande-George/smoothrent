"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const SCENES = [
  {
    grad: "from-emerald-deep via-emerald to-saffron/40",
    label: "Exterior",
  },
  { grad: "from-clay via-saffron/60 to-sand", label: "Living" },
  { grad: "from-emerald via-emerald-soft to-clay/30", label: "Kitchen" },
  { grad: "from-saffron via-clay/40 to-emerald-deep", label: "Bedroom" },
];

export function PropertyGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = images.length > 0 ? images : SCENES.map((s) => s.label);
  const count = slides.length;

  return (
    <div className="space-y-3">
      <div className="relative h-[420px] overflow-hidden rounded-[24px] border border-line">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all",
            SCENES[activeIndex % SCENES.length].grad
          )}
        />
        <div className="grain-soft mix-blend-overlay" />
        <svg
          className="absolute inset-0 h-full w-full text-ivory/70"
          viewBox="0 0 800 480"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="0.8">
            <path d="M80 380 L80 240 L200 160 L320 240 L320 380" />
            <path d="M320 380 L320 200 L480 120 L640 200 L640 380" />
            <rect x="120" y="280" width="40" height="80" />
            <rect x="240" y="280" width="40" height="80" />
            <rect x="360" y="240" width="44" height="44" />
            <rect x="420" y="240" width="44" height="44" />
            <rect x="480" y="240" width="44" height="44" />
            <rect x="540" y="240" width="44" height="44" />
            <rect x="360" y="300" width="44" height="44" />
            <rect x="420" y="300" width="44" height="44" />
            <rect x="480" y="300" width="44" height="44" />
            <rect x="540" y="300" width="44" height="44" />
          </g>
          <circle cx="700" cy="100" r="46" fill="rgba(245,236,214,0.55)" />
        </svg>

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ivory/95 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
          <Camera className="h-3 w-3" />
          {SCENES[activeIndex % SCENES.length].label}
        </div>

        {count > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + count) % count)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory/95 p-2.5 transition hover:bg-saffron"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-emerald-deep" />
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % count)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory/95 p-2.5 transition hover:bg-saffron"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-emerald-deep" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 rounded-full bg-emerald-deep/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory backdrop-blur">
          {activeIndex + 1} / {count}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const scene = SCENES[i % SCENES.length];
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 overflow-hidden rounded-xl transition-all",
                activeIndex === i
                  ? "ring-2 ring-emerald"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  scene.grad
                )}
              />
              <div className="grain-soft mix-blend-overlay" />
              <span className="absolute bottom-1 left-1 rounded-full bg-emerald-deep/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory">
                {scene.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
