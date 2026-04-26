"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockRevenueData } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatNaira } from "@/lib/format";

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6a635c" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6a635c" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value) => formatNaira(Number(value))}
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#f0a44b"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#f0a44b" }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#6a635c"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#6a635c" }}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
