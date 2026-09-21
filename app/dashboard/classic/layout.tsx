import { ClassicDashboardLayout } from "@/components/dashboard/classic/ClassicDashboardLayout";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClassicDashboardLayout>
            {children}
        </ClassicDashboardLayout>
    );
}