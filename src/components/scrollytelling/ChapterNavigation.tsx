'use client'

import { motion } from 'framer-motion'
import { Chapter } from '@/data/schemas/scrollytelling'
import { useState } from 'react'

interface ChapterNavigationProps {
    chapters: Chapter[]
    currentChapter: number
    onNavigate: (index: number) => void
    className?: string
    renderIcon?: (chapter: Chapter) => React.ReactNode
}

export default function ChapterNavigation({
    chapters,
    currentChapter,
    onNavigate,
    className = '',
    renderIcon
}: ChapterNavigationProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 items-center ${className}`}>
            {/* Vertical line connecting dots */}
            <div className="absolute top-0 bottom-0 w-px bg-white/10 -z-10" />

            {chapters.map((chapter, index) => {
                const isActive = index === currentChapter
                const isHovered = index === hoveredIndex
                const isPast = index < currentChapter

                return (
                    <button
                        key={chapter.id}
                        onClick={() => onNavigate(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
                        aria-label={`Go to chapter: ${chapter.title}`}
                    >
                        {/* Label Tooltip */}
                        <div className={`
                            absolute right-full mr-4 px-3 py-1.5 rounded bg-inkBlack/90 border border-warmGold/30 
                            text-ricePaper text-xs whitespace-nowrap backdrop-blur-sm transition-all duration-300 origin-right
                            ${isActive || isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-2 pointer-events-none'}
                        `}>
                            <span className="font-serif text-warmGold block mb-0.5">{chapter.title}</span>
                            {chapter.subtitle && <span className="opacity-60 text-[10px]">{chapter.subtitle}</span>}

                            {/* Arrow */}
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-inkBlack/90 border-t border-r border-warmGold/30 rotate-45" />
                        </div>

                        {/* Dot / Icon Container */}
                        <div className={`
                            relative flex items-center justify-center transition-all duration-500
                            ${isActive ? 'w-8 h-8' : 'w-3 h-3 group-hover:w-6 group-hover:h-6'}
                        `}>
                            {/* Active Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 rounded-full bg-warmGold/20 blur-md"
                                    transition={{ duration: 0.5 }}
                                />
                            )}

                            {/* The Dot/Circle */}
                            <div className={`
                                absolute inset-0 rounded-full border transition-all duration-300 flex items-center justify-center overflow-hidden
                                ${isActive
                                    ? 'bg-inkBlack border-warmGold scale-100'
                                    : isPast
                                        ? 'bg-imperialRed border-imperialRed scale-100'
                                        : 'bg-white/20 border-transparent group-hover:bg-inkBlack group-hover:border-white/40 scale-100'
                                }
                            `}>
                                {/* Icon (if active or hovered) */}
                                {(isActive || isHovered) && renderIcon && (
                                    <div className={`
                                        w-full h-full p-1.5 transition-opacity duration-300
                                        ${isActive || isHovered ? 'opacity-100' : 'opacity-0'}
                                    `}>
                                        {renderIcon(chapter)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
