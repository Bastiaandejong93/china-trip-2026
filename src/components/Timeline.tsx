'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import theme from '@/lib/theme'

interface TimelineItem {
  id: string
  title: string
  date?: string
  description?: string
  status?: 'completed' | 'current' | 'upcoming'
  onClick?: () => void
}

interface TimelineProps {
  items: TimelineItem[]
  orientation?: 'horizontal' | 'vertical'
  showProgress?: boolean
  className?: string
}

export default function Timeline({
  items,
  orientation = 'horizontal',
  showProgress = true,
  className = ""
}: TimelineProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const getStatusColor = (status?: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return theme.colors.accentGold
      case 'current':
        return theme.colors.accentRed
      case 'upcoming':
        return theme.colors.grey
      default:
        return theme.colors.grey
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (orientation === 'vertical') {
    return (
      <div className={`relative ${className}`}>
        {/* Progress line */}
        {showProgress && (
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20">
            <motion.div
              className="w-full bg-gradient-to-b from-yellow-400 to-blue-400"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Timeline items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative flex items-start space-x-6"
            >
              {/* Timeline dot */}
              <div
                className="relative z-10 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: getStatusColor(item.status) }}
                onClick={() => {
                  setActiveItem(item.id)
                  item.onClick?.()
                }}
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <motion.h3
                  className="text-xl font-bold text-white mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.title}
                </motion.h3>
                {item.date && (
                  <p className="text-sm text-gray-400 mb-2">{item.date}</p>
                )}
                {item.description && (
                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    animate={{
                      height: activeItem === item.id ? 'auto' : 0,
                      opacity: activeItem === item.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  // Horizontal timeline
  return (
    <div className={`relative ${className}`}>
      {/* Progress line */}
      {showProgress && (
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 via-red-400 to-blue-400"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Timeline items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-between items-start relative"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="flex flex-col items-center cursor-pointer group"
            style={{ minWidth: '120px' }}
            onClick={() => {
              setActiveItem(item.id)
              item.onClick?.()
            }}
          >
            {/* Timeline dot */}
            <div
              className="relative z-10 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-4"
              style={{ backgroundColor: getStatusColor(item.status) }}
            >
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>

            {/* Content */}
            <div className="text-center">
              <motion.h3
                className="text-sm font-bold text-white mb-1"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.h3>
              {item.date && (
                <p className="text-xs text-gray-400">{item.date}</p>
              )}
              
              {/* Expanded content */}
              {item.description && (
                <motion.div
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 w-48 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{
                    opacity: activeItem === item.id ? 1 : 0,
                    y: activeItem === item.id ? 0 : 10,
                    scale: activeItem === item.id ? 1 : 0.9,
                    pointerEvents: activeItem === item.id ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-gray-300">{item.description}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}