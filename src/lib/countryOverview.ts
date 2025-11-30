export interface PhysicalGeography {
  region: string
  description: string
  features: string[]
  climate: string
  elevation: string
  coordinates?: {
    bounds: {
      north: number
      south: number
      east: number
      west: number
    }
  }
}

export interface PoliticalGeography {
  name: string
  type: 'province' | 'municipality' | 'autonomous_region' | 'sar'
  capital: string
  population: string
  area: string
  coordinates: {
    center: { lat: number; lon: number }
  }
}

export interface DemographicData {
  ethnicGroup: string
  population: string
  percentage: string
  regions: string[]
  culturalHighlights: string[]
}

export interface CulturalHighlight {
  name: string
  description: string
  region: string
  type: 'food' | 'festival' | 'tradition' | 'art' | 'architecture'
  significance: string
}

export const countryOverview = {
  physical: {
    overview: "China's diverse landscape encompasses some of the world's most dramatic geography, from tropical coastlines to the highest plateau on Earth.",
    regions: [
      {
        region: "East China Plain",
        description: "Fertile alluvial plain supporting intensive agriculture and massive urbanization",
        features: ["Yangtze River Delta", "Yellow River Basin", "Taihu Lake"],
        climate: "Humid subtropical with monsoon seasons",
        elevation: "0-200m",
        coordinates: {
          bounds: {
            north: 34.5,
            south: 28.0,
            east: 123.0,
            west: 118.0
          }
        }
      },
      {
        region: "Yangtze River Basin",
        description: "Asia's longest river flowing through diverse landscapes from mountains to sea",
        features: ["Three Gorges", "Dongting Lake", "Poyang Lake"],
        climate: "Varies from alpine to subtropical",
        elevation: "0-5000m",
        coordinates: {
          bounds: {
            north: 33.0,
            south: 24.5,
            east: 121.0,
            west: 90.5
          }
        }
      },
      {
        region: "Karst Mountains (Zhangjiajie)",
        description: "Spectacular limestone formations creating otherworldly landscapes",
        features: ["Sandstone Pillars", "Natural Bridges", "Deep Valleys"],
        climate: "Humid subtropical with high rainfall",
        elevation: "500-1500m",
        coordinates: {
          bounds: {
            north: 30.0,
            south: 28.5,
            east: 111.5,
            west: 109.5
          }
        }
      },
      {
        region: "Sichuan Basin",
        description: "Fertile basin surrounded by mountains, known as the 'Red Basin'",
        features: ["Chengdu Plain", "Minjiang River", "Qionglai Mountains"],
        climate: "Humid subtropical with frequent fog",
        elevation: "300-700m",
        coordinates: {
          bounds: {
            north: 33.0,
            south: 28.0,
            east: 109.0,
            west: 102.5
          }
        }
      },
      {
        region: "Yunnan-Guizhou Plateau",
        description: "Mountainous region with incredible biodiversity and ethnic diversity",
        features: ["Jade Dragon Snow Mountain", "Erhai Lake", "Three Parallel Rivers"],
        climate: "Subtropical highland with vertical climate zones",
        elevation: "1500-4000m",
        coordinates: {
          bounds: {
            north: 29.0,
            south: 21.0,
            east: 106.0,
            west: 97.0
          }
        }
      },
      {
        region: "North China Plain",
        description: "Historic heartland of Chinese civilization around the Yellow River",
        features: ["Yellow River", "Taihang Mountains", "Bohai Sea"],
        climate: "Continental monsoon with four distinct seasons",
        elevation: "0-200m",
        coordinates: {
          bounds: {
            north: 41.0,
            south: 32.0,
            east: 122.0,
            west: 112.0
          }
        }
      }
    ] as PhysicalGeography[]
  },

  political: {
    overview: "China's administrative structure includes 23 provinces, 5 autonomous regions, 4 municipalities, and 2 Special Administrative Regions.",
    administrativeDivisions: [
      {
        name: "Shanghai",
        type: "municipality" as const,
        capital: "Shanghai",
        population: "24.87 million",
        area: "6,341 km²",
        coordinates: {
          center: { lat: 31.23, lon: 121.47 }
        }
      },
      {
        name: "Beijing",
        type: "municipality" as const,
        capital: "Beijing",
        population: "21.89 million",
        area: "16,411 km²",
        coordinates: {
          center: { lat: 39.90, lon: 116.41 }
        }
      },
      {
        name: "Chongqing",
        type: "municipality" as const,
        capital: "Chongqing",
        population: "32.05 million",
        area: "82,403 km²",
        coordinates: {
          center: { lat: 29.56, lon: 106.55 }
        }
      },
      {
        name: "Hubei",
        type: "province" as const,
        capital: "Wuhan",
        population: "58.30 million",
        area: "185,900 km²",
        coordinates: {
          center: { lat: 30.59, lon: 114.27 }
        }
      },
      {
        name: "Hunan",
        type: "province" as const,
        capital: "Changsha",
        population: "66.44 million",
        area: "211,800 km²",
        coordinates: {
          center: { lat: 28.19, lon: 112.98 }
        }
      },
      {
        name: "Sichuan",
        type: "province" as const,
        capital: "Chengdu",
        population: "83.75 million",
        area: "486,000 km²",
        coordinates: {
          center: { lat: 30.67, lon: 104.07 }
        }
      },
      {
        name: "Yunnan",
        type: "province" as const,
        capital: "Kunming",
        population: "48.30 million",
        area: "394,100 km²",
        coordinates: {
          center: { lat: 25.04, lon: 102.71 }
        }
      }
    ] as PoliticalGeography[]
  },

  demographic: {
    overview: "With over 1.4 billion people, China is the world's most populous country with incredible ethnic diversity concentrated in specific regions.",
    totalPopulation: "1.412 billion",
    populationDensity: "153 people per km²",
    urbanPopulation: "64.7%",
    ethnicGroups: [
      {
        ethnicGroup: "Han",
        population: "1.3 billion",
        percentage: "91.6%",
        regions: ["All regions, especially East China", "North China Plain", "Yangtze River Basin"],
        culturalHighlights: ["Mandarin language", "Confucian traditions", "Chinese festivals"]
      },
      {
        ethnicGroup: "Tujia",
        population: "8.35 million",
        percentage: "0.63%",
        regions: ["Western Hunan", "Hubei", "Chongqing"],
        culturalHighlights: ["Baishou dance", "Hand-waving dance", "Traditional architecture"]
      },
      {
        ethnicGroup: "Bai",
        population: "1.93 million",
        percentage: "0.15%",
        regions: ["Dali, Yunnan", "Kunming area"],
        culturalHighlights: ["Three-Course Tea ceremony", "Bai architecture", "Butterfly festivals"]
      },
      {
        ethnicGroup: "Naxi",
        population: "0.31 million",
        percentage: "0.02%",
        regions: ["Lijiang, Yunnan", "Himalayan foothills"],
        culturalHighlights: ["Dongba pictographs", "Moso matrilineal society", "Ancient music traditions"]
      },
      {
        ethnicGroup: "Miao",
        population: "9.43 million",
        percentage: "0.71%",
        regions: ["Guizhou", "Hunan", "Yunnan", "Sichuan"],
        culturalHighlights: ["Silver jewelry", "Embroidery", "Lusheng music"]
      },
      {
        ethnicGroup: "Tibetan",
        population: "6.28 million",
        percentage: "0.47%",
        regions: ["Tibet Autonomous Region", "Qinghai", "Sichuan", "Yunnan"],
        culturalHighlights: ["Buddhist monasteries", "Thangka painting", "Butter sculpture"]
      }
    ] as DemographicData[]
  },

  cultural: {
    overview: "China's cultural landscape spans millennia, with each region contributing unique traditions, cuisines, and artistic expressions.",
    highlights: [
      {
        name: "热干面 (Hot Dry Noodles)",
        description: "Wuhan's signature breakfast dish featuring sesame paste, soy sauce, and chili oil",
        region: "Wuhan, Hubei",
        type: "food" as const,
        significance: "Defines Wuhan's culinary identity and morning culture"
      },
      {
        name: "Chongqing Hot Pot",
        description: "Numbingly spicy broth with various ingredients, central to Sichuan dining culture",
        region: "Chongqing",
        type: "food" as const,
        significance: "Social dining experience that brings people together"
      },
      {
        name: "Sichuan Opera (Bian Lian)",
        description: "Traditional Sichuanese opera famous for rapid face-changing mask techniques",
        region: "Chengdu, Sichuan",
        type: "art" as const,
        significance: "Protected cultural treasure showcasing Chinese theatrical mastery"
      },
      {
        name: "Panda Conservation",
        description: "Giant panda breeding and research programs protecting this beloved species",
        region: "Chengdu, Sichuan",
        type: "tradition" as const,
        significance: "Symbol of wildlife conservation and China's natural heritage"
      },
      {
        name: "Jade Dragon Snow Mountain",
        description: "Sacred Naxi mountain peak with 13 distinct snow-covered ridges",
        region: "Lijiang, Yunnan",
        type: "tradition" as const,
        significance: "Holy mountain in Naxi culture and stunning natural landmark"
      },
      {
        name: "Three Pagodas",
        description: "9th-century Buddhist pagodas representing architectural and religious heritage",
        region: "Dali, Yunnan",
        type: "architecture" as const,
        significance: "Survived earthquakes for over 1,000 years, symbolizing resilience"
      },
      {
        name: "Avatar Mountains",
        description: "Zhangjiajie's quartz sandstone pillars that inspired the film Avatar",
        region: "Zhangjiajie, Hunan",
        type: "nature" as const,
        significance: "Global recognition of China's unique natural landscapes"
      },
      {
        name: "The Bund",
        description: "Shanghai's historic waterfront showcasing colonial and modern architecture",
        region: "Shanghai",
        type: "architecture" as const,
        significance: "Symbol of China's transformation from colonial port to global metropolis"
      }
    ] as CulturalHighlight[]
  }
}

export default countryOverview