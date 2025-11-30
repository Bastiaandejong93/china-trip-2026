"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { JourneyBubbles } from "@/components/journey/JourneyBubbles";
import { CityInfoPanel } from "@/components/journey/CityInfoPanel";
import { CityHologram } from "@/components/journey/CityHologram";
import { CITIES, OVERVIEW_CAMERA, getCityById, getSortedCities, type CityId } from "@/data/trip/cities";
import MapView from "@/components/scrollytelling/MapView";
import { MapAPI } from "@/components/scrollytelling/types";
import { WatercolorOverlay } from "@/components/atmosphere/WatercolorOverlay";
import { MistParticles } from "@/components/atmosphere/MistParticles";
import { RouteSegment } from "@/data/schemas/scrollytelling";

type ViewMode = "overview" | "focus";

// Map cities to geographic regions for watercolor overlay
function getCityRegion(cityId: string): 'north' | 'south' | 'east' | 'west' | 'central' | null {
    const regionMap: Record<string, 'north' | 'south' | 'east' | 'west' | 'central'> = {
        'beijing': 'north',
        'shanghai': 'east',
        'wuhan': 'central',
        'zhangjiajie': 'central',
        'chongqing': 'central',
        'chengdu': 'west',
        'dali': 'west',
        'lijiang': 'west',
    }
    return regionMap[cityId] || null
}

import { TopNavigation, ViewId } from "@/components/ui/TopNavigation";

import { PoliticalGeographyView } from "@/components/views/PoliticalGeographyView";
import { PhysicalGeographyView } from "@/components/views/PhysicalGeographyView";
import { DemographicsView } from "@/components/views/DemographicsView";
import { cn } from "@/lib/utils";

import { ReactNode } from "react";

import { CityContent } from "@/lib/loadContent";

interface MapWithJourneyProps {
    physicalContent?: ReactNode;
    demographicsContent?: ReactNode;
    cityContent?: Record<string, CityContent>;
}

