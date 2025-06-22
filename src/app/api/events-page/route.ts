import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Default/fallback content for events page
const defaultEventsPageContent = {
  hero: {
    first_line_text: "Events",
    heading: "Connecting hearts through fellowship.",
    subheading: "Join us for meaningful gatherings, celebrations, and opportunities to grow in faith together. From worship services to community outreach, discover events that inspire and unite our church family.",
    background_image: null,
    cta_primary: "View Events",
    cta_secondary: "Get Involved"
  },
  upcoming_events: {
    section_title: "What's Coming Up",
    section_heading: "Upcoming Events",
    section_description: "Don't miss these opportunities to connect, grow, and serve together as a church family"
  }
}

function buildEventsPageContent(sections: any[]): any {
  console.log('🔍 Raw sections for events page:', sections.map(s => ({ type: s.type, props: s.props })))
  
  const content: any = {
    hero: { ...defaultEventsPageContent.hero },
    upcoming_events: { ...defaultEventsPageContent.upcoming_events }
  }

  sections.forEach((section, index) => {
    console.log(`📝 Processing section ${index} (${section.type}):`, section.props)
    
    try {
      switch (section.type) {
        case 'hero':
          if (section.props) {
            // Map CMS hero fields to frontend structure
            content.hero = {
              first_line_text: section.props.first_line_text || content.hero.first_line_text,
              heading: section.props.heading || content.hero.heading,
              subheading: section.props.subheading || content.hero.subheading,
              background_image: section.props.backgroundImage || content.hero.background_image,
              cta_primary: section.props.ctaButtons?.[0]?.text || content.hero.cta_primary,
              cta_secondary: section.props.ctaButtons?.[1]?.text || content.hero.cta_secondary,
              cta_primary_link: section.props.ctaButtons?.[0]?.link || "#upcoming-events",
              cta_secondary_link: section.props.ctaButtons?.[1]?.link || "/contact"
            }
          }
          break
          
        case 'upcoming_events':
        case 'event_list':
          if (section.props) {
            content.upcoming_events = {
              section_title: section.props.first_line || section.props.subtitle || content.upcoming_events.section_title,
              section_heading: section.props.main_header || section.props.title || content.upcoming_events.section_heading,
              section_description: section.props.subheader || section.props.description || content.upcoming_events.section_description,
              show_filters: section.props.showFilters ?? true,
              events_per_page: section.props.eventsPerPage || 10
            }
          }
          break
          
        default:
          console.log(`ℹ️ Unhandled section type: ${section.type}`)
      }
    } catch (error) {
      console.error(`❌ Error processing section ${section.type}:`, error)
    }
  })

  console.log('✅ Final events page content:', content)
  return content
}

export async function GET(request: NextRequest) {
  try {
    // Environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 EVENTS PAGE SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        eventsPage: defaultEventsPageContent,
        source: 'default',
        message: 'Using default events page content - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 EVENTS PAGE SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        eventsPage: defaultEventsPageContent,
        source: 'default',
        message: 'Using default events page content - Supabase client failed'
      })
    }

    console.log('🔍 Attempting to fetch events page from database...')
    
    // First, fetch the events page
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'events')
      .single()

    if (pageError) {
      if (pageError.code === 'PGRST116') {
        console.log('🔄 EVENTS PAGE SOURCE: DEFAULT (No events page found)')
        return NextResponse.json({ 
          eventsPage: defaultEventsPageContent,
          source: 'default',
          message: 'Using default events page content - No events page found in CMS'
        })
      }
      
      console.error('🔄 EVENTS PAGE SOURCE: DEFAULT (Database error):', pageError.message)
      return NextResponse.json({ 
        eventsPage: defaultEventsPageContent,
        source: 'default',
        message: `Using default events page content - Database error: ${pageError.message}`
      })
    }

    if (!pageData) {
      console.log('🔄 EVENTS PAGE SOURCE: DEFAULT (No events page found)')
      return NextResponse.json({ 
        eventsPage: defaultEventsPageContent,
        source: 'default',
        message: 'Using default events page content - No page found'
      })
    }

    // Then, fetch the page sections separately
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', pageData.id)
      .order('order', { ascending: true })

    console.log('📊 Events page database query result:', {
      page: pageData,
      sections: sectionsData,
      pageError: pageError,
      sectionsError: sectionsError,
      sectionsLength: sectionsData ? sectionsData.length : 0
    })

    if (sectionsError) {
      console.error('🔄 EVENTS PAGE SOURCE: DEFAULT (Sections error):', sectionsError.message)
      return NextResponse.json({ 
        eventsPage: defaultEventsPageContent,
        source: 'default',
        message: `Using default events page content - Sections error: ${sectionsError.message}`
      })
    }

    if (!sectionsData || sectionsData.length === 0) {
      console.log('🔄 EVENTS PAGE SOURCE: DEFAULT (No events page sections found)')
      return NextResponse.json({ 
        eventsPage: defaultEventsPageContent,
        source: 'default',
        message: 'Using default events page content - No sections found'
      })
    }

    // Transform CMS data to frontend format
    const eventsPageContent = buildEventsPageContent(sectionsData)
    
    console.log('✅ EVENTS PAGE SOURCE: DATABASE (Successfully loaded from CMS)')
    return NextResponse.json({ 
      eventsPage: eventsPageContent,
      source: 'database',
      message: `Loaded events page with ${sectionsData.length} sections from database`
    })

  } catch (error) {
    console.error('🔄 EVENTS PAGE SOURCE: DEFAULT (Unexpected error):', error)
    return NextResponse.json({ 
      eventsPage: defaultEventsPageContent,
      source: 'default',
      message: 'Using default events page content - Unexpected error'
    })
  }
} 