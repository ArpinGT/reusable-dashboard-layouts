"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardNotificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications?: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    unread?: boolean;
  }>;
}

export const DashboardNotifications = React.forwardRef<HTMLDivElement, DashboardNotificationsProps>(
  ({ className, notifications = [], ...props }, ref) => {
    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="icon"
            className={cn("relative", className)}
            {...props}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">{notification.title}</div>
                <div className="text-xs text-muted-foreground">{notification.description}</div>
                <div className="text-xs text-muted-foreground">{notification.time}</div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
DashboardNotifications.displayName = "DashboardNotifications";

interface CompactNotificationsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  count?: number;
}

export const CompactNotifications = React.forwardRef<HTMLButtonElement, CompactNotificationsProps>(
  ({ className, onClick, count = 0, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors relative",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <Bell className="h-4 w-4 text-muted-foreground" />
        {count > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {count > 9 ? "9+" : count}
          </Badge>
        )}
      </button>
    );
  }
);
CompactNotifications.displayName = "CompactNotifications";
