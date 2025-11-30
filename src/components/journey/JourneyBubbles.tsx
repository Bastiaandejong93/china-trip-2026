'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CityMeta } from '@/data/trip/cities'
import { getCityIcon } from '@/data/trip/cityIcons'


type JourneyBubblesProps = {
    cities: CityMeta[]
    activeCityId?: string | null
    mode?: "overview" | "focus"
    onCitySelect?: (city: CityMeta) => void
    className?: string
    cityPositions?: Record<string, { x: number; y: number }>
}

export function JourneyBubbles(props: JourneyBubblesProps) {
    const { cities, activeCityId, mode = "overview", onCitySelect, className, cityPositions } = props

    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 z-30',
                className,
            )}
        >
            {cities.map((city) => {
                const isActive = city.id === activeCityId
                const isFocusMode = mode === "focus"
                const shouldDim = isFocusMode && !isActive

                // Get position from prop
                const pos = cityPositions?.[city.id];

                // If no position yet, don't render (or render invisible)
                if (!pos) return null;

                return (
                    <motion.button
                        key={city.id}
                        type="button"
                        onClick={() => onCitySelect?.(city)}
                        className="pointer-events-auto absolute"
                        style={{
                            left: pos.x,
                            top: pos.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isActive ? 1.1 : (shouldDim ? 0.85 : 1),
                            opacity: shouldDim ? 0.4 : 1
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    >
                        {/* Outer glow ring */}
                        <motion.div
                            className={cn(
                                'relative flex h-14 w-14 items-center justify-center rounded-bubble',
                                'shadow-bubble-soft',
                            )}
                            animate={{
                                boxShadow: isActive
                                    ? '0 0 0 1px rgba(214,169,74,0.7), 0 0 30px rgba(214,169,74,0.55)'
                                    : '0 8px 25px rgba(0,0,0,0.45), 0 0 0 1px rgba(214,169,74,0.28)',
                            }}
                        >
                            {/* Inner bubble */}
                            <div
                                className={cn(
                                    'flex h-11 w-11 items-center justify-center rounded-bubble border',
                                    'bg-bubble-idle/95 backdrop-blur-glass',
                                    isActive
                                        ? 'border-imperial-gold/80'
                                        : 'border-imperial-gold/40',
                                )}
                            >
                                {/* City Icon */}
                                <div
                                    className={cn(
                                        'flex items-center justify-center',
                                        isActive
                                            ? 'text-imperial-gold'
                                            : 'text-imperial-gold/70',
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: getCityIcon(city.id) || ''
                                    }}
                                />
                            </div>

                            {/* Pulsing halo */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        className="pointer-events-none absolute inset-0 rounded-bubble border border-imperial-gold/40"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 0, scale: 1.6 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 1.6,
                                            repeat: Infinity,
                                            ease: 'easeOut',
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Label onder de bubble */}
                        <div className="mt-2 flex flex-col items-center text-center">
                            <span className="rounded-full bg-black/65 px-3 py-0.5 text-[10px] uppercase tracking-[0.18em] text-parchment-mist shadow-lg">
                                {String(city.order).padStart(2, '0')}
                            </span>
                            <span className="mt-1 text-xs font-semibold text-parchment-light drop-shadow-md">
                                {city.name}
                            </span>
                            {city.subtitle && (
                                <span className="text-[11px] text-parchment-mist/80 drop-shadow-sm">
                                    {city.subtitle}
                                </span>
                            )}
                        </div>
                    </motion.button>
                )
            })}
        </div>
    )
}
