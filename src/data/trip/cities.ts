/**
 * China Trip 2026 - City Data
 * 
 * Defines city metadata, camera presets, and content for the journey.
 * Geographic coordinates (lng/lat) are used for stable bubble positioning.
 */

export type CityId =
    | "shanghai"
    | "wuhan"
    | "zhangjiajie"
    | "chongqing"
    | "chengdu"
    | "dali"
    | "lijiang"
    | "beijing";

export interface CityCameraPreset {
    center: [number, number]; // [lng, lat]
    zoom: number;
    pitch: number;
    bearing: number;
}

export interface CityQuickFacts {
    population?: string;
    knownFor?: string;
    mustEat?: string;
}

export interface CityMeta {
    id: CityId;
    name: string;
    subtitle: string;
    order: number;
    location: {
        lng: number;
        lat: number;
    };
    camera: CityCameraPreset;
    heroImage: string; // Path to main hero image
    gallery: string[]; // Array of 0-3 additional image paths
    hologramSrc?: string;
    
    // Deprecated: Content moved to markdown
    summary?: string;
    details?: string;
    quickFacts?: CityQuickFacts;
    physical?: string;
    political?: string;
    demographics?: string;
    logistics?: string;
}

export const CITIES: CityMeta[] = [
    {
        id: "shanghai",
        name: "Shanghai",
        subtitle: "Paris of the East",
        order: 1,
        location: { lng: 121.4737, lat: 31.2304 },
        camera: {
            center: [121.4737, 31.2304],
            zoom: 8,
            pitch: 55,
            bearing: 20
        },
        heroImage: "/assets/hero_shanghai_01.jpg",
        gallery: [
            "/assets/broll_shanghai_dumplings.jpg",
            "/assets/broll_shanghai_night_street_bbq.jpg"
        ],
        hologramSrc: "/videos/hologram-shanghai.mp4"
    },
    {
        id: "wuhan",
        name: "Wuhan",
        subtitle: "River City",
        order: 2,
        location: { lng: 114.3055, lat: 30.5928 },
        camera: {
            center: [114.3055, 30.5928],
            zoom: 8,
            pitch: 55,
            bearing: -10
        },
        heroImage: "/assets/hero_wuhan_01.jpg",
        gallery: [
            "/assets/broll_wuhan_reganmian_bowl.jpg",
            "/assets/broll_wuhan_yangtze_bridge.jpg"
        ]
    },
    {
        id: "zhangjiajie",
        name: "Zhangjiajie",
        subtitle: "Karst Peaks",
        order: 3,
        location: { lng: 110.4792, lat: 29.117 },
        camera: {
            center: [110.4792, 29.117],
            zoom: 8.5,
            pitch: 60,
            bearing: 15
        },
        heroImage: "/assets/hero_zhangjiajie_01.jpg",
        gallery: [
            "/assets/broll_furong_ancient_town.jpg",
            "/assets/broll_zhangjiajie_forest_trail.jpg"
        ]
    },
    {
        id: "chongqing",
        name: "Chongqing",
        subtitle: "Mountain City",
        order: 4,
        location: { lng: 106.5516, lat: 29.5630 },
        camera: {
            center: [106.5516, 29.5630],
            zoom: 8,
            pitch: 55,
            bearing: 30
        },
        heroImage: "/assets/hero_chongqing_hongyadong_01.jpg",
        gallery: [
            "/assets/broll_chongqing_spicy_noodles.jpg",
            "/assets/broll_chongqing_03.jpg"
        ]
    },
    {
        id: "chengdu",
        name: "Chengdu",
        subtitle: "Land of Abundance",
        order: 5,
        location: { lng: 104.0668, lat: 30.5728 },
        camera: {
            center: [104.0668, 30.5728],
            zoom: 8,
            pitch: 55,
            bearing: -20
        },
        heroImage: "/assets/hero_chengdu_01.jpg",
        gallery: [
            "/assets/broll_chengdu_mapotofu_01.jpg",
            "/assets/broll_chengdu_jin_river.jpg"
        ]
    },
    {
        id: "dali",
        name: "Dali",
        subtitle: "Bai Kingdom",
        order: 6,
        location: { lng: 100.2251, lat: 25.6064 },
        camera: {
            center: [100.2251, 25.6064],
            zoom: 8.5,
            pitch: 55,
            bearing: 10
        },
        heroImage: "/assets/hero_dali_01.jpg",
        gallery: [
            "/assets/broll_dali_old_town_street.jpg",
            "/assets/broll_dali_grilled_erhai_fish.jpg"
        ]
    },
    {
        id: "lijiang",
        name: "Lijiang",
        subtitle: "Naxi Heartland",
        order: 7,
        location: { lng: 100.2330, lat: 26.8550 },
        camera: {
            center: [100.2330, 26.8550],
            zoom: 8.5,
            pitch: 55,
            bearing: -15
        },
        heroImage: "/assets/hero_lijiang_01.jpg",
        gallery: [
            "/assets/broll_lijiang_naxi_details.jpg",
            "/assets/broll_lijiang_old_town_canal.jpg"
        ]
    },
    {
        id: "beijing",
        name: "Beijing",
        subtitle: "Imperial Capital",
        order: 8,
        location: { lng: 116.4074, lat: 39.9042 },
        camera: {
            center: [116.4074, 39.9042],
            zoom: 8,
            pitch: 55,
            bearing: 0
        },
        heroImage: "/assets/hero_beijing_01.jpg",
        gallery: [
            "/assets/broll_beijing_peking_duck_table.jpg",
            "/assets/broll_beijing_03.jpg"
        ]
    }
];

// Overview camera showing all of China
export const OVERVIEW_CAMERA: CityCameraPreset = {
    center: [105, 32],
    zoom: 4.0, // Increased from 3.2 for more zoomed-in view
    pitch: 55,
    bearing: 0
};

// Helper functions
export function getCityById(id: CityId): CityMeta | undefined {
    return CITIES.find(c => c.id === id);
}

export function getSortedCities(): CityMeta[] {
    return [...CITIES].sort((a, b) => a.order - b.order);
}
