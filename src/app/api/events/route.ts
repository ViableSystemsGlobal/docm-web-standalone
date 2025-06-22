import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Default/fallback events data
const defaultEvents = [
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

export async function GET(request: NextRequest) {
  try {
    // Environment check - SAME pattern as homepage/navigation
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 EVENTS SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        events: defaultEvents,
        source: 'default',
        message: 'Using default events - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 EVENTS SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        events: defaultEvents,
        source: 'default',
        message: 'Using default events - Supabase client failed'
      })
    }

    console.log('🔍 Attempting to fetch events from database...')
    
    // Get upcoming events (event_date >= today)
    const today = new Date().toISOString()
    
    // First, fetch events
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', today)
      .order('event_date', { ascending: true })
      .limit(10) // Get max 10 upcoming events

    console.log('📊 Database query result:', {
      events: events,
      error: eventsError,
      eventsLength: events ? events.length : 0
    })

    if (eventsError) {
      console.error('🔄 EVENTS SOURCE: DEFAULT (Database error):', eventsError.message)
      return NextResponse.json({ 
        events: defaultEvents,
        source: 'default',
        message: `Using default events - Database error: ${eventsError.message}`
      })
    }

    if (!events || events.length === 0) {
      console.log('🔄 EVENTS SOURCE: DEFAULT (No upcoming events found)')
      return NextResponse.json({ 
        events: defaultEvents,
        source: 'default',
        message: 'Using default events - No upcoming events found'
      })
    }

    // Fetch images for these events
    const eventIds = events.map(event => event.id)
    const { data: images } = await supabase
      .from('event_images')
      .select('*')
      .in('event_id', eventIds)
      .order('sort_order', { ascending: true })

    // Create image map
    const imageMap = new Map()
    if (images && images.length > 0) {
      const imagesByEvent = images.reduce((acc: any, img) => {
        if (!acc[img.event_id]) {
          acc[img.event_id] = []
        }
        acc[img.event_id].push(img)
        return acc
      }, {})
      
      Object.keys(imagesByEvent).forEach(eventId => {
        imageMap.set(eventId, imagesByEvent[eventId][0]) // First image as primary
      })
    }

    // Transform events to frontend format
    const transformedEvents = events.map(event => ({
      id: event.id,
      name: event.name,
      event_date: event.event_date,
      location: event.location || 'Location TBD',
      description: event.description || 'Join us for this special event.',
      capacity: event.capacity,
      primary_image: imageMap.get(event.id) || null,
      // Add some variety in gradients and types
      gradient: getEventGradient(event.name, event.id),
      type: getEventType(event.name, event.description)
    }))
    
    console.log('✅ EVENTS SOURCE: DATABASE (Successfully loaded from CMS)')
    return NextResponse.json({ 
      events: transformedEvents,
      source: 'database',
      message: `Loaded ${transformedEvents.length} upcoming events from database`
    })

  } catch (error) {
    console.error('🔄 EVENTS SOURCE: DEFAULT (Unexpected error):', error)
    return NextResponse.json({ 
      events: defaultEvents,
      source: 'default',
      message: 'Using default events - Unexpected error'
    })
  }
}

// Helper function to assign gradients based on event characteristics
function getEventGradient(name: string, id: string): string {
  const gradients = [
    "from-blue-800 to-indigo-900",
    "from-purple-800 to-pink-900", 
    "from-green-800 to-teal-900",
    "from-orange-800 to-red-900",
    "from-teal-800 to-cyan-900",
    "from-rose-800 to-pink-900"
  ]
  
  // Use a simple hash of the id to ensure consistent colors
  const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

// Helper function to categorize events
function getEventType(name: string, description: string | null): string {
  const content = (name + ' ' + (description || '')).toLowerCase()
  
  if (content.includes('worship') || content.includes('service') || content.includes('sunday')) return 'worship'
  if (content.includes('youth') || content.includes('teen') || content.includes('young')) return 'youth'
  if (content.includes('study') || content.includes('bible') || content.includes('prayer')) return 'study'
  if (content.includes('outreach') || content.includes('community') || content.includes('serve')) return 'outreach'
  if (content.includes('conference') || content.includes('seminar') || content.includes('retreat')) return 'conference'
  
  return 'event' // default
} 