# TeamPulse — Modern Productivity Dashboard

A production-ready SaaS-style team productivity dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Recharts**, and **Lucide Icons**.

---

## ✨ Features

### 📊 Dashboard
- KPI cards with trend indicators (tasks, completions, active members, sprint velocity)
- Team productivity area chart (monthly, by department)
- Weekly tasks completed bar chart
- Live activity feed with avatars and action types
- Sprint overview stats panel

### ✅ Task Management
- Full **Kanban board** with three columns: *To Do*, *In Progress*, *Done*
- **Drag-and-drop** support powered by `@dnd-kit`
- Task cards with priority badges, tags, due dates, and assignee avatars
- Cross-column drag with automatic status updates

### 👥 Team Page
- Member cards with avatar, role, department, and online/away/offline status
- Productivity score with animated progress bar
- Tasks completed & in-progress stats
- Skills tags and email display
- Summary stats row (avg productivity, total completions, etc.)

### ⚙️ Settings Page
- **Dark mode toggle** (persisted via `next-themes`)
- Notification preferences with individual toggles
- User profile section (name, email, role, timezone)
- Security / password change section

### 🎨 Design
- Modern SaaS look with beautiful gradients and subtle animations
- Responsive layout (mobile → desktop)
- Collapsible sidebar navigation
- Clean typography with system font stack
- Smooth hover transitions and micro-interactions
- Dark / light mode with full CSS-variable theming

---

## 🗂 Project Structure

```
├── app/
│   ├── layout.tsx                  # Root layout (ThemeProvider)
│   ├── page.tsx                    # Redirect → /dashboard
│   ├── globals.css                 # Design tokens & global styles
│   └── (dashboard)/
│       ├── layout.tsx              # Dashboard shell (sidebar + main)
│       ├── dashboard/page.tsx      # /dashboard
│       ├── tasks/page.tsx          # /tasks
│       ├── team/page.tsx           # /team
│       └── settings/page.tsx       # /settings
│
├── components/
│   ├── theme-provider.tsx
│   ├── ui/                         # Primitive UI components
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
│   │   ├── sidebar.tsx             # Collapsible sidebar
│   │   └── header.tsx              # Sticky header w/ search & theme toggle
│   ├── dashboard/
│   │   ├── kpi-card.tsx
│   │   ├── productivity-chart.tsx
│   │   ├── tasks-chart.tsx
│   │   └── activity-feed.tsx
│   ├── tasks/
│   │   ├── kanban-board.tsx        # DnD context & state
│   │   ├── kanban-column.tsx       # Droppable column
│   │   └── task-card.tsx           # Sortable task card
│   ├── team/
│   │   └── member-card.tsx
│   └── settings/
│       └── settings-form.tsx
│
└── lib/
    ├── utils.ts                    # cn() helper
    └── mock-data.ts                # All mock data & TypeScript types
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework & routing |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Radix UI primitives | Accessible UI components |
| Recharts | Charts & data visualisation |
| @dnd-kit | Drag-and-drop Kanban |
| Lucide React | Icons |
| next-themes | Dark / light mode |
| class-variance-authority | Component variant management |
| tailwind-merge + clsx | Class merging utilities |

---

## 📝 Notes

- All data is **mock data** defined in `lib/mock-data.ts` — no backend required.
- Dark mode state is persisted in `localStorage` via `next-themes`.
- The sidebar can be collapsed to icon-only mode via the toggle button.
- Drag-and-drop uses pointer distance of 5 px to avoid accidental drags on click.
