'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Twitter, Mail, Heart, Download, Globe } from 'lucide-react'
import theme from '@/lib/theme'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' }
  ]

  const resources = [
    { name: 'Map Documentation', href: '#' },
    { name: 'Data Sources', href: '#' },
    { name: 'Image Credits', href: '#' },
    { name: 'Travel Guide', href: '#' }
  ]

  return (
    <footer className="bg-black/90 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.imperialRed}20` }}
              >
                <Globe className="w-6 h-6" style={{ color: theme.colors.imperialRed }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">China Explained</h3>
                <p className="text-xs text-gray-400">Grand Tour 2026</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              A cinematic journey through China's geography, culture, and incredible diversity.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="#geography" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Physical Geography
                </a>
              </li>
              <li>
                <a href="#political" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Political Geography
                </a>
              </li>
              <li>
                <a href="#demographics" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Demographics
                </a>
              </li>
              <li>
                <a href="#route" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Grand Tour Route
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-3">Get the Guide</h4>
              <p className="text-sm text-gray-400 mb-4">
                Download our complete China Grand Tour itinerary with detailed travel information.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} China Explained. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for travelers and explorers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}