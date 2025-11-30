"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, MapPin } from "lucide-react";
import { CITIES, CityMeta, CityId } from "@/data/trip/cities";
import { cn } from "@/lib/utils";

interface CitySearchProps {
    onSelectCity: (cityId: CityId) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CitySearch({ onSelectCity, open: controlledOpen, onOpenChange }: CitySearchProps) {
    const [open, setOpen] = React.useState(false);

    // Handle controlled/uncontrolled state
    const isOpen = controlledOpen ?? open;
    const handleOpenChange = onOpenChange ?? setOpen;

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleOpenChange(!isOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [isOpen, handleOpenChange]);

    return (
        <>
            <button
                onClick={() => handleOpenChange(true)}
                className="group flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-parchment-mist backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-parchment-light border border-white/10 hover:border-imperial-gold/30"
            >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search cities...</span>
                <kbd className="hidden pointer-events-none h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-parchment-mist opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <Command.Dialog
                open={isOpen}
                onOpenChange={handleOpenChange}
                label="Search cities"
                className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" aria-hidden="true" />
                
                <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-imperial-gold/20 bg-ink-black/95 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center border-b border-white/10 px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-parchment-mist" />
                        <Command.Input
                            placeholder="Search for a city..."
                            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-parchment-mist/50 text-parchment-light disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                        <Command.Empty className="py-6 text-center text-sm text-parchment-mist">
                            No city found.
                        </Command.Empty>
                        <Command.Group heading="Cities">
                            {CITIES.map((city) => (
                                <Command.Item
                                    key={city.id}
                                    value={city.name}
                                    onSelect={() => {
                                        onSelectCity(city.id);
                                        handleOpenChange(false);
                                    }}
                                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-imperial-gold/20 aria-selected:text-imperial-gold data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-parchment-light transition-colors"
                                >
                                    <MapPin className="mr-2 h-4 w-4 opacity-70" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{city.name}</span>
                                        <span className="text-xs text-parchment-mist/70">{city.subtitle}</span>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </div>
            </Command.Dialog>
        </>
    );
}
