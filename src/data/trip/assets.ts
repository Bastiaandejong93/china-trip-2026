/**
 * China Trip 2026 - Assets Manifest
 * 
 * Curated city visuals following documentary storytelling style.
 * Each city has exactly 3 assets: 1 food + 2 cultural/landscape.
 */

import type { CityId } from "./cities";

export type AssetRole = "hero" | "broll" | "food";

export interface CityAsset {
    id: string;
    cityId: CityId;
    role: AssetRole;
    fileName: string;
    description: string;
}

export const CITY_ASSETS: CityAsset[] = [
    // Shanghai - Xiao Long Bao, Bund skyline, Night riverside
    {
        id: "shanghai_food_xiaolongbao",
        cityId: "shanghai",
        role: "food",
        fileName: "broll_shanghai_xiaolongbao_closeup.jpg",
        description: "Steaming Xiao Long Bao in bamboo steamer."
    },
    {
        id: "shanghai_hero_bund",
        cityId: "shanghai",
        role: "hero",
        fileName: "hero_shanghai_01.jpg",
        description: "Bund skyline at dusk with Oriental Pearl Tower."
    },
    {
        id: "shanghai_broll_night",
        cityId: "shanghai",
        role: "broll",
        fileName: "broll_shanghai_night_street_bbq.jpg",
        description: "Night riverside street scene."
    },

    // Wuhan - Re Gan Mian, Yangtze bridge, Huanghelou Pagoda
    {
        id: "wuhan_food_reganmian",
        cityId: "wuhan",
        role: "food",
        fileName: "broll_wuhan_reganmian_bowl.jpg",
        description: "Bowl of Re Gan Mian (hot dry noodles)."
    },
    {
        id: "wuhan_broll_yangtze",
        cityId: "wuhan",
        role: "broll",
        fileName: "broll_wuhan_yangtze_bridge.jpg",
        description: "Yangtze River Bridge spanning the great river."
    },
    {
        id: "wuhan_hero_pagoda",
        cityId: "wuhan",
        role: "hero",
        fileName: "hero_wuhan_01.jpg",
        description: "Yellow Crane Tower (Huanghelou) overlooking the city."
    },

    // Zhangjiajie - Avatar Mountains, Tianmen 999 steps, Misty forest
    {
        id: "zhangjiajie_hero_avatar",
        cityId: "zhangjiajie",
        role: "hero",
        fileName: "hero_zhangjiajie_01.jpg",
        description: "Towering sandstone pillars in morning mist (Avatar Mountains)."
    },
    {
        id: "zhangjiajie_broll_tianmen",
        cityId: "zhangjiajie",
        role: "broll",
        fileName: "broll_zhangjiajie_tianmen_gate.jpg",
        description: "Tianmen Mountain with 999 steps and natural arch gate."
    },
    {
        id: "zhangjiajie_broll_forest",
        cityId: "zhangjiajie",
        role: "broll",
        fileName: "broll_zhangjiajie_forest_trail.jpg",
        description: "Misty forest landscape with walking trails."
    },

    // Chongqing - Hotpot, Hongyadong, Mountain city density/cable cars/bridges
    {
        id: "chongqing_food_hotpot",
        cityId: "chongqing",
        role: "food",
        fileName: "broll_chongqing_spicy_noodles.jpg",
        description: "Chongqing hotpot and spicy noodles."
    },
    {
        id: "chongqing_hero_hongyadong",
        cityId: "chongqing",
        role: "hero",
        fileName: "hero_chongqing_hongyadong_01.jpg",
        description: "Hongyadong stilted buildings lit up at night."
    },
    {
        id: "chongqing_broll_mountain_city",
        cityId: "chongqing",
        role: "broll",
        fileName: "broll_chongqing_three_natural_bridges.jpg",
        description: "Mountain city density with bridges and cable cars."
    },

    // Chengdu - Mapo Tofu, Giant Panda, Kuanzhai Alley
    {
        id: "chengdu_food_mapotofu",
        cityId: "chengdu",
        role: "food",
        fileName: "broll_chengdu_mapotofu_01.jpg",
        description: "Classic Mapo Tofu dish."
    },
    {
        id: "chengdu_hero_panda",
        cityId: "chengdu",
        role: "hero",
        fileName: "hero_chengdu_01.jpg",
        description: "Giant Panda at Chengdu Research Base."
    },
    {
        id: "chengdu_broll_street",
        cityId: "chengdu",
        role: "broll",
        fileName: "broll_chengdu_hotpot_street.jpg",
        description: "Kuanzhai Alley street life and culture."
    },

    // Dali - Yunnan Rice Noodles, Erhai Lake, Three Pagodas
    {
        id: "dali_food_rice_noodles",
        cityId: "dali",
        role: "food",
        fileName: "broll_dali_grilled_erhai_fish.jpg",
        description: "Yunnan rice noodles and grilled Erhai fish."
    },
    {
        id: "dali_broll_erhai",
        cityId: "dali",
        role: "broll",
        fileName: "broll_dali_erhai_lake.jpg",
        description: "Scenic Erhai Lake with mountains."
    },
    {
        id: "dali_hero_pagodas",
        cityId: "dali",
        role: "hero",
        fileName: "hero_dali_01.jpg",
        description: "Three Pagodas with Cangshan mountains."
    },

    // Lijiang - Yak hotpot/local noodles, Old Town canal, Naxi architecture
    {
        id: "lijiang_food_noodles",
        cityId: "lijiang",
        role: "food",
        fileName: "broll_lijiang_crossing_bridge_noodles.jpg",
        description: "Crossing-the-Bridge noodles (local specialty)."
    },
    {
        id: "lijiang_broll_canal",
        cityId: "lijiang",
        role: "broll",
        fileName: "broll_lijiang_old_town_canal.jpg",
        description: "Old Town canals flowing through ancient streets."
    },
    {
        id: "lijiang_hero_naxi",
        cityId: "lijiang",
        role: "hero",
        fileName: "hero_lijiang_01.jpg",
        description: "Traditional Naxi architecture with wooden roofs."
    },

    // Beijing - Peking Duck, Great Wall, Forbidden City
    {
        id: "beijing_food_duck",
        cityId: "beijing",
        role: "food",
        fileName: "broll_beijing_peking_duck_table.jpg",
        description: "Peking Duck presentation."
    },
    {
        id: "beijing_broll_great_wall",
        cityId: "beijing",
        role: "broll",
        fileName: "broll_beijing_02.jpg",
        description: "Great Wall winding through mountains."
    },
    {
        id: "beijing_hero_forbidden",
        cityId: "beijing",
        role: "hero",
        fileName: "hero_beijing_01.jpg",
        description: "Forbidden City imperial gate."
    }
];

/**
 * Get assets for a specific city
 * @param cityId - The city to get assets for
 * @param roles - Optional filter by asset roles (default: all)
 * @returns Array of assets with publicPath computed
 */
export function getAssetsForCity(
    cityId: CityId,
    roles?: AssetRole[]
) {
    const filtered = roles 
        ? CITY_ASSETS.filter(asset => asset.cityId === cityId && roles.includes(asset.role))
        : CITY_ASSETS.filter(asset => asset.cityId === cityId);
    
    return filtered.map((asset) => ({
        ...asset,
        publicPath: `/assets/${asset.fileName}`
    }));
}

/**
 * Get all food-specific assets
 */
export function getFoodAssets() {
    return CITY_ASSETS.filter(asset => asset.role === "food").map((asset) => ({
        ...asset,
        publicPath: `/assets/${asset.fileName}`
    }));
}
