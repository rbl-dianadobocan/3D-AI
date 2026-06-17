"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";
import { initialTasks, type Task, type TaskStatus } from "@/lib/mock-data";

const COLUMNS: TaskStatus[] = ["todo", "in-progress", "done"];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if dropped over a column
    if (COLUMNS.includes(overId as TaskStatus)) {
      if (activeTask.status !== overId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, status: overId as TaskStatus } : t
          )
        );
      }
      return;
    }

    // Dropped over another task
    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    if (activeTask.status !== overTask.status) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // If dropped on a task in the same column, reorder
    if (overTask && activeTask.status === overTask.status) {
      setTasks((prev) => {
        const statusTasks = prev.filter((t) => t.status === activeTask.status);
        const otherTasks = prev.filter((t) => t.status !== activeTask.status);
        const oldIdx = statusTasks.findIndex((t) => t.id === activeId);
        const newIdx = statusTasks.findIndex((t) => t.id === overId);
        const reordered = arrayMove(statusTasks, oldIdx, newIdx);
        return [...otherTasks, ...reordered];
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
