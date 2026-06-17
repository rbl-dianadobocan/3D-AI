# Developer Guide

Everything a new developer needs to get up and running with TeamPulse, understand the codebase, and contribute effectively.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Getting Started](#2-getting-started)
3. [Folder Structure](#3-folder-structure)
4. [Coding Conventions](#4-coding-conventions)
5. [Adding a New Feature](#5-adding-a-new-feature)
6. [How to Run Tests](#6-how-to-run-tests)
7. [Troubleshooting](#7-troubleshooting)
8. [Technical Debt & Known Issues](#8-technical-debt--known-issues)

---

## 1. Prerequisites

| Tool | Minimum Version | Notes |
|---|---|---|
| Node.js | 18.x | 20.x recommended |
| npm | 9.x | Comes with Node.js |
| Git | Any recent version | |
| VS Code (recommended) | Latest | Install the Tailwind CSS IntelliSense extension |

No other services are required — the app uses static mock data and has no database or backend.

---

## 2. Getting Started

```bash
# Clone
git clone https://github.com/rbl-dianadobocan/3D-AI.git
cd 3D-AI

# Install dependencies
npm install

# Start the development server (hot-reload enabled)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/dashboard`.

### Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js in development mode (port 3000) |
| `npm run build` | Create a production build in `.next/` |
| `npm start` | Serve the production build (requires `npm run build` first) |
| `npm run lint` | Run ESLint across the entire project |

---

## 3. Folder Structure

```
3D-AI/
├── app/                          # Next.js App Router
│   ├── globals.css               # Design tokens (CSS custom properties) + Tailwind v4
│   ├── layout.tsx                # Root layout — ThemeProvider wraps everything
│   ├── page.tsx                  # Root route — redirects to /dashboard
│   └── (dashboard)/              # Route group — shared sidebar layout
│       ├── layout.tsx            # Sidebar + <main> shell
│       ├── dashboard/page.tsx    # Dashboard overview page
│       ├── tasks/page.tsx        # Kanban board page
│       ├── team/page.tsx         # Team members page
│       └── settings/page.tsx     # Settings page
│
├── components/
│   ├── theme-provider.tsx        # next-themes wrapper (re-exported)
│   ├── ui/                       # Low-level primitives — do not add business logic here
│   │   ├── avatar.tsx
│   │   ├── badge.tsx             # CVA-based badge with variants: default, secondary,
│   │   │                         #   destructive, outline, success, warning, info, purple
│   │   ├── button.tsx
│   │   ├── card.tsx              # Card, CardHeader, CardTitle, CardDescription,
│   │   │                         #   CardContent, CardFooter
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   └── switch.tsx
│   ├── layout/                   # App-shell components
│   │   ├── sidebar.tsx           # "use client" — collapse toggle, active link detection
│   │   └── header.tsx            # "use client" — theme toggle, search, notification bell
│   ├── dashboard/                # Dashboard-specific display components
│   │   ├── kpi-card.tsx
│   │   ├── productivity-chart.tsx  # "use client" — Recharts AreaChart
│   │   ├── tasks-chart.tsx         # "use client" — Recharts BarChart
│   │   └── activity-feed.tsx
│   ├── tasks/                    # Kanban board components
│   │   ├── kanban-board.tsx      # "use client" — DnD state root
│   │   ├── kanban-column.tsx     # "use client" — useDroppable, SortableContext
│   │   └── task-card.tsx         # Presentational — used both inline and in DragOverlay
│   ├── team/
│   │   └── member-card.tsx
│   └── settings/
│       └── settings-form.tsx     # "use client" — all settings panels, local state
│
├── lib/
│   ├── mock-data.ts              # ⭐ Single source of truth for all data + TypeScript types
│   └── utils.ts                  # cn() — clsx + tailwind-merge
│
├── public/                       # Static assets (SVG icons)
├── next.config.ts                # Next.js configuration (currently empty)
├── tsconfig.json                 # TypeScript config — strict mode, @/* path alias
├── eslint.config.mjs             # ESLint — next/core-web-vitals + next/typescript
└── postcss.config.mjs            # PostCSS — @tailwindcss/postcss plugin
```

### Key Conventions

- **`app/` = routing only.** Pages should be thin — import feature components and pass data.
- **`components/ui/` = primitives only.** No application logic or data imports here.
- **`lib/mock-data.ts` = data layer.** All TypeScript interfaces and static data live here.
- **`"use client"` directive** is required on any component that uses React hooks, browser APIs, or Recharts (which uses `ResizeObserver`).

---

## 4. Coding Conventions

### TypeScript

- Strict mode is enabled (`"strict": true` in `tsconfig.json`).
- Use `interface` for object shapes; `type` for unions and aliases.
- Prefer explicit return types on exported functions.
- Types that are used across multiple files belong in `lib/mock-data.ts` (or a dedicated `lib/types.ts` if the file grows large).

### Styling

- **Tailwind CSS v4** utility classes only — no inline styles or CSS Modules.
- Use the `cn()` helper (`lib/utils.ts`) for conditional and merged class strings:
  ```tsx
  className={cn("base-classes", condition && "conditional-class", className)}
  ```
- Design tokens are CSS custom properties defined in `globals.css`. Use semantic tokens (`bg-background`, `text-foreground`, `border-border`, etc.) rather than hardcoded colour values.
- For dark mode, use the `dark:` variant (e.g. `dark:text-slate-400`).

### Component Structure

```tsx
// 1. "use client" if needed (must be first line)
"use client";

// 2. React + library imports
import { useState } from "react";
import { SomeIcon } from "lucide-react";

// 3. Internal imports
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// 4. Types / interfaces
interface MyComponentProps {
  title: string;
  optional?: boolean;
}

// 5. Component function
export function MyComponent({ title, optional = false }: MyComponentProps) {
  return (
    <div>...</div>
  );
}
```

### File & Directory Naming

- Files: `kebab-case.tsx`
- Components: `PascalCase` named export
- Hooks (when added): `use-kebab-case.ts`
- Utilities: `kebab-case.ts`

### Imports

Use the `@/` path alias (maps to the project root):
```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

---

## 5. Adding a New Feature

### Example: Adding a new page `/reports`

**Step 1 — Create the page file:**
```
app/(dashboard)/reports/page.tsx
```

**Step 2 — Add the page component:**
```tsx
import { Header } from "@/components/layout/header";

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Reports" description="Your analytics and reports" />
      <div className="flex-1 p-6">
        {/* Feature components go here */}
      </div>
    </div>
  );
}
```

**Step 3 — Add a sidebar link** in `components/layout/sidebar.tsx`:
```tsx
import { BarChart2 } from "lucide-react";

const navItems = [
  // ... existing items ...
  { href: "/reports", icon: BarChart2, label: "Reports" },
];
```

**Step 4 — Add mock data** (if needed) to `lib/mock-data.ts`:
```typescript
export interface ReportData {
  id: string;
  title: string;
  // ...
}

export const reportsData: ReportData[] = [
  // ...
];
```

**Step 5 — Create feature components** in `components/reports/`:
```
components/reports/report-card.tsx
components/reports/report-chart.tsx
```

**Step 6 — Lint and build:**
```bash
npm run lint
npm run build
```

### Example: Adding a new UI primitive

Add the file to `components/ui/`. Follow the existing pattern — use Radix UI as the accessible base, expose a `className` prop, and use `cn()` for class merging. Export named components only.

---

## 6. How to Run Tests

**There are currently no tests in this project.**

The test infrastructure (Jest, Vitest, Playwright, Cypress, etc.) has not been configured.

### Recommended testing setup to add

| Type | Tool | Command to add |
|---|---|---|
| Unit / component tests | [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | `npm run test` |
| End-to-end tests | [Playwright](https://playwright.dev) | `npm run e2e` |

To add Vitest:
```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```

Then add `"test": "vitest"` to the `scripts` section of `package.json`.

---

## 7. Troubleshooting

### Port 3000 already in use

```bash
# Kill whatever is using port 3000
npx kill-port 3000
# or start Next.js on a different port
npm run dev -- -p 3001
```

### TypeScript errors after pulling changes

```bash
# Clear the Next.js build cache
rm -rf .next
npm run dev
```

### Tailwind classes not applying

- Make sure you are using the correct semantic token names (e.g. `bg-background`, not `bg-white`).
- Check that the file is included in Tailwind's content detection (any `*.tsx` file in the project root is automatically detected by Tailwind v4's content scanner).
- Restart the dev server after adding new CSS custom properties.

### `next-themes` hydration warning

The `suppressHydrationWarning` on `<html>` in `app/layout.tsx` is intentional. If you see hydration errors about other elements, check that server-rendered content does not depend on `useTheme()` — those components must be client components.

### Dark mode not working for a new component

1. Ensure you are using semantic CSS token classes (e.g. `bg-card`, `text-foreground`).
2. For colours not covered by the token system, use Tailwind's `dark:` variant explicitly:
   ```tsx
   className="text-slate-600 dark:text-slate-400"
   ```

### Drag-and-drop not activating

The `PointerSensor` requires the pointer to move at least **5 px** before drag starts. This prevents accidental drags on clicks. If you need to test drag behaviour, move the pointer a few pixels before releasing.

---

## 8. Technical Debt & Known Issues

| Issue | Severity | Notes |
|---|---|---|
| No tests | High | No unit, integration, or E2E tests exist |
| No CI/CD | High | No automated build or deploy pipeline |
| All state is ephemeral | High | Kanban moves, settings changes, and sidebar collapse state reset on refresh |
| No authentication | High | Any user can access all pages |
| No backend / API | Medium | All data is static mock data; real product needs a data layer |
| Sprint overview data inlined in page | Low | Should be extracted to `lib/mock-data.ts` |
| Notification bell is non-functional | Low | Button renders but clicking it does nothing |
| "Change Avatar" button is non-functional | Low | Renders but has no handler |
| "Save Changes" / "Update Password" buttons are non-functional | Low | Render but have no handlers |
| Sidebar collapse state not persisted | Low | Could be stored in `localStorage` |
| Settings form state not persisted | Low | Resets on navigation |
| No loading states | Low | Data is synchronous today; would need skeletons with a real API |
| No error boundaries | Low | An unhandled render error would crash the entire page |
| `TaskCard` `priorityConfig` maps `low → "info"` variant | Low | Implicit mapping; an explicit comment would improve readability |
