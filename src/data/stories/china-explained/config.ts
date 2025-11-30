/**
 * China Explained - Story Configuration
 * 
 * Story metadata and map configuration for the China scrollytelling experience.
 */

import { StoryConfig } from '@/data/schemas/scrollytelling'
import theme from '@/lib/theme'

export const chinaStoryConfig: StoryConfig = {
    meta: {
        id: 'china-explained',
        title: 'China Explained',
        subtitle: 'Our Grand Tour',
        description: 'A cinematic journey through the Middle Kingdom\'s diverse geography, rich culture, and incredible destinations. From Shanghai\'s futuristic skyl to Beijing\'s ancient wonders.',
        author: 'Bastis Grand Tour Team',
        publishedAt: '2026-05-01',
        locale: 'en',
    },

    theme: theme, // Reuse the existing China theme

    map: {
        style: 'mapbox://styles/mapbox/dark-v11',
        initialCenter: [104.2, 35.9], // Center on China
        initialZoom: 4,
        initialPitch: 0,
        initialBearing: 0,
        showControls: true,
        enable3D: true,
    },
}

export default chinaStoryConfig
