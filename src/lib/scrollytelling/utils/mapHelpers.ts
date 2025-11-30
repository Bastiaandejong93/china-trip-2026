/**
 * Map Utilities
 * 
 * Helper functions for map operations, camera calculations, and route management.
 */

import { Marker, RouteSegment, CameraState } from '@/data/schemas/scrollytelling'

// ============================================================================
// CAMERA & BOUNDS
// ============================================================================

/**
 * Calculate map bounds to fit all markers
 */
export function calculateMapBounds(markers: Marker[]): {
    center: [number, number]
    zoom: number
    bounds: [[number, number], [number, number]]
} {
    if (markers.length === 0) {
        return {
            center: [0, 0],
            zoom: 2,
            bounds: [[-180, -90], [180, 90]],
        }
    }

    let minLng = Infinity
    let maxLng = -Infinity
    let minLat = Infinity
    let maxLat = -Infinity

    markers.forEach((marker) => {
        const [lng, lat] = marker.coords
        minLng = Math.min(minLng, lng)
        maxLng = Math.max(maxLng, lng)
        minLat = Math.min(minLat, lat)
        maxLat = Math.max(maxLat, lat)
    })

    const center: [number, number] = [
        (minLng + maxLng) / 2,
        (minLat + maxLat) / 2,
    ]

    // Calculate appropriate zoom level based on bounds span
    const lngSpan = maxLng - minLng
    const latSpan = maxLat - minLat
    const maxSpan = Math.max(lngSpan, latSpan)

    // Rough zoom level calculation (simplified)
    let zoom = 2
    if (maxSpan < 0.01) zoom = 16
    else if (maxSpan < 0.1) zoom = 12
    else if (maxSpan < 1) zoom = 8
    else if (maxSpan < 10) zoom = 6
    else if (maxSpan < 50) zoom = 4

    return {
        center,
        zoom,
        bounds: [[minLng, minLat], [maxLng, maxLat]],
    }
}

/**
 * Interpolate between two camera states
 */
export function interpolateCameraPath(
    from: CameraState,
    to: CameraState,
    progress: number // 0-1
): CameraState {
    const easeProgress = easeInOutCubic(progress)

    return {
        center: [
            from.center[0] + (to.center[0] - from.center[0]) * easeProgress,
            from.center[1] + (to.center[1] - from.center[1]) * easeProgress,
        ],
        zoom: from.zoom + (to.zoom - from.zoom) * easeProgress,
        pitch: from.pitch !== undefined && to.pitch !== undefined
            ? from.pitch + (to.pitch - from.pitch) * easeProgress
            : to.pitch,
        bearing: from.bearing !== undefined && to.bearing !== undefined
            ? from.bearing + (to.bearing - from.bearing) * easeProgress
            : to.bearing,
    }
}

/**
 * Easing function for smooth camera transitions
 */
function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

// ============================================================================
// ROUTE UTILITIES
// ============================================================================

/**
 * Convert route segments to GeoJSON LineString
 */
export function createRouteGeoJSON(segments: RouteSegment[]) {
    const coordinates: [number, number][] = []

    segments.forEach((segment) => {
        if (coordinates.length === 0) {
            coordinates.push(segment.from)
        }
        coordinates.push(segment.to)
    })

    return {
        type: 'Feature' as const,
        properties: {},
        geometry: {
            type: 'LineString' as const,
            coordinates,
        },
    }
}

/**
 * Create multiple GeoJSON features for different route types
 */
export function createRoutesByType(segments: RouteSegment[]): Record<string, any> {
    const routesByType: Record<string, RouteSegment[]> = {}

    segments.forEach((segment) => {
        const type = segment.type || 'custom'
        if (!routesByType[type]) {
            routesByType[type] = []
        }
        routesByType[type].push(segment)
    })

    return Object.entries(routesByType).reduce((acc, [type, segs]) => {
        acc[type] = createRouteGeoJSON(segs)
        return acc
    }, {} as Record<string, any>)
}

/**
 * Calculate total route distance (approximate)
 */
export function calculateRouteDistance(segments: RouteSegment[]): number {
    return segments.reduce((total, segment) => {
        const distance = haversineDistance(segment.from, segment.to)
        return total + distance
    }, 0)
}

/**
 * Haversine formula for distance between two points on Earth
 */
function haversineDistance(
    from: [number, number],
    to: [number, number]
): number {
    const R = 6371 // Earth's radius in km
    const dLat = toRadians(to[1] - from[1])
    const dLon = toRadians(to[0] - from[0])

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(from[1])) *
        Math.cos(toRadians(to[1])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
}

// ============================================================================
// MARKER UTILITIES
// ============================================================================

/**
 * Group markers by type
 */
export function groupMarkersByType(markers: Marker[]): Record<string, Marker[]> {
    return markers.reduce((acc, marker) => {
        const type = marker.type || 'custom'
        if (!acc[type]) {
            acc[type] = []
        }
        acc[type].push(marker)
        return acc
    }, {} as Record<string, Marker[]>)
}

/**
 * Find nearest marker to a coordinate
 */
export function findNearestMarker(
    coord: [number, number],
    markers: Marker[]
): Marker | null {
    if (markers.length === 0) return null

    let nearest = markers[0]
    let minDistance = haversineDistance(coord, markers[0].coords)

    markers.forEach((marker) => {
        const distance = haversineDistance(coord, marker.coords)
        if (distance < minDistance) {
            minDistance = distance
            nearest = marker
        }
    })

    return nearest
}

// ============================================================================
// ANIMATION HELPERS
// ============================================================================

/**
 * Generate waypoints along a path for smooth animation
 */
export function generateWaypoints(
    from: [number, number],
    to: [number, number],
    steps: number = 20
): [number, number][] {
    const waypoints: [number, number][] = []

    for (let i = 0; i <= steps; i++) {
        const t = i / steps
        waypoints.push([
            from[0] + (to[0] - from[0]) * t,
            from[1] + (to[1] - from[1]) * t,
        ])
    }

    return waypoints
}

/**
 * Create animation arc (for flight paths)
 */
export function createArcPath(
    from: [number, number],
    to: [number, number],
    height: number = 0.3,
    steps: number = 30
): [number, number][] {
    const waypoints: [number, number][] = []

    for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const arc = Math.sin(t * Math.PI) * height

        waypoints.push([
            from[0] + (to[0] - from[0]) * t,
            from[1] + (to[1] - from[1]) * t + arc,
        ])
    }

    return waypoints
}
