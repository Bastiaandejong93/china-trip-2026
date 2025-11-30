/**
 * Comprehensive Data Schema for China 8-City Grand Tour
 * This schema structures all geographical, cultural, and travel data
 * for the cinematic scrollytelling website experience
 */

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'svg' | 'watercolor';
  url: string;
  alt: string;
  caption?: string;
  metadata?: {
    width?: number;
    height?: number;
    size?: string;
    artist?: string;
    style?: string;
  };
}

export interface Coordinates {
  lat: number;
  lon: number;
  precision?: number;
}

export interface StoryBeat {
  id: string;
  section: string;
  title: string;
  description: string;
  trigger: 'scroll_start' | 'scroll_progress' | 'click' | 'hover';
  triggerValue?: string | number;
  animation: {
    type: 'fadeIn' | 'slideUp' | 'inkSpread' | 'brushStroke' | 'parallax';
    duration: number;
    delay?: number;
    easing?: string;
  };
  content: {
    title?: string;
    subtitle?: string;
    showMap?: boolean;
    showRoute?: boolean;
    showTerrain?: boolean;
    showHeatmap?: boolean;
    showInfographics?: boolean;
  };
}

export interface InfographicDatum {
  id: string;
  type: 'stat' | 'chart' | 'comparison' | 'timeline' | 'factoid';
  title: string;
  value?: string | number;
  unit?: string;
  description?: string;
  data?: any;
  visualStyle: 'watercolor' | 'ink' | 'lantern' | 'seal';
}

// ============================================================================
// GEOGRAPHY INTERFACES
// ============================================================================

