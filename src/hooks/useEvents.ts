import { useState, useEffect } from 'react'

interface EventData {
  id: string
  name: string
  event_date: string
  location: string
  description: string
  capacity: number | null
  primary_image: {
    url: string
    alt_text: string | null
  } | null
  gradient: string
  type: string
}

interface EventsResponse {
  events: EventData[]
  source: 'database' | 'default'
  message: string
}

// Default events data - SAME pattern as homepage/navigation
const defaultEvents: EventData[] = [
  {
    id: 'default-1',
    name: "Sunday Worship Experience",
    event_date: "2024-01-28T09:00:00",
    location: "Main Sanctuary",
    description: "Join us for an inspiring worship experience with contemporary music and biblical teaching.",
    capacity: 200,
    primary_image: null,
    gradient: "from-blue-800 to-indigo-900",
    type: "worship"
  },
  {
    id: 'default-2',
    name: "Midweek Connection",
    event_date: "2024-01-31T19:00:00",
    location: "Fellowship Hall",
    description: "Dive deeper into God's word through interactive Bible study and fellowship.",
    capacity: 50,
    primary_image: null,
    gradient: "from-purple-800 to-pink-900",
    type: "study"
  },
  {
    id: 'default-3',
    name: "Youth Ignite Night",
    event_date: "2024-02-02T19:00:00",
    location: "Youth Center",
    description: "High-energy youth service with games, worship, and relevant messages for teens.",
    capacity: 100,
    primary_image: null,
    gradient: "from-green-800 to-teal-900",
    type: "youth"
  },
  {
    id: 'default-4',
    name: "Community Outreach",
    event_date: "2024-02-05T10:00:00",
    location: "Community Center",
    description: "Join us as we serve our community with love and compassion through various outreach programs.",
    capacity: 150,
    primary_image: null,
    gradient: "from-orange-800 to-red-900",
    type: "outreach"
  }
]

export function useEvents() {
  // SAME state structure as navigation/homepage
  const [events, setEvents] = useState<EventData[]>(defaultEvents)
  const [loading, setLoading] = useState(false) // Start with false since we have default data
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'default' | 'database'>('default')
  const [message, setMessage] = useState<string>('Using default events')

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      
      try {
        const response = await fetch('/api/events', {
          cache: 'no-store' // SAME cache strategy as navigation/homepage
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data: EventsResponse = await response.json()
        
        if (data.events) {
          setEvents(data.events)
          setSource(data.source || 'default')
          setMessage(data.message || 'Events loaded')
          setError(null) // Clear any previous errors
          
          // SAME console logging as navigation/homepage
          console.log(`📅 Events Source: ${data.source?.toUpperCase()} - ${data.message}`)
        } else {
          // SAME fallback logic as navigation/homepage
          console.log('No events found, using default events')
          setEvents(defaultEvents)
          setSource('default')
          setMessage('Using default events - No content found')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load events'
        setError(errorMessage)
        console.log('Events fetch failed, using default events:', errorMessage)
        
        // SAME error handling as navigation/homepage
        setEvents(defaultEvents)
        setSource('default')
        setMessage('Using default events - Fetch failed')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error, source, message }
} 