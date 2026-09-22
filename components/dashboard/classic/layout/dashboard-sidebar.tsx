"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    ChevronDown,
    ChevronsUpDown,
    LogOut,
    Settings,
    User,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
    mainNavigation,
    secondaryNavigation,
} from "@/components/dashboard/classic/navigation/navigation";

export function DashboardSidebar() {
    const pathname = usePathname();

    const isActive = (url: string) => {
        if (url === "/dashboard") {
            return pathname === url;
        }

        return pathname === url || pathname.startsWith(`${url}/`);
    };

    return (
        <Sidebar collapsible="icon">
            {/* Logo */}
            <SidebarHeader>
                <Link
                    href="/dashboard"
                    className="flex h-10 items-center gap-2 px-2 group-data-[collapsible=icon]:px-0"
                >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black text-sm font-bold text-primary-foreground">
                        D
                    </div>

                    <span className="font-semibold group-data-[collapsible=icon]:hidden">
                        Dashboard
                    </span>
                </Link>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent>
                <SidebarGroup className="p-4 group-data-[collapsible=icon]:p-2">
                    <SidebarGroupLabel>
                        Platform
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavigation.map((item) => {
                                const hasSubmenu =
                                    !!item.items?.length;

                                /*
                                 * Navigation item with submenu
                                 */
                                if (hasSubmenu) {
                                    const isSubmenuActive =
                                        item.items?.some((subItem) =>
                                            pathname === subItem.url
                                        );

                                    return (
                                        <Collapsible
                                            key={item.url}
                                            defaultOpen={item.items?.some(
                                                (subItem) => pathname === subItem.url
                                            )}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger
                                                    render={
                                                        <SidebarMenuButton
                                                            tooltip={item.title}
                                                            isActive={isActive(item.url)}
                                                        />
                                                    }
                                                >
                                                    <item.icon />

                                                    <span>{item.title}</span>

                                                    {/* Chevron */}
                                                    <ChevronDown
                                                        className="
                    ml-auto
                    size-4
                    shrink-0
                    transition-transform
                    duration-300
                    ease-in-out

                    group-data-panel-open/collapsible:rotate-180

                    group-data-[collapsible=icon]:hidden
                "
                                                    />
                                                </CollapsibleTrigger>

                                                {/* Animated submenu */}
                                                <CollapsibleContent
                                                    className="
                grid
                overflow-hidden
                transition-[grid-template-rows]
                duration-300
                ease-in-out

                data-panel-open:grid-rows-[1fr]
                data-panel-closed:grid-rows-[0fr]
            "
                                                >
                                                    <div className="min-h-0 overflow-hidden">
                                                        <SidebarMenuSub className="relative ml-4 border-l pl-3">
                                                            {item.items?.map((subItem) => {
                                                                const active = pathname === subItem.url;

                                                                return (
                                                                    <SidebarMenuSubItem
                                                                        key={subItem.url}
                                                                        className="relative"
                                                                    >
                                                                        {/* Timeline dot */}
                                                                        <span
                                                                            className={`
                                        absolute
                                        left-[-15.2px]
                                        top-1/2
                                        size-1.5
                                        -translate-y-1/2
                                        rounded-full
                                        transition-all
                                        duration-200

                                        ${active
                                                                                    ? "bg-primary ring-2 ring-primary/20"
                                                                                    : "bg-muted-foreground/40"
                                                                                }
                                    `}
                                                                        />

                                                                        <SidebarMenuSubButton
                                                                            render={
                                                                                <Link href={subItem.url} />
                                                                            }
                                                                            isActive={active}
                                                                            className="
                                        h-8
                                        transition-colors
                                        duration-200
                                    "
                                                                        >
                                                                            <span>{subItem.title}</span>
                                                                        </SidebarMenuSubButton>
                                                                    </SidebarMenuSubItem>
                                                                );
                                                            })}
                                                        </SidebarMenuSub>
                                                    </div>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                }

                                /*
                                 * Normal navigation item
                                 */
                                return (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            render={
                                                <Link href={item.url} />
                                            }
                                            isActive={isActive(item.url)}
                                            tooltip={item.title}
                                        >
                                            <item.icon />

                                            <span>
                                                {item.title}
                                            </span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* System */}
                <SidebarGroup className="p-4 group-data-[collapsible=icon]:p-2">
                    <SidebarGroupLabel>
                        System
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryNavigation.map((item) => (
                                <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton
                                        render={
                                            <Link href={item.url} />
                                        }
                                        isActive={isActive(item.url)}
                                        tooltip={item.title}
                                    >
                                        <item.icon />

                                        <span>
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        className="
                                            group-data-[collapsible=icon]:p-0.5!
                                            group-data-[collapsible=icon]:rounded-full
                                        "
                                    />
                                }
                            >
                                {/* Avatar */}
                                <div
                                    className="
                                        flex
                                        size-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gray-400
                                        text-xs
                                        font-medium
                                        text-white
                                    "
                                >
                                    AT
                                </div>

                                {/* User information */}
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        flex-1
                                        flex-col
                                        text-left
                                        group-data-[collapsible=icon]:hidden
                                    "
                                >
                                    <span className="truncate text-sm font-medium">
                                        Admin User
                                    </span>

                                    <span className="truncate text-xs text-muted-foreground">
                                        admin@example.com
                                    </span>
                                </div>

                                {/* Dropdown icon */}
                                <ChevronsUpDown
                                    className="
                                        ml-auto
                                        size-4
                                        shrink-0
                                        group-data-[collapsible=icon]:hidden
                                    "
                                />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                align="start"
                                sideOffset={8}
                                className="
                                    w-(--anchor-width)
                                    shadow-none
                                "
                            >
                                <DropdownMenuItem>
                                    <User />
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Settings />
                                    Settings
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}