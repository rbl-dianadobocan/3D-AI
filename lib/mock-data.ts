// ─── KPI Data ────────────────────────────────────────────────────────────────
export const kpiData = [
  {
    id: "tasks",
    title: "Total Tasks",
    value: "1,284",
    change: "+12%",
    trend: "up" as const,
    description: "vs last month",
    color: "purple",
  },
  {
    id: "completed",
    title: "Completed",
    value: "863",
    change: "+8%",
    trend: "up" as const,
    description: "vs last month",
    color: "green",
  },
  {
    id: "active",
    title: "Active Members",
    value: "24",
    change: "+3",
    trend: "up" as const,
    description: "new this month",
    color: "blue",
  },
  {
    id: "velocity",
    title: "Sprint Velocity",
    value: "94",
    change: "-4%",
    trend: "down" as const,
    description: "vs last sprint",
    color: "orange",
  },
];

// ─── Productivity Chart ───────────────────────────────────────────────────────
export const productivityData = [
  { month: "Jan", backend: 72, frontend: 61, design: 45 },
  { month: "Feb", backend: 68, frontend: 75, design: 52 },
  { month: "Mar", backend: 85, frontend: 80, design: 68 },
  { month: "Apr", backend: 78, frontend: 72, design: 74 },
  { month: "May", backend: 90, frontend: 88, design: 82 },
  { month: "Jun", backend: 95, frontend: 92, design: 79 },
  { month: "Jul", backend: 88, frontend: 85, design: 88 },
];

// ─── Tasks Completed Chart ────────────────────────────────────────────────────
export const tasksCompletedData = [
  { day: "Mon", completed: 14, pending: 5 },
  { day: "Tue", completed: 22, pending: 8 },
  { day: "Wed", completed: 18, pending: 6 },
  { day: "Thu", completed: 27, pending: 3 },
  { day: "Fri", completed: 21, pending: 7 },
  { day: "Sat", completed: 9, pending: 2 },
  { day: "Sun", completed: 6, pending: 1 },
];

// ─── Activity Feed ────────────────────────────────────────────────────────────
export const activityFeed = [
  {
    id: "1",
    user: "Sarah Chen",
    avatar: "SC",
    action: "completed task",
    target: "API Integration v2",
    time: "2 min ago",
    type: "success" as const,
  },
  {
    id: "2",
    user: "Marcus Lee",
    avatar: "ML",
    action: "moved to In Progress",
    target: "Dashboard Redesign",
    time: "15 min ago",
    type: "info" as const,
  },
  {
    id: "3",
    user: "Priya Sharma",
    avatar: "PS",
    action: "commented on",
    target: "User Authentication",
    time: "1 hr ago",
    type: "comment" as const,
  },
  {
    id: "4",
    user: "Jake Morris",
    avatar: "JM",
    action: "created task",
    target: "Performance Optimization",
    time: "2 hr ago",
    type: "create" as const,
  },
  {
    id: "5",
    user: "Amara Osei",
    avatar: "AO",
    action: "completed task",
    target: "Mobile Responsive Layout",
    time: "3 hr ago",
    type: "success" as const,
  },
  {
    id: "6",
    user: "Ryan Park",
    avatar: "RP",
    action: "assigned",
    target: "Database Schema Update",
    time: "5 hr ago",
    type: "assign" as const,
  },
];

// ─── Tasks (Kanban) ───────────────────────────────────────────────────────────
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  tags: string[];
}

