'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import theme from '@/lib/theme'

interface ScrollSectionProps {
  children: React.ReactNode
  className?: string
  background?: 'gradient' | 'solid' | 'map'
  bgColor?: string
  id?: string
  fullHeight?: boolean
}

export default function ScrollSection({
  children,
  className = "",
  background = 'solid',
  bgColor = theme.colors.background,
  id,
  fullHeight = true
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return `bg-gradient-to-b from-${bgColor} to-black`
      case 'map':
        return 'bg-gradient-to-b from-blue-900/20 to-black'
      default:
        return `bg-${bgColor}`
    }
  }

  return (
    <section
      ref={ref}
      id={id}
      className={`
        relative overflow-hidden
        ${fullHeight ? 'min-h-screen' : 'min-h-[60vh]'}
        ${getBackgroundClass()}
        ${className}
      `}
    >
      {/* Background overlay for gradient effects */}
      {background === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}

      {/* Animated background elements */}
      {background === 'map' && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.colors.accentBlue.slice(1)}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}

      {/* Content container */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-6">
          {children}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {fullHeight && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      )}
    </section>
  )
}