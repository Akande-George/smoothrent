"use client";

import Link from "next/link";
import { Handshake } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";
import { mockDeals } from "@/lib/mock-data";

const stages = ["prospect", "viewing", "offer", "negotiation", "closed"] as const;

function DealCard({ deal }: { deal: (typeof mockDeals)[0] }) {
  return (
    <Link href={`/agent/deals/${deal.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground">{deal.propertyTitle}</p>
            <p className="mt-1 text-sm text-muted">{deal.clientName}</p>
            <p className="text-xs text-muted">{deal.clientPhone}</p>
          </div>
          <StatusBadge status={deal.stage} />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
          <Currency
            amount={deal.value}
            className="font-display text-lg text-foreground"
          />
          <span className="text-xs text-muted">
            Updated {formatDate(deal.updatedAt)}
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default function AgentDealsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Deal Pipeline</h1>
        <p className="mt-1 text-muted">
          Track and manage your deals through each stage.
        </p>
      </div>

      <Tabs defaultValue="prospect">
        <TabsList>
          {stages.map((stage) => {
            const count = mockDeals.filter((d) => d.stage === stage).length;
            return (
              <TabsTrigger key={stage} value={stage}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        {stages.map((stage) => {
          const stageDeals = mockDeals.filter((d) => d.stage === stage);
          return (
            <TabsContent key={stage} value={stage}>
              {stageDeals.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {stageDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Handshake className="h-10 w-10" />}
                  title={`No ${stage} deals`}
                  description={`Deals in the ${stage} stage will appear here.`}
                />
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
