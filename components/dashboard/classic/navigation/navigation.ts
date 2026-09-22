import {
    BarChart3,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Users,
} from "lucide-react";

export const mainNavigation = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
        items: [
            {
                title: "Overview",
                url: "/dashboard/analytics/overview",
            },
            {
                title: "Revenue",
                url: "/dashboard/analytics/revenue",
            },
            {
                title: "Users",
                url: "/dashboard/analytics/users",
            },
            {
                title: "Traffic",
                url: "/dashboard/analytics/traffic",
            },
        ],
    },

    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
    },

    {
        title: "Products",
        url: "/dashboard/products",
        icon: Package,
    },

    {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ShoppingCart,
    },
];

export const secondaryNavigation = [
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];