import { LucideIcon } from "lucide-react";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
  children?: DashboardNavItem[];
}

export interface DashboardNavGroup {
  title: string;
  items: DashboardNavItem[];
}

export interface DashboardNavigation {
  groups: DashboardNavGroup[];
}

export interface DashboardLayoutProps {
  navigation: DashboardNavigation;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export interface DashboardUser {
  name: string;
  email: string;
  avatar?: string;
}
