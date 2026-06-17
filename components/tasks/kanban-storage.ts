import { type Task, type TaskStatus } from "@/lib/mock-data";

const KANBAN_STORAGE_KEY = "kanban:v1";
const COLUMNS: TaskStatus[] = ["todo", "in-progress", "done"];

export interface KanbanPersistedState {
  taskOrderByColumn: Record<TaskStatus, string[]>;
  taskStatusById: Record<string, TaskStatus>;
}

interface LoadedKanbanState {
  tasks: Task[];
}

function getDefaultPersistedState(defaultTasks: Task[]): KanbanPersistedState {
  return {
    taskOrderByColumn: {
      todo: defaultTasks.filter((task) => task.status === "todo").map((task) => task.id),
      "in-progress": defaultTasks
        .filter((task) => task.status === "in-progress")
        .map((task) => task.id),
      done: defaultTasks.filter((task) => task.status === "done").map((task) => task.id),
    },
    taskStatusById: Object.fromEntries(
      defaultTasks.map((task) => [task.id, task.status])
    ) as Record<string, TaskStatus>,
  };
}

function cloneTasks(tasks: Task[]): Task[] {
  return tasks.map((task) => ({ ...task, tags: [...task.tags] }));
}

function isTaskStatus(value: unknown): value is TaskStatus {
  return value === "todo" || value === "in-progress" || value === "done";
}

export function isValidKanbanState(data: unknown): data is KanbanPersistedState {
  if (!data || typeof data !== "object") {
    return false;
  }

  const state = data as Partial<KanbanPersistedState>;

  if (!state.taskOrderByColumn || typeof state.taskOrderByColumn !== "object") {
    return false;
  }

  if (!state.taskStatusById || typeof state.taskStatusById !== "object") {
    return false;
  }

  for (const column of COLUMNS) {
    const columnOrder = state.taskOrderByColumn[column];
    if (!Array.isArray(columnOrder)) {
      return false;
    }

    if (!columnOrder.every((taskId) => typeof taskId === "string")) {
      return false;
    }
  }

  for (const status of Object.values(state.taskStatusById)) {
    if (!isTaskStatus(status)) {
      return false;
    }
  }

  return true;
}

function toTasks(
  persistedState: KanbanPersistedState,
  defaultTasks: Task[]
): Task[] {
  const defaultTaskMap = new Map(defaultTasks.map((task) => [task.id, task]));
  const seenTaskIds = new Set<string>();
  const normalizedOrderByColumn: Record<TaskStatus, string[]> = {
    todo: [],
    "in-progress": [],
    done: [],
  };

  for (const column of COLUMNS) {
    for (const taskId of persistedState.taskOrderByColumn[column]) {
      if (!defaultTaskMap.has(taskId) || seenTaskIds.has(taskId)) {
        continue;
      }

      seenTaskIds.add(taskId);
      normalizedOrderByColumn[column].push(taskId);
    }
  }

  for (const task of defaultTasks) {
    if (seenTaskIds.has(task.id)) {
      continue;
    }

    const preferredStatus = persistedState.taskStatusById[task.id];
    const resolvedStatus = isTaskStatus(preferredStatus)
      ? preferredStatus
      : task.status;

    normalizedOrderByColumn[resolvedStatus].push(task.id);
    seenTaskIds.add(task.id);
  }

  const rebuiltTasks: Task[] = [];
  for (const column of COLUMNS) {
    for (const taskId of normalizedOrderByColumn[column]) {
      const task = defaultTaskMap.get(taskId);
      if (!task) {
        continue;
      }

      rebuiltTasks.push({ ...task, status: column, tags: [...task.tags] });
    }
  }

  return rebuiltTasks;
}

export function loadKanbanState(defaultTasks: Task[]): LoadedKanbanState {
  if (typeof window === "undefined") {
    return { tasks: cloneTasks(defaultTasks) };
  }

  try {
    const rawValue = window.localStorage.getItem(KANBAN_STORAGE_KEY);
    if (!rawValue) {
      return { tasks: cloneTasks(defaultTasks) };
    }

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!isValidKanbanState(parsedValue)) {
      return { tasks: cloneTasks(defaultTasks) };
    }

    return { tasks: toTasks(parsedValue, defaultTasks) };
  } catch {
    return { tasks: cloneTasks(defaultTasks) };
  }
}

export function saveKanbanState(state: KanbanPersistedState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(KANBAN_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota/private mode errors and keep UI interactive.
  }
}

