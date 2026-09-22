import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
    {
        user: "John Doe",
        action: "created a new order",
        time: "2 minutes ago",
    },
    {
        user: "Sarah Smith",
        action: "updated her profile",
        time: "15 minutes ago",
    },
    {
        user: "Mike Johnson",
        action: "created a new account",
        time: "32 minutes ago",
    },
    {
        user: "Emily Davis",
        action: "completed an order",
        time: "1 hour ago",
    },
];

export function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent Activity
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-6">
                    {activities.map((activity) => (
                        <div
                            key={`${activity.user}-${activity.time}`}
                            className="flex items-start gap-3"
                        >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {activity.user
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm">
                                    <span className="font-medium">
                                        {activity.user}
                                    </span>{" "}
                                    {activity.action}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}