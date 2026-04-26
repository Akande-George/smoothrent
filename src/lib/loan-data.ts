import type { LoanApplication, LoanPurpose, LoanTerm } from "@/types/loan";

// SmoothRent's flat monthly interest rate for rental loans.
export const RENTAL_LOAN_MONTHLY_RATE = 2.5; // %

// Cap how much we'll lend, mock side, scales with monthly rent.
export const RENTAL_LOAN_MAX_MULTIPLIER = 6; // up to 6 months of rent

export const PURPOSE_LABEL: Record<LoanPurpose, string> = {
  rent_upfront: "Pay rent upfront",
  caution_fee: "Cover caution fee",
  service_fee: "Cover service fee",
  moving_costs: "Moving & setup",
  renovation: "Renovation / fit-out",
  other: "Other",
};

export const PURPOSE_HELPER: Record<LoanPurpose, string> = {
  rent_upfront: "Get a discount when you lock in 6–12 months upfront.",
  caution_fee: "Spread your refundable deposit over a few months.",
  service_fee: "Don't let the platform fee delay your move-in.",
  moving_costs: "Trucks, packers, internet setup — handled.",
  renovation: "Repaint, fit, install before move-in.",
  other: "Tell us what you need it for.",
};

export const TERM_OPTIONS: LoanTerm[] = [3, 6, 9, 12, 18, 24];

export function computeRepaymentSchedule(
  amount: number,
  termMonths: LoanTerm
): { monthlyRepayment: number; totalRepayable: number; interest: number } {
  const interest = Math.round(
    (amount * RENTAL_LOAN_MONTHLY_RATE * termMonths) / 100
  );
  const totalRepayable = amount + interest;
  const monthlyRepayment = Math.round(totalRepayable / termMonths);
  return { monthlyRepayment, totalRepayable, interest };
}

export const mockRentalLoans: LoanApplication[] = [
  {
    id: "loan-1",
    reference: "SR-LN-2026-001",
    tenantId: "u1",
    leaseId: "l1",
    propertyTitle: "Luxury 3 Bedroom Flat in Lekki Phase 1",
    amountRequested: 1_740_000,
    amountApproved: 1_740_000,
    termMonths: 6,
    purpose: "rent_upfront",
    interestRatePercent: 2.5,
    monthlyRepayment: 320_500,
    totalRepayable: 1_923_000,
    amountRepaid: 641_000,
    status: "repaying",
    submittedAt: "2026-02-20",
    reviewedAt: "2026-02-22",
    disbursedAt: "2026-02-23",
    nextRepaymentDate: "2026-05-01",
  },
  {
    id: "loan-2",
    reference: "SR-LN-2026-007",
    tenantId: "u1",
    leaseId: "l1",
    propertyTitle: "Luxury 3 Bedroom Flat in Lekki Phase 1",
    amountRequested: 290_000,
    amountApproved: 290_000,
    termMonths: 3,
    purpose: "caution_fee",
    interestRatePercent: 2.5,
    monthlyRepayment: 103_400,
    totalRepayable: 311_750,
    amountRepaid: 311_750,
    status: "paid_off",
    submittedAt: "2025-11-12",
    reviewedAt: "2025-11-13",
    disbursedAt: "2025-11-14",
  },
  {
    id: "loan-3",
    reference: "SR-LN-2026-014",
    tenantId: "u1",
    leaseId: "l1",
    propertyTitle: "Luxury 3 Bedroom Flat in Lekki Phase 1",
    amountRequested: 150_000,
    termMonths: 6,
    purpose: "moving_costs",
    interestRatePercent: 2.5,
    monthlyRepayment: 0,
    totalRepayable: 0,
    amountRepaid: 0,
    status: "under_review",
    submittedAt: "2026-04-18",
  },
];
