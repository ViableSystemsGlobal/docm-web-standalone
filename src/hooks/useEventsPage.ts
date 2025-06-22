import { useState, useEffect } from 'react'

interface EventsPageHero {
  first_line_text: string
  heading: string
  subheading: string
  background_image: string | null
  cta_primary: string
  cta_secondary: string
  cta_primary_link?: string
  cta_secondary_link?: string
}

interface EventsPageUpcomingEvents {
  section_title: string
  section_heading: string
  section_description: string
  show_filters?: boolean
  events_per_page?: number
}

interface EventsPageContent {
  hero: EventsPageHero
  upcoming_events: EventsPageUpcomingEvents
}

interface EventsPageResponse {
  eventsPage: EventsPageContent
  source: 'database' | 'default'
  message: string
}

// Default events page data
const defaultEventsPageContent: EventsPageContent = {
  hero: {
    first_line_text: "Events",
    heading: "Connecting hearts through fellowship.",
    subheading: "Join us for meaningful gatherings, celebrations, and opportunities to grow in faith together. From worship services to community outreach, discover events that inspire and unite our church family.",
    background_image: null,
    cta_primary: "View Events",
    cta_secondary: "Get Involved",
    cta_primary_link: "#upcoming-events",
    cta_secondary_link: "/contact"
  },
  upcoming_events: {
    section_title: "What's Coming Up",
    section_heading: "Upcoming Events",
    section_description: "Don't miss these opportunities to connect, grow, and serve together as a church family",
    show_filters: true,
    events_per_page: 10
  }
}

export function useEventsPage() {
  const [eventsPage, setEventsPage] = useState<EventsPageContent>(defaultEventsPageContent)
  const [loading, setLoading] = useState(false) // Start with false since we have default data
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'default' | 'database'>('default')
  const [message, setMessage] = useState<string>('Using default events page content')

  useEffect(() => {
    async function fetchEventsPage() {
      setLoading(true)
      
      try {
        const response = await fetch('/api/events-page', {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data: EventsPageResponse = await response.json()
        
        if (data.eventsPage) {
          setEventsPage(data.eventsPage)
          setSource(data.source || 'default')
          setMessage(data.message || 'Events page loaded')
          setError(null)
          
          console.log(`📄 Events Page Source: ${data.source?.toUpperCase()} - ${data.message}`)
        } else {
          console.log('No events page content found, using default')
          setEventsPage(defaultEventsPageContent)
          setSource('default')
          setMessage('Using default events page content - No content found')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load events page'
        setError(errorMessage)
        console.log('Events page fetch failed, using default:', errorMessage)
        
        setEventsPage(defaultEventsPageContent)
        setSource('default')
        setMessage('Using default events page content - Fetch failed')
      } finally {
        setLoading(false)
      }
    }

    fetchEventsPage()
  }, [])

  return { eventsPage, loading, error, source, message }
} 