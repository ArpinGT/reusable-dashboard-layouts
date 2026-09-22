import { StatsCard } from "./stats-card";

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231",
        change: "12.5%",
        positive: true,
    },
    {
        title: "Users",
        value: "2,350",
        change: "8.2%",
        positive: true,
    },
    {
        title: "Orders",
        value: "1,247",
        change: "4.3%",
        positive: true,
    },
    {
        title: "Conversion",
        value: "3.24%",
        change: "1.2%",
        positive: false,
    },
];

export function StatsGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <StatsCard
                    key={stat.title}
                    {...stat}
                />
            ))}
        </div>
    );
}