import { Mail, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/mock-data";

const statusConfig = {
  online: { label: "Online", color: "bg-emerald-400" },
  away: { label: "Away", color: "bg-amber-400" },
  offline: { label: "Offline", color: "bg-slate-400" },
};

const departmentColors: Record<string, string> = {
  Engineering: "purple",
  Design: "info",
  Infrastructure: "warning",
  Product: "success",
  Quality: "purple",
  Data: "info",
};

interface MemberCardProps {
  member: TeamMember;
}

export function MemberCard({ member }: MemberCardProps) {
  const status = statusConfig[member.status];
  const deptVariant = (departmentColors[member.department] || "secondary") as
    | "purple"
    | "info"
    | "warning"
    | "success"
    | "secondary";

  const productivity = member.productivity;
  const productivityColor =
    productivity >= 90
      ? "text-emerald-600 dark:text-emerald-400"
      : productivity >= 75
      ? "text-blue-600 dark:text-blue-400"
      : "text-amber-600 dark:text-amber-400";

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold">
                {member.avatar}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-card",
                status.color
              )}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground truncate">
              {member.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {member.role}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              <Badge variant={deptVariant} className="text-[10px]">
                {member.department}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Productivity */}
        <div className="mb-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Productivity</span>
            <span className={cn("text-sm font-bold", productivityColor)}>
              {productivity}%
            </span>
          </div>
          <Progress value={productivity} className="h-1.5" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg bg-muted/50 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-sm font-bold">{member.tasksCompleted}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Completed</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-0.5">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-sm font-bold">{member.tasksInProgress}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">In Progress</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4 flex flex-wrap gap-1">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="inline-block rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-3">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{member.email}</span>
        </div>
      </CardContent>
    </Card>
  );
}
