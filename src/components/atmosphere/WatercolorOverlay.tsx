'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface WatercolorOverlayProps {
    isVisible: boolean
    intensity?: number // 0-1, controls opacity
    activeRegion?: 'north' | 'south' | 'east' | 'west' | 'central' | null
    className?: string
}

export function WatercolorOverlay({
    isVisible,
    intensity = 0.3,
    activeRegion = null,
    className = '',
}: WatercolorOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isReady, setIsReady] = useState(false)

    // Initialize canvas and draw ink wash effect
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        // Set canvas size to match viewport
        const updateSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawInkWash(ctx, canvas.width, canvas.height, activeRegion)
        }

        updateSize()
        setIsReady(true)

        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [activeRegion])

    // Redraw when active region changes
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !isReady) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        drawInkWash(ctx, canvas.width, canvas.height, activeRegion)
    }, [activeRegion, isReady])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`pointer-events-none fixed inset-0 z-10 ${className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: intensity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{
                            mixBlendMode: 'multiply',
                            filter: 'blur(2px)',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/**
 * Draw ink wash watercolor effect on canvas
 */
function drawInkWash(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    region: 'north' | 'south' | 'east' | 'west' | 'central' | null
) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Determine focal point based on region
    const focal = getRegionalFocalPoint(width, height, region)

    // Create radial gradient for ink bloom effect
    const gradient = ctx.createRadialGradient(
        focal.x,
        focal.y,
        0,
        focal.x,
        focal.y,
        focal.radius
    )

    // Ink wash colors - warm beige to transparent
    gradient.addColorStop(0, 'rgba(243, 231, 214, 0.6)') // parchment-light
    gradient.addColorStop(0.3, 'rgba(232, 226, 211, 0.4)') // parchment-mist
    gradient.addColorStop(0.6, 'rgba(167, 183, 197, 0.2)') // watercolor-bluegrey
    gradient.addColorStop(1, 'rgba(167, 183, 197, 0)')

    // Fill with gradient
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add texture noise for organic watercolor feel
    addNoiseTexture(ctx, width, height, focal)

    // Add ink brush strokes
    if (region) {
        addBrushStrokes(ctx, width, height, focal)
    }
}

/**
 * Get focal point coordinates based on region
 */
function getRegionalFocalPoint(
    width: number,
    height: number,
    region: 'north' | 'south' | 'east' | 'west' | 'central' | null
): { x: number; y: number; radius: number } {
    if (!region) {
        return { x: width / 2, y: height / 2, radius: Math.max(width, height) * 0.6 }
    }

    const radius = Math.max(width, height) * 0.5

    switch (region) {
        case 'north':
            return { x: width / 2, y: height * 0.3, radius }
        case 'south':
            return { x: width / 2, y: height * 0.7, radius }
        case 'east':
            return { x: width * 0.7, y: height / 2, radius }
        case 'west':
            return { x: width * 0.3, y: height / 2, radius }
        case 'central':
        default:
            return { x: width / 2, y: height / 2, radius }
    }
}

/**
 * Add subtle noise texture to mimic rice paper
 */
function addNoiseTexture(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    focal: { x: number; y: number; radius: number }
) {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % width
        const y = Math.floor(i / 4 / width)

        // Distance from focal point
        const dx = x - focal.x
        const dy = y - focal.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only add noise within focal radius
        if (distance < focal.radius) {
            const noise = (Math.random() - 0.5) * 15
            data[i] += noise // R
            data[i + 1] += noise // G
            data[i + 2] += noise // B
        }
    }

    ctx.putImageData(imageData, 0, 0)
}

/**
 * Add organic brush strokes radiating from focal point
 */
function addBrushStrokes(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    focal: { x: number; y: number; radius: number }
) {
    ctx.save()

    // Semi-transparent ink color
    ctx.strokeStyle = 'rgba(87, 120, 106, 0.15)' // watercolor-pine
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.globalCompositeOperation = 'multiply'

    // Draw 8 organic strokes radiating outward
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3

        ctx.beginPath()
        ctx.moveTo(focal.x, focal.y)

        // Create organic curve using quadratic bezier
        const length = focal.radius * (0.4 + Math.random() * 0.3)
        const cpx = focal.x + Math.cos(angle) * length * 0.6 + (Math.random() - 0.5) * 50
        const cpy = focal.y + Math.sin(angle) * length * 0.6 + (Math.random() - 0.5) * 50
        const endx = focal.x + Math.cos(angle) * length
        const endy = focal.y + Math.sin(angle) * length

        ctx.quadraticCurveTo(cpx, cpy, endx, endy)
        ctx.stroke()
    }

    ctx.restore()
}
