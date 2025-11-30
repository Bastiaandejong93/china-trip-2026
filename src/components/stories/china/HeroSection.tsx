'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import MapView from '@/components/MapView'
import theme from '@/lib/theme'
import { chinaTripSchema, type TripLocation } from '@/data/chinaTripSchema'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCity, setSelectedCity] = useState<TripLocation | null>(null)
  const [inkSpreadProgress, setInkSpreadProgress] = useState(0)
  const [titleVisible, setTitleVisible] = useState(false)

  // Sample data for hero
  const heroLocations: TripLocation[] = [
    {
      id: 'shanghai',
      name: 'Shanghai',
      chineseName: '上海',
      coordinates: { lat: 31.23, lon: 121.47 },
      region: 'East China',
      type: 'municipality',
      elevation: '4m',
      population: '24.87 million',
      timezone: 'UTC+8',
      bestVisitTime: 'Spring & Autumn',
      vibe: 'Modern megacity where East meets West',
      culturalVibe: 'Cosmopolitan energy with traditional roots',
      transportHub: true,
      unescoSite: false,
      significance: 'China\'s financial powerhouse and cultural bridge',
      iconHighlights: ['The Bund', 'Skyscrapers', 'Art Deco architecture'],
      experiences: [
        {
          id: 'bund-experience',
          title: 'The Bund Skyline',
          chineseTitle: '外滩',
          description: 'Colonial architecture meets futuristic towers along the Huangpu River',
          type: 'architecture',
          duration: '2 hours',
          bestTimeOfDay: 'Sunset',
          difficulty: 'easy',
          costLevel: 'moderate',
          culturalContext: 'Shanghai\'s transformation from fishing village to global metropolis',
          historicalSignificance: 'Symbol of China\'s opening to the world',
          practicalTips: ['Best viewed at sunset', 'Photography from Pudong side'],
          media: [],
          bookingRequired: false,
          seasonalAvailability: ['Spring', 'Summer', 'Autumn'],
          emotionalImpact: 'Awe at human achievement'
        }
      ],
      landmarks: [],
      foodSpecialties: [
        {
          id: 'xiaolongbao',
          name: 'Xiaolongbao',
          chineseName: '小笼包',
          type: 'regional_cuisine',
          description: 'Shanghai-style soup dumplings, delicate parcels in savory broth',
          ingredients: ['Pork', 'Ginger', 'Soy sauce', 'Bamboo shoots'],
          flavorProfile: ['Savory', 'Umami', 'Aromatic'],
          culturalContext: 'Culinary art form representing Shanghai\'s refined taste',
          historicalOrigin: 'Originated in Shanghai\'s commercial kitchens',
          bestPlacesToTry: ['Nanxiang Mantou', 'Jiaxing', 'Yangzhou Fried Rice'],
          priceRange: 'moderate',
          dietaryRestrictions: ['Pork'],
          seasonalAvailability: ['Year-round'],
          eatingEtiquette: ['Eat with small spoon', 'Share the broth'],
          media: [],
          mustTry: true,
          emotionalConnection: 'Comfort in every bite'
        }
      ],
      practicalInfo: {
        currency: 'CNY',
        language: 'Mandarin, Shanghainese',
        emergencyNumber: '110',
        visaRequired: false,
        climate: 'Humid subtropical with monsoon seasons',
        packingTips: ['Light layers for changing weather', 'Umbrella for rainy season']
      },
      media: [],
      storytellingAngle: 'Gateway to China\'s future',
      emotionalTone: 'Hopeful ambition',
      narrativeRole: 'beginning'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setTitleVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setInkSpreadProgress(prev => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleCityClick = (city: TripLocation) => {
    setSelectedCity(city)
    // Trigger map animation to fly to city
    if ((window as any).mapControls) {
      (window as any).mapControls.flyTo([city.coordinates.lon, city.coordinates.lat], 8)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-warmBeige to-ricePaperWhite">
      {/* Animated ink background texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-mistGray via-transparent to-warmBeige animate-pulse" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-inkBlack rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '3s'
            }}
            animate={{
              x: [0, 100, 50],
              y: [0, 100, 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Animated title with ink-spreading effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: titleVisible ? 1 : 0, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Main title */}
              <motion.h1
                className="text-6xl md:text-7xl font-bold mb-4 relative"
                style={{
                  fontFamily: theme.fontDisplay.serif,
                  color: theme.colors.inkBlack,
                  textShadow: theme.shadows.ink
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                China
                <span className="relative z-10">Explained</span>

                {/* Ink spread effect behind title */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at ${50 + inkSpreadProgress * 0.3}% ${50 + inkSpreadProgress * 0.2}%, ${theme.colors.inkBlack} 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                    transform: `scale(${1 + inkSpreadProgress * 0.01})`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.2, 1.1],
                    opacity: [0, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.h1>

              {/* Decorative seal stamp */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 opacity-60"
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                style={{
                  backgroundImage: `url("/assets/ink/seal-stamp.svg")`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  filter: theme.effects.sealTexture.filter
                }}
              />
            </div>

            {/* Subtitle with lantern glow */}
            <motion.h2
              className="text-2xl md:text-3xl font-light mb-8 relative"
              style={{
                fontFamily: theme.fontDisplay.serif,
                color: theme.colors.textSecondary
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Lantern glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${theme.colors.goldenLantern} 0%, rgba(242, 201, 76, 0) 70%)`,
                  filter: 'blur(12px)',
                  mixBlendMode: 'screen'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.4, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              A Cinematic Journey Through the Middle Kingdom
            </motion.h2>

            {/* Journey details */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center">
                  <span className="text-2xl">🇨🇳</span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-inkBlack">8 Cities</div>
                  <div className="text-sm text-textSecondary">4,823km</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-jadeInkBlue/20 flex items-center justify-center">
                  <span className="text-2xl">🏔</span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-inkBlack">2 Weeks</div>
                  <div className="text-sm text-textSecondary">May 2026</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-goldenLantern/20 flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-inkBlack">Cultural</div>
                  <div className="text-sm text-textSecondary">Awakening</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Scroll to map section
                document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group relative px-8 py-4 bg-terracotta text-ricePaperWhite font-medium rounded-lg shadow-lg transition-all duration-300 hover:bg-imperialRed hover:shadow-xl"
              style={{ fontFamily: theme.fontDisplay.serif }}
            >
              <span className="relative z-10 group-hover:text-goldenLantern transition-colors">
                Begin Journey
              </span>

              {/* Ink brush effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, ${theme.colors.inkBlack} 50%, transparent 70%)`,
                  opacity: 0
                }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Interactive Map */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <MapView
          initialCenter={[121.47, 31.23]}
          initialZoom={6}
          markers={heroLocations.map(city => ({
            coords: [city.coordinates.lon, city.coordinates.lat],
            title: city.name,
            description: city.vibe,
            type: 'city'
          }))}
          route={[]}
          onCityClick={handleCityClick}
          className="opacity-90"
        />
      </motion.div>

      {/* City Detail Panel */}
      <AnimatePresence>
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 w-96 max-w-md"
          >
            <div className="bg-ricePaperWhite rounded-lg shadow-2xl border-2 border-terracotta overflow-hidden">
              {/* Header with lantern glow */}
              <div className="relative p-6 bg-gradient-to-r from-terracotta to-imperialRed">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 80% 20%, ${theme.colors.goldenLantern} 0%, rgba(242, 201, 76, 0) 60%)`,
                    filter: 'blur(8px)',
                    mixBlendMode: 'screen'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-ricePaperWhite mb-2" style={{ fontFamily: theme.fontDisplay.serif }}>
                    {selectedCity.name}
                  </h3>
                  <p className="text-ricePaperWhite/90 text-sm" style={{ fontFamily: theme.fontDisplay.serif }}>
                    {selectedCity.chineseName}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-inkBlack mb-2">The Vibe</h4>
                    <p className="text-textSecondary leading-relaxed">{selectedCity.vibe}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-inkBlack mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCity.iconHighlights.map((highlight, index) => (
                        <span key={index} className="px-3 py-1 bg-terracotta/10 text-inkBlack rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCity(null)}
                    className="w-full mt-4 px-4 py-2 bg-jadeInkBlue text-ricePaperWhite rounded-lg transition-colors hover:bg-jadeInkBlue/80"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 opacity-30">
        <img
          src="/assets/ink/lantern.svg"
          alt="Decorative lantern"
          className="w-16 h-16"
          style={{ filter: theme.effects.lanternGlow.filter }}
        />
      </div>

      <div className="absolute top-8 right-8 opacity-30">
        <img
          src="/assets/ink/seal-stamp.svg"
          alt="Decorative seal"
          className="w-12 h-12"
          style={{ filter: theme.effects.sealTexture.filter }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-8 bg-gradient-to-b from-inkBlack to-transparent" />
          <div className="w-px h-2 bg-inkBlack/50" />
          <div className="w-px h-2 bg-inkBlack/30" />
        </div>
      </motion.div>
    </section>
  )
}