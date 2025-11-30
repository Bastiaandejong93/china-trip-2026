/**
 * useScrollProgress Hook
 * 
 * Tracks scroll position and determines which chapter is currently active.
 * Returns scroll progress information for the scrollytelling engine.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { Chapter, ScrollProgress } from '@/data/schemas/scrollytelling'
import { UseScrollProgressReturn } from '@/components/scrollytelling/types'

export function useScrollProgress(chapters: Chapter[]): UseScrollProgressReturn {
    const [currentChapter, setCurrentChapter] = useState(0)
    const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
        currentChapter: 0,
        overallProgress: 0,
        chapterProgress: 0,
        direction: 'down',
    })

    const lastScrollY = useRef(0)
    const chapterRefs = useRef<Map<string, HTMLElement>>(new Map())

    // Register chapter element for tracking
    const registerChapter = useCallback((chapterId: string, element: HTMLElement | null) => {
        if (element) {
            chapterRefs.current.set(chapterId, element)
        } else {
            chapterRefs.current.delete(chapterId)
        }
    }, [])

    // Calculate which chapter is currently in view
    const calculateCurrentChapter = useCallback(() => {
        if (chapters.length === 0) return 0

        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const triggerPoint = scrollPosition + windowHeight * 0.5 // Middle of viewport

        let activeChapter = 0
        let minDistance = Infinity

        chapters.forEach((chapter, index) => {
            const element = chapterRefs.current.get(chapter.id)
            if (!element) return

            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + scrollPosition
            const elementBottom = elementTop + rect.height
            const elementMiddle = elementTop + rect.height / 2

            const distance = Math.abs(triggerPoint - elementMiddle)

            if (triggerPoint >= elementTop && triggerPoint <= elementBottom) {
                // Trigger point is within this chapter
                if (distance < minDistance) {
                    minDistance = distance
                    activeChapter = index
                }
            }
        })

        return activeChapter
    }, [chapters])

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const direction = scrollY > lastScrollY.current ? 'down' : 'up'
            lastScrollY.current = scrollY

            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const overallProgress = docHeight > 0 ? scrollY / docHeight : 0

            const newCurrentChapter = calculateCurrentChapter()

            // Calculate progress within current chapter
            let chapterProgress = 0
            if (chapters.length > 0) {
                const currentElement = chapterRefs.current.get(chapters[newCurrentChapter]?.id)
                if (currentElement) {
                    const rect = currentElement.getBoundingClientRect()
                    const elementTop = rect.top + scrollY
                    const elementHeight = rect.height
                    const scrollIntoElement = scrollY - elementTop
                    chapterProgress = Math.max(0, Math.min(1, scrollIntoElement / elementHeight))
                }
            }

            setScrollProgress({
                currentChapter: newCurrentChapter,
                overallProgress,
                chapterProgress,
                direction,
            })

            if (newCurrentChapter !== currentChapter) {
                setCurrentChapter(newCurrentChapter)
            }
        }

        // Initial calculation
        handleScroll()

        // Throttled scroll listener
        let ticking = false
        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', scrollListener, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', scrollListener)
            window.removeEventListener('resize', handleScroll)
        }
    }, [chapters, currentChapter, calculateCurrentChapter])

    // Scroll to specific chapter
    const scrollToChapter = useCallback((index: number) => {
        if (index < 0 || index >= chapters.length) return

        const chapter = chapters[index]
        const element = chapterRefs.current.get(chapter.id)

        if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY
            const offset = window.innerHeight * 0.1 // 10vh offset from top

            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth',
            })
        }
    }, [chapters])

    // Expose register function via a property
    // This will be used by ScrollSection components
    const returnValue: UseScrollProgressReturn & { registerChapter?: typeof registerChapter } = {
        currentChapter,
        scrollProgress,
        setCurrentChapter,
        scrollToChapter,
        registerChapter,
    }

    return returnValue
}
