'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MapPin, Clock, ArrowRight, X, Camera, Utensils, Trees, Building } from 'lucide-react'
import tripData from '@/lib/tripData'
import theme from '@/lib/theme'

interface CityPopupProps {
  city: typeof tripData.cities[0]
  isOpen: boolean
  onClose: () => void
}

function CityPopup({ city, isOpen, onClose }: CityPopupProps) {
  const getExperienceIcon = (type: string) => {
    switch (type) {
      case 'food':
        return <Utensils className="w-5 h-5" />
      case 'culture':
        return <Building className="w-5 h-5" />
      case 'nature':
        return <Trees className="w-5 h-5" />
      case 'architecture':
        return <Building className="w-5 h-5" />
      case 'activity':
        return <Camera className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-sm border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <span className="mr-3">{city.city}</span>
            <span className="text-lg text-gray-400">{city.zh}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* City overview */}
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="outline" className="mb-2" style={{ borderColor: theme.colors.accentBlue, color: theme.colors.accentBlue }}>
                {city.region}
              </Badge>
              <p className="text-gray-300">{city.vibe}</p>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div>Population: {city.population}</div>
              <div>Elevation: {city.elevation}</div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-600" />
          </div>

          {/* Icon highlights */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {city.iconHighlights.map((highlight, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/10 text-gray-300 hover:bg-white/20"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Must-Experience</h4>
            <div className="space-y-4">
              {city.experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${theme.colors.accentGold}20` }}
                  >
                    <div style={{ color: theme.colors.accentGold }}>
                      {getExperienceIcon(experience.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-white mb-1">{experience.title}</h5>
                    <p className="text-sm text-gray-300">{experience.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Coordinates */}
          <div className="text-xs text-gray-500 border-t border-white/10 pt-4">
            Coordinates: {city.coords.lat.toFixed(4)}°, {city.coords.lon.toFixed(4)}°
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function RouteOverview() {
  const [selectedCity, setSelectedCity] = useState<typeof tripData.cities[0] | null>(null)

  const timelineItems = tripData.cities.map((city, index) => ({
    id: city.city,
    title: city.city,
    date: `Day ${index + 1}`,
    description: city.vibe,
    status: index === 0 ? 'completed' : index === 1 ? 'current' : 'upcoming' as const,
    onClick: () => setSelectedCity(city)
  }))

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return '✈️'
      case 'train':
        return '🚄'
      case 'car':
        return '🚗'
      default:
        return '📍'
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Our Grand Tour Route
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          A journey through 8 incredible cities, covering {tripData.totalDistance} in {tripData.totalDuration}
        </p>
        
        <div className="flex justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <span>Best Season:</span>
            <span className="text-white">{tripData.bestSeason}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Total Distance:</span>
            <span className="text-white">{tripData.totalDistance}</span>
          </div>
        </div>
      </motion.div>

      {/* Route timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Route Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Route segments */}
              <div className="space-y-4">
                {tripData.routeSegments.map((segment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getTransportIcon(segment.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{segment.from}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <span className="text-white font-medium">{segment.to}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {segment.duration} • {segment.distance}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{ borderColor: theme.colors.accentGold, color: theme.colors.accentGold }}
                    >
                      {segment.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* City cards grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-white mb-8 text-center">City Highlights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tripData.cities.map((city, index) => (
            <motion.div
              key={city.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => setSelectedCity(city)}
            >
              <Card className="h-full bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardHeader className="text-center pb-3">
                  <div className="text-3xl mb-2">
                    {city.city === 'Shanghai' && '🏙️'}
                    {city.city === 'Wuhan' && '🍜'}
                    {city.city === 'Zhangjiajie' && '🏔️'}
                    {city.city === 'Chongqing' && '🌶️'}
                    {city.city === 'Chengdu' && '🐼'}
                    {city.city === 'Dali' && '🏛️'}
                    {city.city === 'Lijiang' && '🏔️'}
                    {city.city === 'Beijing' && '🏯'}
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-yellow-400 transition-colors">
                    {city.city}
                  </CardTitle>
                  <div className="text-sm text-gray-400">{city.zh}</div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <Badge
                    variant="outline"
                    className="w-full justify-center text-xs"
                    style={{ borderColor: theme.colors.accentBlue, color: theme.colors.accentBlue }}
                  >
                    {city.region}
                  </Badge>
                  
                  <p className="text-sm text-gray-300 text-center">{city.vibe}</p>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    {city.iconHighlights.slice(0, 2).map((highlight, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs bg-white/10 text-gray-300"
                      >
                        {highlight}
                      </Badge>
                    ))}
                    {city.iconHighlights.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-white/10 text-gray-300"
                      >
                        +{city.iconHighlights.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-white hover:text-yellow-400 hover:bg-white/10"
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Route statistics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-white/10">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
                <div className="text-sm text-gray-300">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">3</div>
                <div className="text-sm text-gray-300">Municipalities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">4</div>
                <div className="text-sm text-gray-300">Provinces</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">24+</div>
                <div className="text-sm text-gray-300">Experiences</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* City popup dialog */}
      <AnimatePresence>
        {selectedCity && (
          <CityPopup
            city={selectedCity}
            isOpen={!!selectedCity}
            onClose={() => setSelectedCity(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}