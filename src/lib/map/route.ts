/**
 * China Trip 2026 - Route Utilities
 * 
 * Generates GeoJSON for the journey route connecting all cities.
 */

import type { CityMeta } from "@/data/trip/cities";

/**
 * Build a GeoJSON FeatureCollection with a LineString connecting cities in order
 * @param cities - Array of city metadata
 * @returns GeoJSON FeatureCollection
 */
export function buildRouteGeoJSON(cities: CityMeta[]) {
    const sorted = [...cities].sort((a, b) => a.order - b.order);

    return {
        type: "FeatureCollection" as const,
        features: [
            {
                type: "Feature" as const,
                properties: {
                    id: "china-journey-route",
                    color: "#D6A94A", // imperial gold
                    width: 3
                },
                geometry: {
                    type: "LineString" as const,
                    coordinates: sorted.map((city) => [
                        city.location.lng,
                        city.location.lat
                    ])
                }
            }
        ]
    };
}

/**
 * Build individual route segments between consecutive cities
 * Useful for highlighting specific portions of the route
 */
export function buildRouteSegments(cities: CityMeta[]) {
    const sorted = [...cities].sort((a, b) => a.order - b.order);
    const segments: Array<{
        id: string;
        from: string;
        to: string;
        coordinates: number[][];
    }> = [];

    for (let i = 0; i < sorted.length - 1; i++) {
        const from = sorted[i];
        const to = sorted[i + 1];

        segments.push({
            id: `segment-${from.id}-${to.id}`,
            from: from.id,
            to: to.id,
            coordinates: [
                [from.location.lng, from.location.lat],
                [to.location.lng, to.location.lat]
            ]
        });
    }

    return segments;
}
