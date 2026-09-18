"use client";

import * as React from "react";
import {
  DashboardUserMenu,
  DashboardSearch,
  DashboardNotifications,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardContent,
  DashboardBreadcrumb,
} from "@/components/dashboard/primitives";
import type { DashboardLayoutProps, DashboardUser, DashboardNavItem } from "@/components/dashboard/types";
import { LayoutDashboard, Home, Package, ShoppingCart, Users, BarChart3, Settings, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const defaultUser: DashboardUser = {
  name: "John Doe",
  email: "john@example.com",
};

const navigationItems: DashboardNavItem[] = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Products", href: "/products", icon: Package },
  { title: "Orders", href: "/orders", icon: ShoppingCart },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Reports", href: "/reports", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings },
];

export interface TopNavigationLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  title?: string;
}

export function TopNavigationLayout({
  children,
  user = defaultUser,
  title = "Dashboard",
}: TopNavigationLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Main Header Row */}
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <MobileNavTrigger
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline-block">{title}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setActivePath(item.href)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="hidden lg:inline">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:block w-64">
              <DashboardSearch placeholder="Search..." />
            </div>
            <DashboardThemeToggle variant="compact" />
            <DashboardNotifications count={3} />
            <DashboardUserMenu user={user} />
          </div>
        </div>

        {/* Secondary Row - Breadcrumbs & Mobile Search */}
        <div className="flex h-12 items-center gap-4 border-t px-4 sm:px-6">
          <div className="flex-1">
            <DashboardBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard" },
              ]}
            />
          </div>
          <div className="sm:hidden w-full max-w-xs">
            <DashboardSearch placeholder="Search..." />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sheet */}
      <DashboardMobileNav
        navigation={{ groups: [{ title: "", items: navigationItems }] }}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        title={title}
      />

      {/* Main Content */}
      <DashboardContent className="flex-1">
        {children}
      </DashboardContent>

      {/* Footer */}
      <footer className="border-t py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Dashboard. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
