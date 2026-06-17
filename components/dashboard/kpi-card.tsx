import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  color: string;
  icon: React.ReactNode;
}

const colorMap: Record<
  string,
  { gradient: string; iconBg: string; badge: string }
> = {
  purple: {
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
    badge: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  },
  green: {
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    badge: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  blue: {
    gradient: "from-blue-500/10 via-sky-500/5 to-transparent",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    badge: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  orange: {
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
    badge: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

export function KpiCard({
  title,
  value,
  change,
  trend,
  description,
  color,
  icon,
}: KpiCardProps) {
  const colors = colorMap[color] || colorMap.purple;

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          colors.gradient
        )}
      />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
          </div>
          <div className={cn("rounded-xl p-2.5", colors.iconBg)}>{icon}</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              colors.badge
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change}
          </span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
