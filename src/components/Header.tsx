'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, MapPin, Users, Mountain } from 'lucide-react'
import { useState } from 'react'
import theme from '@/lib/theme'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Geography', icon: <Mountain className="w-4 h-4" />, href: '#geography' },
    { name: 'Route', icon: <MapPin className="w-4 h-4" />, href: '#route' },
    { name: 'Culture', icon: <Users className="w-4 h-4" />, href: '#culture' },
    { name: 'About', icon: <Globe className="w-4 h-4" />, href: '#about' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${theme.colors.accentRed}20` }}
            >
              <Globe className="w-6 h-6" style={{ color: theme.colors.accentRed }} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">China Explained</h1>
              <p className="text-xs text-gray-400">Grand Tour 2026</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="w-full flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all duration-200"
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  )
}