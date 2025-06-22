import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Define the expected section types for sermons page
type SermonsSectionType = 'hero' | 'latest_sermons'

interface SermonsPageData {
  hero: {
    first_line_text: string
    heading: string
    subheading: string
    backgroundImage?: string
    backgroundMedia?: {
      url: string
      type: 'image' | 'video'
      alt_text?: string
    }
    ctaButtons: Array<{
      text: string
      link: string
      style: 'primary' | 'secondary'
    }>
  }
  latest_sermons: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
    showFeatured: boolean
    maxSermons: number
  }
}

const defaultSermonsPageData: SermonsPageData = {
  hero: {
    first_line_text: "Sermons",
    heading: "Messages that transform hearts.",
    subheading: "Discover powerful biblical teachings that speak to your soul, challenge your thinking, and inspire you to live out your faith with passion and purpose.",
    ctaButtons: [
      {
        text: "Listen Now",
        link: "#latest-sermons",
        style: "primary"
      },
      {
        text: "Browse Series",
        link: "#sermon-series",
        style: "secondary"
      }
    ]
  },
  latest_sermons: {
    sectionTitle: "Recently Added",
    sectionHeading: "Latest Sermons",
    sectionDescription: "Catch up on our most recent teachings and never miss a message that could transform your life",
    showFeatured: true,
    maxSermons: 4
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Attempting to fetch sermons page from database...')
    
    const supabase = createServerSupabaseClient()

    // First, fetch the sermons page
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('id, slug, title, seo_meta, published_at, created_at, updated_at')
      .eq('slug', 'sermons')
      .single()

    if (pageError && pageError.code !== 'PGRST116') {
      console.error('❌ Error fetching sermons page:', pageError)
      throw pageError
    }

    if (!page) {
      console.log('⚠️ No sermons page found in database, using defaults')
      return NextResponse.json({
        sermonsPage: defaultSermonsPageData,
        source: 'default',
        message: 'Using default sermons page content'
      })
    }

    // Then, fetch the sections separately
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('id, page_id, type, order, props, created_at')
      .eq('page_id', page.id)
      .order('order', { ascending: true })

    if (sectionsError) {
      console.error('❌ Error fetching sermons page sections:', sectionsError)
      throw sectionsError
    }

    console.log('📊 Sermons page database query result:', {
      page,
      sections: sections || [],
      error: null,
      sectionsLength: sections?.length || 0
    })

    // Log raw section props for debugging
    if (sections && sections.length > 0) {
      console.log('🔍 Raw section props:')
      sections.forEach((section, index) => {
        console.log(`  Section ${index} (${section.type}):`, section.props)
      })
    }

    // Process sections into structured data
    const sermonsPageData: SermonsPageData = { ...defaultSermonsPageData }

    sections?.forEach((section) => {
      const sectionType = section.type as SermonsSectionType
      
      switch (sectionType) {
        case 'hero':
          if (section.props) {
            sermonsPageData.hero = {
              first_line_text: section.props.first_line_text || defaultSermonsPageData.hero.first_line_text,
              heading: section.props.heading || defaultSermonsPageData.hero.heading,
              subheading: section.props.subheading || defaultSermonsPageData.hero.subheading,
              backgroundImage: section.props.backgroundImage,
              backgroundMedia: section.props.backgroundMedia ? {
                url: section.props.backgroundMedia.url,
                type: section.props.backgroundMedia.type || 'image',
                alt_text: section.props.backgroundMedia.alt_text
              } : undefined,
              ctaButtons: section.props.ctaButtons || defaultSermonsPageData.hero.ctaButtons
            }
          }
          break
        
        case 'latest_sermons':
          if (section.props) {
            sermonsPageData.latest_sermons = {
              sectionTitle: section.props.sectionTitle || defaultSermonsPageData.latest_sermons.sectionTitle,
              sectionHeading: section.props.sectionHeading || defaultSermonsPageData.latest_sermons.sectionHeading,
              sectionDescription: section.props.sectionDescription || defaultSermonsPageData.latest_sermons.sectionDescription,
              showFeatured: section.props.showFeatured !== undefined ? section.props.showFeatured : defaultSermonsPageData.latest_sermons.showFeatured,
              maxSermons: section.props.maxSermons || defaultSermonsPageData.latest_sermons.maxSermons
            }
          }
          break
      }
    })

    console.log('✅ SERMONS SOURCE: DATABASE')
    
    return NextResponse.json({
      sermonsPage: sermonsPageData,
      source: 'database',
      message: 'Loaded sermons page from database'
    })

  } catch (error) {
    console.error('❌ Error fetching sermons page:', error)
    console.log('⚠️ Falling back to default sermons page content')
    
    return NextResponse.json({
      sermonsPage: defaultSermonsPageData,
      source: 'default',
      message: 'Using default content due to database error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 