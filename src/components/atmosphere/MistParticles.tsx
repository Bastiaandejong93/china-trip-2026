'use client'

import { useEffect, useRef } from 'react'

export interface MistParticlesProps {
    particleCount?: number
    speed?: number
    className?: string
}

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
}

export function MistParticles({
    particleCount = 30,
    speed = 0.5,
    className = '',
}: MistParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initializeParticles(canvas.width, canvas.height)
        }

        updateSize()
        window.addEventListener('resize', updateSize)

        // Animation loop
        function animate() {
            if (!canvas || !ctx) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw each particle
            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.speedX * speed
                particle.y += particle.speedY * speed

                // Wrap around edges
                if (particle.x < -50) particle.x = canvas.width + 50
                if (particle.x > canvas.width + 50) particle.x = -50
                if (particle.y < -50) particle.y = canvas.height + 50
                if (particle.y > canvas.height + 50) particle.y = -50

                // Draw particle as soft circle
                ctx.save()
                ctx.globalAlpha = particle.opacity

                const gradient = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.size
                )
                gradient.addColorStop(0, 'rgba(232, 226, 211, 0.8)') // parchment-mist
                gradient.addColorStop(0.5, 'rgba(232, 226, 211, 0.3)')
                gradient.addColorStop(1, 'rgba(232, 226, 211, 0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fill()

                ctx.restore()
            })

            rafRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', updateSize)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [speed, particleCount])

    function initializeParticles(width: number, height: number) {
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: 20 + Math.random() * 60, // 20-80px
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: Math.random() * 0.2 - 0.4, // Slight upward drift
            opacity: 0.1 + Math.random() * 0.15, // 0.1-0.25
        }))
    }

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none fixed inset-0 z-5 ${className}`}
            style={{ mixBlendMode: 'screen' }}
        />
    )
}
