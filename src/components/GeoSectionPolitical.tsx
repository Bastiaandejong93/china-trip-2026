'use client'
import { BackToMapButton } from "@/components/shared/BackToMapButton"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, MapPin, Users } from 'lucide-react'
import countryOverview from '@/lib/countryOverview'
import theme from '@/lib/theme'

export default function GeoSectionPolitical() {
  const { political } = countryOverview

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'municipality':
        return theme.colors.accentRed
      case 'province':
        return theme.colors.accentBlue
      case 'autonomous_region':
        return theme.colors.accentGold
      case 'sar':
        return theme.colors.grey
      default:
        return theme.colors.grey
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'municipality':
        return 'Municipality'
      case 'province':
        return 'Province'
      case 'autonomous_region':
        return 'Autonomous Region'
      case 'sar':
        return 'SAR'
      default:
        return type
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  }

  // Group by type for better organization
  const groupedDivisions = political.administrativeDivisions.reduce((acc, division) => {
    if (!acc[division.type]) {
      acc[division.type] = []
    }
    acc[division.type].push(division)
    return acc
  }, {} as Record<string, typeof political.administrativeDivisions>)

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
          Political Geography
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {political.overview}
        </p>
      </motion.div>

      {/* Back to Map button */}
      <div className="max-w-4xl mx-auto mb-4">
        <BackToMapButton />
      </div>

      {/* Administrative overview cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">23</div>
            <div className="text-sm text-gray-300">Provinces</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
            <div className="text-sm text-gray-300">Autonomous Regions</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-red-400 mb-2">4</div>
            <div className="text-sm text-gray-300">Municipalities</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-gray-400 mb-2">2</div>
            <div className="text-sm text-gray-300">SARs</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Route municipalities highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Card className="bg-gradient-to-r from-red-900/20 to-transparent border-red-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-red-400" />
              Municipalities on Our Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {political.administrativeDivisions
                .filter(div => div.type === 'municipality')
                .map((municipality) => (
                  <motion.div
                    key={municipality.name}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 rounded-lg p-4 border border-white/10"
                  >
                    <h4 className="text-lg font-bold text-white mb-2">{municipality.name}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Population:</span>
                        <span className="text-white">{municipality.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Area:</span>
                        <span className="text-white">{municipality.area}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed administrative divisions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {Object.entries(groupedDivisions).map(([type, divisions]) => (
          <div key={type}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-4 flex items-center"
            >
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: getTypeColor(type) }}
              />
              {getTypeLabel(type)}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {divisions.map((division) => (
                <motion.div
                  key={division.name}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">
                          {division.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{ borderColor: getTypeColor(type), color: getTypeColor(type) }}
                        >
                          {getTypeLabel(type)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-300">Capital:</span>
                        <span className="text-white ml-auto">{division.capital}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-300">Population:</span>
                        <span className="text-white ml-auto">{division.population}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-300">Area:</span>
                        <span className="text-white ml-auto">{division.area}</span>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="text-xs text-gray-400">
                          Coordinates: {division.coordinates.center.lat.toFixed(2)}°, {division.coordinates.center.lon.toFixed(2)}°
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}