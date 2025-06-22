import { HeroSection } from '@/components/sections/hero-section'
import { EventsCarousel } from '@/components/sections/events-carousel'
import { Testimonials } from '@/components/sections/testimonials'
import { AboutSnapshot } from '@/components/sections/about-snapshot'
import { SermonPreview } from '@/components/sections/sermon-preview'
import { GetInvolvedGrid } from '@/components/sections/get-involved-grid'
import { NewsletterSignup } from '@/components/sections/newsletter-signup'
import { LocationMap } from '@/components/sections/location-map'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Upcoming Events Carousel */}
      <EventsCarousel />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* About Snapshot */}
      <AboutSnapshot />
      
      {/* Latest Sermon Preview */}
      <SermonPreview />
      
      {/* Get Involved Grid */}
      <GetInvolvedGrid />
      
      {/* Newsletter Signup */}
      <NewsletterSignup />
      
      {/* Visit Us Section */}
      <LocationMap />
    </>
  )
}
