import Link from "next/link";
import { ArrowUpRight, Bath, Bed, Maximize, ShieldCheck } from "lucide-react";
import { formatNaira, rentLabel, rentSuffix } from "@/lib/format";
import type { Property } from "@/types/property";

const GRADIENTS = [
  "from-emerald via-emerald-soft to-saffron/40",
  "from-clay via-saffron/60 to-sand",
  "from-emerald-deep via-emerald to-clay/30",
  "from-saffron via-clay/50 to-emerald-deep",
  "from-emerald-soft via-saffron/50 to-emerald",
];

function gradientFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export function PropertyCard({
  property,
  href,
}: {
  property: Property;
  href?: string;
}) {
  const gradient = gradientFor(property.id);
  const content = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-all hover:-translate-y-1 hover:border-emerald/50 hover:shadow-[0_30px_60px_-40px_rgba(12,31,23,0.5)]">
      {/* Visual */}
      <div className="relative h-52 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        <div className="grain-soft mix-blend-overlay" />
        <svg
          className="absolute inset-0 h-full w-full text-ivory/70"
          viewBox="0 0 400 220"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="0.8">
            <path d="M40 180 L40 120 L100 80 L160 120 L160 180" />
            <path d="M160 180 L160 100 L240 60 L320 100 L320 180" />
            <rect x="60" y="140" width="20" height="40" />
            <rect x="120" y="140" width="20" height="40" />
            <rect x="180" y="120" width="22" height="22" />
            <rect x="220" y="120" width="22" height="22" />
            <rect x="260" y="120" width="22" height="22" />
            <rect x="180" y="150" width="22" height="22" />
            <rect x="220" y="150" width="22" height="22" />
            <rect x="260" y="150" width="22" height="22" />
          </g>
          <circle cx="350" cy="46" r="20" fill="rgba(245,236,214,0.55)" />
        </svg>

        {property.isVerified && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
            <ShieldCheck className="h-3 w-3" /> Verified
          </div>
        )}
        {property.isFeatured && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-saffron px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-deep">
            Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-deep/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-ivory backdrop-blur">
          {property.type}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            {property.area} · {property.city}
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-foreground line-clamp-2">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
          {property.bedrooms > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3 w-3" /> {property.bedrooms} bed
            </span>
          )}
          <span className="h-1 w-1 rounded-full bg-line-strong" />
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3 w-3" /> {property.bathrooms} bath
          </span>
          {property.sqft ? (
            <>
              <span className="h-1 w-1 rounded-full bg-line-strong" />
              <span className="inline-flex items-center gap-1">
                <Maximize className="h-3 w-3" /> {property.sqft.toLocaleString()}
              </span>
            </>
          ) : null}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {rentLabel(property.rentType)}
            </p>
            <p className="font-display text-2xl text-foreground">
              {formatNaira(property.price)}
              <span className="ml-0.5 text-sm text-muted">
                {rentSuffix(property.rentType)}
              </span>
            </p>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-ivory transition group-hover:bg-saffron group-hover:text-emerald-deep">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
