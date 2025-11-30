'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import theme from '@/lib/theme'
import { chinaTripSchema, type TripLocation, type RouteSegment } from '@/data/chinaTripSchema'

interface MapViewProps {
  initialCenter?: [number, number]
  initialZoom?: number
  markers?: Array<{
    coords: [number, number]
    title: string
    description?: string
    type?: 'city' | 'landmark' | 'cultural'
  }>
  route?: Array<{
    coords: [number, number]
    type: 'flight' | 'train' | 'car'
  }>
  onMapLoad?: (map: any) => void
  onCityClick?: (city: TripLocation) => void
  className?: string
}

export default function MapView({
  initialCenter = [104.2, 35.9],
  initialZoom = 4,
  markers = [],
  route = [],
  onMapLoad,
  onCityClick,
  className = ""
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [mapboxAvailable, setMapboxAvailable] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInkMode, setIsInkMode] = useState(true)
  const [animationProgress, setAnimationProgress] = useState(0)

  // Initialize watercolor map
  const initWatercolorMap = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply watercolor paper background
    ctx.fillStyle = theme.colors.warmBeige
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle texture
    ctx.globalAlpha = 0.1
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 1
      ctx.fillStyle = theme.colors.mistGray
      ctx.fillRect(x, y, size, size)
    }
    ctx.globalAlpha = 1

    // Draw China landmass with ink brush effect
    ctx.strokeStyle = theme.colors.inkBlack
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalAlpha = 0.8

    // Main landmass
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.2, canvas.height * 0.3)
    ctx.quadraticCurveTo(canvas.width * 0.4, canvas.height * 0.2, canvas.width * 0.5, canvas.height * 0.25)
    ctx.quadraticCurveTo(canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.8, canvas.height * 0.35)
    ctx.quadraticCurveTo(canvas.width * 0.9, canvas.height * 0.4, canvas.width, canvas.height * 0.5)
    ctx.lineTo(canvas.width, canvas.height * 0.7)
    ctx.quadraticCurveTo(canvas.width * 0.85, canvas.height * 0.6, canvas.width * 0.7, canvas.height * 0.8)
    ctx.closePath()
    ctx.stroke()
    ctx.fillStyle = theme.colors.warmBeige
    ctx.fill()

    // Add ink texture overlay
    ctx.globalAlpha = 0.3
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 1 + 0.5
      ctx.fillStyle = theme.colors.inkBlack
      ctx.fillRect(x, y, size, size)
    }
    ctx.globalAlpha = 1

    // Draw route lines with ink brush animation
    if (route.length > 0) {
      ctx.strokeStyle = theme.colors.goldenLantern
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.7
      ctx.setLineDash([5, 3])

      route.forEach((segment, index) => {
        const fromMarker = markers[index]
        const toMarker = markers[index + 1]

        if (fromMarker && toMarker) {
          const x1 = ((fromMarker.coords[0] - 73) / (135 - 73)) * canvas.width
          const y1 = ((53 - fromMarker.coords[1]) / (53 - 18)) * canvas.height
          const x2 = ((toMarker.coords[0] - 73) / (135 - 73)) * canvas.width
          const y2 = ((53 - toMarker.coords[1]) / (53 - 18)) * canvas.height

          ctx.beginPath()
          ctx.moveTo(x1, y1)

          // Animated dash offset based on progress
          const dashOffset = (animationProgress + index * 10) % 8
          ctx.setLineDash([5 + dashOffset, 3])

          ctx.lineTo(x2, y2)
          ctx.stroke()

          // Draw transport icon
          ctx.setLineDash([])
          ctx.font = '12px serif'
          ctx.fillStyle = theme.colors.goldenLantern
          ctx.globalAlpha = 0.8

          const icon = segment.type === 'flight' ? '✈️' : segment.type === 'train' ? '🚄' : '🚗'
          ctx.fillText(icon, (x1 + x2) / 2 - 10, (y1 + y2) / 2)
        }
      })
    }

    // Draw city markers with lantern glow
    markers.forEach((marker, index) => {
      const x = ((marker.coords[0] - 73) / (135 - 73)) * canvas.width
      const y = ((53 - marker.coords[1]) / (53 - 18)) * canvas.height

      // Lantern glow effect
      if (selectedCity === marker.title) {
        ctx.shadowColor = theme.colors.goldenLantern
        ctx.shadowBlur = 15
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }

      // City pin
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = marker.type === 'city' ? theme.colors.terracotta : theme.colors.jadeInkBlue
      ctx.fill()

      // Inner circle
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = theme.colors.ricePaperWhite
      ctx.fill()

      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0

      // City name
      ctx.font = `${theme.fontSizes.body} ${theme.fontDisplay.serif}`
      ctx.fillStyle = theme.colors.inkBlack
      ctx.globalAlpha = 0.9
      ctx.textAlign = 'center'
      ctx.fillText(marker.title, x, y - 20)

      // Seal stamp effect for selected city
      if (selectedCity === marker.title) {
        ctx.save()
        ctx.globalAlpha = 0.3
        ctx.fillStyle = theme.colors.deepCrimson
        ctx.fillRect(x - 15, y + 10, 30, 30)
        ctx.restore()
      }
    })

    // Add watercolor bleed effect
    ctx.globalAlpha = 0.2
    ctx.filter = 'blur(1px)'
    ctx.fillStyle = theme.colors.warmBeige
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [markers, route, selectedCity, animationProgress])

  // Animation loop
  useEffect(() => {
    let animationId: number

    const animate = () => {
      setAnimationProgress(prev => (prev + 1) % 100)
      initWatercolorMap()
      animationId = requestAnimationFrame(animate)
    }

    if (isInkMode && isLoaded) {
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isInkMode, isLoaded, markers, route, selectedCity, animationProgress, initWatercolorMap])

  // Handle Mapbox fallback
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN === 'your_mapbox_token_here') {
      setMapboxAvailable(false)
      setError('Mapbox token required. Please add your token to .env.local')
      return
    }

    // Try to load mapbox-gl
    const loadMapbox = async () => {
      try {
        const mapboxgl = await import('mapbox-gl')
        try {
          // @ts-ignore - Mapbox CSS is optional, will fail gracefully if not available
          await import('mapbox-gl/dist/mapbox-gl.css')
        } catch (e) {
          console.warn('Mapbox CSS import failed, continuing without it')
        }

        if (!mapContainer.current) return

        mapboxgl.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

        const mapInstance = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: initialCenter,
          zoom: initialZoom,
          pitch: 45,
          bearing: 0,
          antialias: true
        })

        mapInstance.on('load', () => {
          setIsLoaded(true)

          // Add terrain layer for 3D effect
          mapInstance.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          })

          mapInstance.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 0.5 })

          // Add route lines
          if (route.length > 0) {
            mapInstance.addSource('route', {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'LineString',
                  'coordinates': route.map(r => r.coords)
                }
              }
            })

            mapInstance.addLayer({
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': theme.colors.goldenLantern,
                'line-width': 3,
                'line-opacity': 0.8
              }
            })
          }

          // Add markers
          markers.forEach((marker, index) => {
            const el = document.createElement('div')
            el.className = 'marker'
            el.style.cssText = `
              width: 24px;
              height: 24px;
              background: ${marker.type === 'city' ? theme.colors.terracotta : theme.colors.jadeInkBlue};
              border-radius: 50%;
              border: 3px solid ${theme.colors.ricePaperWhite};
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              cursor: pointer;
              transition: all 0.3s ease;
              position: relative;
            `

            el.addEventListener('mouseenter', () => {
              el.style.transform = 'scale(1.3)'
              el.style.background = theme.colors.goldenLantern
              el.style.boxShadow = `0 0 20px ${theme.colors.goldenLantern}`
            })

            el.addEventListener('mouseleave', () => {
              el.style.transform = 'scale(1)'
              el.style.background = marker.type === 'city' ? theme.colors.terracotta : theme.colors.jadeInkBlue
              el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
            })

            const popup = new mapboxgl.Popup({
              offset: 25,
              closeButton: false,
              className: 'custom-popup'
            }).setHTML(`
              <div style="padding: 12px; font-family: ${theme.fontDisplay.serif}; background: ${theme.colors.warmBeige}; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                {/* @ts-ignore */}
                <h3 style="margin: 0; font-weight: bold; color: ${theme.colors.inkBlack}; font-size: ${theme.fontSizes.h3};">${marker.title}</h3>
                ${marker.description ? `<p style="margin: 8px 0 0 0; font-size: ${theme.fontSizes.body}; color: ${theme.colors.textSecondary}; line-height: 1.5;">${marker.description}</p>` : ''}
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid ${theme.colors.border};">
                  <button onclick="window.selectCity && window.selectCity('${marker.title}')" style="background: ${theme.colors.terracotta}; color: ${theme.colors.ricePaperWhite}; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: ${theme.fontDisplay.serif};">
                    View Details
                  </button>
                </div>
              </div>
            `)

            el.addEventListener('mouseenter', () => popup.addTo(mapInstance))
            el.addEventListener('mouseleave', () => popup.remove())

            new mapboxgl.Marker(el)
              .setLngLat(marker.coords)
              .addTo(mapInstance)
          })

          if (onMapLoad) onMapLoad(mapInstance)
        })

        // Expose map controls to parent
        if (window) {
          (window as any).mapControls = {
            flyTo: (coords: [number, number], zoom = initialZoom) => {
              mapInstance.flyTo({
                center: coords,
                zoom,
                essential: true,
                duration: 2000
              })
            },
            followRoute: async (routeCoords: [number, number][]) => {
              for (const coords of routeCoords) {
                mapInstance.flyTo({
                  center: coords,
                  zoom: 8,
                  essential: true,
                  duration: 1500
                })
                await new Promise(resolve => setTimeout(resolve, 1600))
              }
            },
            map: mapInstance
          }
        }
      } catch (err) {
        console.error('Mapbox initialization error:', err)
        setError('Failed to initialize map. Please check your Mapbox token.')
        setMapboxAvailable(false)
      }
    }

    loadMapbox()
  }, [])

  const handleCityClick = useCallback((cityName: string) => {
    setSelectedCity(cityName)
    // Find city data and call onCityClick if available
    const city = markers.find(m => m.title === cityName)
    if (city && onCityClick) {
      // Convert marker to TripLocation format
      const tripLocation: TripLocation = {
        id: cityName,
        name: cityName,
        chineseName: cityName,
        coordinates: { lat: city.coords[1], lon: city.coords[0] },
        region: '',
        type: 'tourist_city',
        elevation: '',
        population: '',
        timezone: '',
        bestVisitTime: '',
        vibe: '',
        culturalVibe: '',
        transportHub: false,
        iconHighlights: [],
        experiences: [],
        landmarks: [],
        foodSpecialties: [],
        practicalInfo: {
          currency: '',
          language: '',
          emergencyNumber: '',
          visaRequired: false,
          climate: '',
          packingTips: []
        },
        media: [],
        storytellingAngle: '',
        emotionalTone: '',
        narrativeRole: 'beginning'
      }
      onCityClick(tripLocation)
    }
  }, [markers, onCityClick])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative w-full h-full ${className}`}
    >
      {/* Toggle between ink mode and mapbox */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsInkMode(!isInkMode)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isInkMode
            ? 'bg-terracotta text-ricePaperWhite shadow-lg'
            : 'bg-jadeInkBlue text-ricePaperWhite'
            }`}
          style={{ fontFamily: theme.fontDisplay.serif }}
        >
          {isInkMode ? '🖌️ Ink Mode' : '🗺️ Map Mode'}
        </motion.button>
      </div>

      {/* Ink Mode Canvas */}
      <AnimatePresence mode="wait">
        {isInkMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-warmBeige to-ricePaperWhite"
            style={{
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)'
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
              style={{
                imageRendering: 'crisp-edges',
                filter: 'contrast(1.1)'
              }}
              onClick={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect()
                if (!rect) return

                const x = ((e.clientX - rect.left) / rect.width) * (135 - 73) + 73
                const y = (53 - ((e.clientY - rect.top) / rect.height) * (53 - 18))

                // Find nearest city
                const nearestCity = markers.reduce((nearest, city) => {
                  const distance = Math.sqrt(
                    Math.pow(city.coords[0] - x, 2) +
                    Math.pow(city.coords[1] - y, 2)
                  )
                  const nearestDistance = Math.sqrt(
                    Math.pow(nearest.coords[0] - x, 2) +
                    Math.pow(nearest.coords[1] - y, 2)
                  )
                  return distance < nearestDistance ? city : nearest
                })

                if (nearestCity) {
                  handleCityClick(nearestCity.title)
                }
              }}
            />

            {/* Cultural decorations */}
            <div className="absolute top-4 right-4 opacity-30">
              <img
                src="/assets/ink/lantern.svg"
                alt="Lantern decoration"
                className="w-16 h-16"
              />
            </div>

            <div className="absolute bottom-4 left-4 opacity-20">
              <img
                src="/assets/ink/seal-stamp.svg"
                alt="Seal stamp"
                className="w-12 h-12"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mapbox Map */}
      {!isInkMode && (
        <div className="absolute inset-0">
          <div ref={mapContainer} className="w-full h-full" />

          {!isLoaded && mapboxAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-terracotta border-t-transparent rounded-full"
              />
            </div>
          )}

          {/* Legend */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-xs"
              style={{ fontFamily: theme.fontDisplay.serif }}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.terracotta }}></div>
                <span>Cities</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.jadeInkBlue }}></div>
                <span>Landmarks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-0.5" style={{ backgroundColor: theme.colors.goldenLantern }}></div>
                <span>Route</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {!mapboxAvailable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900/40 flex items-center justify-center ${className}`}
        >
          <div className="text-center p-8 bg-black/40 backdrop-blur-sm rounded-lg max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: theme.fontDisplay.serif }}>
              Interactive Map
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              {error || 'Map requires a valid Mapbox token to display interactive content.'}
            </p>
            <div className="bg-black/60 rounded-lg p-4 max-w-sm">
              <p className="text-sm text-gray-300 mb-2">To enable map:</p>
              <ol className="text-xs text-gray-400 text-left space-y-1">
                <li>1. Get free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">mapbox.com</a></li>
                <li>2. Add to <code className="bg-gray-800 px-1 rounded">.env.local</code></li>
                <li>3. Restart server</li>
              </ol>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}