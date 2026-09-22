"use client";

import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

export function DashboardHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header
            className={`sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 px-4 border-b bg-white/90 backdrop-blur transition-shadow duration-200 md:border-none ${scrolled ? "md:shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : "shadow-none"
                }`}
        >            {/* Sidebar toggle */}
            <SidebarTrigger />

            {/* Page title */}
            <div className="flex-1">
                <h1 className="text-sm font-semibold mt-0.5">
                    Dashboard
                </h1>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Search />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Bell />
                </Button>

                <Avatar className="size-8">
                    <AvatarFallback>
                        AT
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}