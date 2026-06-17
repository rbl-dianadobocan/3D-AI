"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { productivityData } from "@/lib/mock-data";
import { useDateRange, DATE_RANGE_LABELS } from "@/lib/date-range-context";

const RANGE_SLICE: Record<string, number> = {
  "7d": 1,
  "30d": 2,
  "3m": 3,
};

export function ProductivityChart() {
  const { range } = useDateRange();

  const filteredData = useMemo(() => {
    const sliceCount = RANGE_SLICE[range];
    return sliceCount !== undefined
      ? productivityData.slice(-sliceCount)
      : productivityData;
  }, [range]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Productivity</CardTitle>
        <CardDescription>
          Monthly output by department (%) &middot; {DATE_RANGE_LABELS[range]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={filteredData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="backendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="frontendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="designGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              domain={[40, 100]}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            />
            <Area
              type="monotone"
              dataKey="backend"
              name="Backend"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#backendGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="frontend"
              name="Frontend"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#frontendGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="design"
              name="Design"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#designGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
