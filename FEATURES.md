# Features

Detailed description of every implemented feature in TeamPulse, including user flows and business logic.

---

## Table of Contents

1. [Navigation & Layout](#1-navigation--layout)
2. [Dashboard Page](#2-dashboard-page)
3. [Task Management (Kanban Board)](#3-task-management-kanban-board)
4. [Team Page](#4-team-page)
5. [Settings Page](#5-settings-page)
6. [Dark / Light Mode](#6-dark--light-mode)

---

## 1. Navigation & Layout

### Sidebar

The sidebar is a collapsible navigation panel rendered on every page inside the `(dashboard)` route group.

**Behaviour:**
- Displays a logo (gradient lightning bolt icon + "TeamPulse" wordmark) at the top.
- Contains four navigation links: **Dashboard**, **Tasks**, **Team**, **Settings**.
- The active link is highlighted with a semi-transparent white background, violet icon tint, and a small violet indicator dot.
- A toggle button (chevron icon, positioned at the right edge of the sidebar) collapses it to icon-only mode (64 px wide) and expands it back (256 px wide). The transition is animated (300 ms ease-in-out).
- In collapsed mode, link labels are hidden; `title` attributes provide tooltip text on hover.
- A user footer section shows the logged-in user's initials avatar, full name ("Alex Johnson"), and role ("Admin"). This section is hidden when collapsed.
- Collapse state is **in-memory only** and resets on page refresh.

**User flow:**
```
User visits any page
  → Sidebar renders with active link highlighted
  → User clicks collapse button → sidebar shrinks to icon-only
  → User clicks expand button → sidebar returns to full width
  → User clicks a nav link → Next.js client-side navigation to that route
```

### Header

A sticky top bar rendered on every dashboard page.

**Behaviour:**
- Displays the page title (e.g. "Dashboard") and an optional subtitle (e.g. "Welcome back, Alex 👋").
- Contains a search input (hidden on screens narrower than `sm`, i.e. < 640 px).
- Contains a notification bell button with a violet indicator dot (static decoration — clicking it does nothing in the current implementation).
- Contains a theme toggle button (sun/moon icon) that switches between light and dark mode.
- Has `backdrop-blur-sm` and `bg-background/80` for a frosted-glass effect when content scrolls behind it.

---

## 2. Dashboard Page

**Route:** `/dashboard`

The overview page for the entire application, displaying key metrics and team activity.

### 2.1 KPI Cards

Four metric cards arranged in a 1→2→4 column responsive grid.

| Card | Metric | Trend Direction |
|---|---|---|
| Total Tasks | 1,284 | Up (+12% vs last month) |
| Completed | 863 | Up (+8% vs last month) |
| Active Members | 24 | Up (+3 new this month) |
| Sprint Velocity | 94 pts | Down (-4% vs last sprint) |

Each card features:
- A coloured gradient background overlay (purple, green, blue, orange respectively).
- A coloured icon badge in the top-right corner.
- The primary metric value in large bold text.
- A trend badge with a `TrendingUp` or `TrendingDown` icon and the change value.
- A secondary description label.
- A subtle hover lift (`-translate-y-0.5` + `shadow-md`).

### 2.2 Team Productivity Chart

A stacked area chart spanning two-thirds of the chart row.

- **Library:** Recharts `AreaChart`
- **Data:** Seven months (Jan–Jul), three series: Backend (violet), Frontend (blue), Design (green)
- **X-axis:** Month abbreviations; **Y-axis:** Percentage output (40–100 range)
- Gradient fills under each area line for visual depth
- Recharts `Tooltip` styled to match the card background and border tokens
- `Legend` displayed below the chart

### 2.3 Tasks This Week Chart

A grouped bar chart occupying one-third of the chart row.

- **Library:** Recharts `BarChart`
- **Data:** Seven days (Mon–Sun), two series: Completed (violet) and Pending (muted)
- Rounded bar tops (`radius={[4,4,0,0]}`)
- Vertical grid lines disabled for a cleaner look

### 2.4 Activity Feed

A card listing the six most recent team actions.

Each item shows:
- User avatar (initials, gradient violet background)
- Action sentence: `<UserName> <action> <target>` — e.g. "Sarah Chen completed task API Integration v2"
- Relative timestamp (e.g. "2 min ago")
- Colour-coded type icon:
  - ✅ Green `CheckCircle2` — task completed
  - → Blue `ArrowRight` — status change
  - 💬 Violet `MessageSquare` — comment
  - ➕ Orange `Plus` — task created
  - 👤 Sky `UserCheck` — task assigned

### 2.5 Sprint Overview Panel

A stat grid placed alongside the activity feed.

Displays six static data points:
- **Sprint** name and date range
- **Progress** percentage and days remaining
- **Velocity** points vs. target
- **Bugs** count with critical count
- **PRs Merged** this sprint
- **Deployments** count and status

---

## 3. Task Management (Kanban Board)

**Route:** `/tasks`

A drag-and-drop Kanban board for managing team tasks.

### 3.1 Columns

Three fixed columns, each identified by a `TaskStatus` value:

| Column | Status Value | Header Colour |
|---|---|---|
| To Do | `"todo"` | Slate |
| In Progress | `"in-progress"` | Blue |
| Done | `"done"` | Emerald |

Each column header shows:
- A coloured dot
- The column label
- A badge with the current task count

The column drop zone shows a dashed `ring-2 ring-primary/20` highlight when a card is dragged over it.

Empty columns display a dashed placeholder: "Drop tasks here".

### 3.2 Task Cards

Each task card displays:
- **Priority badge** — `High` (destructive/red), `Medium` (warning/amber), `Low` (info/blue)
- **Tag badges** (up to 2 shown) — e.g. "Design", "Backend", "Auth"
- **Title** — short task name
- **Description** — truncated at 2 lines (`line-clamp-2`)
- **Due date** — with a calendar icon
- **Assignee** — avatar initials + first name (hidden on very small screens)

Cards show a hover shadow lift. During drag the card renders at 50% opacity, 1° rotation, and 105% scale.

### 3.3 Drag-and-Drop Behaviour

Powered by `@dnd-kit/core` and `@dnd-kit/sortable`.

**Moving between columns:**
1. User starts dragging a card (pointer must travel ≥ 5 px to activate).
2. `handleDragOver` fires continuously during drag.
3. If the pointer crosses into a different column's drop zone, the task's `status` is updated immediately (optimistic UI).
4. On drop (`handleDragEnd`), if the task is now in a different column the status change persists.

**Reordering within a column:**
1. User drags a card over another card in the same column.
2. `handleDragEnd` detects same-column reorder and calls `arrayMove` to reorder the filtered array.
3. The full task list is reconstructed (other-column tasks preserved + reordered column tasks).

**Drag Overlay:**
- While dragging, the original card position shows the card at reduced opacity.
- A `DragOverlay` renders a floating copy of the card that follows the pointer.

### 3.4 Data Model

```typescript
type TaskPriority = "low" | "medium" | "high";
type TaskStatus   = "todo" | "in-progress" | "done";

interface Task {
  id:             string;
  title:          string;
  description:    string;
  priority:       TaskPriority;
  status:         TaskStatus;
  assignee:       string;       // Full name
  assigneeAvatar: string;       // Two-letter initials
  dueDate:        string;       // Display string, e.g. "Jun 25"
  tags:           string[];
}
```

The initial board state contains **10 tasks**: 4 in *To Do*, 3 in *In Progress*, 3 in *Done*.

**Limitation:** Task state is in-memory only. Refreshing the page resets the board to `initialTasks`.

---

## 4. Team Page

**Route:** `/team`

Displays all team members with individual profile cards.

### 4.1 Summary Stats Row

Four aggregate metrics displayed at the top of the page:
- **Total Members** — count of `teamMembers` array
- **Avg Productivity** — mean of all `member.productivity` values, rounded, formatted as `%`
- **Tasks Completed** — sum of all `member.tasksCompleted` values
- **In Progress** — sum of all `member.tasksInProgress` values

### 4.2 Member Grid

A responsive grid: 1 column (mobile) → 2 columns (sm) → 3 columns (xl) → 4 columns (2xl).

Members are sorted: **online** first, then **away**, then **offline** (using a static `statusOrder` map).

### 4.3 Member Card

Each card shows:
- **Avatar** — 48 × 48 px circle with initials and gradient background
- **Status dot** — 12 × 12 px coloured circle overlaid on the avatar (green = online, amber = away, slate = offline)
- **Name** and **role** title
- **Department badge** — coloured by department (Engineering → purple, Design → info, Infrastructure → warning, Product → success, Quality → purple, Data → info)
- **Status badge** — "Online" / "Away" / "Offline" with outline style
- **Productivity bar** — `Progress` component (0–100%), percentage value coloured green (≥90%), blue (≥75%), amber (<75%)
- **Task counters** — two mini stat boxes: "Completed" (emerald) and "In Progress" (blue)
- **Skills** — rendered as small `<span>` chips
- **Email address** — truncated, with mail icon

### 4.4 Data Model

```typescript
interface TeamMember {
  id:              string;
  name:            string;
  avatar:          string;       // Two-letter initials
  role:            string;
  department:      string;
  productivity:    number;       // 0–100
  tasksCompleted:  number;
  tasksInProgress: number;
  status:          "online" | "away" | "offline";
  email:           string;
  joinDate:        string;       // e.g. "Jan 2023"
  skills:          string[];
}
```

Eight members are defined in mock data across four departments: Engineering, Design, Infrastructure, Product, Quality, Data.

---

## 5. Settings Page

**Route:** `/settings`

All settings are managed in a single controlled component (`SettingsForm`) with four sections.

### 5.1 User Profile

- **Avatar display** — initials avatar with a "Change Avatar" button (non-functional in current implementation)
- **Form fields:** Full Name, Email Address, Role, Timezone — all editable `<input>` fields
- **Save Changes button** — renders correctly but does not persist (no backend)

### 5.2 Appearance

- A single toggle row: "Dark Mode"
- Toggling the `Switch` calls `next-themes` `setTheme("dark" | "light")`
- The icon changes between a sun (light) and moon (dark)
- Subtitle text updates dynamically: "Currently using dark theme" / "Currently using light theme"

### 5.3 Notification Preferences

Four toggle rows, each with a label and description:

| Toggle | Default | Description |
|---|---|---|
| Task Updates | On | Updates on tasks assigned to the user |
| Mentions | On | Mentions in comments |
| Weekly Digest | Off | Weekly summary of team activity |
| New Team Members | On | When someone joins the team |

Toggle state is managed in component state and does not persist.

### 5.4 Security

- Three password fields: Current Password, New Password, Confirm Password
- **Update Password button** — renders correctly but does not submit (no backend)

---

## 6. Dark / Light Mode

Dark mode is implemented at the application level, not per-component.

**How it works:**
1. `ThemeProvider` (from `next-themes`) wraps the entire app in `app/layout.tsx`.
2. The provider is configured with `attribute="class"`, `defaultTheme="light"`, and `enableSystem={false}`.
3. When the theme is `"dark"`, `next-themes` adds the class `.dark` to the `<html>` element.
4. `globals.css` defines two sets of CSS custom properties: one under `:root` (light) and one under `.dark`.
5. Tailwind utilities like `bg-background`, `text-foreground` etc. resolve to the appropriate HSL value automatically.

**User flow:**
- Toggle in the **header** (sun/moon icon button): available on every page.
- Toggle in **Settings → Appearance** (Switch component): same underlying `setTheme` call.
- The selected theme persists across browser sessions via `localStorage`.

**Note:** `suppressHydrationWarning` is set on the `<html>` element to prevent React hydration mismatches caused by the server rendering a different theme class than what `localStorage` provides on the client.
