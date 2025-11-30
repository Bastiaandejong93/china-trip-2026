"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CityMeta } from "@/data/trip/cities";
import { getAssetsForCity } from "@/data/trip/assets";
import { cn } from "@/lib/utils";

type CityHologramProps = {
    city: CityMeta | null;
    mode: "overview" | "focus";
};

export function CityHologram({ city, mode }: CityHologramProps) {
    const isVisible = mode === "focus" && city != null;
    const assets = city ? getAssetsForCity(city.id) : [];
    const heroImage = assets.find(a => a.role === "hero")?.publicPath;

    return (
        <AnimatePresence>
            {isVisible && city && (
                <motion.div
                    className="pointer-events-none absolute left-6 bottom-6 z-40 w-[280px]"
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.85 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                        duration: 0.6,
                    }}
                >
                    {/* Hologram Container */}
                    <div className="relative">
                        {/* Outer Glow Frame */}
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-lg border-2 border-imperial-gold/60",
                                "bg-gradient-to-br from-black/90 via-ink-black/85 to-black/95",
                                "shadow-[0_0_40px_rgba(214,169,74,0.35)]"
                            )}
                        >
                            {/* Top Label */}
                            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-imperial-gold/40 bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                                <span className="text-[9px] font-mono uppercase tracking-widest text-imperial-gold/90">
                                    CITY SCAN
                                </span>
                                <span className="text-[9px] font-mono tabular-nums text-parchment-mist/70">
                                    {city.location.lat.toFixed(2)}°N, {city.location.lng.toFixed(2)}°E
                                </span>
                            </div>

                            {/* Hologram Content */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                {city.hologramSrc ? (
                                    // Video hologram
                                    <video
                                        src={city.hologramSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover opacity-80"
                                    />
                                ) : (
                                    // Placeholder hologram with first image
                                    <div className="relative h-full w-full">
                                        {heroImage ? (
                                            <img
                                                src={heroImage}
                                                alt={city.name}
                                                className="h-full w-full object-cover opacity-70"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-imperial-gold/10 to-imperial-redSoft/10">
                                                <div className="text-center">
                                                    <div className="mb-2 text-4xl">🏙️</div>
                                                    <p className="text-xs text-parchment-mist/60">
                                                        HOLOGRAM DATA
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Scanline Overlay */}
                                <div
                                    className="pointer-events-none absolute inset-0 z-10"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(
                                            0deg,
                                            rgba(214, 169, 74, 0.03) 0px,
                                            rgba(214, 169, 74, 0.03) 1px,
                                            transparent 1px,
                                            transparent 3px
                                        )`,
                                    }}
                                />

                                {/* Animated Scan Line */}
                                <motion.div
                                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-imperial-gold/60 to-transparent"
                                    initial={{ top: "0%" }}
                                    animate={{ top: "100%" }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />

                                {/* Corner Brackets */}
                                {[
                                    "top-1 left-1",
                                    "top-1 right-1",
                                    "bottom-1 left-1",
                                    "bottom-1 right-1",
                                ].map((pos, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "absolute h-3 w-3",
                                            pos,
                                            idx === 0 && "border-l-2 border-t-2",
                                            idx === 1 && "border-r-2 border-t-2",
                                            idx === 2 && "border-l-2 border-b-2",
                                            idx === 3 && "border-r-2 border-b-2",
                                            "border-imperial-gold/70"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* City Name Badge */}
                            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-imperial-gold/40 bg-gradient-to-t from-black/90 via-black/80 to-transparent px-3 py-2 backdrop-blur-sm">
                                <p className="font-serif text-sm font-semibold text-parchment-light">
                                    {city.name}
                                </p>
                                {city.subtitle && (
                                    <p className="text-[10px] text-imperial-gold/70">
                                        {city.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Outer Glow Pulse */}
                        <motion.div
                            className="absolute inset-0 -z-10 rounded-lg bg-imperial-gold/20 blur-xl"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [0.98, 1.02, 0.98],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
