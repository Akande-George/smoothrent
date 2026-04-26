import {
  CreditCard,
  FileText,
  Wrench,
  ScrollText,
  Home,
  Star,
} from "lucide-react";
import { mockActivity } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const typeIcons: Record<string, React.ReactNode> = {
  payment: <CreditCard className="h-4 w-4" />,
  application: <FileText className="h-4 w-4" />,
  maintenance: <Wrench className="h-4 w-4" />,
  lease: <ScrollText className="h-4 w-4" />,
  listing: <Home className="h-4 w-4" />,
  review: <Star className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  payment: "bg-green-100 text-green-700",
  application: "bg-blue-100 text-blue-700",
  maintenance: "bg-amber-100 text-amber-700",
  lease: "bg-purple-100 text-purple-700",
  listing: "bg-accent/20 text-accent",
  review: "bg-pink-100 text-pink-700",
};

function timeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${typeColors[item.type] || "bg-black/5 text-muted"}`}
              >
                {typeIcons[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted truncate">
                  {item.description}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted">
                {timeAgo(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
