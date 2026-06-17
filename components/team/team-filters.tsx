"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MemberCard } from "./member-card";
import type { TeamMember } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Infrastructure",
  "Product",
  "Quality",
  "Data",
] as const;

type StatusFilter = "online" | "away" | "offline";

const STATUS_OPTIONS: { value: StatusFilter; label: string; active: string }[] = [
  {
    value: "online",
    label: "Online",
    active:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  {
    value: "away",
    label: "Away",
    active:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  },
  {
    value: "offline",
    label: "Offline",
    active: "bg-secondary text-secondary-foreground border-border",
  },
];

const STATUS_ORDER: Record<string, number> = { online: 0, away: 1, offline: 2 };

const INACTIVE_PILL =
  "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground";

interface TeamFiltersProps {
  members: TeamMember[];
}

export function TeamFilters({ members }: TeamFiltersProps) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusFilter | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return [...members]
      .filter((m) => {
        if (dept && m.department !== dept) return false;
        if (status && m.status !== status) return false;
        if (
          q &&
          !m.name.toLowerCase().includes(q) &&
          !m.role.toLowerCase().includes(q) &&
          !m.email.toLowerCase().includes(q) &&
          !m.skills.some((s) => s.toLowerCase().includes(q))
        )
          return false;
        return true;
      })
      .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
  }, [members, search, dept, status]);

  const hasFilters = !!search || !!dept || !!status;

  return (
    <div className="space-y-4">
      {/* Row 1: search + status pills */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search name, role, skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm bg-muted/50 border-0 focus-visible:ring-1"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STATUS_OPTIONS.map(({ value, label, active }) => (
            <button
              key={value}
              onClick={() => setStatus(status === value ? null : value)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                status === value ? active : INACTIVE_PILL
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: department pills + clear */}
      <div className="flex flex-wrap gap-1.5">
        {DEPARTMENTS.map((d) => (
          <button
            key={d}
            onClick={() => setDept(dept === d ? null : d)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
              dept === d
                ? "bg-primary text-primary-foreground border-primary"
                : INACTIVE_PILL
            )}
          >
            {d}
          </button>
        ))}

        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setDept(null);
              setStatus(null);
            }}
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-destructive border border-destructive/30 hover:bg-destructive/5 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        of {members.length} members
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Search className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm font-medium text-foreground">No members found</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}

