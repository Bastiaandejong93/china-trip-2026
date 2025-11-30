// src/components/GeoSectionDemographics.tsx
import React from "react"
import ReactMarkdown from "react-markdown"
import { loadMarkdown } from "@/lib/loadContent"
import { BackToMapButton } from "@/components/shared/BackToMapButton"

export default function GeoSectionDemographics() {
    const { frontmatter, content } = loadMarkdown("src/content/geography/demographics.md")

    return (
        <section className="relative min-h-screen px-6 md:px-10 py-16 bg-black text-slate-100">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-amber-300">
                    {frontmatter.title ?? "Demographics of China"}
                </h1>
                {frontmatter.subtitle && (
                    <p className="text-base md:text-lg text-slate-400 mt-2">
                        {frontmatter.subtitle}
                    </p>
                )}
            </div>

            {/* Back to Map button */}
            <div className="max-w-4xl mx-auto mb-4">
                <BackToMapButton />
            </div>

            {/* Content card */}
            <div
                className="
          max-w-4xl mx-auto
          bg-slate-900/60 backdrop-blur-xl
          border border-white/10
          rounded-3xl p-6 md:p-8
          shadow-xl
        "
            >
                <div
                    className="
            prose prose-invert max-w-none
            prose-h2:text-amber-300
            prose-h3:text-red-300
            prose-p:text-slate-100
            prose-strong:text-slate-50
            prose-li:text-slate-100
          "
                >
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </section>
    )
}
