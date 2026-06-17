"use client";

import { CalendarDays } from "lucide-react";
import { useDateRange, type DateRangeValue } from "@/lib/date-range-context";
import { cn } from "@/lib/utils";

const OPTIONS: { label: string; value: DateRangeValue }[] = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "3m", value: "3m" },
  { label: "All", value: "all" },
];

export function DateRangeFilter() {
  const { range, setRange } = useDateRange();

  return (
    <div className="flex items-center gap-2">
      <CalendarDays className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
      <div className="flex items-center rounded-lg bg-muted/60 p-0.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setRange(opt.value)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
              range === opt.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

