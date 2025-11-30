/**
 * Core Scrollytelling Engine - Type Definitions
 * 
 * This schema defines the data model for the reusable scrollytelling engine.
 * Stories (China, Japan, etc.) implement these interfaces to provide their content.
 */

import { ReactNode } from 'react'

// ============================================================================
// STORY CONFIGURATION
// ============================================================================

export interface StoryConfig {
  meta: StoryMeta
  theme?: ThemeConfig
  map?: MapConfig
}

export interface StoryMeta {
  id: string
  title: string
  subtitle?: string
  description?: string
  author?: string
  publishedAt?: string
  locale?: string
}

export interface ThemeConfig {
  colors?: Record<string, any> // Allow nested objects
  fonts?: {
    display?: string
    body?: string
    heading?: string
  }
  // Allow any theme object to be passed through
  [key: string]: any
}

export interface MapConfig {
  style?: string
  initialCenter?: [number, number]
  initialZoom?: number
  initialPitch?: number
  initialBearing?: number
  showControls?: boolean
  enable3D?: boolean
  projection?: 'mercator' | 'globe'
}

// ============================================================================
// CHAPTER SYSTEM
// ============================================================================

export interface Chapter {
  id: string
  title: string
  subtitle?: string

  // Content can be a React component or structured data
  content: ReactNode | ChapterContent

  // Map camera state for this chapter
  mapState?: CameraState

  // Visual presentation
  background?: BackgroundType
  fullHeight?: boolean

  // Timing
  duration?: number
  delay?: number

  // Scroll behavior
  scrollTrigger?: ScrollTrigger
}

export type BackgroundType = 'gradient' | 'solid' | 'map' | 'image' | 'custom'

export interface ChapterContent {
  // Structured content alternative to ReactNode
  sections?: ContentSection[]
  media?: MediaAsset[]
  interactive?: InteractiveElement[]
}

export interface ContentSection {
  type: 'text' | 'image' | 'video' | 'card' | 'grid' | 'custom'
  content: any
  layout?: 'full' | 'split' | 'sidebar' | 'overlay'
}

// ============================================================================
// MAP & CAMERA SYSTEM
// ============================================================================

export interface CameraState {
  center: [number, number] // [longitude, latitude]
  zoom: number
  pitch?: number
  bearing?: number
  duration?: number
  easing?: string
  projection?: 'mercator' | 'globe'
}

export interface Marker {
  id?: string
  coords: [number, number] // [longitude, latitude]
  title: string
  description?: string
  type?: 'city' | 'landmark' | 'cultural' | 'custom'
  icon?: string
  color?: string
  metadata?: Record<string, any>
}

export interface RouteSegment {
  id?: string
  from: [number, number]
  to: [number, number]
  type?: 'flight' | 'train' | 'car' | 'boat' | 'walking' | 'custom'
  color?: string
  width?: number
  dashed?: boolean
  animated?: boolean
  metadata?: Record<string, any>
}

// ============================================================================
// SCROLL SYSTEM
// ============================================================================

export interface ScrollTrigger {
  type: 'scroll_start' | 'scroll_progress' | 'viewport_enter' | 'viewport_exit'
  value?: number // For scroll_progress type (0-1)
  offset?: number // Offset in pixels
}

export interface ScrollProgress {
  currentChapter: number
  overallProgress: number // 0-1
  chapterProgress: number // 0-1 within current chapter
  direction: 'up' | 'down'
}

// ============================================================================
// MEDIA & ASSETS
// ============================================================================

export interface MediaAsset {
  id: string
  type: 'image' | 'video' | 'audio' | 'svg' | 'custom'
  url: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  metadata?: Record<string, any>
}

export interface InteractiveElement {
  type: 'button' | 'slider' | 'toggle' | 'custom'
  id: string
  action: string | ((data: any) => void)
  metadata?: Record<string, any>
}

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'zoom' | 'custom'
  duration?: number
  delay?: number
  easing?: string
  stagger?: number
}

export interface TransitionConfig {
  enter?: AnimationConfig
  exit?: AnimationConfig
  between?: AnimationConfig
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type ChapterId = string
export type MarkerId = string
export type AssetId = string

// Navigation state
export interface NavigationState {
  currentChapter: ChapterId
  visitedChapters: ChapterId[]
  totalChapters: number
  canGoNext: boolean
  canGoPrevious: boolean
}

// User interaction callbacks
export interface StoryCallbacks {
  onChapterChange?: (chapterId: ChapterId, index: number) => void
  onMarkerClick?: (marker: Marker) => void
  onRouteSegmentClick?: (segment: RouteSegment) => void
  onScrollProgress?: (progress: ScrollProgress) => void
  onNavigate?: (state: NavigationState) => void
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function validateStoryConfig(config: StoryConfig): boolean {
  return !!(config.meta?.id && config.meta?.title)
}

export function validateChapter(chapter: Chapter): boolean {
  return !!(chapter.id && chapter.title && chapter.content)
}

// ============================================================================
// UTILITIES
// ============================================================================

export function createDefaultStoryConfig(overrides?: Partial<StoryConfig>): StoryConfig {
  return {
    meta: {
      id: 'untitled-story',
      title: 'Untitled Story',
      ...overrides?.meta,
    },
    theme: overrides?.theme,
    map: {
      initialCenter: [0, 0],
      initialZoom: 2,
      ...overrides?.map,
    },
  }
}

export function createDefaultChapter(overrides?: Partial<Chapter>): Chapter {
  return {
    id: 'chapter-1',
    title: 'Chapter 1',
    content: null,
    background: 'solid',
    fullHeight: true,
    ...overrides,
  }
}