export function MapWithJourney({ physicalContent, demographicsContent, cityContent }: MapWithJourneyProps) {
    const mapRef = useRef<MapAPI | null>(null);
    const [mode, setMode] = useState<ViewMode>("overview");
    const [activeCityId, setActiveCityId] = useState<CityId | null>(null);
    const [activeView, setActiveView] = useState<ViewId>("map");

    // Derived state: active city
    const activeCity = activeCityId ? (getCityById(activeCityId) ?? null) : null;
    
    // Generate routes from cities
    const routes = useMemo(() => {
        const segments: RouteSegment[] = [];
        const sortedCities = getSortedCities();
        
        for (let i = 0; i < sortedCities.length - 1; i++) {
            const current = sortedCities[i];
            const next = sortedCities[i + 1];
            segments.push({
                id: `route-${current.id}-${next.id}`,
                from: [current.location.lng, current.location.lat],
                to: [next.location.lng, next.location.lat],
                type: 'flight'
            });
        }
        return segments;
    }, []);

    const [cityPositions, setCityPositions] = useState<Record<string, { x: number; y: number }>>({});

    // Update bubble positions based on map projection
    const updateCityPositions = useCallback(() => {
        if (!mapRef.current) return;
        const api = mapRef.current;
        const positions: Record<string, { x: number; y: number }> = {};

        CITIES.forEach(city => {
            const pos = api.project([city.location.lng, city.location.lat]);
            if (pos) {
                positions[city.id] = { x: pos.x, y: pos.y };
            }
        });

        setCityPositions(positions);
    }, []);

    // Helper to fly to overview
    const flyToOverview = useCallback(() => {
        setMode("overview");
        setActiveCityId(null);
        mapRef.current?.flyTo(
            OVERVIEW_CAMERA.center,
            OVERVIEW_CAMERA.zoom,
            {
                pitch: OVERVIEW_CAMERA.pitch,
                bearing: OVERVIEW_CAMERA.bearing,
                duration: 1600,
            }
        );
    }, []);

    // Handle view change
    const handleViewChange = useCallback((view: ViewId) => {
        setActiveView(view);
        if (view === "map") {
            flyToOverview();
            // Ensure map resizes correctly when becoming visible again
            setTimeout(() => {
                updateCityPositions();
            }, 100);
        }
    }, [flyToOverview, updateCityPositions]);

    // Helper to fly to a specific city by ID
    const flyToCity = useCallback((cityId: CityId) => {
        const city = getCityById(cityId);
        if (!city) return;

        setMode("focus");
        setActiveCityId(cityId);

        // Offset camera to show city left of the panel (panel is 720px + 24px margin = ~744px)
        // Offset is in pixels: negative X shifts view right, showing city on left
        // Using larger offset to ensure city is clearly visible and not hidden behind panel
        const offsetX = -600; // Increased from -384px for more dramatic shift

        mapRef.current?.flyTo(
            city.camera.center,
            city.camera.zoom,
            {
                pitch: city.camera.pitch,
                bearing: city.camera.bearing,
                duration: 2200,
                offset: [offsetX, 0] as any, // Shift view to accommodate panel
            }
        );
    }, []);

    // Navigate to next/prev city
    const navigateCity = useCallback((direction: 1 | -1) => {
        const sorted = getSortedCities();
        if (!sorted.length) return;

        if (!activeCityId) {
            // If no active city, go to first
            flyToCity(sorted[0].id);
            return;
        }

        const currentIdx = sorted.findIndex(c => c.id === activeCityId);
        if (currentIdx === -1) return;

        const nextIdx = (currentIdx + direction + sorted.length) % sorted.length;
        flyToCity(sorted[nextIdx].id);
    }, [activeCityId, flyToCity]);

    // Keyboard controls: ESC, pijltjes
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                e.preventDefault();
                if (activeView !== "map") {
                    handleViewChange("map");
                } else {
                    flyToOverview();
                }
                return;
            }

            // Arrow keys work in any mode
            if (activeView === "map") {
                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    navigateCity(1);
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    navigateCity(-1);
                }
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [flyToOverview, navigateCity, activeView, handleViewChange]);

    // Initialize overview on mount
    useEffect(() => {
        if (mapRef.current) {
            flyToOverview();
        }
    }, [flyToOverview]);

    // Handle map load - add listeners
    const handleMapLoad = useCallback((api: MapAPI) => {
        mapRef.current = api;

        // Add event listeners for bubble positioning
        api.on('move', updateCityPositions);
        api.on('moveend', updateCityPositions);
        api.on('resize', updateCityPositions);

        // Initial update
        updateCityPositions();
    }, [updateCityPositions]);

    // Clean up listeners on unmount
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.off('move', updateCityPositions);
                mapRef.current.off('moveend', updateCityPositions);
                mapRef.current.off('resize', updateCityPositions);
            }
        };
    }, [updateCityPositions]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-ink-black text-parchment-light">
            {/* Fixed header boven de map */}
            <header className="pointer-events-none absolute inset-x-0 top-0 z-50 flex flex-col items-center pt-6 gap-4">
                <div className="pointer-events-auto rounded-full bg-black/55 px-6 py-2 backdrop-blur-glass border border-imperial-gold/30 shadow-card-glass">
                    <h1 className="font-serif text-2xl sm:text-3xl tracking-wide text-parchment-light">
                        China Trip 2026
                    </h1>
                    <p className="mt-1 text-center text-xs sm:text-[13px] text-parchment-mist">
                        A Cinematic Journey Through the Middle Kingdom
                    </p>
                </div>

                {/* Top Navigation */}
                <TopNavigation activeView={activeView} onViewChange={handleViewChange} />
            </header>

            {/* Content Views */}
            <div className={cn("absolute inset-0 z-40 bg-ink-black transition-opacity duration-500", activeView === "map" ? "opacity-0 pointer-events-none" : "opacity-100")}>
                {activeView === "political" && <PoliticalGeographyView />}
                {activeView === "physical" && <PhysicalGeographyView>{physicalContent}</PhysicalGeographyView>}
                {activeView === "demographics" && <DemographicsView>{demographicsContent}</DemographicsView>}
            </div>

            {/* Map Container - Always mounted but hidden when not active */}
            <div className={cn("absolute inset-0 transition-opacity duration-500", activeView !== "map" ? "opacity-0 pointer-events-none" : "opacity-100")}>
                {/* Map laag */}
                <MapView
                    ref={mapRef}
                    className="absolute inset-0"
                    initialCenter={OVERVIEW_CAMERA.center}
                    initialZoom={OVERVIEW_CAMERA.zoom}
                    initialPitch={OVERVIEW_CAMERA.pitch}
                    initialBearing={OVERVIEW_CAMERA.bearing}
                    mapStyle="mapbox://styles/mapbox/dark-v11"
                    show3D
                    showControls={false}
                    onMapLoad={handleMapLoad}
                    routes={routes}
                    theme={{
                        colors: {
                            accent: '#B52719', // imperialRed
                            accentHighlight: '#D8B45A', // warmGold
                        }
                    }}
                />

                {/* Atmospheric Layers */}
                <MistParticles particleCount={25} speed={0.4} />

                <WatercolorOverlay
                    isVisible={mode === "focus"}
                    intensity={0.25}
                    activeRegion={activeCityId ? getCityRegion(activeCityId) : null}
                />

                {/* Journey bubbles overlay */}
                <JourneyBubbles
                    cities={CITIES}
                    activeCityId={activeCityId}
                    mode={mode}
                    onCitySelect={(city) => flyToCity(city.id)}
                    cityPositions={cityPositions}
                />

                {/* Hologram visualization removed as per request */}
                {/* <CityHologram city={activeCity} mode={mode} /> */}

                {/* City info panel */}
                <CityInfoPanel 
                    city={activeCity} 
                    content={activeCity && cityContent ? cityContent[activeCity.id] : null}
                    mode={mode} 
                    onClose={flyToOverview} 
                />

                {/* Kleine help-overlay links onder */}
                <div className="pointer-events-none absolute left-4 bottom-4 z-40 max-w-xs rounded-card bg-black/60 px-4 py-3 text-[11px] text-parchment-mist backdrop-blur-glass">
                    <p>
                        Click a city bubble to fly there. Press{" "}
                        <span className="font-semibold text-imperial-gold">Esc</span> to
                        return to the overview. Use{" "}
                        <span className="font-semibold text-imperial-gold">
                            ← / →
                        </span>{" "}
                        to move between cities.
                    </p>
                </div>
            </div>
        </section>
    );
}
