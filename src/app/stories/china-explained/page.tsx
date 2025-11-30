'use client'

/**
 * China Explained - Story Page
 * 
 * The main page for the China scrollytelling experience.
 * Uses the reusable ScrollytellingLayout engine with China-specific content.
 */

import ScrollytellingLayout from '@/components/scrollytelling/ScrollytellingLayout'
import Header from '@/components/stories/china/Header'
import Footer from '@/components/Footer'
import { chinaStoryConfig } from '@/data/stories/china-explained/config'
import { chinaChapters } from '@/data/stories/china-explained/chapters'
import { storyIcons } from '@/data/stories/china-explained/icons'
import type { ChinaChapter } from '@/data/stories/china-explained/chapters'

/**
 * Reusable component to render story icons from /public
 * Later can be upgraded to inline SVG React components via svgr
 */
function StoryIconImg({ src, alt }: { src: string; alt: string }) {
    return (
        <img
            src={src}
            alt={alt}
            className="h-6 w-6 md:h-8 md:w-8 object-contain"
            loading="lazy"
        />
    )
}

import { chinaMarkers, fullChinaRoute } from '@/data/stories/china-explained/mapData'

// ... imports

export default function ChinaExplainedPage() {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Main Scrollytelling Experience */}
            <ScrollytellingLayout
                config={chinaStoryConfig}
                chapters={chinaChapters}
                markers={chinaMarkers}
                routes={fullChinaRoute}
                callbacks={{
                    onChapterChange: (chapterId, index) => {
                        console.log(`Chapter changed to: ${chapterId} (index: ${index})`)
                    },
                    onScrollProgress: (progress) => {
                        // Optional: track scroll progress for analytics
                        // console.log('Scroll progress:', progress)
                    }
                }}
                renderChapterIcon={(chapter) => {
                    const chinaChap = chapter as ChinaChapter
                    if (!chinaChap.iconId) return null

                    const meta = storyIcons[chinaChap.iconId]
                    return <StoryIconImg src={meta.path} alt={meta.name} />
                }}
            />

            {/* Footer */}
            <Footer />
        </>
    )
}
