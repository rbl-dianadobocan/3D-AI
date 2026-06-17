"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Shield, Globe, Palette, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SettingsForm() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    mentions: true,
    weeklyDigest: false,
    newMember: true,
  });
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@teampulse.io",
    role: "Admin",
    timezone: "UTC-5 (Eastern Time)",
  });

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-lg font-bold">
                AJ
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">Profile Picture</p>
              <p className="text-xs text-muted-foreground mb-2">
                PNG, JPG or GIF up to 2MB
              </p>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>
          </div>

          <Separator />

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={profile.role}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, role: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={profile.timezone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, timezone: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how TeamPulse looks for you</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-violet-400" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  {theme === "dark" ? "Currently using dark theme" : "Currently using light theme"}
                </p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              key: "taskUpdates" as const,
              label: "Task Updates",
              description: "Get notified when tasks assigned to you are updated",
            },
            {
              key: "mentions" as const,
              label: "Mentions",
              description: "Notify me when someone mentions me in a comment",
            },
            {
              key: "weeklyDigest" as const,
              label: "Weekly Digest",
              description: "Receive a weekly summary of team activity",
            },
            {
              key: "newMember" as const,
              label: "New Team Members",
              description: "Get notified when someone joins your team",
            },
          ].map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={notifications[key]}
                onCheckedChange={(checked) =>
                  setNotifications((n) => ({ ...n, [key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
