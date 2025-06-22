import { EventsHero } from '@/components/sections/events-hero'
import { UpcomingEvents } from '@/components/sections/upcoming-events'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events - DOCM Church',
  description: 'Join us for upcoming events, services, and community gatherings at Demonstration of Christ Ministries.',
}

export default function EventsPage() {
  return (
    <>
      {/* Events Hero Section */}
      <EventsHero />
      
      {/* Upcoming Events */}
      <UpcomingEvents />
    </>
  )
} 