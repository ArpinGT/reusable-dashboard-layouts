import { cn } from "@/lib/utils";

interface DashboardLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  text?: string;
  icon?: React.ReactNode;
}

export function DashboardLogo({
  collapsed,
  text = "Dashboard",
  icon,
  className,
  ...props
}: DashboardLogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-semibold",
        collapsed ? "justify-center" : "",
        className
      )}
      {...props}
    >
      {icon || (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-sm font-bold">D</span>
        </div>
      )}
      {!collapsed && <span className="truncate">{text}</span>}
    </div>
  );
}
