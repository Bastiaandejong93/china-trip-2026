'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export interface CityCardProps {
    title: string
    subtitle?: string
    description: string
    heroImage: string
    stats?: { label: string; value: string }[]
    gallery?: string[]
    color?: string
    onClose?: () => void
}

export default function CityCard({
    title,
    subtitle,
    description,
    heroImage,
    stats = [],
    gallery = [],
    color = '#B52719', // imperialRed
}: CityCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-4xl mx-auto bg-inkBlack/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
                <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inkBlack via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-8">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-ricePaper mb-2"
                    >
                        {title}
                    </motion.h2>
                    {subtitle && (
                        <p className="text-xl text-warmGold font-serif italic">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Description */}
                <div className="md:col-span-2 space-y-6">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-gray-300 leading-relaxed font-sans">
                            {description}
                        </p>
                    </div>

                    {/* Gallery Preview */}
                    {gallery.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {gallery.slice(0, 3).map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
                                    <Image
                                        src={img}
                                        alt={`${title} gallery ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats / Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h3 className="text-warmGold font-serif text-lg mb-4 border-b border-white/10 pb-2">Quick Facts</h3>
                        <div className="space-y-4">
                            {stats.map((stat, idx) => (
                                <div key={idx}>
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                                    <span className="block text-lg text-ricePaper font-medium">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="w-full py-3 px-6 bg-imperialRed hover:bg-red-700 text-white rounded transition-colors font-medium flex items-center justify-center gap-2 group"
                    >
                        <span>Explore City</span>
                        <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
