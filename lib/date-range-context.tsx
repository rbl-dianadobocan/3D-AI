"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type DateRangeValue = "7d" | "30d" | "3m" | "all";

const VALID_RANGES: DateRangeValue[] = ["7d", "30d", "3m", "all"];

export const DATE_RANGE_LABELS: Record<DateRangeValue, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "3m": "Last 3 months",
  all: "All time",
};

interface DateRangeContextValue {
  range: DateRangeValue;
  setRange: (range: DateRangeValue) => void;
}

const DateRangeContext = createContext<DateRangeContextValue>({
  range: "all",
  setRange: () => {},
});

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const raw = searchParams.get("range");
  const range: DateRangeValue =
    raw !== null && (VALID_RANGES as string[]).includes(raw)
      ? (raw as DateRangeValue)
      : "all";

  const setRange = (newRange: DateRangeValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newRange === "all") {
      params.delete("range");
    } else {
      params.set("range", newRange);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <DateRangeContext.Provider value={{ range, setRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange(): DateRangeContextValue {
  return useContext(DateRangeContext);
}

