"use client";

import * as React from "react";
import {
  DashboardSidebar,
  DashboardSidebarContent,
  DashboardNav,
  CompactUserMenu,
  CompactSearch,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardContent,
} from "@/components/dashboard/primitives";
import type { DashboardLayoutProps, DashboardUser } from "@/components/dashboard/types";
import { LayoutDashboard, BarChart3, TrendingUp, PieChart, FileText, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultUser: DashboardUser = {
  name: "Data Analyst",
  email: "analyst@company.com",
};

const defaultNavigation: DashboardLayoutProps["navigation"] = {
  groups: [
    {
      title: "",
      items: [
        { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { title: "Reports", href: "/reports", icon: FileText },
        { title: "Dashboards", href: "/dashboards", icon: BarChart3 },
        { title: "Metrics", href: "/metrics", icon: TrendingUp },
        { title: "Data Sources", href: "/sources", icon: PieChart },
        { title: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ],
};

export interface AnalyticsLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  navigation?: DashboardLayoutProps["navigation"];
}

export function AnalyticsLayout({
  children,
  user = defaultUser,
  navigation = defaultNavigation,
}: AnalyticsLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");
  const [dateRange, setDateRange] = React.useState("30d");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Compact Sidebar - Minimal chrome for data focus */}
      <aside className="hidden md:flex w-16 flex-col border-r bg-card">
        <div className="flex h-14 items-center justify-center border-b">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-5 w-5" />
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
        title="Analytics"
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Minimal Header */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4">
          <MobileNavTrigger
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          />

          <h1 className="text-base font-semibold hidden sm:block">Analytics Dashboard</h1>

          <div className="flex items-center gap-2 ml-auto">
            {/* Date Range Selector - Critical for Analytics */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32 h-9 text-xs">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Download className="h-4 w-4" />
            </Button>

            <DashboardThemeToggle variant="compact" />
            <CompactSearch />
            <div className="hidden lg:block">
              <CompactUserMenu user={user} />
            </div>
          </div>
        </header>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2 overflow-x-auto">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            All Metrics
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Revenue
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Users
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Conversions
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Engagement
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Compare
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Export
          </Button>
        </div>

        {/* Full-width Content Canvas for Charts */}
        <DashboardContent className="p-0">
          <div className="h-full">
            {children}
          </div>
        </DashboardContent>
      </div>
    </div>
  );
}