export interface PhysicalRegion {
  id: string;
  name: string;
  chineseName?: string;
  type: 'plain' | 'basin' | 'mountain' | 'plateau' | 'coastal';
  description: string;
  features: string[];
  climate: string;
  elevation: {
    min: number;
    max: number;
    average: number;
  };
  area: string;
  coordinates: {
    center: Coordinates;
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  culturalSignificance: string;
  naturalResources: string[];
  majorCities: string[];
}

export interface PoliticalRegion {
  id: string;
  name: string;
  chineseName?: string;
  type: 'province' | 'municipality' | 'autonomous_region' | 'sar';
  capital: string;
  population: string;
  area: string;
  gdp?: string;
  coordinates: {
    center: Coordinates;
  };
  administrativeLevel: number;
  specialStatus?: string;
  economicZone?: string;
}

export interface EthnicGroup {
  id: string;
  name: string;
  chineseName?: string;
  population: string;
  percentage: string;
  regions: string[];
  culturalHighlights: string[];
  traditionalArts: string[];
  festivals: string[];
  cuisine: string[];
  languages?: string[];
  religions?: string[];
  clothing?: string;
  architecture?: string;
}

// ============================================================================
// TRAVEL INTERFACES
// ============================================================================

export interface TripLocation {
  id: string;
  name: string;
  chineseName: string;
  description?: string;
  coordinates: Coordinates;
  region: string;
  type: 'municipality' | 'province_capital' | 'tourist_city' | 'cultural_site';
  elevation: string;
  population: string;
  timezone: string;
  bestVisitTime: string;
  vibe: string;
  culturalVibe: string;
  transportHub: boolean;
  unescoSite?: boolean;
  significance: string;
  iconHighlights: string[];
  experiences: Experience[];
  landmarks: Landmark[];
  foodSpecialties: FoodHighlight[];
  practicalInfo: {
    currency: string;
    language: string;
    emergencyNumber: string;
    visaRequired: boolean;
    climate: string;
    packingTips: string[];
  };
  media: MediaAsset[];
  storytellingAngle: string;
  emotionalTone: string;
  narrativeRole: 'beginning' | 'middle' | 'climax' | 'ending';
}

export interface Experience {
  id: string;
  title: string;
  chineseTitle?: string;
  description: string;
  type: 'food' | 'culture' | 'nature' | 'architecture' | 'activity' | 'shopping' | 'spiritual';
  duration?: string;
  bestTimeOfDay?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  costLevel?: 'budget' | 'moderate' | 'luxury';
  culturalContext: string;
  historicalSignificance?: string;
  practicalTips: string[];
  media: MediaAsset[];
  bookingRequired?: boolean;
  seasonalAvailability?: string[];
  emotionalImpact: string;
}

export interface Landmark {
  id: string;
  name: string;
  chineseName?: string;
  type: 'natural' | 'architectural' | 'cultural' | 'modern' | 'religious';
  coordinates: Coordinates;
  description: string;
  historicalContext?: string;
  architecturalStyle?: string;
  culturalSignificance: string;
  visitingHours?: string;
  entranceFee?: string;
  bestViewingTime?: string;
  photographyTips?: string[];
  nearbyExperiences: string[];
  media: MediaAsset[];
  storytellingAngle: string;
}

export interface FoodHighlight {
  id: string;
  name: string;
  chineseName?: string;
  type: 'street_food' | 'regional_cuisine' | 'imperial_dish' | 'specialty_snack' | 'beverage';
  description: string;
  ingredients: string[];
  flavorProfile: string[];
  culturalContext: string;
  historicalOrigin?: string;
  bestPlacesToTry: string[];
  priceRange: 'budget' | 'moderate' | 'upscale';
  dietaryRestrictions?: string[];
  seasonalAvailability?: string[];
  eatingEtiquette?: string[];
  media: MediaAsset[];
  mustTry: boolean;
  emotionalConnection: string;
}

export interface RouteSegment {
  id: string;
  from: string; // location id
  to: string; // location id
  type: 'flight' | 'train' | 'car' | 'bus' | 'boat' | 'walking';
  duration: string;
  distance: string;
  cost?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  scenery: string;
  culturalTransition: string;
  practicalTips: string[];
  coordinates: {
    start: Coordinates;
    end: Coordinates;
    waypoints?: Coordinates[];
  };
  transportIcon: string;
  storytellingTransition: string;
}

export interface RouteGraph {
  id: string;
  name: string;
  description: string;
  totalDistance: string;
  totalDuration: string;
  totalCost?: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestSeason: string;
  segments: RouteSegment[];
  overview: {
    cities: number;
    municipalities: number;
    provinces: number;
    culturalZones: number;
    unescoSites: number;
  };
  media: MediaAsset[];
  narrative: {
    theme: string;
    opening: string;
    development: string;
    climax: string;
    resolution: string;
  };
}

// ============================================================================
// CULTURAL & STORYTELLING INTERFACES
// ============================================================================

export interface CulturalMotif {
  id: string;
  name: string;
  chineseName?: string;
  description: string;
  visualElements: string[];
  colorPalette: string[];
  symbolism: string[];
  historicalContext: string;
  modernInterpretation: string;
  applicationInWebsite: string[];
}

export interface StoryPattern {
  id: string;
  name: string;
  type: 'hero_journey' | 'cultural_discovery' | 'geographic_wonder' | 'temporal_flow' | 'emotional_arc';
  description: string;
  structure: {
    opening: string;
    incitingIncident: string;
    risingAction: string;
    climax: string;
    fallingAction: string;
    resolution: string;
  };
  emotionalTone: string;
  pacing: 'slow' | 'moderate' | 'fast' | 'variable';
  visualStyle: 'watercolor' | 'ink_brush' | 'lantern_glow' | 'seal_stamp';
  applications: string[];
}

// ============================================================================
// MAIN SCHEMA
// ============================================================================

export interface ChinaTripSchema {
  meta: {
    id: string;
    title: string;
    subtitle: string;
    tagline: string;
    createdAt: string;
    lastUpdated: string;
    version: string;
    author: string;
    description: string;
    keywords: string[];
  };

  countryOverview: {
    basicInfo: {
      officialName: string;
      commonName: string;
      capital: string;
      population: string;
      area: string;
      currency: string;
      language: string;
      timeZone: string;
    };

    physical: {
      overview: string;
      regions: PhysicalRegion[];
      majorRivers: string[];
      mountainRanges: string[];
      climate: {
        zones: string[];
        monsoon: string;
        temperature: string;
      };
    };

    political: {
      overview: string;
      administrativeDivisions: PoliticalRegion[];
      specialZones: string[];
      economicRegions: string[];
    };

    demographics: {
      overview: string;
      totalPopulation: string;
      populationDensity: string;
      urbanPopulation: string;
      ethnicGroups: EthnicGroup[];
      ageDistribution?: any;
      educationLevel?: any;
    };

    culture: {
      overview: string;
      culturalMotifs: CulturalMotif[];
      traditions: string[];
      festivals: string[];
      arts: string[];
      philosophy: string[];
      modernCulture: string[];
    };
  };

