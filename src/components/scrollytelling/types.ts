/**
 * Scrollytelling Engine - Component Types
 * 
 * React component prop types for the scrollytelling engine.
 * These extend the core schema types with React-specific needs.
 */

import { ReactNode } from 'react'
import {
    StoryConfig,
    Chapter,
    CameraState,
    Marker,
    RouteSegment,
    ScrollProgress,
    StoryCallbacks,
    BackgroundType,
} from '@/data/schemas/scrollytelling'

// ============================================================================
// MAIN LAYOUT
// ============================================================================

export interface ScrollytellingLayoutProps {
    config: StoryConfig
    chapters: Chapter[]
    markers?: Marker[]
    routes?: RouteSegment[]
    callbacks?: StoryCallbacks
    className?: string
    children?: ReactNode

    // Optional custom icon renderer for chapters
    renderChapterIcon?: (chapter: Chapter) => ReactNode
}

// ============================================================================
// SCROLL SECTION
// ============================================================================

export interface ScrollSectionProps {
    chapter: Chapter
    index: number
    isActive?: boolean
    className?: string
    children?: ReactNode

    // Optional overrides
    background?: BackgroundType
    fullHeight?: boolean
    id?: string
}

// ============================================================================
// MAP VIEW
// ============================================================================

export interface MapViewProps {
    // Initial camera position
    initialCenter?: [number, number]
    initialZoom?: number
    initialPitch?: number
    initialBearing?: number

    // Visual elements
    markers?: Marker[]
    routes?: RouteSegment[]

    // Map configuration
    mapStyle?: string
    show3D?: boolean
    showControls?: boolean

    // Theme customization
    theme?: any

    // Callbacks
    onMapLoad?: (map: MapAPI) => void
    onMarkerClick?: (marker: Marker) => void
    onRouteClick?: (segment: RouteSegment) => void

    className?: string
}

// Map API exposed to parent components
export interface MapAPI {
    flyTo: (center: [number, number], zoom?: number, options?: CameraOptions) => void
    setCameraState: (state: CameraState) => void
    followRoute: (route: [number, number][], options?: RouteOptions) => Promise<void>
    addMarkers: (markers: Marker[]) => void
    removeMarkers: (markerIds: string[]) => void
    addRoute: (route: RouteSegment[]) => void
    removeRoute: (routeId: string) => void
    reset: () => void
    project: (lnglat: [number, number]) => { x: number, y: number } | null
    on: (event: string, callback: any) => void
    off: (event: string, callback: any) => void
}

export interface CameraOptions {
    duration?: number
    easing?: string
    pitch?: number
    bearing?: number
}

export interface RouteOptions {
    speed?: number
    pause?: number
    easing?: string
}

// ============================================================================
// TIMELINE
// ============================================================================

export interface TimelineProps {
    items: TimelineItem[]
    orientation?: 'horizontal' | 'vertical'
    showProgress?: boolean
    currentIndex?: number
    onItemClick?: (item: TimelineItem, index: number) => void
    className?: string
}

export interface TimelineItem {
    id: string
    title: string
    date?: string
    description?: string
    status?: 'completed' | 'current' | 'upcoming'
    icon?: string
    metadata?: Record<string, any>
}

// ============================================================================
// PROGRESS INDICATOR
// ============================================================================

export interface ProgressIndicatorProps {
    progress: number // 0-1
    chapters: Chapter[]
    currentChapter: number
    onClick?: (chapterIndex: number) => void
    className?: string
}

// ============================================================================
// CHAPTER NAVIGATION
// ============================================================================

export interface ChapterNavigationProps {
    chapters: Chapter[]
    currentChapter: number
    onNavigate: (chapterIndex: number) => void
    showLabels?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right'
    className?: string
}

// ============================================================================
// SCROLL INDICATORS
// ============================================================================

export interface ScrollIndicatorProps {
    direction?: 'down' | 'up'
    visible?: boolean
    onClick?: () => void
    className?: string
}

// ============================================================================
// HOOKS RETURN TYPES
// ============================================================================

export interface UseScrollProgressReturn {
    currentChapter: number
    scrollProgress: ScrollProgress
    setCurrentChapter: (index: number) => void
    scrollToChapter: (index: number) => void
}

export interface UseChapterTransitionsReturn {
    isTransitioning: boolean
    transitionTo: (chapterIndex: number) => void
    transitionProgress: number
}

export interface UseMapControlReturn {
    mapRef: React.RefObject<MapAPI | null>
    isMapReady: boolean
    updateCamera: (state: CameraState) => void
    resetCamera: () => void
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface ScrollytellingContextValue {
    config: StoryConfig
    chapters: Chapter[]
    currentChapter: number
    scrollProgress: ScrollProgress
    mapAPI: MapAPI | null
    callbacks: StoryCallbacks

    // Actions
    goToChapter: (index: number) => void
    nextChapter: () => void
    previousChapter: () => void
}
