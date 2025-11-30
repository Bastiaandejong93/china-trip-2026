/**
 * Story Icons for China Explained
 * 
 * Type-safe icon metadata for cities, transport, activities, and UI elements.
 * Icons are stored as SVG files in /public/stories/china/icons/
 */

export type StoryIconId =
    | "city_shanghai"
    | "city_wuhan"
    | "city_zhangjiajie"
    | "city_chongqing"
    | "city_chengdu"
    | "city_dali"
    | "city_lijiang"
    | "city_beijing"
    | "transport_highspeed_train"
    | "transport_plane"
    | "activity_night_market"
    | "activity_mountain_hike"
    | "activity_temple_visit"
    | "ui_calendar_day"
    | "ui_hotel_bed"
    | "ui_camera";

export interface StoryIconMeta {
    id: StoryIconId;
    name: string;
    usage: string;
    /**
     * Public URL path to the SVG file in /public.
     * Example: /stories/china/icons/city_shanghai.svg
     */
    path: string;
}

/**
 * Default icon metadata mapping.
 * Make sure the files exist in:
 * /public/stories/china/icons/<id>.svg
 */
export const storyIcons: Record<StoryIconId, StoryIconMeta> = {
    city_shanghai: {
        id: "city_shanghai",
        name: "Shanghai skyline",
        usage: "Chapter icon and map legend for Shanghai.",
        path: "/stories/china/icons/city_shanghai.svg",
    },
    city_wuhan: {
        id: "city_wuhan",
        name: "Wuhan pagoda and river",
        usage: "Chapter icon and map legend for Wuhan.",
        path: "/stories/china/icons/city_wuhan.svg",
    },
    city_zhangjiajie: {
        id: "city_zhangjiajie",
        name: "Zhangjiajie sandstone pillars",
        usage: "Icon for Zhangjiajie mountain/nature chapters.",
        path: "/stories/china/icons/city_zhangjiajie.svg",
    },
    city_chongqing: {
        id: "city_chongqing",
        name: "Chongqing mountains and bridges",
        usage: "Icon for Chongqing's \"vertical city\" sections.",
        path: "/stories/china/icons/city_chongqing.svg",
    },
    city_chengdu: {
        id: "city_chengdu",
        name: "Chengdu panda and bamboo",
        usage: "Icon for Chengdu and panda-related content.",
        path: "/stories/china/icons/city_chengdu.svg",
    },
    city_dali: {
        id: "city_dali",
        name: "Dali three pagodas",
        usage: "Icon for Dali and the three pagodas.",
        path: "/stories/china/icons/city_dali.svg",
    },
    city_lijiang: {
        id: "city_lijiang",
        name: "Lijiang old town",
        usage: "Icon for Lijiang old town chapters.",
        path: "/stories/china/icons/city_lijiang.svg",
    },
    city_beijing: {
        id: "city_beijing",
        name: "Beijing Forbidden City gate",
        usage: "Icon for Beijing sections and finale.",
        path: "/stories/china/icons/city_beijing.svg",
    },
    transport_highspeed_train: {
        id: "transport_highspeed_train",
        name: "High-speed train",
        usage: "Use for high-speed rail itinerary segments.",
        path: "/stories/china/icons/transport_highspeed_train.svg",
    },
    transport_plane: {
        id: "transport_plane",
        name: "Airplane",
        usage: "Use for domestic flight segments in the itinerary.",
        path: "/stories/china/icons/transport_plane.svg",
    },
    activity_night_market: {
        id: "activity_night_market",
        name: "Night market & street food",
        usage: "Highlights night markets and food streets.",
        path: "/stories/china/icons/activity_night_market.svg",
    },
    activity_mountain_hike: {
        id: "activity_mountain_hike",
        name: "Mountain hike",
        usage: "Use for mountain/trekking experiences.",
        path: "/stories/china/icons/activity_mountain_hike.svg",
    },
    activity_temple_visit: {
        id: "activity_temple_visit",
        name: "Temple visit",
        usage: "Use for temple and heritage experiences.",
        path: "/stories/china/icons/activity_temple_visit.svg",
    },
    ui_calendar_day: {
        id: "ui_calendar_day",
        name: "Calendar day",
        usage: "UI badge for day markers in the timeline.",
        path: "/stories/china/icons/ui_calendar_day.svg",
    },
    ui_hotel_bed: {
        id: "ui_hotel_bed",
        name: "Hotel / accommodation",
        usage: "Use next to hotel / overnight stops.",
        path: "/stories/china/icons/ui_hotel_bed.svg",
    },
    ui_camera: {
        id: "ui_camera",
        name: "Camera / highlight",
        usage: "Use for photo hotspots and key moments.",
        path: "/stories/china/icons/ui_camera.svg",
    },
};