  locations: TripLocation[];

  route: RouteGraph;

  storyPatterns: StoryPattern[];

  storyBeats: StoryBeat[];

  infographicData: InfographicDatum[];

  media: {
    globalAssets: MediaAsset[];
    byLocationId: Record<string, MediaAsset[]>;
    byTheme: Record<string, MediaAsset[]>;
    audioAssets?: MediaAsset[];
    videoAssets?: MediaAsset[];
  };

  interactive: {
    mapConfig: {
      style: 'watercolor' | 'satellite' | 'terrain' | 'hybrid';
      show3D: boolean;
      showLabels: boolean;
      showRoutes: boolean;
      showTerrain: boolean;
      customOverlays: string[];
    };

    animations: {
      scrollTriggered: boolean;
      autoProgress: boolean;
      userControlled: boolean;
      transitionTypes: string[];
    };

    ui: {
      language: 'en' | 'zh' | 'bilingual';
      accessibilityMode: boolean;
      colorMode: 'warm_cultural' | 'dark' | 'light';
      soundEnabled: boolean;
    };
  };
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type LocationId = string;
export type RegionId = string;
export type CulturalThemeId = string;
export type StorySectionId = string;

export interface ContentFilters {
  region?: string[];
  experienceType?: string[];
  difficulty?: string[];
  season?: string[];
  budget?: string[];
  culturalTheme?: string[];
}

export interface SearchOptions {
  query?: string;
  filters?: ContentFilters;
  sortBy?: 'relevance' | 'name' | 'region' | 'difficulty';
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// INITIALIZATION HELPERS
// ============================================================================

export const createChinaTripSchema = (overrides?: Partial<ChinaTripSchema>): ChinaTripSchema => {
  const defaultSchema: ChinaTripSchema = {
    meta: {
      id: 'china-grand-tour-2026',
      title: 'China Explained',
      subtitle: 'A Cinematic Journey Through the Middle Kingdom',
      tagline: '8 Cities, 4,823km, 1 Cultural Awakening',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      version: '2.0.0',
      author: 'China Explained Team',
      description: 'A comprehensive cinematic scrollytelling experience exploring China\'s diverse geography, rich culture, and incredible destinations through an 8-city grand tour.',
      keywords: ['China', 'Travel', 'Geography', 'Culture', 'Shanghai', 'Beijing', 'Chengdu', 'Cinematic', 'Scrollytelling']
    },

    countryOverview: {
      basicInfo: {
        officialName: 'People\'s Republic of China',
        commonName: 'China',
        capital: 'Beijing',
        population: '1.412 billion',
        area: '9.6 million km²',
        currency: 'Renminbi (CNY)',
        language: 'Mandarin Chinese',
        timeZone: 'UTC+8 (China Standard Time)'
      },

      physical: {
        overview: 'China\'s diverse landscape encompasses some of the world\'s most dramatic geography, from tropical coastlines to the highest plateau on Earth.',
        regions: [],
        majorRivers: ['Yangtze River', 'Yellow River', 'Pearl River', 'Amur River'],
        mountainRanges: ['Himalayas', 'Tian Shan', 'Kunlun Mountains', 'Qinling Mountains'],
        climate: {
          zones: ['Tropical', 'Subtropical', 'Temperate', 'Continental', 'Highland'],
          monsoon: 'Asian Monsoon system with summer rainfall and winter dry periods',
          temperature: 'Extreme range from -40°C in winter to +45°C in summer'
        }
      },

      political: {
        overview: 'China\'s administrative structure includes 23 provinces, 5 autonomous regions, 4 municipalities, and 2 Special Administrative Regions.',
        administrativeDivisions: [],
        specialZones: ['Special Economic Zones', 'Free Trade Zones', 'High-Tech Development Zones'],
        economicRegions: ['Eastern Coastal', 'Central China', 'Western China', 'Northeast China']
      },

      demographics: {
        overview: 'With over 1.4 billion people, China is the world\'s most populous country with incredible ethnic diversity concentrated in specific regions.',
        totalPopulation: '1.412 billion',
        populationDensity: '153 people per km²',
        urbanPopulation: '64.7%',
        ethnicGroups: []
      },

      culture: {
        overview: 'Chinese culture spans 5,000 years of continuous history, encompassing diverse philosophies, arts, traditions, and modern innovations.',
        culturalMotifs: [],
        traditions: ['Confucianism', 'Taoism', 'Buddhism', 'Folk Traditions', 'Festivals'],
        festivals: ['Spring Festival', 'Mid-Autumn Festival', 'Dragon Boat Festival', 'Qingming Festival'],
        arts: ['Calligraphy', 'Painting', 'Opera', 'Sculpture', 'Literature'],
        philosophy: ['Confucianism', 'Taoism', 'Legalism', 'Buddhism'],
        modernCulture: ['Contemporary Art', 'Pop Culture', 'Technology', 'Urban Life']
      }
    },

    locations: [],

    route: {
      id: 'grand-tour-2026',
      name: 'China Grand Tour 2026',
      description: 'A comprehensive journey through China\'s most iconic destinations, from modern megacities to ancient cultural sites.',
      totalDistance: '4,823km',
      totalDuration: '2 weeks',
      difficulty: 'moderate',
      bestSeason: 'April-May or September-October',
      segments: [],
      overview: {
        cities: 8,
        municipalities: 3,
        provinces: 4,
        culturalZones: 6,
        unescoSites: 5
      },
      media: [],
      narrative: {
        theme: 'Discovery and Transformation',
        opening: 'Beginning in the modern metropolis of Shanghai',
        development: 'Journey through diverse landscapes and cultures',
        climax: 'Cultural immersion in ancient traditions',
        resolution: 'Understanding China\'s past and future'
      }
    },

    storyPatterns: [],

    storyBeats: [],

    infographicData: [],

    media: {
      globalAssets: [],
      byLocationId: {},
      byTheme: {}
    },

    interactive: {
      mapConfig: {
        style: 'watercolor',
        show3D: true,
        showLabels: true,
        showRoutes: true,
        showTerrain: true,
        customOverlays: ['cultural_heatmap', 'ethnic_distribution', 'historical_routes']
      },

      animations: {
        scrollTriggered: true,
        autoProgress: true,
        userControlled: true,
        transitionTypes: ['ink_spread', 'brush_stroke', 'watercolor_bleed', 'lantern_glow']
      },

      ui: {
        language: 'bilingual',
        accessibilityMode: true,
        colorMode: 'warm_cultural',
        soundEnabled: true
      }
    }
  };

  return { ...defaultSchema, ...overrides };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const getLocationById = (schema: ChinaTripSchema, id: string): TripLocation | undefined => {
  return schema.locations.find(location => location.id === id);
};

export const getLocationsByRegion = (schema: ChinaTripSchema, region: string): TripLocation[] => {
  return schema.locations.filter(location => location.region === region);
};

export const getExperiencesByType = (schema: ChinaTripSchema, type: Experience['type']): Experience[] => {
  return schema.locations.flatMap(location => location.experiences).filter(exp => exp.type === type);
};

export const getEthnicGroupsByRegion = (schema: ChinaTripSchema, region: string): EthnicGroup[] => {
  return schema.countryOverview.demographics.ethnicGroups.filter(group =>
    group.regions.some(r => r.toLowerCase().includes(region.toLowerCase()))
  );
};

export const getStoryBeatsBySection = (schema: ChinaTripSchema, section: string): StoryBeat[] => {
  return schema.storyBeats.filter(beat => beat.section === section);
};

export const searchLocations = (schema: ChinaTripSchema, options: SearchOptions): TripLocation[] => {
  let results = schema.locations;

  if (options.query) {
    const query = options.query.toLowerCase();
    results = results.filter(location =>
      location.name.toLowerCase().includes(query) ||
      location.chineseName.toLowerCase().includes(query) ||
      (location.description || '').toLowerCase().includes(query) ||
      location.vibe.toLowerCase().includes(query)
    );
  }

  if (options.filters?.region) {
    results = results.filter(location =>
      options.filters!.region!.some(region => location.region === region)
    );
  }

  if (options.filters?.experienceType) {
    results = results.filter(location =>
      location.experiences.some(exp =>
        options.filters!.experienceType!.includes(exp.type)
      )
    );
  }

  return results;
};

// ============================================================================
// EXPORT DEFAULT SCHEMA
// ============================================================================

export const chinaTripSchema = createChinaTripSchema();