import { SermonsHero } from '@/components/sections/sermons-hero'
import { LatestSermons } from '@/components/sections/latest-sermons'

export default function SermonsPage() {
  return (
    <>
      {/* Sermons Hero Section */}
      <SermonsHero />
      
      {/* Latest Sermons */}
      <LatestSermons />
    </>
  )
} 