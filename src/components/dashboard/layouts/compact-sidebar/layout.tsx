"use client";

import * as React from "react";
import {
  DashboardSidebar,
  DashboardSidebarContent,
  DashboardNav,
  CompactUserMenu,
  CompactSearch,
  CompactNotifications,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardHeader,
  DashboardContent,
} from "@/components/dashboard/primitives";
import type { DashboardLayoutProps, DashboardUser } from "@/components/dashboard/types";
import { LayoutDashboard, Home, BarChart3, Settings, Users, FileText, FolderOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";

const defaultUser: DashboardUser = {
  name: "John Doe",
  email: "john@example.com",
};

const defaultNavigation: DashboardLayoutProps["navigation"] = {
  groups: [
    {
      title: "",
      items: [
        { title: "Home", href: "/dashboard", icon: Home },
        { title: "Analytics", href: "/analytics", icon: BarChart3 },
        { title: "Projects", href: "/projects", icon: FolderOpen },
        { title: "Team", href: "/team", icon: Users },
        { title: "Reports", href: "/reports", icon: FileText },
        { title: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ],
};

export interface CompactSidebarLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  navigation?: DashboardLayoutProps["navigation"];
}

export function CompactSidebarLayout({
  children,
  user = defaultUser,
  navigation = defaultNavigation,
}: CompactSidebarLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Compact Sidebar - 64px width */}
        <aside className="hidden md:flex w-16 flex-col border-r bg-card">
          <div className="flex h-14 items-center justify-center border-b">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <DashboardSidebarContent className="py-4">
              <DashboardNav
                navigation={navigation}
                collapsed={true}
                activePath={activePath}
              />
            </DashboardSidebarContent>
          </ScrollArea>

          <div className="border-t p-2">
            <CompactUserMenu user={user} align="right" />
          </div>
        </aside>

        {/* Mobile Navigation */}
        <DashboardMobileNav
          navigation={navigation}
          open={mobileNavOpen}
          onOpenChange={setMobileNavOpen}
          title="Compact Dashboard"
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader>
            <MobileNavTrigger
              isOpen={mobileNavOpen}
              onClick={() => setMobileNavOpen(true)}
            />

            <h1 className="text-lg font-semibold hidden sm:block">Dashboard</h1>

            <div className="flex items-center gap-1 ml-auto">
              <CompactSearch />
              <CompactNotifications count={2} />
              <DashboardThemeToggle variant="compact" />
              <div className="hidden md:block">
                <CompactUserMenu user={user} />
              </div>
            </div>
          </DashboardHeader>

          <DashboardContent className="bg-muted/30">
            {children}
          </DashboardContent>
        </div>
      </div>
    </TooltipProvider>
  );
}
