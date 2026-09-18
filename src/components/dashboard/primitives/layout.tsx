"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const DashboardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-40 flex h-[--dashboard-header-height] items-center gap-4 border-b bg-background px-6",
        className
      )}
      {...props}
    />
  )
);
DashboardHeader.displayName = "DashboardHeader";

export const DashboardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(
        "flex-1 overflow-auto p-6",
        className
      )}
      {...props}
    />
  )
);
DashboardContent.displayName = "DashboardContent";

export const DashboardContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-[--dashboard-content-max-width]",
        className
      )}
      {...props}
    />
  )
);
DashboardContainer.displayName = "DashboardContainer";

export const DashboardPageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    description?: string;
    actions?: React.ReactNode;
  }
>(({ className, title, description, actions, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
      className
    )}
    {...props}
  >
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
));
DashboardPageHeader.displayName = "DashboardPageHeader";

export const DashboardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        "border-t py-4 px-6 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
DashboardFooter.displayName = "DashboardFooter";
