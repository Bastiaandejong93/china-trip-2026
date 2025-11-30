'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mountain, Waves, Trees, Sun } from 'lucide-react'
import countryOverview from '@/lib/countryOverview'
import theme from '@/lib/theme'

export default function GeoSectionPhysical() {
  const { physical } = countryOverview

  const getRegionIcon = (region: string) => {
    switch (region.toLowerCase()) {
      case 'east china plain':
      case 'north china plain':
        return <Waves className="w-6 h-6" />
      case 'yangtze river basin':
        return <Waves className="w-6 h-6" />
      case 'karst mountains':
      case 'yunnan-guizhou plateau':
        return <Mountain className="w-6 h-6" />
      case 'sichuan basin':
        return <Trees className="w-6 h-6" />
      default:
        return <Sun className="w-6 h-6" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
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
          Physical Geography
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {physical.overview}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {physical.regions.map((region, index) => (
          <motion.div
            key={region.region}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${theme.colors.accentBlue}20` }}
                  >
                    <div style={{ color: theme.colors.accentBlue }}>
                      {getRegionIcon(region.region)}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: theme.colors.accentGold, color: theme.colors.accentGold }}
                  >
                    {region.elevation}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">
                  {region.region}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {region.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {region.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs bg-white/10 text-gray-300 hover:bg-white/20"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Climate:</span>
                    <span className="text-white">{region.climate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive map placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Mountain className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Interactive Terrain Map
                  </h3>
                  <p className="text-gray-400">
                    Explore China's diverse physical landscape
                  </p>
                </div>
              </div>
              
              {/* Animated elevation indicators */}
              <motion.div
                className="absolute bottom-8 left-8 flex items-center space-x-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">Low (0-500m)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">Medium (500-2000m)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">High (2000m+)</span>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}