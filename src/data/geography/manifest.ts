// src/data/geography/manifest.ts
export type GeographySectionId =
    | "physical"
    | "political"
    | "demographics"

export interface GeographySection {
    id: GeographySectionId
    slug: string
    route: string
    title: string
    subtitle: string
}

export const GEOGRAPHY_SECTIONS: GeographySection[] = [
    {
        id: "physical",
        slug: "physical-geography",
        route: "/physical-geography",
        title: "Physical Geography",
        subtitle: "Landscapes, rivers & climate zones",
    },
    {
        id: "political",
        slug: "political-geography",
        route: "/political-geography",
        title: "Political Geography",
        subtitle: "Provinces, regions & borders",
    },
    {
        id: "demographics",
        slug: "demographics",
        route: "/demographics",
        title: "Demographics",
        subtitle: "People, cities & population patterns",
    },
];
