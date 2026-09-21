import { ModernDashboardLayout } from "@/components/dashboard/modern/ModernDashboardLayout";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ModernDashboardLayout>
            {children}
        </ModernDashboardLayout>
    );
}