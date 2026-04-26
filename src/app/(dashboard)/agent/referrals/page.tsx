"use client";

import { ReferralsView } from "@/components/shared/referrals-view";
import { useMockAuth } from "@/hooks/use-mock-auth";

export default function AgentReferralsPage() {
  const { user } = useMockAuth();
  return <ReferralsView role="agent" firstName={user.firstName} />;
}
