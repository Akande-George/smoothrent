"use client";

import { ReferralsView } from "@/components/shared/referrals-view";
import { useMockAuth } from "@/hooks/use-mock-auth";

export default function LandlordReferralsPage() {
  const { user } = useMockAuth();
  return <ReferralsView role="landlord" firstName={user.firstName} />;
}
