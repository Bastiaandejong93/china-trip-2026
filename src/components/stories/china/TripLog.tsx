'use client'

import { motion } from 'framer-motion'

interface LogEntry {
    date: string
    location: string
    title: string
    content: string
    mood?: string
    weather?: string
}

const logs: LogEntry[] = [
    {
        date: 'Day 1',
        location: 'Shanghai',
        title: 'Arrival in the Future',
        content: 'The skyline of Lujiazui looks like something out of Blade Runner. The humidity hits you the moment you step outside.',
        mood: 'Excited',
        weather: '☁️ 28°C'
    },
    {
        date: 'Day 3',
        location: 'Wuhan',
        title: 'Crossing the Yangtze',
        content: 'The scale of this river is unimaginable until you see it. Had the best hot dry noodles (reganmian) for breakfast.',
        mood: 'Spicy',
        weather: '☀️ 32°C'
    },
    {
        date: 'Day 5',
        location: 'Zhangjiajie',
        title: 'Floating Mountains',
        content: 'Took the bailong elevator up. The mist rolling through the pillars makes them look like they are floating.',
        mood: 'Awe-struck',
        weather: '🌫️ 22°C'
    },
    {
        date: 'Day 8',
        location: 'Chengdu',
        title: 'Panda Diplomacy',
        content: 'Spent 3 hours watching pandas eat bamboo. Worth every minute. The hotpot tonight is going to destroy me.',
        mood: 'Relaxed',
        weather: '🌧️ 24°C'
    }
]

export default function TripLog() {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-ricePaper mb-2">Captain's Log</h2>
                <p className="text-warmGold italic">Notes from the road</p>
            </div>

            <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12">
                {logs.map((log, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-inkBlack border border-warmGold" />

                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-warmGold/30 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-white/5 pb-4">
                                <div>
                                    <span className="text-warmGold font-serif text-lg block">{log.date}</span>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">{log.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="px-2 py-1 bg-white/5 rounded">{log.weather}</span>
                                    <span className="px-2 py-1 bg-white/5 rounded">{log.mood}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-ricePaper mb-2">{log.title}</h3>
                            <p className="text-gray-300 leading-relaxed font-serif italic">"{log.content}"</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
