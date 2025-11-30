'use client'

/**
 * ScrollytellingLayout Component
 * 
 * Main orchestrator for scrollytelling experiences.
 * Manages scroll progress, chapter transitions, and map camera coordination.
 */

import { useRef, useEffect, createContext, useContext } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ScrollytellingLayoutProps, ScrollytellingContextValue, MapAPI } from './types'
import ScrollSection from './ScrollSection'
import { useScrollProgress } from '@/lib/scrollytelling/hooks/useScrollProgress'
import { useChapterTransitions } from '@/lib/scrollytelling/hooks/useChapterTransitions'
import { ScrollBackground } from './ScrollBackground'
import MapView from './MapView'
import ChapterNavigation from './ChapterNavigation'

// Create context for child components to access scrollytelling state
const ScrollytellingContext = createContext<ScrollytellingContextValue | null>(null)

export function useScrollytelling() {
    const context = useContext(ScrollytellingContext)
    if (!context) {
        throw new Error('useScrollytelling must be used within ScrollytellingLayout')
    }
    return context
}

export default function ScrollytellingLayout({
    config,
    chapters,
    markers = [],
    routes = [],
    callbacks = {},
    className = '',
    children,
    renderChapterIcon,
}: ScrollytellingLayoutProps) {
    const { scrollYProgress } = useScroll()
    const mapRef = useRef<MapAPI | null>(null)

    // Use scroll tracking hook
    const {
        currentChapter,
        scrollProgress,
        setCurrentChapter,
        scrollToChapter,
        registerChapter,
    } = useScrollProgress(chapters) as any

    // Use chapter transitions hook
    const { isTransitioning, transitionProgress } = useChapterTransitions(
        chapters,
        currentChapter,
        mapRef
    )

    // Notify callbacks when chapter changes
    useEffect(() => {
        if (callbacks.onChapterChange) {
            callbacks.onChapterChange(chapters[currentChapter]?.id, currentChapter)
        }
    }, [currentChapter, chapters, callbacks])

    // Notify scroll progress
    useEffect(() => {
        if (callbacks.onScrollProgress) {
            callbacks.onScrollProgress(scrollProgress)
        }
    }, [scrollProgress, callbacks])

    // Navigation functions
    const goToChapter = (index: number) => {
        scrollToChapter(index)
    }

    const nextChapter = () => {
        if (currentChapter < chapters.length - 1) {
            scrollToChapter(currentChapter + 1)
        }
    }

    const previousChapter = () => {
        if (currentChapter > 0) {
            scrollToChapter(currentChapter - 1)
        }
    }

    // Context value
    const contextValue: ScrollytellingContextValue = {
        config,
        chapters,
        currentChapter,
        scrollProgress,
        mapAPI: mapRef.current,
        callbacks,
        goToChapter,
        nextChapter,
        previousChapter,
    }

    return (
        <ScrollytellingContext.Provider value={contextValue}>
            <div className={`relative bg-inkBlack text-ricePaper overflow-x-hidden ${className}`}>
                {/* Atmospheric Background System */}
                <ScrollBackground currentChapterId={chapters[currentChapter]?.id} />

                {/* Interactive Map Layer */}
                <div className="fixed inset-0 z-0 pointer-events-auto">
                    <MapView
                        ref={mapRef}
                        initialCenter={config.map?.initialCenter}
                        initialZoom={config.map?.initialZoom}
                        initialPitch={config.map?.initialPitch}
                        initialBearing={config.map?.initialBearing}
                        mapStyle={config.map?.style}
                        showControls={config.map?.showControls}
                        show3D={config.map?.enable3D}
                        markers={markers}
                        routes={routes}
                        theme={config.theme}
                        onMarkerClick={callbacks.onMarkerClick}
                        onRouteClick={(route) => callbacks.onRouteSegmentClick?.(route)}
                    />
                </div>

                {/* Chapter Navigation (Vertical Scrubber) */}
                <ChapterNavigation
                    chapters={chapters}
                    currentChapter={currentChapter}
                    onNavigate={goToChapter}
                    renderIcon={renderChapterIcon}
                />

                {/* Overall scroll progress indicator (Top Line) */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-imperialRed via-warmGold to-riverTeal z-50 origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                {/* Chapter sections */}
                {chapters.map((chapter, index) => (
                    <ScrollSection
                        key={chapter.id}
                        chapter={chapter}
                        index={index}
                        isActive={index === currentChapter}
                    >
                        {/* Render chapter content */}
                        {typeof chapter.content === 'function'
                            ? (chapter.content as any)(contextValue)
                            : chapter.content}
                    </ScrollSection>
                ))}

                {/* Optional custom children (e.g., Header, Footer) */}
                {children}

                {/* Transition overlay */}
                {isTransitioning && (
                    <motion.div
                        className="fixed inset-0 bg-inkBlack/20 pointer-events-none z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Optional transition progress indicator */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                            <div className="w-48 h-1 bg-ricePaper/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-ricePaper"
                                    style={{ width: `${transitionProgress * 100}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ScrollytellingContext.Provider>
    )
}

// Export context hook for convenience
export { useScrollytelling as useScrollytellingContext }
