"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  loadKanbanState,
  saveKanbanState,
  type KanbanPersistedState,
} from "./kanban-storage";
import { initialTasks, type Task, type TaskStatus } from "@/lib/mock-data";
import { teamMembers } from "@/lib/mock-data";

const COLUMNS: TaskStatus[] = ["todo", "in-progress", "done"];

function generateTaskId(existingTasks: Task[]): string {
  const numIds = existingTasks
    .map((t) => {
      const match = t.id.match(/^t(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));
  const maxId = numIds.length > 0 ? Math.max(...numIds) : 0;
  return `t${maxId + 1}`;
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadKanbanState(initialTasks).tasks
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const hasMountedRef = useRef(false);

  // Listen for custom task:create event from quick task modal
  useEffect(() => {
    const handleTaskCreate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const input = customEvent.detail;

      const assigneeData = input.assigneeId
        ? teamMembers.find((m) => m.id === input.assigneeId)
        : null;

      const newTask: Task = {
        id: generateTaskId(tasks),
        title: input.title,
        description: input.description,
        priority: input.priority,
        status: "todo" as TaskStatus,
        assignee: assigneeData?.name || "Unassigned",
        assigneeAvatar: assigneeData?.avatar || "UN",
        dueDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        tags: [],
      };

      setTasks((prev) => [newTask, ...prev]);
    };

    window.addEventListener("task:create", handleTaskCreate);
    return () => window.removeEventListener("task:create", handleTaskCreate);
  }, [tasks]);

  // Persist board state to localStorage
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const persistedState: KanbanPersistedState = {
      taskOrderByColumn: {
        todo: tasks.filter((task) => task.status === "todo").map((task) => task.id),
        "in-progress": tasks
          .filter((task) => task.status === "in-progress")
          .map((task) => task.id),
        done: tasks.filter((task) => task.status === "done").map((task) => task.id),
      },
      taskStatusById: Object.fromEntries(tasks.map((task) => [task.id, task.status])),
    };

    saveKanbanState(persistedState);
  }, [tasks]);

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
