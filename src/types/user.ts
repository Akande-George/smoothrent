export type UserRole = "customer" | "landlord" | "agent" | "admin" | "artisan";

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

export type AgentTier = "tier1" | "tier2";
export type SubscriptionInterval = "monthly" | "quarterly" | "yearly";

export interface AgentSubscription {
  tier: AgentTier;
  interval: SubscriptionInterval;
  startedAt: string;
  renewsAt: string;
  autoRenew: boolean;
}

export interface AgentProfile extends User {
  role: "agent";
  subscriptionPlan: "basic" | "premium";
  commissionRate: number;
  totalEarnings: number;
  activeListings: number;
  subscription?: AgentSubscription;
}

export type ArtisanPricingModel = "commission" | "annual_subscription";

export type ArtisanCategory =
  | "plumbing"
  | "electrician"
  | "ac_servicing"
  | "carpentry"
  | "tiling"
  | "painting"
  | "cleaning"
  | "fumigation"
  | "gardening"
  | "generator_repair"
  | "satellite";

export interface ArtisanProfile extends User {
  role: "artisan";
  category: ArtisanCategory;
  yearsExperience: number;
  bio: string;
  hourlyRate: number;
  baseRate: number;
  serviceAreas: string[];
  rating: number;
  jobsCompleted: number;
  pricingModel: ArtisanPricingModel;
  pricingActiveUntil?: string;
}

export type ArtisanJobStatus =
  | "requested"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ArtisanJob {
  id: string;
  artisanId: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  category: ArtisanCategory;
  title: string;
  description: string;
  propertyTitle?: string;
  city: string;
  scheduledFor: string;
  status: ArtisanJobStatus;
  agreedAmount: number;
  platformFee: number;
  payout: number;
  createdAt: string;
  completedAt?: string;
}

export interface LandlordProfile extends User {
  role: "landlord";
  totalProperties: number;
  totalRevenue: number;
  occupancyRate: number;
}
