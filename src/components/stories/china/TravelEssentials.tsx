'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type EssentialCategory = 'visa' | 'apps' | 'payment' | 'packing'

const essentialsData = {
    visa: {
        title: 'Visa Free Travel',
        icon: '🛂',
        content: [
            { title: '15-Day Visa Free', desc: 'Available for citizens of France, Germany, Italy, Netherlands, Spain, Malaysia, and more.' },
            { title: '144-Hour Transit', desc: 'Perfect for layovers in major hubs like Shanghai and Beijing. Requires proof of onward travel.' },
            { title: 'L-Visa (Tourist)', desc: 'Standard tourist visa. Requires flight/hotel booking or invitation letter.' }
        ]
    },
    apps: {
        title: 'Digital Survival Kit',
        icon: '📱',
        content: [
            { title: 'Alipay / WeChat', desc: 'Essential for payments. Link your foreign credit card before arrival.' },
            { title: 'Amap (Gaode)', desc: 'Best navigation app. Apple Maps also works well (uses Gaode data).' },
            { title: 'Trip.com', desc: 'Best for booking trains and hotels in English.' },
            { title: 'Translate App', desc: 'Google Translate or DeepL. Download offline packages.' }
        ]
    },
    payment: {
        title: 'Cashless Society',
        icon: '💳',
        content: [
            { title: 'Mobile Payment', desc: 'Cash is rarely used. QR codes are everywhere.' },
            { title: 'Foreign Cards', desc: 'Alipay/WeChat now support Visa/Mastercard linkage.' },
            { title: 'Cash Backup', desc: 'Keep some RMB cash for emergencies or elderly vendors.' }
        ]
    },
    packing: {
        title: 'What to Pack',
        icon: '🎒',
        content: [
            { title: 'Power Bank', desc: 'Crucial. Your phone is your wallet, map, and translator.' },
            { title: 'VPN / eSIM', desc: 'Get an eSIM (e.g., Holafly) to bypass the firewall automatically.' },
            { title: 'Comfortable Shoes', desc: 'You will walk a lot. Cities are massive.' },
            { title: 'Tissues/Wipes', desc: 'Many public restrooms do not provide toilet paper.' }
        ]
    }
}

export default function TravelEssentials() {
    const [activeTab, setActiveTab] = useState<EssentialCategory>('visa')

    return (
        <div className="w-full max-w-5xl mx-auto bg-inkBlack/90 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="p-8 border-b border-white/10 text-center">
                <h2 className="text-3xl font-serif font-bold text-ricePaper mb-2">Travel Essentials</h2>
                <p className="text-gray-400">Everything you need to know before you go</p>
            </div>

            <div className="flex flex-col md:flex-row min-h-[400px]">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-1/3 border-r border-white/10 bg-white/5">
                    {Object.entries(essentialsData).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as EssentialCategory)}
                            className={`w-full text-left px-6 py-5 flex items-center gap-4 transition-all duration-300 border-l-4 ${activeTab === key
                                    ? 'bg-white/10 border-warmGold text-warmGold'
                                    : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-ricePaper'
                                }`}
                        >
                            <span className="text-2xl">{data.icon}</span>
                            <span className="font-serif font-medium text-lg">{data.title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="w-full md:w-2/3 p-8 bg-inkBlack/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-serif text-warmGold mb-6 flex items-center gap-3">
                                <span>{essentialsData[activeTab].icon}</span>
                                {essentialsData[activeTab].title}
                            </h3>

                            <div className="grid gap-4">
                                {essentialsData[activeTab].content.map((item, idx) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                        <h4 className="text-ricePaper font-bold mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
