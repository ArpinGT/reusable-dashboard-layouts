"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DashboardSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}

export const DashboardSearch = React.forwardRef<HTMLDivElement, DashboardSearchProps>(
  ({ className, placeholder = "Search...", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="w-full pl-9 pr-4 h-9"
        />
      </div>
    );
  }
);
DashboardSearch.displayName = "DashboardSearch";

interface CompactSearchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const CompactSearch = React.forwardRef<HTMLButtonElement, CompactSearchProps>(
  ({ className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
      </button>
    );
  }
);
CompactSearch.displayName = "CompactSearch";
