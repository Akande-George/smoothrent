import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-3xl" />
        ))}
      </div>
      {/* Chart + side panel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="col-span-2 h-72 rounded-3xl" />
        <Skeleton className="h-72 rounded-3xl" />
      </div>
      {/* Table */}
      <Skeleton className="h-64 w-full rounded-3xl" />
    </div>
  );
}
