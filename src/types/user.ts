export type UserRole = "customer" | "landlord" | "agent" | "admin";

export type KYCStatus = "not_started" | "pending" | "verified" | "rejected";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  kycStatus: KYCStatus;
  state?: string;
  city?: string;
  address?: string;
  nin?: string;
  bvn?: string;
  createdAt: string;
  isActive: boolean;
}

export interface AgentProfile extends User {
  role: "agent";
  subscriptionPlan: "basic" | "premium";
  commissionRate: number;
  totalEarnings: number;
  activeListings: number;
}

export interface LandlordProfile extends User {
  role: "landlord";
  totalProperties: number;
  totalRevenue: number;
  occupancyRate: number;
}
