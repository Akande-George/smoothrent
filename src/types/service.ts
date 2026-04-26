export type ServiceCategory =
  | "cleaning"
  | "laundry"
  | "fumigation"
  | "gardening"
  | "plumbing"
  | "electrician"
  | "ac_servicing"
  | "chef"
  | "security"
  | "errand";

export type ServiceFrequency =
  | "one_off"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly";

export type ServiceRequestStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "paused"
  | "cancelled";

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export interface ServiceCatalogItem {
  id: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  basePrice: number;
  unit: "per visit" | "per kg" | "per hour" | "per day";
  durationMinutes: number;
  supportedFrequencies: ServiceFrequency[];
  features: string[];
  popular?: boolean;
}

export interface ServiceRequest {
  id: string;
  tenantId: string;
  leaseId: string;
  propertyId: string;
  propertyTitle: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  frequency: ServiceFrequency;
  daysOfWeek: DayOfWeek[];
  preferredTime: string;
  status: ServiceRequestStatus;
  pricePerVisit: number;
  startDate: string;
  nextVisit?: string;
  lastVisit?: string;
  visitsCompleted: number;
  notes?: string;
  vendorName?: string;
  createdAt: string;
}
