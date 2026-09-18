"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DashboardNav } from "./nav";
import type { DashboardNavigation } from "../types";

interface DashboardMobileNavProps {
  navigation: DashboardNavigation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  logo?: React.ReactNode;
}

export const DashboardMobileNav = ({
  navigation,
  open,
  onOpenChange,
  title = "Navigation",
  logo,
}: DashboardMobileNavProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            {logo || <SheetTitle>{title}</SheetTitle>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          <DashboardNav navigation={navigation} collapsed={false} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface MobileNavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
}

export const MobileNavTrigger = React.forwardRef<HTMLButtonElement, MobileNavTriggerProps>(
  ({ className, isOpen, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("md:hidden", className)}
        {...props}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    );
  }
);
MobileNavTrigger.displayName = "MobileNavTrigger";
