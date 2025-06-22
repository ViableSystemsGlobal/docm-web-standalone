import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Default gallery page content
const defaultGalleryPage = {
  hero: {
    first_line_text: "Gallery",
    heading: "Capturing God's Work Among Us",
    subheading: "Experience the joy, fellowship, and transformative moments that define our church community through beautiful photographs and inspiring videos.",
    backgroundImage: "https://images.unsplash.com/photo-1511895426328-dc8714efa987?w=1920&h=1080&fit=crop",
    ctaButtons: [
      {
        text: "Browse Photos",
        link: "#photo-galleries",
        style: "primary"
      },
      {
        text: "Watch Videos", 
        link: "#video-galleries",
        style: "secondary"
      }
    ]
  },
  photo_galleries: {
    sectionTitle: "Photo Galleries",
    sectionHeading: "Moments Worth Remembering",
    sectionDescription: "Browse through our collection of photographs capturing the heart and spirit of our church community"
  },
  video_galleries: {
    sectionTitle: "Video Galleries", 
    sectionHeading: "Stories in Motion",
    sectionDescription: "Watch and experience the powerful moments and testimonies that inspire our faith journey"
  }
}

export async function GET() {
  try {
    // Environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 GALLERY PAGE SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        galleryPage: defaultGalleryPage,
        source: 'default',
        message: 'Using default gallery page content - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 GALLERY PAGE SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        galleryPage: defaultGalleryPage,
        source: 'default',
        message: 'Using default gallery page content - Supabase client failed'
      })
    }

    console.log('🔍 Attempting to fetch gallery page from database...')
    
    // Fetch page and sections separately to avoid reserved keyword issues
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'gallery')
      .single()

    if (pageError) {
      console.error('📊 Gallery page database error:', pageError.message)
      console.log('🔄 GALLERY PAGE SOURCE: DEFAULT (Page not found)')
      return NextResponse.json({ 
        galleryPage: defaultGalleryPage,
        source: 'default',
        message: `Using default gallery page content - Page error: ${pageError.message}`
      })
    }

    // Fetch sections separately
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .order('order', { ascending: true })

    if (sectionsError) {
      console.error('📊 Gallery page sections error:', sectionsError.message)
      console.log('🔄 GALLERY PAGE SOURCE: DEFAULT (Sections error)')
      return NextResponse.json({ 
        galleryPage: defaultGalleryPage,
        source: 'default',
        message: `Using default gallery page content - Sections error: ${sectionsError.message}`
      })
    }

    console.log('📊 Gallery page database query result:', {
      page: page,
      sections: sections,
      error: null,
      sectionsLength: sections ? sections.length : 0
    })

    // Transform sections into the expected format
    const galleryPage = { ...defaultGalleryPage }

    sections?.forEach(section => {
      if (section.type === 'hero') {
        galleryPage.hero = {
          ...galleryPage.hero,
          ...section.props,
          // Support both backgroundImage and backgroundMedia properties
          backgroundImage: section.props.backgroundImage || section.props.backgroundMedia?.url || galleryPage.hero.backgroundImage
        }
      } else if (section.type === 'photo_galleries') {
        galleryPage.photo_galleries = {
          ...galleryPage.photo_galleries,
          ...section.props
        }
      } else if (section.type === 'video_galleries') {
        galleryPage.video_galleries = {
          ...galleryPage.video_galleries,
          ...section.props
        }
      }
    })

    console.log('✅ GALLERY PAGE SOURCE: DATABASE (Successfully loaded from database)')
    return NextResponse.json({ 
      galleryPage,
      source: 'database',
      message: `Loaded gallery page from database with ${sections.length} sections`
    })

  } catch (error) {
    console.error('🔄 GALLERY PAGE SOURCE: DEFAULT (Unexpected error):', error)
    return NextResponse.json({ 
      galleryPage: defaultGalleryPage,
      source: 'default',
      message: 'Using default gallery page content - Unexpected error'
    })
  }
} 