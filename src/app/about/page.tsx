import { AboutHero } from '@/components/sections/about-hero'
import { OurStory } from '@/components/sections/our-story'
import { Leadership } from '@/components/sections/leadership'
import { MissionVision } from '@/components/sections/mission-vision'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - DOCM Church',
  description: 'Learn about our story, mission, vision, and leadership team at Demonstration of Christ Ministries.',
}

export default function AboutPage() {
  return (
    <>
      {/* About Hero Section */}
      <AboutHero />
      
      {/* Our Story Section */}
      <OurStory />
      
      {/* Mission & Vision */}
      <MissionVision />
      
      {/* Leadership Team */}
      <Leadership />
    </>
  )
} 