"use client";

import * as React from "react";
import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarContent,
  DashboardSidebarFooter,
  DashboardNav,
  DashboardNavGroup,
  DashboardNavItem,
  DashboardUserMenu,
  DashboardSearch,
  DashboardNotifications,
  DashboardThemeToggle,
  DashboardMobileNav,
  MobileNavTrigger,
  DashboardHeader,
  DashboardContent,
  DashboardBreadcrumb,
} from "@/components/dashboard/primitives";
import type { DashboardLayoutProps, DashboardUser, DashboardNavItem as NavItemType } from "@/components/dashboard/types";
import { LayoutDashboard, Building2, Users, FileText, Settings, ChevronRight, ChevronDown, FolderOpen, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

const defaultUser: DashboardUser = {
  name: "Admin User",
  email: "admin@enterprise.com",
};

// Multi-level navigation for enterprise
const enterpriseNavigation = {
  groups: [
    {
      title: "Organization",
      items: [
        { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { title: "Departments", href: "/departments", icon: Building2 },
      ],
    },
    {
      title: "User Management",
      items: [
        { title: "All Users", href: "/users", icon: Users },
        { title: "Roles & Permissions", href: "/permissions", icon: Shield },
        { title: "Audit Logs", href: "/audit", icon: FileText },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Data Sources", href: "/data", icon: Database },
        { title: "Integrations", href: "/integrations", icon: FolderOpen },
        { title: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ],
};

// Nested navigation structure
interface NestedNavItem {
  title: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NestedNavItem[];
  badge?: string;
}

const nestedNavItems: NestedNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Organization",
    icon: Building2,
    children: [
      { title: "Departments", href: "/departments" },
      { title: "Locations", href: "/locations" },
      { title: "Divisions", href: "/divisions" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", href: "/users" },
      { title: "Groups", href: "/groups" },
      { title: "Roles", href: "/roles" },
      { title: "Permissions", href: "/permissions", badge: "New" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    children: [
      { title: "Standard Reports", href: "/reports/standard" },
      { title: "Custom Reports", href: "/reports/custom" },
      { title: "Scheduled", href: "/reports/scheduled" },
      { title: "Exports", href: "/reports/exports" },
    ],
  },
  {
    title: "System Admin",
    icon: Settings,
    children: [
      { title: "Settings", href: "/system/settings" },
      { title: "Audit Logs", href: "/system/audit" },
      { title: "API Keys", href: "/system/api-keys" },
      { title: "Webhooks", href: "/system/webhooks" },
    ],
  },
];

interface NestedNavItemComponentProps {
  item: NestedNavItem;
  activePath: string;
  onNavigate: (href: string) => void;
}

function NestedNavItemComponent({ item, activePath, onNavigate }: NestedNavItemComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              "justify-between"
            )}
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
              <span>{item.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen ? "rotate-180" : ""
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 mt-1">
          {item.children!.map((child, index) => (
            <div key={index}>
              {child.children ? (
                <NestedNavItemComponent
                  item={child}
                  activePath={activePath}
                  onNavigate={onNavigate}
                />
              ) : (
                <button
                  onClick={() => child.href && onNavigate(child.href)}
                  className={cn(
                    "w-full flex items-center rounded-md px-3 py-2 pl-9 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    activePath === child.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <span>{child.title}</span>
                  {child.badge && (
                    <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {child.badge}
                    </span>
                  )}
                </button>
              )}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <button
      onClick={() => item.href && onNavigate(item.href)}
      className={cn(
        "w-full flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        activePath === item.href && "bg-accent text-accent-foreground"
      )}
    >
      {Icon && <Icon className="h-4 w-4 mr-3 text-muted-foreground" />}
      <span>{item.title}</span>
      {item.badge && (
        <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
          {item.badge}
        </span>
      )}
    </button>
  );
}

export interface EnterpriseLayoutProps extends DashboardLayoutProps {
  user?: DashboardUser;
  title?: string;
}

export function EnterpriseLayout({
  children,
  user = defaultUser,
  title = "Enterprise",
}: EnterpriseLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Global Sidebar - Module Navigation */}
      <aside className="hidden lg:flex w-16 flex-col border-r bg-muted/50">
        <div className="flex h-14 items-center justify-center border-b">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-4 space-y-2 px-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent">
              <Users className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent">
              <FileText className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent">
              <Database className="h-5 w-5" />
            </button>
          </div>
        </ScrollArea>

        <div className="border-t p-2">
          <Button variant="ghost" size="icon" className="w-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* Main Navigation Sidebar with Nested Navigation */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        className="hidden md:flex w-72"
      >
        <DashboardSidebarHeader>
          <div className="flex items-center gap-2 font-semibold">
            <span className="truncate">{title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </DashboardSidebarHeader>

        <ScrollArea className="flex-1">
          <DashboardSidebarContent>
            <nav className="space-y-1 p-3">
              {nestedNavItems.map((item, index) => (
                <NestedNavItemComponent
                  key={index}
                  item={item}
                  activePath={activePath}
                  onNavigate={setActivePath}
                />
              ))}
            </nav>
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
        navigation={enterpriseNavigation}
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

          <div className="flex-1">
            <DashboardBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <DashboardSearch placeholder="Search..." />
            <DashboardThemeToggle variant="compact" />
            <DashboardNotifications count={5} />
            <div className="hidden md:block">
              <DashboardUserMenu user={user} />
            </div>
          </div>
        </DashboardHeader>

        <DashboardContent className="bg-muted/30">
          {children}
        </DashboardContent>

        {/* Optional Right Panel for Context */}
        <aside className="hidden 2xl:flex w-80 border-l bg-muted/30 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
              <Separator className="mb-2" />
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Add New User
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Create Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Export Data
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
              <Separator className="mb-2" />
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• Admin updated permissions</p>
                <p>• System backup completed</p>
                <p>• New user registered</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
