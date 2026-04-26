import { Gift, Copy, Users, CheckCircle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Currency } from "@/components/ui/currency";
import { formatDate } from "@/lib/format";

const referralCode = "CHINEDU-SR2026";
const referralLink = `https://smoothrent.ng/ref/${referralCode}`;

const mockReferrals = [
  {
    id: "r1",
    name: "Tobi Adekunle",
    status: "completed",
    date: "2026-02-15",
    reward: 5_000,
  },
  {
    id: "r2",
    name: "Ngozi Uche",
    status: "pending",
    date: "2026-03-10",
    reward: 5_000,
  },
  {
    id: "r3",
    name: "Yusuf Danjuma",
    status: "completed",
    date: "2026-01-20",
    reward: 5_000,
  },
];

const totalEarned = mockReferrals
  .filter((r) => r.status === "completed")
  .reduce((sum, r) => sum + r.reward, 0);

export default function ReferralsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Referrals</h1>
        <p className="mt-1 text-muted">
          Invite friends to SmoothRent and earn rewards.
        </p>
      </div>

      {/* Referral Code Card */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="rounded-full bg-accent/20 p-4">
            <Gift className="h-8 w-8 text-accent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Your Referral Code
            </p>
            <p className="mt-2 font-display text-3xl tracking-wider text-foreground">
              {referralCode}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-4 py-2">
            <span className="text-sm text-muted">{referralLink}</span>
            <Button variant="ghost" size="sm" className="gap-1">
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
          </div>
          <p className="max-w-md text-sm text-muted">
            Share your code with friends. You earn{" "}
            <Currency amount={5_000} className="font-semibold text-foreground" />{" "}
            for every friend who signs their first lease.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-2xl bg-black/5 p-3">
              <Users className="h-5 w-5 text-muted" />
            </div>
            <div>
              <p className="text-xs text-muted">Total Referrals</p>
              <p className="font-display text-2xl text-foreground">
                {mockReferrals.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-2xl bg-green-100 p-3">
              <Gift className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Total Earned</p>
              <Currency
                amount={totalEarned}
                className="font-display text-2xl text-foreground"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReferrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-sm font-medium text-foreground">
                    {referral.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {referral.name}
                    </p>
                    <p className="text-xs text-muted">
                      {formatDate(referral.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Currency
                    amount={referral.reward}
                    className="text-sm font-medium text-foreground"
                  />
                  {referral.status === "completed" ? (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle className="h-3 w-3" /> Earned
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="gap-1">
                      <Clock className="h-3 w-3" /> Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
