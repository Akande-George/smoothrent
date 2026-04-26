export type LeaseStatus = "active" | "expired" | "pending_signature" | "terminated" | "renewal_due";

export interface Lease {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  tenantId: string;
  tenantName: string;
  landlordId: string;
  landlordName: string;
  status: LeaseStatus;
  startDate: string;
  endDate: string;
  rentAmount: number;
  cautionFee: number;
  serviceCharge: number;
  isSigned: boolean;
  signedAt?: string;
  createdAt: string;
}
