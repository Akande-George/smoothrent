import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyDetails } from "@/components/property/property-details";
import { PropertyGrid } from "@/components/property/property-grid";
import { PropertyActions } from "@/components/property/property-actions";
import { PropertyReviews } from "@/components/property/property-reviews";
import { UserReviewsCard } from "@/components/shared/user-reviews-card";
import {
  mockProperties,
  mockPropertyReviews,
  mockUserReviews,
  mockUsers,
} from "@/lib/mock-data";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];
  const agent = mockUsers.find((u) => u.id === property.agentId);
  const landlord = mockUsers.find((u) => u.id === property.landlordId);
  const lister = agent ?? landlord;
  const similar = mockProperties
    .filter((p) => p.id !== property.id && p.city === property.city)
    .slice(0, 3);
  const reviews = mockPropertyReviews.filter((r) => r.propertyId === property.id);
  const landlordReviews = landlord
    ? mockUserReviews.filter(
        (r) => r.subjectId === landlord.id && r.subjectRole === "landlord"
      )
    : [];
  const agentReviews = agent
    ? mockUserReviews.filter(
        (r) => r.subjectId === agent.id && r.subjectRole === "agent"
      )
    : [];

  const formatNGN = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-strong transition hover:border-emerald hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to listings
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ivory" size="sm" type="button">
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button variant="ivory" size="sm" type="button">
            <Heart className="h-3.5 w-3.5" /> Save
          </Button>
        </div>
      </div>

      <section>
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
              {property.type} · {property.area} · {property.city}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              {property.title}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-strong">
              <MapPin className="h-4 w-4 text-emerald" />
              {property.address}, {property.city}, {property.state}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-strong">
              {property.isVerified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-3 py-1 text-ivory">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> {property.views} views
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> {property.inquiries}{" "}
                inquiries
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <PropertyGallery images={property.images} />
          <PropertyDetails property={property} />
          <PropertyReviews propertyId={property.id} initialReviews={reviews} />
          {landlord && (
            <UserReviewsCard
              subject={{
                id: landlord.id,
                name: `${landlord.firstName} ${landlord.lastName}`,
                role: "landlord",
              }}
              reviewer={{
                id: "u1",
                name: "Chinedu Okafor",
                role: "customer",
              }}
              initialReviews={landlordReviews}
              emptyMessage="No reviews of this landlord yet — past tenants can leave the first one."
            />
          )}
          {agent && (
            <UserReviewsCard
              subject={{
                id: agent.id,
                name: `${agent.firstName} ${agent.lastName}`,
                role: "agent",
              }}
              reviewer={{
                id: "u1",
                name: "Chinedu Okafor",
                role: "customer",
              }}
              initialReviews={agentReviews}
              emptyMessage="No reviews of this agent yet."
            />
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <PropertyActions property={property} />

          {lister && (
            <article className="rounded-[24px] border border-line bg-paper p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                {agent ? "Listed by · Agent" : "Listed by · Landlord"}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar
                  fallback={`${lister.firstName[0]}${lister.lastName[0]}`}
                  size="lg"
                />
                <div className="flex-1">
                  <p className="font-display text-lg text-foreground">
                    {lister.firstName} {lister.lastName}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {lister.role} · {lister.city}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="primary" size="sm" type="button">
                  <Phone className="h-3.5 w-3.5" /> Call
                </Button>
                <Button variant="ivory" size="sm" type="button">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat
                </Button>
              </div>
            </article>
          )}

          <article className="rounded-[24px] border border-line bg-card p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              Trust & safety
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-strong">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald" /> Ownership verified
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald" /> Inspected on-site
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald" /> Escrowed payments
              </li>
            </ul>
          </article>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <p className="tag-eyebrow">More in {property.city}</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                Similar properties.
              </h2>
            </div>
            <Link
              href="/listings"
              className="btn-base btn-outline inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm"
            >
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <PropertyGrid properties={similar} />
        </section>
      )}
    </>
  );
}
