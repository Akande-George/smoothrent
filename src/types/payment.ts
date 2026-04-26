export type PaymentStatus = "paid" | "pending" | "overdue" | "failed" | "refunded";
export type PaymentType =
  | "rent"
  | "caution_fee"
  | "service_fee"
  | "referral_reward"
  | "subscription";

export interface Payment {
  id: string;
  tenantId?: string;
  tenantName: string;
  tenantEmail: string;
  landlordId?: string;
  propertyId?: string;
  propertyTitle: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  reference: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}
