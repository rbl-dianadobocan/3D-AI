import { Header } from "@/components/layout/header";
import { TeamFilters } from "@/components/team/team-filters";
import { teamMembers } from "@/lib/mock-data";

export default function TeamPage() {
  const online = teamMembers.filter((m) => m.status === "online").length;
  const away = teamMembers.filter((m) => m.status === "away").length;

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Team"
        description={`${teamMembers.length} members · ${online} online · ${away} away`}
      />
      <div className="flex-1 p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Members", value: teamMembers.length },
            {
              label: "Avg Productivity",
              value:
                Math.round(
                  teamMembers.reduce((acc, m) => acc + m.productivity, 0) /
                    teamMembers.length
                ) + "%",
            },
            {
              label: "Tasks Completed",
              value: teamMembers.reduce(
                (acc, m) => acc + m.tasksCompleted,
                0
              ),
            },
            {
              label: "In Progress",
              value: teamMembers.reduce(
                (acc, m) => acc + m.tasksInProgress,
                0
              ),
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Filterable member grid */}
        <TeamFilters members={teamMembers} />
      </div>
    </div>
  );
}
