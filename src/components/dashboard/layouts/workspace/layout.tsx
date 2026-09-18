"use client";

import * as React from "react";
import {
  DashboardSidebar,
  DashboardSidebarContent,
  DashboardNav,
  DashboardUserMenu,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardBreadcrumb,
} from "@/components/dashboard/primitives";
import type { DashboardLayoutProps, DashboardUser } from "@/components/dashboard/types";
import { LayoutDashboard, Folder, MessageSquare, Calendar, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const defaultUser: DashboardUser = {
  name: "John Doe",
  email: "john@example.com",
};

const sidebarNavigation: DashboardLayoutProps["navigation"] = {
  groups: [
    {
      title: "Workspaces",
      items: [
        { title: "All Projects", href: "/projects", icon: Folder },
        { title: "My Tasks", href: "/tasks", icon: LayoutDashboard },
        { title: "Messages", href: "/messages", icon: MessageSquare, badge: "12" },
        { title: "Calendar", href: "/calendar", icon: Calendar },
      ],
    },
    {
      title: "Settings",
      items: [
        { title: "Preferences", href: "/preferences", icon: Settings },
      ],
    },
  ],
};

const workspaceItems = [
  { id: 1, name: "Project Alpha", active: true },
  { id: 2, name: "Marketing Campaign", active: false },
  { id: 3, name: "Q4 Planning", active: false },
];

export interface WorkspaceLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  title?: string;
}

export function WorkspaceLayout({
  children,
  user = defaultUser,
  title = "Workspace",
}: WorkspaceLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/projects");
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(1);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Global Sidebar - Workspaces */}
      <aside className="hidden md:flex w-16 flex-col border-r bg-muted/50">
        <div className="flex h-14 items-center justify-center border-b">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-4 space-y-2 px-2">
            {workspaceItems.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => setSelectedWorkspace(workspace.id)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  selectedWorkspace === workspace.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
                title={workspace.name}
              >
                <span className="text-xs font-semibold">
                  {workspace.name.charAt(0)}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-2">
          <Button variant="ghost" size="icon" className="w-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* Secondary Navigation Sidebar */}
      <DashboardSidebar className="hidden lg:flex w-64">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="font-semibold">{title}</div>
          <Button variant="ghost" size="sm" className="h-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <DashboardSidebarContent>
            <DashboardNav
              navigation={sidebarNavigation}
              activePath={activePath}
            />
          </DashboardSidebarContent>
        </ScrollArea>

        <div className="border-t p-4">
          <DashboardUserMenu user={user} />
        </div>
      </DashboardSidebar>

      {/* Mobile Navigation */}
      <DashboardMobileNav
        navigation={sidebarNavigation}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        title={title}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
          <MobileNavTrigger
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          />

          <div className="flex-1">
            <DashboardBreadcrumb
              items={[
                { label: "Workspaces", href: "/workspaces" },
                { label: workspaceItems.find(w => w.id === selectedWorkspace)?.name || "" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2">
            <DashboardThemeToggle variant="compact" />
            <div className="hidden sm:block">
              <DashboardUserMenu user={user} />
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Workspace Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {workspaceItems.find(w => w.id === selectedWorkspace)?.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your project and collaborate with your team
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Share</Button>
                <Button>New Task</Button>
              </div>
            </div>

            {/* Content Area */}
            <div className="rounded-lg border bg-card">
              {children}
            </div>
          </div>
        </main>

        {/* Context Panel - Optional Right Sidebar */}
        <aside className="hidden xl:flex w-72 border-l bg-muted/30 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Activity</h3>
              <Separator />
              <div className="mt-2 space-y-3 text-sm text-muted-foreground">
                <p>• John created a task</p>
                <p>• Sarah commented on Design</p>
                <p>• Mike uploaded 3 files</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
