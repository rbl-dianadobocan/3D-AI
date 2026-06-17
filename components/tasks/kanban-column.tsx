"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./task-card";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/lib/mock-data";

const columnConfig: Record<
  TaskStatus,
  { label: string; color: string; dot: string; headerBg: string }
> = {
  todo: {
    label: "To Do",
    color: "text-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
    headerBg: "bg-slate-50 dark:bg-slate-900/40",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-400",
    headerBg: "bg-blue-50 dark:bg-blue-900/20",
  },
  done: {
    label: "Done",
    color: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-400",
    headerBg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
};

// Sortable task wrapper
function SortableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
}

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = columnConfig[status];

  return (
    <div className="flex flex-col min-w-0 flex-1">
      {/* Column header */}
      <div
        className={cn(
          "flex items-center justify-between rounded-t-xl px-4 py-3 mb-3",
          config.headerBg
        )}
      >
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", config.dot)} />
          <h3 className={cn("text-sm font-semibold", config.color)}>
            {config.label}
          </h3>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-3 rounded-xl min-h-[200px] p-2 transition-colors duration-150",
          isOver
            ? "bg-primary/5 ring-2 ring-primary/20 ring-dashed"
            : "bg-muted/30"
        )}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-border">
            <p className="text-xs text-muted-foreground">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}
