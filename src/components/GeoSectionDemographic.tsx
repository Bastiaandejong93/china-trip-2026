'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Users, Globe, MapPin, Heart } from 'lucide-react'
import countryOverview from '@/lib/countryOverview'
import theme from '@/lib/theme'

export default function GeoSectionDemographic() {
  const { demographic } = countryOverview

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }

  const getPercentageValue = (percentage: string) => {
    return parseFloat(percentage)
  }

  const getEthnicColor = (index: number) => {
    const colors = [
      theme.colors.accentBlue,
      theme.colors.accentGold,
      theme.colors.accentRed,
      theme.colors.grey,
      '#10b981',
      '#8b5cf6'
    ]
    return colors[index % colors.length]
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
          Demographics
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {demographic.overview}
        </p>
      </motion.div>

      {/* Key demographic stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <div className="text-2xl font-bold text-white mb-1">
              {demographic.totalPopulation}
            </div>
            <div className="text-sm text-gray-300">Total Population</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <Globe className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <div className="text-2xl font-bold text-white mb-1">
              {demographic.populationDensity}
            </div>
            <div className="text-sm text-gray-300">Population Density</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <div className="text-2xl font-bold text-white mb-1">
              {demographic.urbanPopulation}
            </div>
            <div className="text-sm text-gray-300">Urban Population</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <Heart className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <div className="text-2xl font-bold text-white mb-1">
              55+
            </div>
            <div className="text-sm text-gray-300">Ethnic Groups</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ethnic groups breakdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-400" />
              Ethnic Composition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {demographic.ethnicGroups.map((group, index) => (
                <motion.div
                  key={group.ethnicGroup}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: getEthnicColor(index) }}
                      />
                      <h4 className="text-lg font-semibold text-white">
                        {group.ethnicGroup}
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        {group.percentage}
                      </div>
                      <div className="text-sm text-gray-400">
                        {group.population}
                      </div>
                    </div>
                  </div>
                  
                  <Progress
                    value={getPercentageValue(group.percentage)}
                    className="h-2"
                    style={{
                      '--progress-background': getEthnicColor(index)
                    } as any}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-2">
                        Primary Regions
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {group.regions.slice(0, 3).map((region, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-white/10 text-gray-300"
                          >
                            {region}
                          </Badge>
                        ))}
                        {group.regions.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-white/10 text-gray-300"
                          >
                            +{group.regions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-2">
                        Cultural Highlights
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {group.culturalHighlights.map((highlight, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: getEthnicColor(index), color: getEthnicColor(index) }}
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ethnic groups along our route */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-6 text-center"
        >
          Ethnic Groups Along Our Route
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demographic.ethnicGroups
            .filter(group => ['Tujia', 'Bai', 'Naxi'].includes(group.ethnicGroup))
            .map((group, index) => (
              <motion.div
                key={group.ethnicGroup}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${getEthnicColor(index + 1)}20` }}
                    >
                      <Users
                        className="w-8 h-8"
                        style={{ color: getEthnicColor(index + 1) }}
                      />
                    </div>
                    <CardTitle className="text-xl text-white">
                      {group.ethnicGroup}
                    </CardTitle>
                    <div className="text-sm text-gray-300">
                      {group.population} ({group.percentage})
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-2">
                        Where We'll Meet Them
                      </h5>
                      <div className="text-sm text-white">
                        {group.ethnicGroup === 'Tujia' && 'Zhangjiajie, Hunan'}
                        {group.ethnicGroup === 'Bai' && 'Dali, Yunnan'}
                        {group.ethnicGroup === 'Naxi' && 'Lijiang, Yunnan'}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-2">
                        Cultural Experience
                      </h5>
                      <div className="text-sm text-gray-300">
                        {group.culturalHighlights[0]}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Population distribution visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-r from-blue-900/20 via-red-900/20 to-yellow-900/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Population Distribution
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Dense in the east, sparse in the west
                  </p>
                </div>
              </div>
              
              {/* Heat map legend */}
              <motion.div
                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="text-xs text-gray-300 mb-2">Population Density</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Very High</span>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}