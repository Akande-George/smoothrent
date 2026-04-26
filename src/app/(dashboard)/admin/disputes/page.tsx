import { AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";

interface Dispute {
  id: string;
  title: string;
  description: string;
  reporter: string;
  respondent: string;
  propertyTitle: string;
  status: "open" | "under_review" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const mockDisputes: Dispute[] = [
  {
    id: "disp1",
    title: "Deposit refund not received",
    description: "Tenant claims caution fee was not refunded after lease termination. Landlord states deductions were made for damages.",
    reporter: "Chinedu Okafor",
    respondent: "Aisha Abdullahi",
    propertyTitle: "3 Bed Flat, Lekki Phase 1",
    status: "open",
    priority: "high",
    createdAt: "2026-03-18",
  },
  {
    id: "disp2",
    title: "Undisclosed property defects",
    description: "Tenant reports plumbing issues that were not disclosed during property viewing. Requesting compensation for repairs.",
    reporter: "Oluwaseun Adeyemi",
    respondent: "Amaka Eze",
    propertyTitle: "Mini Flat, Surulere",
    status: "under_review",
    priority: "medium",
    createdAt: "2026-03-10",
  },
  {
    id: "disp3",
    title: "Agent overcharged commission",
    description: "Client reports agent charged 15% commission instead of the agreed 10%. Seeking partial refund.",
    reporter: "Ada Okonkwo",
    respondent: "Ibrahim Musa",
    propertyTitle: "2 Bed Flat, GRA PH",
    status: "resolved",
    priority: "low",
    createdAt: "2026-02-25",
  },
];

const priorityVariant: Record<string, "danger" | "warning" | "default"> = {
  high: "danger",
  medium: "warning",
  low: "default",
};

const statusIcon: Record<string, React.ReactNode> = {
  open: <AlertTriangle className="h-5 w-5 text-red-600" />,
  under_review: <Clock className="h-5 w-5 text-amber-600" />,
  resolved: <CheckCircle className="h-5 w-5 text-green-600" />,
};

export default function AdminDisputesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Disputes</h1>
        <p className="mt-1 text-muted">
          Manage and resolve platform disputes between users.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Open</p>
          <p className="mt-2 font-display text-2xl text-red-600">
            {mockDisputes.filter((d) => d.status === "open").length}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Under Review
          </p>
          <p className="mt-2 font-display text-2xl text-amber-600">
            {mockDisputes.filter((d) => d.status === "under_review").length}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Resolved
          </p>
          <p className="mt-2 font-display text-2xl text-green-600">
            {mockDisputes.filter((d) => d.status === "resolved").length}
          </p>
        </Card>
      </div>

      {/* Disputes List */}
      {mockDisputes.length > 0 ? (
        <div className="space-y-4">
          {mockDisputes.map((dispute) => (
            <Card key={dispute.id}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-0.5">
                  {statusIcon[dispute.status]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">
                      {dispute.title}
                    </h3>
                    <Badge variant={priorityVariant[dispute.priority]}>
                      {dispute.priority.charAt(0).toUpperCase() +
                        dispute.priority.slice(1)}{" "}
                      Priority
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {dispute.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span>
                      Reporter: <strong>{dispute.reporter}</strong>
                    </span>
                    <span>
                      Respondent: <strong>{dispute.respondent}</strong>
                    </span>
                    <span>Property: {dispute.propertyTitle}</span>
                    <span>{formatDate(dispute.createdAt)}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {dispute.status !== "resolved" && (
                    <>
                      <Button variant="secondary" size="sm" className="gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Mediate
                      </Button>
                      <Button size="sm">Resolve</Button>
                    </>
                  )}
                  {dispute.status === "resolved" && (
                    <Badge variant="success">Resolved</Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<AlertTriangle className="h-10 w-10" />}
          title="No disputes"
          description="There are no active disputes on the platform."
        />
      )}
    </div>
  );
}
