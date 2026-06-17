"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { tasksCompletedData } from "@/lib/mock-data";

export function TasksChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks This Week</CardTitle>
        <CardDescription>Completed vs pending per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={tasksCompletedData}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(var(--foreground))",
              }}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              name="Pending"
              fill="hsl(var(--muted))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
