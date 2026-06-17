"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useTask } from "@/lib/task-context";
import { cn } from "@/lib/utils";

export function QuickTaskFAB() {
  const { openModal } = useTask();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open modal
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal]);

  return (
    <button
      onClick={openModal}
      aria-label="Create task (Ctrl+K)"
      title="Create task (Cmd+K / Ctrl+K)"
      className={cn(
        "fixed bottom-6 right-6 z-30",
        "flex items-center justify-center h-14 w-14",
        "rounded-full bg-primary text-primary-foreground",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-200 hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}

