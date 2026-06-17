"use client";

import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { DateRangeProvider } from "@/lib/date-range-context";
import { TaskProvider } from "@/lib/task-context";
import { QuickTaskFAB } from "@/components/tasks/quick-task-fab";
import { QuickTaskModal } from "@/components/tasks/quick-task-modal";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TaskProvider>
      <div className="flex h-full min-h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-w-0">
          <Suspense fallback={null}>
            <DateRangeProvider>{children}</DateRangeProvider>
          </Suspense>
        </main>
        <QuickTaskFAB />
        <QuickTaskModal />
      </div>
    </TaskProvider>
  );
}

