/**
 * Scrollytelling Engine - Exports
 * 
 * Central export file for all scrollytelling engine components and utilities.
 */

// Core Components
export { default as ScrollytellingLayout, useScrollytellingContext } from './ScrollytellingLayout'
export { default as ScrollSection } from './ScrollSection'
export { default as MapView } from './MapView'

// Types
export * from './types'

// Re-export schema types for convenience
export type {
    StoryConfig,
    StoryMeta,
    ThemeConfig,
    MapConfig,
    Chapter,
    ChapterContent,
    CameraState,
    Marker,
    RouteSegment,
    ScrollProgress,
    ScrollTrigger,
    MediaAsset,
    AnimationConfig,
} from '@/data/schemas/scrollytelling'
