import { Button } from "@/components/ui/button";

import { PageContainer } from "@/components/dashboard/classic/content/page-container";
import { PageHeader } from "@/components/dashboard/classic/content/page-header";
import { RecentActivity } from "@/components/dashboard/classic/widgets/recent-activity";
import { StatsGrid } from "@/components/dashboard/classic/widgets/stats-grid";

export default function Page() {
    return (
        <PageContainer>
            <PageHeader
                title="Dashboard"
                description="Overview of your application."
                action={
                    <Button>
                        Create New
                    </Button>
                }
            />

            <div className="space-y-6">
                {/* Statistics */}
                <StatsGrid />

                {/* Main widgets */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Chart widget goes here */}
                        <div className="flex min-h-87.5 items-center justify-center rounded-xl border border-dashed">
                            <p className="text-sm text-muted-foreground">
                                Chart Widget
                            </p>
                        </div>
                    </div>

                    <RecentActivity />
                </div>
            </div>
        </PageContainer>
    );
}