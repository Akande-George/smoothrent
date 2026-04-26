export type LoanPurpose =
  | "rent_upfront"
  | "caution_fee"
  | "service_fee"
  | "moving_costs"
  | "renovation"
  | "other";

export type LoanStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "disbursed"
  | "repaying"
  | "paid_off"
  | "rejected"
  | "overdue";

export type LoanTerm = 3 | 6 | 9 | 12 | 18 | 24;

export interface LoanApplication {
  id: string;
  reference: string;
  tenantId: string;
  leaseId?: string;
  propertyTitle: string;
  amountRequested: number;
  amountApproved?: number;
  termMonths: LoanTerm;
  purpose: LoanPurpose;
  monthlyRepayment: number;
  interestRatePercent: number;
  totalRepayable: number;
  amountRepaid: number;
  status: LoanStatus;
  submittedAt: string;
  reviewedAt?: string;
  disbursedAt?: string;
  nextRepaymentDate?: string;
  notes?: string;
}
