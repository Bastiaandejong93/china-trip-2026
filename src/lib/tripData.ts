export interface CityData {
  city: string
  zh: string
  coords: {
    lat: number
    lon: number
  }
  iconHighlights: string[]
  vibe: string
  region: string
  population?: string
  elevation?: string
  experiences: Experience[]
}

export interface Experience {
  title: string
  description: string
  type: 'food' | 'culture' | 'nature' | 'architecture' | 'activity'
  icon?: string
}

export interface RouteSegment {
  from: string
  to: string
  type: 'flight' | 'train' | 'car'
  duration: string
  distance: string
  coords?: {
    start: { lat: number; lon: number }
    end: { lat: number; lon: number }
  }
}

export const tripData = {
  cities: [
    {
      city: "Shanghai",
      zh: "上海",
      coords: { lat: 31.23, lon: 121.47 },
      iconHighlights: ["Skyscrapers", "Bund", "Acrobatics"],
      vibe: "Modern megacity",
      region: "East China",
      population: "24.87 million",
      elevation: "4m",
      experiences: [
        {
          title: "The Bund Skyline",
          description: "Iconic waterfront with colonial architecture and futuristic towers",
          type: "architecture"
        },
        {
          title: "Shanghai Acrobatics Show",
          description: "World-class performance art with death-defying stunts",
          type: "activity"
        },
        {
          title: "Yu Garden & Bazaar",
          description: "Traditional Chinese garden surrounded by bustling market streets",
          type: "culture"
        }
      ]
    },
    {
      city: "Wuhan",
      zh: "武汉",
      coords: { lat: 30.59, lon: 114.27 },
      iconHighlights: ["Yangtze Bridge", "Hot Dry Noodles", "Cherry Blossoms"],
      vibe: "River city hub",
      region: "Central China",
      population: "11.21 million",
      elevation: "37m",
      experiences: [
        {
          title: "热干面 (Hot Dry Noodles)",
          description: "Wuhan's signature breakfast dish - sesame noodles that define the city",
          type: "food"
        },
        {
          title: "Yangtze River Bridge",
          description: "First bridge to span the mighty Yangtze River",
          type: "architecture"
        },
        {
          title: "East Lake Cherry Blossoms",
          description: "Springtime spectacle with thousands of cherry trees",
          type: "nature"
        }
      ]
    },
    {
      city: "Zhangjiajie",
      zh: "张家界",
      coords: { lat: 29.13, lon: 110.48 },
      iconHighlights: ["Avatar Mountains", "Glass Bridge", "Tujia Culture"],
      vibe: "Mystical karst landscape",
      region: "Hunan Province",
      population: "1.7 million",
      elevation: "600m",
      experiences: [
        {
          title: "Avatar Mountains",
          description: "Inspiration for Pandora in James Cameron's Avatar film",
          type: "nature"
        },
        {
          title: "Zhangjiajie Glass Bridge",
          description: "World's longest and highest glass-bottomed bridge",
          type: "activity"
        },
        {
          title: "Tujia Folk Show",
          description: "Traditional ethnic minority performance and customs",
          type: "culture"
        }
      ]
    },
    {
      city: "Chongqing",
      zh: "重庆",
      coords: { lat: 29.56, lon: 106.55 },
      iconHighlights: ["Hot Pot", "Mountain City", "Yangtze Cruise"],
      vibe: "Spicy mountain metropolis",
      region: "Southwest China",
      population: "32.05 million",
      elevation: "400m",
      experiences: [
        {
          title: "Chongqing Hot Pot",
          description: "Numbingly spicy Sichuan-style hot pot in its birthplace",
          type: "food"
        },
        {
          title: "Hongya Cave",
          description: "Traditional stilted buildings on the banks of the Jialing River",
          type: "architecture"
        },
        {
          title: "Yangtze River Cableway",
          description: "Spectacular aerial views crossing the Yangtze River",
          type: "activity"
        }
      ]
    },
    {
      city: "Chengdu",
      zh: "成都",
      coords: { lat: 30.67, lon: 104.07 },
      iconHighlights: ["Pandas", "Sichuan Opera", "Tea Culture"],
      vibe: "Relaxed capital of spice",
      region: "Sichuan Province",
      population: "20.94 million",
      elevation: "500m",
      experiences: [
        {
          title: "Giant Panda Conservation",
          description: "Get up close with China's beloved national treasure",
          type: "nature"
        },
        {
          title: "Sichuan Opera (Bian Lian)",
          description: "Traditional face-changing opera with incredible mask transformations",
          type: "culture"
        },
        {
          title: "Jinli Ancient Street",
          description: "Historic lane with traditional snacks, crafts, and tea houses",
          type: "culture"
        }
      ]
    },
    {
      city: "Dali",
      zh: "大理",
      coords: { lat: 25.60, lon: 100.19 },
      iconHighlights: ["Erhai Lake", "Bai Culture", "Three Pagodas"],
      vibe: "Ancient lakeside town",
      region: "Yunnan Province",
      population: "650,000",
      elevation: "2000m",
      experiences: [
        {
          title: "Erhai Lake Cycling",
          description: "Scenic bike ride around the stunning alpine lake",
          type: "activity"
        },
        {
          title: "Bai Minority Village",
          description: "Experience traditional Bai architecture and customs",
          type: "culture"
        },
        {
          title: "Three Pagodas",
          description: "Iconic 9th-century Buddhist pagodas against Cangshan Mountains",
          type: "architecture"
        }
      ]
    },
    {
      city: "Lijiang",
      zh: "丽江",
      coords: { lat: 26.88, lon: 100.23 },
      iconHighlights: ["Old Town", "Jade Dragon Snow Mountain", "Naxi Culture"],
      vibe: "UNESCO heritage town",
      region: "Yunnan Province",
      population: "1.25 million",
      elevation: "2400m",
      experiences: [
        {
          title: "Jade Dragon Snow Mountain",
          description: "Majestic glacier peak with cable car to 4506m",
          type: "nature"
        },
        {
          title: "Lijiang Old Town",
          description: "UNESCO World Heritage site with Naxi architecture and canals",
          type: "culture"
        },
        {
          title: "Naxi Dongba Culture",
          description: "Ancient pictographic writing system and shamanistic traditions",
          type: "culture"
        }
      ]
    },
    {
      city: "Beijing",
      zh: "北京",
      coords: { lat: 39.90, lon: 116.41 },
      iconHighlights: ["Great Wall", "Forbidden City", "Peking Duck"],
      vibe: "Imperial capital",
      region: "North China",
      population: "21.89 million",
      elevation: "43m",
      experiences: [
        {
          title: "Great Wall at Mutianyu",
          description: "Less crowded, beautifully restored section with stunning views",
          type: "architecture"
        },
        {
          title: "Forbidden City",
          description: "Imperial palace complex with 9,999 rooms of Chinese history",
          type: "culture"
        },
        {
          title: "Peking Duck Dinner",
          description: "Traditional imperial cuisine with ceremonial preparation",
          type: "food"
        }
      ]
    }
  ] as CityData[],

  routeSegments: [
    {
      from: "Shanghai",
      to: "Wuhan",
      type: "train",
      duration: "4 hours",
      distance: "839km",
      coords: {
        start: { lat: 31.23, lon: 121.47 },
        end: { lat: 30.59, lon: 114.27 }
      }
    },
    {
      from: "Wuhan",
      to: "Zhangjiajie",
      type: "train",
      duration: "2.5 hours",
      distance: "352km",
      coords: {
        start: { lat: 30.59, lon: 114.27 },
        end: { lat: 29.13, lon: 110.48 }
      }
    },
    {
      from: "Zhangjiajie",
      to: "Chongqing",
      type: "train",
      duration: "3 hours",
      distance: "420km",
      coords: {
        start: { lat: 29.13, lon: 110.48 },
        end: { lat: 29.56, lon: 106.55 }
      }
    },
    {
      from: "Chongqing",
      to: "Chengdu",
      type: "train",
      duration: "1.5 hours",
      distance: "302km",
      coords: {
        start: { lat: 29.56, lon: 106.55 },
        end: { lat: 30.67, lon: 104.07 }
      }
    },
    {
      from: "Chengdu",
      to: "Dali",
      type: "flight",
      duration: "1 hour",
      distance: "640km",
      coords: {
        start: { lat: 30.67, lon: 104.07 },
        end: { lat: 25.60, lon: 100.19 }
      }
    },
    {
      from: "Dali",
      to: "Lijiang",
      type: "car",
      duration: "2.5 hours",
      distance: "170km",
      coords: {
        start: { lat: 25.60, lon: 100.19 },
        end: { lat: 26.88, lon: 100.23 }
      }
    },
    {
      from: "Lijiang",
      to: "Beijing",
      type: "flight",
      duration: "3 hours",
      distance: "2100km",
      coords: {
        start: { lat: 26.88, lon: 100.23 },
        end: { lat: 39.90, lon: 116.41 }
      }
    }
  ] as RouteSegment[],

  totalDistance: "4,823km",
  totalDuration: "2 weeks",
  bestSeason: "April-May or September-October"
}

export default tripData