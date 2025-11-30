'use client'

/**
 * Generic MapView Component
 * 
 * A themeable, configurable map component for the scrollytelling engine.
 * Supports both Mapbox (when token available) and a fallback canvas mode.
 */

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapViewProps, MapAPI, CameraOptions, RouteOptions } from './types'
import { Marker, RouteSegment, CameraState } from '@/data/schemas/scrollytelling'
import { createRouteGeoJSON } from '@/lib/scrollytelling/utils/mapHelpers'

const MapView = forwardRef<MapAPI, MapViewProps>(function MapView(
    {
        initialCenter = [0, 0],
        initialZoom = 2,
        initialPitch = 0,
        initialBearing = 0,
        markers = [],
        routes = [],
        mapStyle = 'mapbox://styles/mapbox/dark-v11',
        show3D = false,
        showControls = true,
        theme,
        onMapLoad,
        onMarkerClick,
        onRouteClick,
        className = '',
    },
    ref
) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<any>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [mapboxAvailable, setMapboxAvailable] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Expose MapAPI via ref
    useImperativeHandle(ref, () => ({
        flyTo: (center: [number, number], zoom?: number, options?: CameraOptions) => {
            if (!mapInstance.current) return

            mapInstance.current.flyTo({
                center,
                zoom: zoom || initialZoom,
                pitch: options?.pitch,
                bearing: options?.bearing,
                duration: options?.duration || 2000,
                essential: true,
            })
        },

        setCameraState: (state: CameraState) => {
            if (!mapInstance.current) return

            mapInstance.current.flyTo({
                center: state.center,
                zoom: state.zoom,
                pitch: state.pitch,
                bearing: state.bearing,
                duration: state.duration || 2000,
                essential: true,
            })
        },

        followRoute: async (route: [number, number][], options?: RouteOptions) => {
            if (!mapInstance.current) return

            const speed = options?.speed || 1500
            const pause = options?.pause || 100

            for (const coords of route) {
                mapInstance.current.flyTo({
                    center: coords,
                    zoom: initialZoom + 2,
                    duration: speed,
                    essential: true,
                })
                await new Promise(resolve => setTimeout(resolve, speed + pause))
            }
        },

        addMarkers: (newMarkers: Marker[]) => {
            // Implementation would add markers to the map
            console.log('Adding markers:', newMarkers)
        },

        removeMarkers: (markerIds: string[]) => {
            // Implementation would remove markers from the map
            console.log('Removing markers:', markerIds)
        },

        addRoute: (route: RouteSegment[]) => {
            // Implementation would add route to the map
            console.log('Adding route:', route)
        },

        removeRoute: (routeId: string) => {
            // Implementation would remove route from the map
            console.log('Removing route:', routeId)
        },

        reset: () => {
            if (!mapInstance.current) return

            mapInstance.current.flyTo({
                center: initialCenter,
                zoom: initialZoom,
                pitch: initialPitch,
                bearing: initialBearing,
                duration: 1000,
                essential: true,
            })
        },

        project: (lnglat: [number, number]) => {
            if (!mapInstance.current) return null
            return mapInstance.current.project(lnglat)
        },

        on: (event: string, callback: any) => {
            if (!mapInstance.current) return
            mapInstance.current.on(event, callback)
        },

        off: (event: string, callback: any) => {
            if (!mapInstance.current) return
            mapInstance.current.off(event, callback)
        },
    }))

    // Initialize Mapbox map
    useEffect(() => {
        const hasToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN &&
            process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'your_mapbox_token_here'

        if (!hasToken) {
            setMapboxAvailable(false)
            setError('Mapbox token required. Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local')
            return
        }

        const loadMapbox = async () => {
            try {
                const mapboxgl = await import('mapbox-gl')
                // Import CSS only if available
                try {
                    // @ts-ignore - Mapbox CSS is optional, will fail gracefully if not available
                    await import('mapbox-gl/dist/mapbox-gl.css')
                } catch {
                    // CSS import failed, continue without it
                    console.warn('Mapbox CSS not available')
                }

                if (!mapContainer.current) return

                mapboxgl.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

                const map = new mapboxgl.default.Map({
                    container: mapContainer.current,
                    style: mapStyle,
                    center: initialCenter,
                    zoom: initialZoom,
                    pitch: initialPitch,
                    bearing: initialBearing,
                    projection: { name: 'globe' }, // Default to globe
                    antialias: true,
                    // @ts-ignore - fog is supported in v2+ but types might be outdated
                    fog: {
                        'range': [0.5, 10],
                        'color': '#060708', // inkBlack
                        'horizon-blend': 0.2,
                        'high-color': '#1A1B1F', // mistInk
                        'space-color': '#060708', // inkBlack
                        'star-intensity': 0.15
                    }
                })

                // Add navigation controls
                if (showControls) {
                    map.addControl(new mapboxgl.default.NavigationControl(), 'top-right')
                }

                map.on('load', () => {
                    setIsLoaded(true)

                    // Add atmosphere for globe
                    map.setFog({
                        'range': [0.5, 10],
                        'color': '#060708',
                        'horizon-blend': 0.2,
                        'high-color': '#1A1B1F',
                        'space-color': '#060708',
                        'star-intensity': 0.15
                    })

                    // Add 3D terrain if enabled
                    if (show3D) {
                        map.addSource('mapbox-dem', {
                            type: 'raster-dem',
                            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                            tileSize: 512,
                            maxzoom: 14,
                        })

                        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
                    }

                    // Add route lines
                    if (routes.length > 0) {
                        const routeGeoJSON = createRouteGeoJSON(routes)

                        map.addSource('route', {
                            type: 'geojson',
                            data: routeGeoJSON as any,
                        })

                        // Glow effect layer
                        map.addLayer({
                            id: 'route-glow',
                            type: 'line',
                            source: 'route',
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round',
                            },
                            paint: {
                                'line-color': theme?.colors?.accentHighlight || '#D8B45A', // warmGold
                                'line-width': 6,
                                'line-opacity': 0.4,
                                'line-blur': 4
                            },
                        })

                        // Main line layer
                        map.addLayer({
                            id: 'route',
                            type: 'line',
                            source: 'route',
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round',
                            },
                            paint: {
                                'line-color': theme?.colors?.accent || '#B52719', // imperialRed
                                'line-width': 2,
                                'line-opacity': 0.9,
                            },
                        })

                        // Add click handler for routes
                        map.on('click', 'route', (e) => {
                            if (onRouteClick && routes[0]) {
                                onRouteClick(routes[0])
                            }
                        })

                        // Change cursor on hover
                        map.on('mouseenter', 'route', () => {
                            map.getCanvas().style.cursor = 'pointer'
                        })
                        map.on('mouseleave', 'route', () => {
                            map.getCanvas().style.cursor = ''
                        })
                    }

                    // Add markers
                    markers.forEach((marker) => {
                        const el = document.createElement('div')
                        el.className = 'map-marker'

                        // Custom marker styling with icon support
                        const iconHtml = marker.icon
                            ? `<img src="${marker.icon}" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`
                            : ''

                        el.innerHTML = `
                            <div style="
                                width: 100%; 
                                height: 100%; 
                                background: ${marker.color || theme?.colors?.accent || '#B52719'}; 
                                borderRadius: 50%; 
                                border: 2px solid #F3E7D6; 
                                display: flex; 
                                alignItems: center; 
                                justifyContent: center;
                                boxShadow: 0 0 15px ${theme?.colors?.accentHighlight || '#D8B45A'};
                            ">
                                ${iconHtml}
                            </div>
                        `

                        el.style.cssText = `
                            width: 32px;
                            height: 32px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        `

                        el.addEventListener('mouseenter', () => {
                            el.style.transform = 'scale(1.3)'
                            el.style.zIndex = '10'
                        })

                        el.addEventListener('mouseleave', () => {
                            el.style.transform = 'scale(1)'
                            el.style.zIndex = '1'
                        })

                        el.addEventListener('click', () => {
                            if (onMarkerClick) {
                                onMarkerClick(marker)
                            }
                        })

                        const popup = new mapboxgl.Popup({
                            offset: 25,
                            closeButton: false,
                            className: 'custom-popup'
                        }).setHTML(`
                            <div style="
                                padding: 12px; 
                                fontFamily: 'Cormorant Garamond', serif; 
                                background: #1A1B1F; 
                                color: #F3E7D6; 
                                border: 1px solid #D8B45A;
                                borderRadius: 4px;
                            ">
                                <h3 style="margin: 0; fontWeight: bold; fontSize: 1.2rem; color: #D8B45A;">${marker.title}</h3>
                                ${marker.description ? `<p style="margin: 8px 0 0 0; fontFamily: 'Inter', sans-serif; fontSize: 0.9rem; color: #E0D7C9;">${marker.description}</p>` : ''}
                            </div>
                        `)

                        el.addEventListener('mouseenter', () => popup.addTo(map))
                        el.addEventListener('mouseleave', () => popup.remove())

                        new mapboxgl.Marker(el)
                            .setLngLat(marker.coords)
                            .addTo(map)
                    })

                    mapInstance.current = map

                    if (onMapLoad) {
                        onMapLoad({
                            flyTo: (center, zoom, options) => {
                                map.flyTo({
                                    center,
                                    zoom: zoom || initialZoom,
                                    pitch: options?.pitch,
                                    bearing: options?.bearing,
                                    duration: options?.duration || 2000,
                                    essential: true,
                                })
                            },
                            setCameraState: (state) => {
                                map.flyTo({
                                    center: state.center,
                                    zoom: state.zoom,
                                    pitch: state.pitch,
                                    bearing: state.bearing,
                                    duration: state.duration || 2000,
                                    essential: true,
                                })
                            },
                            followRoute: async (route, options) => {
                                const speed = options?.speed || 1500
                                const pause = options?.pause || 100
                                for (const coords of route) {
                                    map.flyTo({
                                        center: coords,
                                        zoom: initialZoom + 2,
                                        duration: speed,
                                        essential: true,
                                    })
                                    await new Promise(resolve => setTimeout(resolve, speed + pause))
                                }
                            },
                            addMarkers: () => { },
                            removeMarkers: () => { },
                            addRoute: () => { },
                            removeRoute: () => { },
                            reset: () => map.flyTo({
                                center: initialCenter,
                                zoom: initialZoom,
                                duration: 1000,
                                essential: true,
                            }),
                            project: (lnglat) => map.project(lnglat),
                            on: (event, callback) => map.on(event, callback),
                            off: (event, callback) => map.off(event, callback),
                        } as MapAPI)
                    }
                })

                return () => {
                    map.remove()
                }
            } catch (err) {
                console.error('Mapbox initialization error:', err)
                setError('Failed to initialize map')
                setMapboxAvailable(false)
            }
        }

        loadMapbox()
    }, []) // Run once on mount

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`relative w-full h-full ${className}`}
        >
            {/* Mapbox container */}
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {/* Loading indicator */}
            {!isLoaded && mapboxAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-inkBlack">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-12 h-12 border-4 border-warmGold border-t-transparent rounded-full"
                    />
                </div>
            )}

            {/* Error fallback */}
            {!mapboxAvailable && (
                <div className="absolute inset-0 bg-gradient-to-br from-mistInk to-inkBlack flex items-center justify-center">
                    <div className="text-center p-8 bg-black/40 backdrop-blur-sm rounded-lg max-w-md border border-cloudGrey/20">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-imperialRed/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-imperialRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-ricePaper mb-2">Interactive Map</h3>
                        <p className="text-cloudGrey mb-4 text-sm">{error}</p>
                        <div className="bg-black/60 rounded-lg p-4">
                            <p className="text-sm text-gray-300 mb-2">To enable map:</p>
                            <ol className="text-xs text-gray-400 text-left space-y-1">
                                <li>1. Get free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-warmGold hover:text-yellow-300 underline">mapbox.com</a></li>
                                <li>2. Add to <code className="bg-gray-800 px-1 rounded">.env.local</code></li>
                                <li>3. Restart server</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
})

export default MapView

