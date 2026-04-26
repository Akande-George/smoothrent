import { Phone, Mail, MapPin, Calendar, Shield, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/format";
import { mockUsers, mockProperties, mockDeals } from "@/lib/mock-data";

const agent = mockUsers.find((u) => u.id === "u3")!;
const agentListings = mockProperties.filter((p) => p.agentId === "u3");
const agentDeals = mockDeals;

export default function AgentProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Profile</h1>
        <p className="mt-1 text-muted">Your agent profile and information.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="text-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              fallback={`${agent.firstName[0]}${agent.lastName[0]}`}
              size="lg"
            />
            <div>
              <h2 className="font-display text-xl text-foreground">
                {agent.firstName} {agent.lastName}
              </h2>
              <Badge variant="accent" className="mt-2">Agent</Badge>
            </div>
            <StatusBadge status={agent.kycStatus} />
          </div>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted" />
                <span className="text-foreground">{agent.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted" />
                <span className="text-foreground">{agent.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted" />
                <span className="text-foreground">
                  {agent.city}, {agent.state}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted" />
                <span className="text-foreground">
                  Joined {formatDate(agent.createdAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="font-display text-3xl text-foreground">
                    {agentListings.length}
                  </p>
                  <p className="mt-1 text-sm text-muted">Active Listings</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-3xl text-foreground">
                    {agentDeals.length}
                  </p>
                  <p className="mt-1 text-sm text-muted">Total Deals</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-3xl text-foreground">
                    {agentDeals.filter((d) => d.stage === "closed").length}
                  </p>
                  <p className="mt-1 text-sm text-muted">Deals Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        KYC Verification
                      </p>
                      <p className="text-xs text-muted">
                        Identity verification status
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={agent.kycStatus} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-muted" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Agent License
                      </p>
                      <p className="text-xs text-muted">
                        Professional license status
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">Verified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
