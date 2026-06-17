import { Header } from "@/components/layout/header";
import { KanbanBoard } from "@/components/tasks/kanban-board";

export default function TasksPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Task Management"
        description="Drag and drop tasks across columns"
      />
      <div className="flex-1 p-6">
        <KanbanBoard />
      </div>
    </div>
  );
}
