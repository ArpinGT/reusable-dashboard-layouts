"use client";

import * as React from "react";
import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarContent,
  DashboardSidebarFooter,
  DashboardNav,
  DashboardUserMenu,
  DashboardSearch,
  DashboardNotifications,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardHeader,
  DashboardContent,
} from "@/components/dashboard/primitives";
import { DashboardLogo } from "@/components/dashboard/shared";
import type { DashboardLayoutProps, DashboardUser } from "@/components/dashboard/types";
import { LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        { title: "Reports", href: "/reports", icon: LayoutDashboard, badge: "New" },
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

export interface ClassicSidebarLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  navigation?: DashboardLayoutProps["navigation"];
  title?: string;
  collapsible?: boolean;
}

export function ClassicSidebarLayout({
  children,
  user = defaultUser,
  navigation = defaultNavigation,
  title = "Classic Sidebar",
  collapsible = true,
}: ClassicSidebarLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        className="hidden md:flex"
      >
        <DashboardSidebarHeader>
          <DashboardLogo
            collapsed={sidebarCollapsed}
            text={title}
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="h-5 w-5" />
              </div>
            }
          />
          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </DashboardSidebarHeader>

        <ScrollArea className="flex-1">
          <DashboardSidebarContent>
            <DashboardNav
              navigation={navigation}
              collapsed={sidebarCollapsed}
              activePath={activePath}
            />
          </DashboardSidebarContent>
        </ScrollArea>

        <DashboardSidebarFooter>
          {!sidebarCollapsed ? (
            <DashboardUserMenu user={user} />
          ) : (
            <DashboardUserMenu user={user} align="right" />
          )}
        </DashboardSidebarFooter>
      </DashboardSidebar>

      {/* Mobile Navigation */}
      <DashboardMobileNav
        navigation={navigation}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        title={title}
        logo={
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span>{title}</span>
          </div>
        }
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader>
          <MobileNavTrigger
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          />

          <div className="flex-1 max-w-md">
            <DashboardSearch placeholder="Search..." />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <DashboardThemeToggle variant="compact" />
            <DashboardNotifications count={3} />
            <div className="hidden md:block">
              <DashboardUserMenu user={user} />
            </div>
          </div>
        </DashboardHeader>

        <DashboardContent className="bg-muted/30">
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}
