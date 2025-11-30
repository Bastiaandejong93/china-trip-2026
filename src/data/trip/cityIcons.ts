/**
 * City Icons - SVG icons for each city
 */

export type CityIconId = 
  | "city_shanghai"
  | "city_wuhan"
  | "city_zhangjiajie"
  | "city_chongqing"
  | "city_chengdu"
  | "city_dali"
  | "city_lijiang"
  | "city_beijing";

export interface CityIcon {
  id: CityIconId;
  name: string;
  usage: string;
  svg: string;
}

export const CITY_ICONS: Record<string, CityIcon> = {
  shanghai: {
    id: "city_shanghai",
    name: "Shanghai Skyline",
    usage: "Icon for Shanghai Skyline (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Ground line -->
  <line x1="2" y1="22" x2="22" y2="22"/>

  <!-- Oriental Pearl Tower -->
  <!-- Base -->
  <path d="M 7 22 L 8 19 L 12 19 L 13 22 Z"/>
  <!-- Lower connecting shaft -->
  <rect x="9" y="17" width="2" height="2"/>
  <!-- Lower sphere -->
  <circle cx="10" cy="15" r="2.5"/>
  <!-- Middle connecting shaft -->
  <rect x="9.5" y="10" width="1" height="2.5"/>
  <!-- Upper sphere -->
  <circle cx="10" cy="8.5" r="1.5"/>
  <!-- Spire -->
  <line x1="10" y1="7" x2="10" y2="3"/>

  <!-- Modern Skyscraper -->
  <rect x="15" y="4" width="5" height="18"/>
  <!-- Windows -->
  <rect x="16.5" y="6" width="2" height="2"/>
  <rect x="16.5" y="9" width="2" height="2"/>
  <rect x="16.5" y="12" width="2" height="2"/>
  <rect x="16.5" y="15" width="2" height="2"/>
  <rect x="16.5" y="18" width="2" height="2"/>
</svg>`
  },
  wuhan: {
    id: "city_wuhan",
    name: "Wuhan Yellow Crane Tower",
    usage: "Icon for Wuhan Yellow Crane Tower (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Base -->
  <path d="M2 22 L22 22 L22 20 L2 20 Z"/>
  <path d="M2 20 L4 18 L20 18 L22 20"/>
  <path d="M4 18 L4 16 L20 16 L20 18"/>

  <!-- Main Tower Body -->
  <path d="M8 16 L8 10 M16 16 L16 10"/>
  <path d="M8 10 L16 10"/>
  <path d="M8 16 L16 16"/>
  <path d="M8 10 L9 9 L15 9 L16 10"/>
  <path d="M9 9 L9 15 L15 15 L15 9"/>
  <path d="M9 15 L8 16 M15 15 L16 16"/>

  <!-- First Tier Roof (largest) -->
  <path d="M1 10 L3 8 L11 3 L13 3 L21 8 L23 10 L21 11 L13 4 L11 4 L3 11 Z"/>
  <path d="M3 11 L3 12 L21 12 L21 11"/>
  <path d="M1 10 L2 11 L2 12"/>
  <path d="M23 10 L22 11 L22 12"/>
  <path d="M11 4 L11 5 M13 4 L13 5"/>
  <path d="M3 11 L4 10.5 M21 11 L20 10.5"/>

  <!-- Second Tier Roof -->
  <path d="M4 9 L6 7 L11 2 L13 2 L18 7 L20 9 L18 9.5 L13 3.5 L11 3.5 L6 9.5 Z"/>
  <path d="M6 9.5 L6 10 L18 10 L18 9.5"/>
  <path d="M4 9 L5 9.5 L5 10"/>
  <path d="M20 9 L19 9.5 L19 10"/>
  <path d="M11 3.5 L11 4.5 M13 3.5 L13 4.5"/>
  <path d="M6 9.5 L7 9 M18 9.5 L17 9"/>

  <!-- Third Tier Roof (smallest) -->
  <path d="M7 7 L9 5 L11 1 L13 1 L15 5 L17 7 L15 7.5 L13 2.5 L11 2.5 L9 7.5 Z"/>
  <path d="M9 7.5 L9 8 L15 8 L15 7.5"/>
  <path d="M7 7 L8 7.5 L8 8"/>
  <path d="M17 7 L16 7.5 L16 8"/>
  <path d="M11 2.5 L11 3.5 M13 2.5 L13 3.5"/>
  <path d="M9 7.5 L10 7 M15 7.5 L14 7"/>

  <!-- Finial -->
  <path d="M12 1 L12 0.5 M11.5 1.5 L12.5 1.5 L12 0.5 Z"/>
</svg>`
  },
  zhangjiajie: {
    id: "city_zhangjiajie",
    name: "Zhangjiajie Pillars",
    usage: "Icon for Zhangjiajie Pillars (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pillar 1 (Far Left, shorter) -->
    <path d="M 1 22 L 2.5 22 L 3 8 L 1.5 8 Z" />
    <path d="M 1.8 22 L 2.2 8.5" />
    <path d="M 1.3 17 L 1.6 12" />

    <!-- Pillar 2 (Left-Center) -->
    <path d="M 4 22 L 6 22 L 6.5 4 L 4.5 4 Z" />
    <path d="M 5 22 L 5.5 4.5" />
    <path d="M 4.3 18 L 4.6 8" />
    <path d="M 5.8 19 L 6.1 6" />

    <!-- Pillar 3 (Main Center, tallest) -->
    <path d="M 9 22 L 13 22 L 12.5 2 L 9.5 2 Z" />
    <path d="M 11 22 L 11 2" />
    <path d="M 9.8 20 L 10.2 5" />
    <path d="M 12.2 20 L 11.8 5" />
    <path d="M 10.5 15 L 11.5 15" />
    <path d="M 10.3 10 L 11.7 10" />
    <!-- Top cap for 3D effect -->
    <path d="M 9.5 2 L 10 1.5 L 12 1.5 L 12.5 2" />
    <!-- Small horizontal erosion lines -->
    <line x1="10" y1="18" x2="10.5" y2="18" />
    <line x1="11.5" y1="18" x2="12" y2="18" />
    <line x1="10.2" y1="13" x2="10.7" y2="13" />
    <line x1="11.3" y1="13" x2="11.8" y2="13" />

    <!-- Pillar 4 (Right-Center) -->
    <path d="M 16 22 L 18 22 L 18.5 5 L 16.5 5 Z" />
    <path d="M 17 22 L 17.5 5.5" />
    <path d="M 16.3 17 L 16.6 9" />
    <path d="M 17.8 18 L 18.1 7" />

    <!-- Pillar 5 (Far Right) -->
    <path d="M 20 22 L 21.5 22 L 22 9 L 20.5 9 Z" />
    <path d="M 20.8 22 L 21.2 9.5" />
    <path d="M 20.3 18 L 20.6 13" />
</svg>`
  },
  chongqing: {
    id: "city_chongqing",
    name: "Chongqing Skyline",
    usage: "Icon for Chongqing Skyline (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Subtle base suggesting river or embankment -->
  <path d="M 2 19 H 22" />

  <!-- Tall stepped tower, characteristic of Chongqing's modern architecture -->
  <path d="M 6 19 L 6 10 L 7 10 L 7 7 L 8 7 L 8 4 L 9 4 L 10 7 L 11 7 L 11 10 L 12 10 L 12 19" />

  <!-- Shorter blocky tower, complementing the skyline -->
  <path d="M 15 19 L 15 12 L 16.5 10 L 18 12 L 18 19" />
</svg>`
  },
  chengdu: {
    id: "city_chengdu",
    name: "Chengdu Panda",
    usage: "Icon for Chengdu Panda (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Main Head: A large circle forming the panda's face. -->
  <circle cx="12" cy="12" r="9"/>

  <!-- Ears: Two circles positioned above the main head, representing the black ears. -->
  <circle cx="7" cy="5" r="3"/>
  <circle cx="17" cy="5" r="3"/>

  <!-- Eye Patches: Two distinct, rounded path shapes for the iconic black eye patches. -->
  <!-- Left Eye Patch -->
  <path d="M 5.5 10.5 C 4.5 9.5 5.5 8.5 7.5 8.5 C 9.5 8.5 10.5 9.5 9.5 10.5 C 10.5 11.5 9.5 12.5 7.5 12.5 C 5.5 12.5 4.5 11.5 5.5 10.5 Z" stroke-width="1.5"/>
  <!-- Right Eye Patch -->
  <path d="M 14.5 10.5 C 13.5 9.5 14.5 8.5 16.5 8.5 C 18.5 8.5 19.5 9.5 18.5 10.5 C 19.5 11.5 18.5 12.5 16.5 12.5 C 14.5 12.5 13.5 11.5 14.5 10.5 Z" stroke-width="1.5"/>

  <!-- Eyes: Small circles for the pupils, placed within the eye patches. -->
  <circle cx="7.5" cy="10.5" r="1" stroke-width="1.5"/>
  <circle cx="16.5" cy="10.5" r="1" stroke-width="1.5"/>

  <!-- Nose: A small, rounded triangular shape for the panda's nose. -->
  <path d="M 12 14.5 L 10.8 15.8 A 1.5 0.8 0 0 0 13.2 15.8 L 12 14.5 Z" stroke-width="1.5"/>

  <!-- Mouth: A subtle, slightly curved line for the mouth. -->
  <path d="M 11 17 Q 12 17.5 13 17" stroke-width="1.5"/>
</svg>`
  },
  dali: {
    id: "city_dali",
    name: "Dali Three Pagodas",
    usage: "Icon for Dali Three Pagodas (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Central Pagoda (Tallest) -->
    <path d="M 10.5 22 H 13.5 M 10.5 22 V 4 M 13.5 22 V 4 M 9.5 19 L 12 18 L 14.5 19 M 10 17 L 12 16 L 14 17 M 10.25 15 L 12 14 L 13.75 15 M 10.5 13 L 12 12 L 13.5 13 M 10.75 11 L 12 10 L 13.25 11 M 11 9 L 12 8 L 13 9 M 11.25 7 L 12 6 L 12.75 7 M 12 6 V 3"/>
    <circle cx="12" cy="2.5" r="0.5"/>

    <!-- Left Pagoda -->
    <path d="M 4.5 22 H 7.5 M 4.5 22 V 8 M 7.5 22 V 8 M 3.5 19 L 6 18 L 8.5 19 M 4 17 L 6 16 L 8 17 M 4.25 15 L 6 14 L 7.75 15 M 4.5 13 L 6 12 L 7.5 13 M 4.75 11 L 6 10 L 7.25 11 M 6 10 V 7"/>
    <circle cx="6" cy="6.5" r="0.5"/>
    <!-- Right Pagoda -->
    <path d="M 16.5 22 H 19.5 M 16.5 22 V 8 M 19.5 22 V 8 M 15.5 19 L 18 18 L 20.5 19 M 16 17 L 18 16 L 20 17 M 16.25 15 L 18 14 L 19.75 15 M 16.5 13 L 18 12 L 19.5 13 M 16.75 11 L 18 10 L 19.25 11 M 18 10 V 7"/>
    <circle cx="18" cy="6.5" r="0.5"/>
</svg>`
  },
  lijiang: {
    id: "city_lijiang",
    name: "Lijiang Old Town",
    usage: "Icon for Lijiang Old Town (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Left Building -->
  <path d="M 6 4 L 10 4" /> <!-- Roof ridge -->
  <path d="M 6 4 L 4 8" /> <!-- Left slope -->
  <path d="M 10 4 L 12 8" /> <!-- Right slope -->
  <path d="M 4 8 L 3 7" /> <!-- Left eaves flick -->
  <path d="M 12 8 L 13 7" /> <!-- Right eaves flick -->
  <path d="M 4 8 L 4 14" /> <!-- Left wall -->
  <path d="M 12 8 L 12 14" /> <!-- Right wall -->
  <path d="M 4 14 H 12" /> <!-- Base -->

  <!-- Right Building (slightly smaller and lower) -->
  <path d="M 14 6 L 18 6" /> <!-- Roof ridge -->
  <path d="M 14 6 L 12 10" /> <!-- Left slope -->
  <path d="M 18 6 L 20 10" /> <!-- Right slope -->
  <path d="M 12 10 L 11 9" /> <!-- Left eaves flick -->
  <path d="M 20 10 L 21 9" /> <!-- Right eaves flick -->
  <path d="M 12 10 L 12 16" /> <!-- Left wall -->
  <path d="M 20 10 L 20 16" /> <!-- Right wall -->
  <path d="M 12 16 H 20" /> <!-- Base -->

  <!-- Bridge/Arch -->
  <path d="M 6 18 Q 12 16 18 18" />

  <!-- Canal -->
  <line x1="5" y1="20" x2="19" y2="20" />
  <line x1="5" y1="22" x2="19" y2="22" />
</svg>`
  },
  beijing: {
    id: "city_beijing",
    name: "Beijing Pagoda",
    usage: "Icon for Beijing Pagoda (city)",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Bottom Eave -->
  <path d="M 3 19 Q 12 17 21 19"/>
  <!-- Middle Eave -->
  <path d="M 5 16 Q 12 14 19 16"/>
  <!-- Top Eave -->
  <path d="M 7 13 Q 12 11 17 13"/>
  <!-- Left Side Profile connecting eaves -->
  <path d="M 3 19 Q 4 17.5 5 16 Q 6 14.5 7 13"/>
  <!-- Right Side Profile connecting eaves -->
  <path d="M 21 19 Q 20 17.5 19 16 Q 18 14.5 17 13"/>
  <!-- Finial at the very top, with accent color -->
  <circle cx="12" cy="8" r="1.5" fill="#C94C3B" stroke="currentColor" stroke-width="1.5"/>
</svg>`
  }
};

/**
 * Get icon SVG for a city
 */
export function getCityIcon(cityId: string): string | null {
  return CITY_ICONS[cityId]?.svg || null;
}
