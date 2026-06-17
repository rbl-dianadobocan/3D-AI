import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Task } from "@/lib/mock-data";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const priorityConfig = {
  low: { label: "Low", variant: "info" as const },
  medium: { label: "Medium", variant: "warning" as const },
  high: { label: "High", variant: "destructive" as const },
};

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const priority = priorityConfig[task.priority];

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-sm cursor-grab active:cursor-grabbing",
        "transition-all duration-150 hover:shadow-md hover:border-border/80",
        isDragging && "opacity-50 shadow-lg rotate-1 scale-105"
      )}
    >
      {/* Priority + Tags */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <Badge variant={priority.variant} className="text-[10px]">
          {priority.label}
        </Badge>
        {task.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-foreground leading-snug mb-1.5">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{task.dueDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-[10px] font-bold">
              {task.assigneeAvatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {task.assignee.split(" ")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