export const initialTasks: Task[] = [
  // TODO
  {
    id: "t1",
    title: "Design new onboarding flow",
    description: "Create wireframes and prototypes for the new user onboarding experience.",
    priority: "high",
    status: "todo",
    assignee: "Priya Sharma",
    assigneeAvatar: "PS",
    dueDate: "Jun 25",
    tags: ["Design", "UX"],
  },
  {
    id: "t2",
    title: "Implement OAuth2 integration",
    description: "Add Google and GitHub OAuth2 sign-in support to the auth module.",
    priority: "high",
    status: "todo",
    assignee: "Marcus Lee",
    assigneeAvatar: "ML",
    dueDate: "Jun 28",
    tags: ["Backend", "Auth"],
  },
  {
    id: "t3",
    title: "Write unit tests for payment service",
    description: "Achieve 80% code coverage for the payment processing module.",
    priority: "medium",
    status: "todo",
    assignee: "Jake Morris",
    assigneeAvatar: "JM",
    dueDate: "Jul 2",
    tags: ["Testing"],
  },
  {
    id: "t4",
    title: "Update API documentation",
    description: "Refresh OpenAPI specs to reflect the latest endpoint changes.",
    priority: "low",
    status: "todo",
    assignee: "Amara Osei",
    assigneeAvatar: "AO",
    dueDate: "Jul 5",
    tags: ["Docs"],
  },
  // IN PROGRESS
  {
    id: "t5",
    title: "Dashboard performance audit",
    description: "Profile and optimize React rendering bottlenecks in the dashboard.",
    priority: "high",
    status: "in-progress",
    assignee: "Sarah Chen",
    assigneeAvatar: "SC",
    dueDate: "Jun 22",
    tags: ["Frontend", "Performance"],
  },
  {
    id: "t6",
    title: "Mobile responsive overhaul",
    description: "Ensure all pages render correctly on screens smaller than 768px.",
    priority: "medium",
    status: "in-progress",
    assignee: "Ryan Park",
    assigneeAvatar: "RP",
    dueDate: "Jun 24",
    tags: ["Frontend", "CSS"],
  },
  {
    id: "t7",
    title: "Database query optimization",
    description: "Add indexes and rewrite N+1 queries in the reporting module.",
    priority: "high",
    status: "in-progress",
    assignee: "Marcus Lee",
    assigneeAvatar: "ML",
    dueDate: "Jun 23",
    tags: ["Backend", "DB"],
  },
  // DONE
  {
    id: "t8",
    title: "CI/CD pipeline setup",
    description: "Configure GitHub Actions for automated testing and deployment.",
    priority: "high",
    status: "done",
    assignee: "Jake Morris",
    assigneeAvatar: "JM",
    dueDate: "Jun 15",
    tags: ["DevOps"],
  },
  {
    id: "t9",
    title: "Figma design system",
    description: "Build a comprehensive component library in Figma for the team.",
    priority: "medium",
    status: "done",
    assignee: "Priya Sharma",
    assigneeAvatar: "PS",
    dueDate: "Jun 10",
    tags: ["Design"],
  },
  {
    id: "t10",
    title: "User authentication flow",
    description: "Implement JWT-based auth with refresh token rotation.",
    priority: "high",
    status: "done",
    assignee: "Sarah Chen",
    assigneeAvatar: "SC",
    dueDate: "Jun 8",
    tags: ["Backend", "Auth"],
  },
];

// ─── Team Members ─────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  productivity: number;
  tasksCompleted: number;
  tasksInProgress: number;
  status: "online" | "away" | "offline";
  email: string;
  joinDate: string;
  skills: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "SC",
    role: "Lead Engineer",
    department: "Engineering",
    productivity: 96,
    tasksCompleted: 142,
    tasksInProgress: 3,
    status: "online",
    email: "sarah.chen@teampulse.io",
    joinDate: "Jan 2023",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    name: "Marcus Lee",
    avatar: "ML",
    role: "Backend Developer",
    department: "Engineering",
    productivity: 88,
    tasksCompleted: 118,
    tasksInProgress: 5,
    status: "online",
    email: "marcus.lee@teampulse.io",
    joinDate: "Mar 2023",
    skills: ["Go", "PostgreSQL", "Redis"],
  },
  {
    id: "3",
    name: "Priya Sharma",
    avatar: "PS",
    role: "UX Designer",
    department: "Design",
    productivity: 92,
    tasksCompleted: 97,
    tasksInProgress: 2,
    status: "away",
    email: "priya.sharma@teampulse.io",
    joinDate: "Feb 2023",
    skills: ["Figma", "Prototyping", "User Research"],
  },
  {
    id: "4",
    name: "Jake Morris",
    avatar: "JM",
    role: "DevOps Engineer",
    department: "Infrastructure",
    productivity: 84,
    tasksCompleted: 76,
    tasksInProgress: 4,
    status: "online",
    email: "jake.morris@teampulse.io",
    joinDate: "Jun 2023",
    skills: ["Kubernetes", "AWS", "Terraform"],
  },
  {
    id: "5",
    name: "Amara Osei",
    avatar: "AO",
    role: "Frontend Developer",
    department: "Engineering",
    productivity: 90,
    tasksCompleted: 104,
    tasksInProgress: 3,
    status: "online",
    email: "amara.osei@teampulse.io",
    joinDate: "Apr 2023",
    skills: ["Vue.js", "CSS", "Accessibility"],
  },
  {
    id: "6",
    name: "Ryan Park",
    avatar: "RP",
    role: "Product Manager",
    department: "Product",
    productivity: 78,
    tasksCompleted: 89,
    tasksInProgress: 6,
    status: "away",
    email: "ryan.park@teampulse.io",
    joinDate: "Nov 2022",
    skills: ["Roadmapping", "Analytics", "Agile"],
  },
  {
    id: "7",
    name: "Lena Müller",
    avatar: "LM",
    role: "QA Engineer",
    department: "Quality",
    productivity: 95,
    tasksCompleted: 131,
    tasksInProgress: 2,
    status: "online",
    email: "lena.muller@teampulse.io",
    joinDate: "Sep 2022",
    skills: ["Cypress", "Selenium", "Load Testing"],
  },
  {
    id: "8",
    name: "Diego Torres",
    avatar: "DT",
    role: "Data Engineer",
    department: "Data",
    productivity: 82,
    tasksCompleted: 68,
    tasksInProgress: 4,
    status: "offline",
    email: "diego.torres@teampulse.io",
    joinDate: "Jan 2024",
    skills: ["Python", "Spark", "dbt"],
  },
];
