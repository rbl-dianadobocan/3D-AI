# TeamPulse — Modern Productivity Dashboard

> A production-ready SaaS-style team productivity dashboard built with **Next.js** (App Router), **TypeScript**, **Tailwind CSS v4**, **Radix UI**, **Recharts**, and **@dnd-kit**.

---

## 📸 Screenshots

<!-- TODO: Add screenshots of each page -->
| Dashboard | Task Board | Team | Settings |
|-----------|-----------|------|----------|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## ✨ Features

### 📊 Dashboard
- KPI cards with trend indicators (total tasks, completions, active members, sprint velocity)
- Team productivity area chart (monthly output by department: Backend, Frontend, Design)
- Weekly tasks bar chart (completed vs. pending per day)
- Activity feed with avatar initials and colour-coded action types
- Sprint overview stats panel (sprint name, progress, velocity, bugs, PRs merged, deployments)

### ✅ Task Management (Kanban Board)
- Three-column Kanban board: **To Do**, **In Progress**, **Done**
- Drag-and-drop between and within columns powered by `@dnd-kit`
- Task cards display priority badge, tags, description, due date, and assignee avatar
- Column task-count badges update live on drag
- Visual drag overlay with rotation effect during drag

### 👥 Team
- Member grid cards with avatar initials, role, department badge, and online status indicator
- Per-member productivity score with animated progress bar
- Tasks completed and in-progress counters
- Skills tag list and email address
- Summary stats row: total members, average productivity, total completions, total in-progress
- Members sorted by status: online → away → offline

### ⚙️ Settings
- **Dark / light mode toggle** (persisted in `localStorage` via `next-themes`)
- Notification preference toggles (task updates, mentions, weekly digest, new member)
- User profile form (name, email, role, timezone)
- Security / password change section

### 🎨 Design & UX
- Modern SaaS aesthetic with purple/violet accent palette and gradient backgrounds
- Full **dark mode** support via CSS custom properties
- Collapsible sidebar (full ↔ icon-only) with smooth transition
- Sticky header with search input and notification badge
- Responsive from mobile to wide desktop
- Custom thin scrollbars

---

## 🗂 Project Structure

```
├── app/
│   ├── layout.tsx                  # Root layout — wraps the app in ThemeProvider
│   ├── page.tsx                    # Root route — redirects to /dashboard
│   ├── globals.css                 # CSS custom properties (design tokens) + Tailwind v4 import
│   └── (dashboard)/                # Route group — applies the sidebar shell layout
│       ├── layout.tsx              # Dashboard shell: sidebar + <main>
│       ├── dashboard/page.tsx      # /dashboard — KPIs, charts, activity, sprint overview
│       ├── tasks/page.tsx          # /tasks — Kanban board
│       ├── team/page.tsx           # /team — member grid
│       └── settings/page.tsx       # /settings — profile, appearance, notifications, security
│
├── components/
│   ├── theme-provider.tsx          # next-themes wrapper
│   ├── ui/                         # Low-level, reusable UI primitives (Radix UI based)
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   └── switch.tsx
│   ├── layout/
│   │   ├── sidebar.tsx             # Collapsible sidebar navigation
│   │   └── header.tsx              # Sticky top header with search and theme toggle
│   ├── dashboard/
│   │   ├── kpi-card.tsx            # Single KPI metric card with trend badge
│   │   ├── productivity-chart.tsx  # Recharts AreaChart — monthly productivity by department
│   │   ├── tasks-chart.tsx         # Recharts BarChart — daily completed vs pending tasks
│   │   └── activity-feed.tsx       # Scrollable recent-activity list
│   ├── tasks/
│   │   ├── kanban-board.tsx        # DndContext, drag state management
│   │   ├── kanban-column.tsx       # Droppable column + SortableContext
│   │   └── task-card.tsx           # Individual task card (also used as DragOverlay)
│   ├── team/
│   │   └── member-card.tsx         # Team member profile card
│   └── settings/
│       └── settings-form.tsx       # All settings panels in one controlled component
│
└── lib/
    ├── utils.ts                    # cn() — Tailwind class merging helper
    └── mock-data.ts                # All static data + TypeScript types (Task, TeamMember, …)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or equivalent package manager)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rbl-dianadobocan/3D-AI.git
cd 3D-AI

# 2. Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The root route redirects automatically to `/dashboard`.

### Linting

```bash
npm run lint
```

### Build for Production

```bash
npm run build
npm start
```

### Deployment

The project is a standard Next.js App Router application and can be deployed to:

- **[Vercel](https://vercel.com)** — zero-configuration: connect the repo and push.
- **Any Node.js host** — run `npm run build` then `npm start` (requires Node.js ≥ 18).
- **Docker** — build a container image using a multi-stage Dockerfile (not included; see Next.js documentation for a reference `Dockerfile`).

> **No environment variables are required.** All data is static mock data defined in `lib/mock-data.ts`.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) (App Router) | 16.2.x | Framework, routing, SSR/SSG |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Static type checking |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first styling |
| [Radix UI](https://www.radix-ui.com) | various | Accessible primitive components |
| [Recharts](https://recharts.org) | 3.x | Composable React charts |
| [@dnd-kit](https://dndkit.com) | 6.x / 10.x | Drag-and-drop for the Kanban board |
| [Lucide React](https://lucide.dev) | 1.x | Icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.x | Dark / light mode management |
| [class-variance-authority](https://cva.style) | 0.7.x | Component variant management |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) + [clsx](https://github.com/lukeed/clsx) | — | Class merging utilities |

---

## 📝 Notes

- All data is **static mock data** defined in `lib/mock-data.ts` — no backend or database is required.
- Dark mode state is persisted in `localStorage` automatically by `next-themes`.
- The sidebar collapse state is stored in React local state and resets on page refresh.
- Drag-and-drop uses a pointer activation distance of 5 px to prevent accidental drags on click.
- For deeper documentation see: [ARCHITECTURE.md](./ARCHITECTURE.md), [FEATURES.md](./FEATURES.md), [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md), [API_REFERENCE.md](./API_REFERENCE.md).
