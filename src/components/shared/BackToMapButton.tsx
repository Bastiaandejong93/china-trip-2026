// src/components/shared/BackToMapButton.tsx
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import React from "react"

interface BackToMapButtonProps {
    label?: string
}

export function BackToMapButton({ label = "Back to Map" }: BackToMapButtonProps) {
    const router = useRouter()

    return (
        <div className="mb-6">
            <button
                type="button"
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 hover:bg-black/60 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-100 hover:text-amber-100 shadow-sm transition"
                aria-label={label}
            >
                <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                <span>{label}</span>
            </button>
        </div>
    )
}
