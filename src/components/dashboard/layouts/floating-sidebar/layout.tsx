"use client";

import * as React from "react";
import {
  DashboardNav,
  DashboardUserMenu,
  DashboardSearch,
  DashboardNotifications,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardContent,
} from "@/components/dashboard/primitives";
import type { DashboardLayoutProps, DashboardUser } from "@/components/dashboard/types";
import { LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const defaultUser: DashboardUser = {
  name: "John Doe",
  email: "john@example.com",
};

const defaultNavigation: DashboardLayoutProps["navigation"] = {
  groups: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Analytics", href: "/analytics", icon: LayoutDashboard },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Customers", href: "/customers", icon: LayoutDashboard },
        { title: "Products", href: "/products", icon: LayoutDashboard },
        { title: "Orders", href: "/orders", icon: LayoutDashboard },
      ],
    },
    {
      title: "Settings",
      items: [
        { title: "Profile", href: "/profile", icon: LayoutDashboard },
        { title: "Settings", href: "/settings", icon: LayoutDashboard },
      ],
    },
  ],
};

export interface FloatingSidebarLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  navigation?: DashboardLayoutProps["navigation"];
  title?: string;
}

export function FloatingSidebarLayout({
  children,
  user = defaultUser,
  navigation = defaultNavigation,
  title = "Floating Sidebar",
}: FloatingSidebarLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop Floating Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border shadow-lg bg-card rounded-xl my-4 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20 ml-4" : "w-64 ml-4"
        )}
      >
        {/* Logo Area */}
        <div className="flex h-16 items-center justify-between border-b px-4 rounded-t-xl">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && <span className="truncate">{title}</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <DashboardNav
              navigation={navigation}
              collapsed={sidebarCollapsed}
              activePath={activePath}
            />
          </div>
        </ScrollArea>

        {/* Footer with User Menu */}
        <div className="border-t p-4 rounded-b-xl">
          {!sidebarCollapsed ? (
            <DashboardUserMenu user={user} />
          ) : (
            <div className="flex justify-center">
              <DashboardUserMenu user={user} align="right" />
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Navigation */}
      <DashboardMobileNav
        navigation={navigation}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        title={title}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <MobileNavTrigger
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          />

          <div className="flex-1 max-w-md hidden sm:block">
            <DashboardSearch placeholder="Search..." />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <DashboardThemeToggle variant="compact" />
            <DashboardNotifications count={3} />
            <div className="hidden md:block">
              <DashboardUserMenu user={user} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <DashboardContent className="max-w-7xl mx-auto w-full">
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}
