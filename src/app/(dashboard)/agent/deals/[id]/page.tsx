import Link from "next/link";
import { ArrowLeft, Calendar, Phone, User, Building2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Currency } from "@/components/ui/currency";
import { formatDate } from "@/lib/format";
import { mockDeals, mockProperties } from "@/lib/mock-data";

const stages = ["prospect", "viewing", "offer", "negotiation", "closed"] as const;

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deal = mockDeals.find((d) => d.id === id);

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="font-display text-xl text-foreground">Deal not found</h3>
        <Link href="/agent/deals" className="mt-4">
          <Button variant="secondary">Back to Deals</Button>
        </Link>
      </div>
    );
  }

  const property = mockProperties.find((p) => p.id === deal.propertyId);
  const currentStageIndex = stages.indexOf(deal.stage);

  const timeline = [
    { label: "Deal created", date: deal.createdAt, completed: true },
    { label: "Client contacted", date: deal.createdAt, completed: currentStageIndex >= 0 },
    { label: "Property viewing scheduled", date: currentStageIndex >= 1 ? deal.updatedAt : undefined, completed: currentStageIndex >= 1 },
    { label: "Offer submitted", date: currentStageIndex >= 2 ? deal.updatedAt : undefined, completed: currentStageIndex >= 2 },
    { label: "Negotiation in progress", date: currentStageIndex >= 3 ? deal.updatedAt : undefined, completed: currentStageIndex >= 3 },
    { label: "Deal closed", date: currentStageIndex >= 4 ? deal.updatedAt : undefined, completed: currentStageIndex >= 4 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/agent/deals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-3xl text-foreground">
            {deal.propertyTitle}
          </h1>
          <p className="mt-1 text-muted">Deal with {deal.clientName}</p>
        </div>
        <StatusBadge status={deal.stage} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Deal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted" />
                <div>
                  <p className="font-medium text-foreground">
                    {deal.clientName}
                  </p>
                  <p className="text-xs text-muted">Client</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted" />
                <span className="text-foreground">{deal.clientPhone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted" />
                <div>
                  <p className="font-medium text-foreground">
                    {deal.propertyTitle}
                  </p>
                  {property && (
                    <p className="text-xs text-muted">
                      {property.city}, {property.state}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted" />
                <span className="text-foreground">
                  Created {formatDate(deal.createdAt)}
                </span>
              </div>
              <div className="border-t border-black/10 pt-4">
                <p className="text-sm text-muted">Commission Value</p>
                <Currency
                  amount={deal.value}
                  className="font-display text-2xl text-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Deal Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-muted/30" />
                    )}
                    {i < timeline.length - 1 && (
                      <div
                        className={`my-1 w-px flex-1 ${
                          step.completed ? "bg-green-600" : "bg-black/10"
                        }`}
                        style={{ minHeight: 24 }}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-sm font-medium ${
                        step.completed ? "text-foreground" : "text-muted/50"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted">
                        {formatDate(step.date)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {stages.map((stage, i) => (
              <div key={stage} className="flex flex-1 items-center gap-2">
                <div
                  className={`h-2 flex-1 rounded-full ${
                    i <= currentStageIndex
                      ? "bg-green-600"
                      : "bg-black/10"
                  }`}
                />
                {i < stages.length - 1 && <div className="w-1" />}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {stages.map((stage) => (
              <span key={stage} className="text-xs text-muted capitalize">
                {stage}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
