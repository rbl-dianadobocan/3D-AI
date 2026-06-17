# API Reference

> **⚠️ Current state:** TeamPulse has **no API routes**. The `app/api/` directory does not exist. The application is a fully static, client-rendered frontend — all data is imported directly from `lib/mock-data.ts` at build time or runtime in the browser. No HTTP requests are made to a server.

This document describes the data models used internally, and provides a template for API routes that would need to be created when a backend is added.

---

## Data Models

All interfaces are defined in `lib/mock-data.ts` and are used as TypeScript types throughout the application.

### Task

```typescript
type TaskPriority = "low" | "medium" | "high";
type TaskStatus   = "todo" | "in-progress" | "done";

interface Task {
  id:             string;       // Unique task identifier (e.g. "t1")
  title:          string;       // Short task title
  description:    string;       // Longer description (displayed truncated)
  priority:       TaskPriority; // "low" | "medium" | "high"
  status:         TaskStatus;   // "todo" | "in-progress" | "done" (Kanban column)
  assignee:       string;       // Assignee full name
  assigneeAvatar: string;       // Two-letter initials for avatar
  dueDate:        string;       // Display string, e.g. "Jun 25"
  tags:           string[];     // Array of tag labels, e.g. ["Backend", "Auth"]
}
```

### TeamMember

```typescript
interface TeamMember {
  id:              string;                          // Unique member identifier
  name:            string;                          // Full name
  avatar:          string;                          // Two-letter initials
  role:            string;                          // Job title
  department:      string;                          // Department name
  productivity:    number;                          // 0–100 productivity score
  tasksCompleted:  number;                          // Total completed task count
  tasksInProgress: number;                          // Current in-progress count
  status:          "online" | "away" | "offline";  // Presence status
  email:           string;                          // Contact email
  joinDate:        string;                          // Display string, e.g. "Jan 2023"
  skills:          string[];                        // Array of skill labels
}
```

### KPI Card Data

```typescript
interface KpiItem {
  id:          string;          // "tasks" | "completed" | "active" | "velocity"
  title:       string;          // Display label
  value:       string;          // Primary metric value (formatted string)
  change:      string;          // Change string, e.g. "+12%" or "+3"
  trend:       "up" | "down";  // Trend direction
  description: string;          // Secondary label, e.g. "vs last month"
  color:       string;          // Theme colour key: "purple" | "green" | "blue" | "orange"
}
```

### Productivity Chart Data

```typescript
interface ProductivityDataPoint {
  month:    string;   // Month abbreviation, e.g. "Jan"
  backend:  number;   // Backend team output percentage
  frontend: number;   // Frontend team output percentage
  design:   number;   // Design team output percentage
}
```

### Tasks Chart Data

```typescript
interface TasksDataPoint {
  day:       string;  // Day abbreviation, e.g. "Mon"
  completed: number;  // Tasks completed that day
  pending:   number;  // Tasks still pending at end of day
}
```

### Activity Feed Item

```typescript
type ActivityType = "success" | "info" | "comment" | "create" | "assign";

interface ActivityItem {
  id:     string;        // Unique item identifier
  user:   string;        // Actor's full name
  avatar: string;        // Two-letter initials
  action: string;        // Verb phrase, e.g. "completed task"
  target: string;        // Target entity name
  time:   string;        // Relative time string, e.g. "2 min ago"
  type:   ActivityType;  // Used to select icon and colour
}
```

---

## Static Data Exports

All exported values from `lib/mock-data.ts`:

| Export | Type | Used By |
|---|---|---|
| `kpiData` | `KpiItem[]` | `app/(dashboard)/dashboard/page.tsx` |
| `productivityData` | `ProductivityDataPoint[]` | `components/dashboard/productivity-chart.tsx` |
| `tasksCompletedData` | `TasksDataPoint[]` | `components/dashboard/tasks-chart.tsx` |
| `activityFeed` | `ActivityItem[]` | `components/dashboard/activity-feed.tsx` |
| `initialTasks` | `Task[]` | `components/tasks/kanban-board.tsx` (initial state) |
| `teamMembers` | `TeamMember[]` | `app/(dashboard)/team/page.tsx` |

---

## Future API Routes

When a backend is added, the following API routes would be natural additions. They follow Next.js App Router conventions (`app/api/.../route.ts`).

### Tasks

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/tasks` | List all tasks with optional `?status=` filter |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update task fields (e.g. status, priority) |
| `DELETE` | `/api/tasks/:id` | Delete a task |

**Example `GET /api/tasks` response:**
```json
[
  {
    "id": "t1",
    "title": "Design new onboarding flow",
    "description": "Create wireframes and prototypes for the new user onboarding experience.",
    "priority": "high",
    "status": "todo",
    "assignee": "Priya Sharma",
    "assigneeAvatar": "PS",
    "dueDate": "Jun 25",
    "tags": ["Design", "UX"]
  }
]
```

**Example `POST /api/tasks` request body:**
```json
{
  "title": "Fix login redirect bug",
  "description": "After OAuth login, users are redirected to / instead of /dashboard.",
  "priority": "high",
  "status": "todo",
  "assignee": "Marcus Lee",
  "assigneeAvatar": "ML",
  "dueDate": "Jun 30",
  "tags": ["Backend", "Auth"]
}
```

### Team Members

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/team` | List all team members |
| `GET` | `/api/team/:id` | Get a single member |
| `PATCH` | `/api/team/:id` | Update member fields (e.g. status, role) |

### User / Settings

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/me` | Get current user profile |
| `PATCH` | `/api/me` | Update current user profile |
| `PATCH` | `/api/me/password` | Change password |
| `GET` | `/api/me/notifications` | Get notification preferences |
| `PATCH` | `/api/me/notifications` | Update notification preferences |

### Sprint / Dashboard Metrics

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/sprint/current` | Get current sprint data |
| `GET` | `/api/metrics/productivity` | Get team productivity time series |
| `GET` | `/api/metrics/tasks` | Get tasks completed/pending time series |
| `GET` | `/api/activity` | Get recent activity feed |

---

## Next.js Route Handler Template

```typescript
// app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  // fetch from database, filter by status ...
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // validate body, create task in database ...
  return NextResponse.json(newTask, { status: 201 });
}
```

```typescript
// app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  // update task in database ...
  return NextResponse.json(updatedTask);
}
```
