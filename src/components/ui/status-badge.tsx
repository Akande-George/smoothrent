import { Badge, type BadgeProps } from "./badge";

const statusVariantMap: Record<string, BadgeProps["variant"]> = {
  paid: "success",
  active: "success",
  verified: "success",
  approved: "success",
  resolved: "success",
  closed: "success",
  pending: "warning",
  under_review: "warning",
  pending_signature: "warning",
  renewal_due: "warning",
  in_progress: "info",
  open: "info",
  submitted: "info",
  viewing: "info",
  prospect: "default",
  draft: "default",
  overdue: "danger",
  rejected: "danger",
  failed: "danger",
  terminated: "danger",
  expired: "danger",
};

const statusLabelMap: Record<string, string> = {
  paid: "Paid",
  active: "Active",
  verified: "Verified",
  approved: "Approved",
  resolved: "Resolved",
  closed: "Closed",
  pending: "Pending",
  under_review: "Under Review",
  pending_signature: "Pending Signature",
  renewal_due: "Renewal Due",
  in_progress: "In Progress",
  open: "Open",
  submitted: "Submitted",
  viewing: "Viewing",
  prospect: "Prospect",
  draft: "Draft",
  overdue: "Overdue",
  rejected: "Rejected",
  failed: "Failed",
  terminated: "Terminated",
  expired: "Expired",
  not_started: "Not Started",
  negotiation: "Negotiation",
  offer: "Offer Made",
  Available: "Available",
  Taken: "Taken",
  "Under Review": "Under Review",
  Draft: "Draft",
};

export function StatusBadge({ status }: { status: string }) {
  const variant = statusVariantMap[status] || "default";
  const label = statusLabelMap[status] || status;
  return <Badge variant={variant}>{label}</Badge>;
}
