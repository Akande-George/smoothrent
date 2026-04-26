import type { PropertyType, ListingStatus, Amenity, RentType } from "@/lib/constants";

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: ListingStatus;
  rentType: RentType;
  price: number;
  cautionFee: number;
  serviceFee: number;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  sqft?: number;
  amenities: Amenity[];
  images: string[];
  videoUrl?: string;
  state: string;
  city: string;
  area: string;
  address: string;
  isVerified: boolean;
  isFeatured: boolean;
  landlordId: string;
  agentId?: string;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyApplication {
  id: string;
  propertyId: string;
  property?: Property;
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  status: "submitted" | "under_review" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  notes?: string;
}
