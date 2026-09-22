import { ArrowDown, ArrowUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    positive?: boolean;
}

export function StatsCard({
    title,
    value,
    change,
    positive = true,
}: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <div
                        className={`flex items-center gap-1 text-xs font-medium ${
                            positive
                                ? "text-emerald-600"
                                : "text-red-600"
                        }`}
                    >
                        {positive ? (
                            <ArrowUp className="size-3" />
                        ) : (
                            <ArrowDown className="size-3" />
                        )}

                        {change}
                    </div>
                </div>

                <div className="mt-2">
                    <p className="text-3xl font-bold tracking-tight">
                        {value}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}