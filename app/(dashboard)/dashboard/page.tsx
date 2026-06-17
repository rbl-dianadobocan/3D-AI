import { LayoutDashboard, CheckSquare, Users, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { TasksChart } from "@/components/dashboard/tasks-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { kpiData } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  tasks: <LayoutDashboard className="h-5 w-5" />,
  completed: <CheckSquare className="h-5 w-5" />,
  active: <Users className="h-5 w-5" />,
  velocity: <Zap className="h-5 w-5" />,
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Dashboard"
        description="Welcome back, Alex 👋"
        showDateFilter
      />

      <div className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((kpi) => (
            <KpiCard
              key={kpi.id}
              {...kpi}
              icon={iconMap[kpi.id]}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ProductivityChart />
          </div>
          <div>
            <TasksChart />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
          <div className="xl:col-span-2">
            {/* Quick Stats Panel */}
            <div className="rounded-xl border border-border bg-card p-6 h-full">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Sprint Overview
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "Sprint", value: "Sprint 24", sub: "Jun 10 – Jun 24" },
                  { label: "Progress", value: "67%", sub: "8 days remaining" },
                  { label: "Velocity", value: "94 pts", sub: "Target: 98 pts" },
                  { label: "Bugs", value: "12", sub: "4 critical" },
                  { label: "PRs Merged", value: "31", sub: "This sprint" },
                  { label: "Deployments", value: "7", sub: "All successful" },
                ].map(({ label, value, sub }) => (
                  <div
                    key={label}
                    className="rounded-lg bg-muted/50 p-4 space-y-1"
                  >
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
