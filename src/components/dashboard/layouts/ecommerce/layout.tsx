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
import type { DashboardLayoutProps, DashboardUser } from "@/components/dashboard/types";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Tag, Settings, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultUser: DashboardUser = {
  name: "Store Admin",
  email: "admin@store.com",
};

const defaultNavigation: DashboardLayoutProps["navigation"] = {
  groups: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Analytics", href: "/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "Catalog",
      items: [
        { title: "Products", href: "/products", icon: Package, badge: "234" },
        { title: "Categories", href: "/categories", icon: Tag },
      ],
    },
    {
      title: "Sales",
      items: [
        { title: "Orders", href: "/orders", icon: ShoppingCart, badge: "12" },
        { title: "Customers", href: "/customers", icon: Users },
      ],
    },
    {
      title: "Settings",
      items: [
        { title: "Store Settings", href: "/store-settings", icon: Settings },
      ],
    },
  ],
};

export interface EcommerceLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  navigation?: DashboardLayoutProps["navigation"];
  title?: string;
}

export function EcommerceLayout({
  children,
  user = defaultUser,
  navigation = defaultNavigation,
  title = "E-Commerce",
}: EcommerceLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");
  const [selectedStore, setSelectedStore] = React.useState("main-store");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        className="hidden md:flex"
      >
        <DashboardSidebarHeader>
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShoppingCart className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && <span className="truncate">{title}</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden lg:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? ">" : "<"}
          </Button>
        </DashboardSidebarHeader>

        {/* Store Selector */}
        {!sidebarCollapsed && (
          <div className="border-b p-4">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-store">Main Store</SelectItem>
                <SelectItem value="outlet">Outlet Store</SelectItem>
                <SelectItem value="online">Online Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

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
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader>
          <MobileNavTrigger
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          />

          {/* Global Search - Prominent for E-commerce */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, orders, customers..."
              className="w-full pl-9 pr-4 h-10"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <DashboardThemeToggle variant="compact" />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                5
              </Badge>
            </Button>
            <div className="hidden md:block">
              <DashboardUserMenu user={user} />
            </div>
          </div>
        </DashboardHeader>

        {/* Quick Stats Bar */}
        <div className="flex items-center gap-4 border-b bg-muted/30 px-6 py-3 overflow-x-auto">
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground">Today's Sales</span>
            <p className="font-semibold">$2,450</p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground">Orders</span>
            <p className="font-semibold">24</p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground">Pending</span>
            <p className="font-semibold text-orange-500">8</p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground">Low Stock</span>
            <p className="font-semibold text-red-500">3</p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground">New Customers</span>
            <p className="font-semibold">12</p>
          </div>
        </div>

        <DashboardContent className="bg-muted/30">
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}
