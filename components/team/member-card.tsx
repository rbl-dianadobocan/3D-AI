import { Mail, CheckCircle2, Clock, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/mock-data";

const statusConfig = {
  online: { label: "Online", dot: "bg-emerald-400", badge: "success" as const },
  away:   { label: "Away",   dot: "bg-amber-400",   badge: "warning" as const },
  offline:{ label: "Offline",dot: "bg-slate-400",   badge: "secondary" as const },
};

const departmentColors: Record<string, string> = {
  Engineering: "purple",
  Design: "info",
  Infrastructure: "warning",
  Product: "success",
  Quality: "purple",
  Data: "info",
};

const avatarGradients: Record<string, string> = {
  Engineering: "from-violet-500 to-purple-600",
  Design: "from-sky-500 to-blue-600",
  Infrastructure: "from-amber-500 to-orange-600",
  Product: "from-emerald-500 to-teal-600",
  Quality: "from-rose-500 to-pink-600",
  Data: "from-cyan-500 to-blue-600",
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

  const avatarGradient =
    avatarGradients[member.department] ?? "from-violet-500 to-purple-600";

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
              <AvatarFallback
                className={cn(
                  "bg-gradient-to-br text-white text-sm font-bold",
                  avatarGradient
                )}
              >
                {member.avatar}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-card",
                status.dot
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
              <Badge variant={status.badge} className="text-[10px]">
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

        {/* Join date + Email */}
        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span>Joined {member.joinDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
