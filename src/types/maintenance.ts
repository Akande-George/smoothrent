export type MaintenancePriority = "low" | "medium" | "high" | "urgent";
export type MaintenanceStatus = "open" | "in_progress" | "resolved" | "closed";
export type MaintenanceCategory = "plumbing" | "electrical" | "structural" | "appliance" | "pest_control" | "generator" | "security" | "other";

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantId: string;
  tenantName: string;
  category: MaintenanceCategory;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  images: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}
