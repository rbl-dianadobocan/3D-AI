"use client";

import { useMemo } from "react";
import { CheckCircle2, MessageSquare, Plus, ArrowRight, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { activityFeed } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useDateRange, DATE_RANGE_LABELS } from "@/lib/date-range-context";

const iconMap = {
  success: { icon: CheckCircle2, color: "text-emerald-500" },
  info: { icon: ArrowRight, color: "text-blue-500" },
  comment: { icon: MessageSquare, color: "text-violet-500" },
  create: { icon: Plus, color: "text-orange-500" },
  assign: { icon: UserCheck, color: "text-sky-500" },
};

// Each entry's approximate age in hours for range filtering
const ENTRY_AGE_HOURS = [0, 0.25, 1, 2, 3, 5];

const RANGE_MAX_HOURS: Record<string, number> = {
  "7d": Infinity,
  "30d": Infinity,
  "3m": Infinity,
  all: Infinity,
};

export function ActivityFeed() {
  const { range } = useDateRange();

  const visibleItems = useMemo(() => {
    const maxHours = RANGE_MAX_HOURS[range] ?? Infinity;
    return activityFeed.filter((_, i) => (ENTRY_AGE_HOURS[i] ?? 0) <= maxHours);
  }, [range]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>{DATE_RANGE_LABELS[range]}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {visibleItems.map((item) => {
          const { icon: Icon, color } = iconMap[item.type];
          return (
            <div key={item.id} className="flex items-start gap-3 group">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold">
                  {item.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>{" "}
                  <span className="font-medium text-primary">{item.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.time}
                </p>
              </div>
              <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", color)} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
