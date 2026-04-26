export interface SelectOption {
  label: string;
  value: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ActivityItem {
  id: string;
  type: "payment" | "application" | "lease" | "maintenance" | "listing" | "review";
  title: string;
  description: string;
  timestamp: string;
}

export interface DealStage {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientPhone: string;
  stage: "prospect" | "viewing" | "offer" | "negotiation" | "closed";
  value: number;
  createdAt: string;
  updatedAt: string;
}
