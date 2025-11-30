export type JourneyCity = {
    id: string;
    order: number;
    name: string;
    subtitle?: string;
    lng: number;
    lat: number;
    screenX: number; // 0..1 overlay positie voor bubble
    screenY: number; // 0..1 overlay positie voor bubble

    // Extended data for Map-First Experience
    summary: string;
    details: string;
    // images: string[]; // REMOVED: Managed via getAssetsForCity(id)
    hologramSrc?: string; // video/pseudo-3D asset path
};

export const JOURNEY_CITIES: JourneyCity[] = [
    {
        id: "shanghai",
        order: 1,
        name: "Shanghai",
        subtitle: "The Modern Pulse",
        lng: 121.4737,
        lat: 31.2304,
        screenX: 0.72,
        screenY: 0.54,
        summary: "A futuristic metropolis where history meets tomorrow.",
        details: "Shanghai is a dazzling blend of East and West, old and new. From the historic Bund with its colonial architecture to the towering skyscrapers of Lujiazui, the city pulses with energy. Explore the Yu Garden for a taste of tradition or dive into the vibrant nightlife.",
        hologramSrc: "/videos/hologram-shanghai.mp4", // Placeholder path
    },
    {
        id: "wuhan",
        order: 2,
        name: "Wuhan",
        subtitle: "River City",
        lng: 114.3055,
        lat: 30.5928,
        screenX: 0.63,
        screenY: 0.58,
        summary: "The historic thoroughfare of nine provinces.",
        details: "Wuhan, divided by the Yangtze and Han rivers, is a city of bridges and lakes. Famous for its Yellow Crane Tower and the springtime cherry blossoms at East Lake, it offers a deep dive into central Chinese culture and history.",
    },
    {
        id: "zhangjiajie",
        order: 3,
        name: "Zhangjiajie",
        subtitle: "Karst Peaks",
        lng: 110.4792,
        lat: 29.117,
        screenX: 0.56,
        screenY: 0.60,
        summary: "Surreal sandstone pillars rising from the mist.",
        details: "Zhangjiajie National Forest Park is a UNESCO World Heritage site known for its quartz-sandstone pillars. The landscape, which inspired the floating mountains of Avatar, offers a breathtaking views from the Glass Bridge and Tianmen Mountain.",
    },
    {
        id: "chongqing",
        order: 4,
        name: "Chongqing",
        subtitle: "Mountain Metropolis",
        lng: 106.5516,
        lat: 29.563,
        screenX: 0.50,
        screenY: 0.63,
        summary: "A vertical city of spice, fog, and neon lights.",
        details: "Built on steep hills overlooking the confluence of the Yangtze and Jialing rivers, Chongqing is a cyberpunk-esque city famous for its hot pot, the Liziba monorail passing through a building, and the stunning Hongya Cave complex.",
    },
    {
        id: "chengdu",
        order: 5,
        name: "Chengdu",
        subtitle: "Pandas & Pepper",
        lng: 104.0665,
        lat: 30.5728,
        screenX: 0.45,
        screenY: 0.60,
        summary: "The laid-back home of giant pandas and spicy cuisine.",
        details: "Chengdu is known for its relaxed lifestyle, teahouse culture, and of course, the Giant Panda Breeding Research Base. It's also a UNESCO City of Gastronomy, famous for its fiery Sichuan cuisine.",
    },
    {
        id: "dali",
        order: 6,
        name: "Dali",
        subtitle: "Three Pagodas",
        lng: 100.1468,
        lat: 25.693,
        screenX: 0.37,
        screenY: 0.68,
        summary: "A serene lakeside retreat with rich Bai culture.",
        details: "Nestled between the Cangshan Mountains and Erhai Lake, Dali is a haven for backpackers and history lovers. The ancient town, with its traditional Bai architecture and the iconic Three Pagodas, offers a peaceful escape.",
    },
    {
        id: "lijiang",
        order: 7,
        name: "Lijiang",
        subtitle: "Old Town",
        lng: 100.233,
        lat: 26.8721,
        screenX: 0.38,
        screenY: 0.60,
        summary: "A cobblestone maze under the Jade Dragon Snow Mountain.",
        details: "Lijiang Old Town is a UNESCO World Heritage site famous for its orderly system of waterways and bridges. The Naxi culture, with its unique Dongba pictographs, adds a layer of mystery to this beautiful mountain town.",
    },
    {
        id: "beijing",
        order: 8,
        name: "Beijing",
        subtitle: "Imperial Capital",
        lng: 116.4074,
        lat: 39.9042,
        screenX: 0.62,
        screenY: 0.32,
        summary: "The heart of China, where emperors ruled for centuries.",
        details: "Beijing is the political and cultural center of China. From the immense Forbidden City and the winding Great Wall to the narrow hutongs, it's a city that commands respect and awe at every turn.",
    },
];
