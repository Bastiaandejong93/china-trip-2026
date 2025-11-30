"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollBackgroundProps {
    currentChapterId: string;
    className?: string;
}

// Background presets for different story sections
const BACKGROUND_PRESETS: Record<string, {
    backLayer: string; // Mountains / Mist
    midLayer: string;  // Bamboo / Clouds
    frontLayer: string; // Details
    overlayColor: string;
}> = {
    "intro": {
        backLayer: "bg-gradient-to-b from-mistInk to-inkBlack",
        midLayer: "opacity-30",
        frontLayer: "opacity-10",
        overlayColor: "bg-inkBlack/20"
    },
    "geography": {
        backLayer: "bg-gradient-to-b from-pineGreen/20 to-inkBlack",
        midLayer: "opacity-40",
        frontLayer: "opacity-20",
        overlayColor: "bg-pineGreen/10"
    },
    "grand-tour": {
        backLayer: "bg-gradient-to-b from-imperialRed/10 to-inkBlack",
        midLayer: "opacity-30",
        frontLayer: "opacity-30",
        overlayColor: "bg-warmGold/5"
    },
    "culture": {
        backLayer: "bg-gradient-to-b from-sealRed/20 to-inkBlack",
        midLayer: "opacity-20",
        frontLayer: "opacity-40",
        overlayColor: "bg-sealRed/10"
    },
    "default": {
        backLayer: "bg-inkBlack",
        midLayer: "opacity-20",
        frontLayer: "opacity-10",
        overlayColor: "bg-black/40"
    }
};

export function ScrollBackground({ currentChapterId, className }: ScrollBackgroundProps) {
    const { scrollY } = useScroll();

    // Parallax transforms
    const backY = useTransform(scrollY, [0, 5000], [0, 200]);
    const midY = useTransform(scrollY, [0, 5000], [0, 500]);
    const frontY = useTransform(scrollY, [0, 5000], [0, 800]);

    // Determine current preset based on chapter ID prefix or exact match
    const getPreset = (id: string) => {
        if (id.startsWith("geo")) return BACKGROUND_PRESETS.geography;
        if (id.startsWith("tour") || id.includes("city")) return BACKGROUND_PRESETS["grand-tour"];
        if (id.startsWith("culture") || id.startsWith("art")) return BACKGROUND_PRESETS.culture;
        if (id === "intro" || id === "hero") return BACKGROUND_PRESETS.intro;
        return BACKGROUND_PRESETS.default;
    };

    const preset = getPreset(currentChapterId);

    return (
        <div className={cn("fixed inset-0 z-0 overflow-hidden pointer-events-none", className)}>
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-inkBlack transition-colors duration-1000" />

            {/* Back Layer (Slowest) - Mountains/Mist */}
            <motion.div
                style={{ y: backY }}
                className={cn(
                    "absolute inset-0 w-full h-[120%] transition-all duration-1000",
                    preset.backLayer
                )}
            >
                {/* Placeholder for Ink Wash Mountain Image */}
                <div className="absolute inset-0 opacity-30 bg-[url('/images/texture-mountains.png')] bg-cover bg-center mix-blend-overlay" />
            </motion.div>

            {/* Mid Layer (Medium) - Bamboo/Clouds */}
            <motion.div
                style={{ y: midY }}
                className={cn(
                    "absolute inset-0 w-full h-[150%] transition-all duration-1000",
                    preset.midLayer
                )}
            >
                {/* Placeholder for Bamboo/Cloud Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('/images/texture-clouds.png')] bg-repeat-y mix-blend-soft-light" />
            </motion.div>

            {/* Front Layer (Fastest) - Details/Route Lines */}
            <motion.div
                style={{ y: frontY }}
                className={cn(
                    "absolute inset-0 w-full h-[200%] transition-all duration-1000",
                    preset.frontLayer
                )}
            >
                {/* Subtle vertical lines or paper texture */}
                <div className="absolute inset-0 opacity-10 bg-[url('/images/texture-paper.png')] mix-blend-overlay" />
            </motion.div>

            {/* Color Overlay for Mood */}
            <div className={cn(
                "absolute inset-0 transition-colors duration-1000 mix-blend-overlay",
                preset.overlayColor
            )} />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        </div>
    );
}
