import { MapWithJourney } from '@/components/map/MapWithJourney'
import { getAllCityContent } from "@/lib/loadContent"

export default function Home() {
  const cityContent = getAllCityContent();

  return (
    <main className="min-h-screen bg-ink-black text-parchment-light">
      <MapWithJourney cityContent={cityContent} />
    </main>
  )
}