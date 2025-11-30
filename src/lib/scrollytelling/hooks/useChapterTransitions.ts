/**
 * useChapterTransitions Hook
 * 
 * Manages transitions between chapters, including map camera updates
 * and animation coordination.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { Chapter, CameraState } from '@/data/schemas/scrollytelling'
import { UseChapterTransitionsReturn, MapAPI } from '@/components/scrollytelling/types'

export function useChapterTransitions(
    chapters: Chapter[],
    currentChapter: number,
    mapRef: React.RefObject<MapAPI | null>
): UseChapterTransitionsReturn {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionProgress, setTransitionProgress] = useState(0)
    const previousChapter = useRef(currentChapter)
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null)

    // Handle chapter changes
    useEffect(() => {
        if (previousChapter.current === currentChapter) return

        const chapter = chapters[currentChapter]
        if (!chapter) return

        // Start transition
        setIsTransitioning(true)
        setTransitionProgress(0)

        // Update map camera if mapState is defined
        if (chapter.mapState && mapRef.current) {
            const duration = chapter.mapState.duration || 2000

            mapRef.current.setCameraState({
                ...chapter.mapState,
                duration,
            })

            // Simulate transition progress
            const startTime = Date.now()
            const progressInterval = setInterval(() => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(1, elapsed / duration)
                setTransitionProgress(progress)

                if (progress >= 1) {
                    clearInterval(progressInterval)
                    setIsTransitioning(false)
                }
            }, 16) // ~60fps

            // Safety timeout
            transitionTimeout.current = setTimeout(() => {
                setIsTransitioning(false)
                setTransitionProgress(1)
            }, duration + 100)

            return () => {
                clearInterval(progressInterval)
                if (transitionTimeout.current) {
                    clearTimeout(transitionTimeout.current)
                }
            }
        } else {
            // No map transition, just mark as complete quickly
            setTimeout(() => {
                setIsTransitioning(false)
                setTransitionProgress(1)
            }, 100)
        }

        previousChapter.current = currentChapter
    }, [currentChapter, chapters, mapRef])

    // Manual transition trigger
    const transitionTo = useCallback((chapterIndex: number) => {
        if (chapterIndex < 0 || chapterIndex >= chapters.length) return
        if (chapterIndex === currentChapter) return

        previousChapter.current = currentChapter
        // The parent component should update currentChapter which will trigger the effect above
    }, [chapters.length, currentChapter])

    return {
        isTransitioning,
        transitionTo,
        transitionProgress,
    }
}
