import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <DashboardHeader />
                <main className="min-w-0 flex-1 my-5 mr-5 rounded-lg">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}