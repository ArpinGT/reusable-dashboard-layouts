"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DashboardNavItem } from "../types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface DashboardNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  item: DashboardNavItem;
  collapsed?: boolean;
  active?: boolean;
}

export const DashboardNavItem = React.forwardRef<HTMLAnchorElement, DashboardNavItemProps>(
  ({ className, item, collapsed, active, ...props }, ref) => {
    const Icon = item.icon;

    const content = (
      <>
        {Icon && (
          <Icon
            className={cn(
              "h-5 w-5 shrink-0",
              active ? "text-primary" : "text-muted-foreground"
            )}
          />
        )}
        {!collapsed && <span className={cn("ml-3 truncate")}>{item.title}</span>}
        {!collapsed && item.badge && (
          <Badge variant="secondary" className="ml-auto shrink-0">
            {item.badge}
          </Badge>
        )}
      </>
    );

    if (item.disabled) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground/50 cursor-not-allowed",
            className
          )}
        >
          {content}
        </div>
      );
    }

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            ref={ref}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              active && "bg-accent text-accent-foreground",
              collapsed ? "justify-center" : "",
              className
            )}
            {...props}
          >
            {content}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" className="font-medium">
            {item.title}
          </TooltipContent>
        )}
      </Tooltip>
    );
  }
);
DashboardNavItem.displayName = "DashboardNavItem";

interface DashboardNavGroupProps {
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
}

export const DashboardNavGroup = React.forwardRef<HTMLDivElement, DashboardNavGroupProps>(
  ({ className, title, collapsed, children, ...props }, ref) => {
    if (collapsed) {
      return <div className="space-y-1">{children}</div>;
    }

    return (
      <div ref={ref} className={cn("mb-6", className)} {...props}>
        {title && (
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h4>
        )}
        <div className="space-y-1">{children}</div>
      </div>
    );
  }
);
DashboardNavGroup.displayName = "DashboardNavGroup";

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {
  navigation: {
    groups: Array<{
      title: string;
      items: DashboardNavItem[];
    }>;
  };
  collapsed?: boolean;
  activePath?: string;
}

export const DashboardNav = React.forwardRef<HTMLDivElement, DashboardNavProps>(
  ({ className, navigation, collapsed, activePath, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn("space-y-4", className)} {...props}>
        {navigation.groups.map((group, groupIndex) => (
          <DashboardNavGroup key={groupIndex} title={group.title} collapsed={collapsed}>
            {group.items.map((item, itemIndex) => (
              <DashboardNavItem
                key={itemIndex}
                item={item}
                collapsed={collapsed}
                active={activePath === item.href}
              />
            ))}
          </DashboardNavGroup>
        ))}
      </nav>
    );
  }
);
DashboardNav.displayName = "DashboardNav";
