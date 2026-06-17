import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { DateRangeProvider } from "@/lib/date-range-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Suspense is required because DateRangeProvider uses useSearchParams */}
        <Suspense fallback={null}>
          <DateRangeProvider>{children}</DateRangeProvider>
        </Suspense>
      </main>
    </div>
  );
}
