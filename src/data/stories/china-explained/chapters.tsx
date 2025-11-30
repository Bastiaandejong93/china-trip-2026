/**
 * China Explained - Chapter Definitions
 * 
 * Data-driven configuration of all chapters/sections for the China scrollytelling story.
 * Each chapter corresponds to a section in the scrolling experience.
 */

import { Chapter } from '@/data/schemas/scrollytelling'
import type { StoryIconId } from './icons'

/**
 * Extended chapter type with icon support for China story.
 */
export interface ChinaChapter extends Chapter {
    iconId?: StoryIconId;
}
import HeroSection from '@/components/stories/china/HeroSection'
import GeoSectionPhysical from '@/components/stories/china/GeoSectionPhysical'
import GeoSectionPolitical from '@/components/stories/china/GeoSectionPolitical'
import GeoSectionDemographic from '@/components/stories/china/GeoSectionDemographic'
import RouteOverview from '@/components/stories/china/RouteOverview'
import Timeline from '@/components/Timeline'
import countryOverview from '@/lib/countryOverview'
import CityCard from '@/components/scrollytelling/CityCard'
import TravelEssentials from '@/components/stories/china/TravelEssentials'
import TripLog from '@/components/stories/china/TripLog'

// Timeline data for the journey
const timelineItems = [
    {
        id: 'hero',
        title: 'China Explained',
        date: 'May 2026',
        description: 'A cinematic journey through the Middle Kingdom',
        status: 'completed' as const
    },
    {
        id: 'geography',
        title: 'Geography',
        date: 'Physical & Political',
        description: 'Explore diverse landscapes and administrative divisions',
        status: 'completed' as const
    },
    {
        id: 'demographics',
        title: 'Demographics',
        date: 'People & Culture',
        description: '1.4 billion people and incredible ethnic diversity',
        status: 'completed' as const
    },
    {
        id: 'route',
        title: 'Grand Tour',
        date: '8 Cities',
        description: 'Our journey through China\'s most iconic destinations',
        status: 'current' as const
    },
    {
        id: 'culture',
        title: 'Cultural Highlights',
        date: 'Traditions',
        description: 'Food, art, and experiences along our route',
        status: 'upcoming' as const
    }
]

export const chinaChapters: ChinaChapter[] = [
    // Hero / Introduction
    {
        id: 'hero',
        title: 'China Explained',
        subtitle: 'Our Grand Tour',
        content: <HeroSection />,
        mapState: {
            center: [105, 35], // Center of China
            zoom: 1.5, // Globe view
            pitch: 0,
            bearing: 0,
            projection: 'globe'
        },
        background: 'gradient',
        fullHeight: true
    },

    // Timeline
    {
        id: 'timeline',
        title: 'Journey Timeline',
        content: (
            <div className="max-w-4xl mx-auto">
                <Timeline
                    items={timelineItems}
                    orientation="horizontal"
                    showProgress={true}
                />
            </div>
        ),
        background: 'solid',
        fullHeight: false
    },

    // Physical Geography
    {
        id: 'geography',
        title: 'Physical  Geography',
        subtitle: 'Diverse Landscapes of the Middle Kingdom',
        content: <GeoSectionPhysical />,
        mapState: {
            center: [105, 35], // Center of China
            zoom: 4, // Zoomed in
            pitch: 0,
            bearing: 0,
            projection: 'globe' // Keep globe projection for smooth transition
        },
        background: 'map',
        fullHeight: true
    },

    // Political Geography
    {
        id: 'political',
        title: 'Political Geography',
        subtitle: 'Administrative Structure',
        content: <GeoSectionPolitical />,
        mapState: {
            center: [104.2, 35.9], // Center of China
            zoom: 4
        },
        background: 'solid',
        fullHeight: true
    },

    // Demographics
    {
        id: 'demographics',
        title: 'Demographics',
        subtitle: '1.4 Billion People',
        content: <GeoSectionDemographic />,
        mapState: {
            center: [104.2, 35.9],
            zoom: 4
        },
        background: 'gradient',
        fullHeight: true
    },

    // Route Overview
    {
        id: 'route',
        title: 'Our Grand Tour Route',
        subtitle: '8 Cities, 4,823km',
        content: <RouteOverview />,
        mapState: {
            center: [110, 32], // Center on route
            zoom: 5
        },
        background: 'map',
        fullHeight: true
    },

    // Shanghai City Card
    {
        id: 'shanghai',
        title: 'Shanghai',
        subtitle: 'The Modern Metropolis',
        content: (
            <div className="w-full py-20">
                <CityCard
                    title="Shanghai"
                    subtitle="Paris of the East"
                    description="Shanghai is China's biggest city and a global financial hub. Its heart is the Bund, a famed waterfront promenade lined with colonial-era buildings. Across the Huangpu River rises the Lujiazui skyline, including the Shanghai Tower and the Oriental Pearl TV Tower."
                    heroImage="/images/shanghai-skyline.jpg" // Placeholder, would need real asset
                    stats={[
                        { label: 'Population', value: '26.3 Million' },
                        { label: 'Known For', value: 'Finance, The Bund' },
                        { label: 'Must Eat', value: 'Xiao Long Bao' }
                    ]}
                />
            </div>
        ),
        mapState: {
            center: [121.4737, 31.2304],
            zoom: 12,
            pitch: 45,
            bearing: -15
        },
        background: 'image', // Would use a specific background preset
        fullHeight: true,
        iconId: 'city_shanghai'
    },

    // Travel Essentials
    {
        id: 'essentials',
        title: 'Travel Essentials',
        subtitle: 'Know Before You Go',
        content: (
            <div className="w-full py-20 flex items-center justify-center">
                <TravelEssentials />
            </div>
        ),
        background: 'solid',
        fullHeight: true
    },

    // Cultural Highlights
    {
        id: 'culture',
        title: 'Cultural Highlights',
        subtitle: 'Essential Experiences',
        content: (
            <div className="w-full max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Essential experiences and culinary delights that define each region along our journey
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {countryOverview.cultural.highlights.map((highlight, index) => (
                        <div
                            key={highlight.name}
                            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="text-3xl mb-4">
                                {highlight.type === 'food' && '🍜'}
                                {highlight.type === 'art' && '🎭'}
                                {highlight.type === 'tradition' && '🏛️'}
                                {highlight.type === 'architecture' && '🏯'}
                                {highlight.type === 'festival' && '🎉'}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{highlight.name}</h3>
                            <p className="text-gray-300 text-sm mb-3">{highlight.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">{highlight.region}</span>
                                <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">
                                    {highlight.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        background: 'gradient',
        fullHeight: true
    },

    // Trip Log
    {
        id: 'triplog',
        title: 'Trip Log',
        subtitle: 'Journey Notes',
        content: (
            <div className="w-full py-20">
                <TripLog />
            </div>
        ),
        background: 'solid',
        fullHeight: true
    }
]

export default chinaChapters
