"use client";

import GeoSectionPolitical from "@/components/GeoSectionPolitical";

export function PoliticalGeographyView() {
    return (
        <div className="relative h-full w-full overflow-y-auto bg-ink-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                <GeoSectionPolitical />
            </div>
        </div>
    );
}
