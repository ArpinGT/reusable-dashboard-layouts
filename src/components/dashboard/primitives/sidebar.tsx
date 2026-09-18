"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const DashboardSidebar = React.forwardRef<HTMLDivElement, DashboardSidebarProps>(
  ({ className, collapsed, onCollapse, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
          collapsed ? "w-[--dashboard-sidebar-collapsed-width]" : "w-[--dashboard-sidebar-width]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DashboardSidebar.displayName = "DashboardSidebar";

export const DashboardSidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-[--dashboard-header-height] items-center border-b px-4",
        className
      )}
      {...props}
    />
  )
);
DashboardSidebarHeader.displayName = "DashboardSidebarHeader";

export const DashboardSidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto py-4", className)}
      {...props}
    />
  )
);
DashboardSidebarContent.displayName = "DashboardSidebarContent";

export const DashboardSidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-t p-4", className)}
      {...props}
    />
  )
);
DashboardSidebarFooter.displayName = "DashboardSidebarFooter";
