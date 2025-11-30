"use client";

import { cn } from "@/lib/utils";
import { Map, Globe, Mountain, Users } from "lucide-react";

export type ViewId = "map" | "political" | "physical" | "demographics";

type TopNavigationProps = {
    activeView: ViewId;
    onViewChange: (view: ViewId) => void;
    className?: string;
};

const NAV_ITEMS: { id: ViewId; label: string; icon: React.ElementType }[] = [
    { id: "map", label: "Map", icon: Map },
];

export function TopNavigation({ activeView, onViewChange, className }: TopNavigationProps) {
    return (
        <nav className={cn("pointer-events-auto flex items-center justify-center gap-2", className)}>
            <div className="flex items-center gap-1 rounded-full bg-black/60 p-1.5 backdrop-blur-glass border border-imperial-gold/30 shadow-card-glass">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={cn(
                                "group relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300",
                                isActive
                                    ? "bg-imperial-gold/20 text-imperial-gold"
                                    : "text-parchment-mist hover:bg-white/5 hover:text-parchment-light"
                            )}
                        >
                            <Icon className={cn("h-4 w-4", isActive ? "text-imperial-gold" : "text-parchment-mist/70 group-hover:text-parchment-light")} />
                            <span className={cn("text-sm font-medium", isActive ? "font-semibold" : "")}>
                                {item.label}
                            </span>

                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute inset-0 rounded-full border border-imperial-gold/50 shadow-[0_0_10px_rgba(214,169,74,0.3)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
