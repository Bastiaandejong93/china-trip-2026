"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CityMeta } from "@/data/trip/cities";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import { CityContent } from "@/lib/loadContent";

type CityInfoPanelProps = {
    city: CityMeta | null;
    content: CityContent | null;
    mode: "overview" | "focus";
    onClose?: () => void;
};

export function CityInfoPanel({ city, content, mode, onClose }: CityInfoPanelProps) {
    const isVisible = mode === "focus" && city != null;

    // Derive secondary images (exclude hero from gallery)
    const secondaryImages = city?.gallery?.filter(src => src !== city.heroImage).slice(0, 2) || [];

    // Use content if available, fallback to city data (for backwards compatibility during migration)
    const summary = content?.summary || city?.summary;
    const quickFacts = content?.quickFacts || city?.quickFacts;
    const physical = content?.sections?.physical || city?.physical;
    const political = content?.sections?.political || city?.political;
    const demographics = content?.sections?.demographics || city?.demographics;
    const logistics = content?.logistics || city?.logistics;

    return (
        <AnimatePresence>
            {isVisible && city && (
                <motion.div
                    className="pointer-events-auto absolute right-6 top-6 bottom-6 z-50 w-[720px] flex flex-col"
                    initial={{ opacity: 0, x: 60, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 60, scale: 0.95 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                        duration: 0.6,
                    }}
                >
                    {/* Glassmorphism Panel */}
                    <div
                        className={cn(
                            "relative flex flex-col h-full rounded-3xl border border-white/15",
                            "bg-slate-950/60",
                            "backdrop-blur-2xl shadow-2xl",
                            "overflow-hidden"
                        )}
                    >
                        {/* FIXED HERO SECTION (~35%) */}
                        <div className="relative flex-shrink-0 h-[35%] border-b border-white/10">
                            {/* Route Badge & Close Button */}
                            <div className="absolute top-4 left-6 right-6 z-10 flex items-start justify-between">
                                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200 backdrop-blur-sm border border-amber-300/30">
                                    {String(city.order).padStart(2, "0")}
                                </span>
                                
                                <button
                                    onClick={onClose}
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-full",
                                        "border border-white/20 bg-slate-900/80 backdrop-blur-sm",
                                        "text-slate-300 transition-all hover:border-amber-300/50 hover:bg-slate-900 hover:text-amber-200"
                                    )}
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Hero Image - LOCKED to city.heroImage */}
                            <div className="relative h-full w-full overflow-hidden">
                                <img
                                    src={city.heroImage}
                                    alt={city.name}
                                    className="h-full w-full object-cover"
                                />
                                {/* Gradient Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                            </div>

                            {/* City Name & Subtitle (overlaid on image) */}
                            <div className="absolute bottom-4 left-6 right-6">
                                <h2 className="font-serif text-4xl font-bold tracking-wide text-amber-100 drop-shadow-lg">
                                    {city.name}
                                </h2>
                                {city.subtitle && (
                                    <p className="mt-1 text-base text-amber-200/90 drop-shadow-md">
                                        {city.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* SCROLLABLE BODY (~65%) */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-500/30">
                            {/* Summary */}
                            <div>
                                <p className="text-base font-medium leading-relaxed text-slate-100">
                                    {summary}
                                </p>
                            </div>

                            {/* Quick Facts */}
                            {(quickFacts?.population || quickFacts?.knownFor || quickFacts?.mustEat) && (
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-3">
                                        Quick Facts
                                    </h3>
                                    <div className="space-y-2">
                                        {quickFacts.population && (
                                            <div className="flex gap-3 text-sm">
                                                <span className="text-slate-400 min-w-[100px]">Population</span>
                                                <span className="text-slate-100">{quickFacts.population}</span>
                                            </div>
                                        )}
                                        {quickFacts.knownFor && (
                                            <div className="flex gap-3 text-sm">
                                                <span className="text-slate-400 min-w-[100px]">Known for</span>
                                                <span className="text-slate-100">{quickFacts.knownFor}</span>
                                            </div>
                                        )}
                                        {quickFacts.mustEat && (
                                            <div className="flex gap-3 text-sm">
                                                <span className="text-slate-400 min-w-[100px]">Must eat</span>
                                                <span className="text-slate-100">{quickFacts.mustEat}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Physical */}
                            {physical && (
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                                        Physical Geography
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-200">
                                        {physical}
                                    </p>
                                </div>
                            )}

                            {/* Political */}
                            {political && (
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                                        Political Context
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-200">
                                        {political}
                                    </p>
                                </div>
                            )}

                            {/* Demographics */}
                            {demographics && (
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                                        People & Culture
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-200">
                                        {demographics}
                                    </p>
                                </div>
                            )}

                            {/* Logistics */}
                            {logistics && (
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                                        Travel & Route
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-200">
                                        {logistics}
                                    </p>
                                </div>
                            )}

                            {/* BOTTOM GALLERY - Secondary Images */}
                            {secondaryImages.length > 0 && (
                                <div className="pt-4 border-t border-white/10">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                                        Photo Gallery
                                    </h3>
                                    <div className={cn(
                                        "grid gap-4",
                                        secondaryImages.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-2"
                                    )}>
                                        {secondaryImages.map((imagePath, index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
                                            >
                                                <img
                                                    src={imagePath}
                                                    alt={`${city.name} ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Accent Line */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
