import { MapWithJourney } from "@/components/map/MapWithJourney"
import GeoSectionPhysical from "@/components/GeoSectionPhysical"
import GeoSectionDemographics from "@/components/GeoSectionDemographics"
import { getAllCityContent } from "@/lib/loadContent"

export default function BubblesPage() {
    const cityContent = getAllCityContent();

    return (
        <MapWithJourney
            physicalContent={<GeoSectionPhysical />}
            demographicsContent={<GeoSectionDemographics />}
            cityContent={cityContent}
        />
    )
}
