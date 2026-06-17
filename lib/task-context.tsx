"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { TaskPriority } from "@/lib/mock-data";

interface CreateTaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  assigneeId?: string;
}

interface TaskContextValue {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  addTask: (input: CreateTaskInput) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addTask = (input: CreateTaskInput) => {
    // Dispatch custom event that kanban-board listens for
    const event = new CustomEvent("task:create", { detail: input });
    window.dispatchEvent(event);
    closeModal();
  };

  return (
    <TaskContext.Provider value={{ isModalOpen, openModal, closeModal, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within TaskProvider");
  }
  return context;
}

