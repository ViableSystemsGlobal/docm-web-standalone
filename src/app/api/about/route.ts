import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Default about page content when database is not available
const defaultAbout = {
  hero: {
    first_line_text: "About",
    heading: "Building community that loves Jesus!",
    subheading: "About DOCM Church",
    background_image: ""
  },
  our_story: {
    first_line: "Our Story",
    main_header: "Building communities that transform lives.",
    paragraph_text: "For over two decades, DOCM Church has been a beacon of hope and faith in our community. We are a family-oriented church that believes in the transformative power of God's love.\n\nOur mission is to make disciples of Jesus Christ by loving God, loving others, and serving our community with excellence, integrity, and unwavering compassion.",
    media_url: "",
    media_type: "video",
    button_text: "Learn More",
    button_link: "/contact",
    button_style: "primary",
    ministry_highlights: [
      {
        title: "Ministry Highlights",
        video_url: "",
        description: "Discover the impact of our ministry programs"
      }
    ],
    community_impact: {
      title: "Community Impact",
      video_url: "",
      description: "See how we're making a difference in our neighborhood"
    }
  },
  mission_vision: {
    section_title: "Our Purpose",
    section_heading: "Mission & Vision", 
    section_description: "Our mission guides everything we do, and our vision inspires where we're going",
    mission: {
      title: "Our Mission",
      content: "To make disciples of Jesus Christ by loving God, loving others, and serving our community with excellence, integrity, and unwavering compassion.",
      items: [],
      media_url: ""
    },
    vision: {
      title: "Our Vision", 
      content: "To be a thriving community of believers who actively live out their faith, making a positive impact in Aurora, Colorado and beyond.",
      items: [],
      media_url: ""
    },
    values: [
      {
        title: "Faith",
        description: "Grounded in biblical truth and lived out daily",
        icon: "✝️"
      },
      {
        title: "Community",
        description: "Building authentic relationships and belonging",
        icon: "🤝"
      },
      {
        title: "Service",
        description: "Serving our community with love and compassion",
        icon: "❤️"
      },
      {
        title: "Growth",
        description: "Continually growing in spiritual maturity",
        icon: "🌱"
      }
    ]
  },
  leadership: {
    title: "Leadership Team",
    subtitle: "Meet Our Team",
    description: "God has blessed us with passionate leaders who are committed to serving our church family and community.",
    team_members: [
      {
        name: "Pastor Michael Johnson",
        position: "Lead Pastor",
        bio: "Pastor Michael has been leading DOCM Church with vision and passion for over 15 years.",
        image_url: "",
        social_links: []
      },
      {
        name: "Pastor Sarah Johnson", 
        position: "Associate Pastor",
        bio: "Pastor Sarah oversees our community outreach and women's ministry programs.",
        image_url: "",
        social_links: []
      }
    ]
  },
  join_us: {
    title: "Join Our Community",
    subtitle: "Take Your Next Step",
    description: "Whether you're new to faith or looking for a church home, we'd love to welcome you into our family.",
    cta_primary: { text: "Plan Your Visit", href: "/contact" },
    cta_secondary: { text: "Watch Online", href: "/sermons" }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Environment check - same pattern as homepage API
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 ABOUT SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        about: defaultAbout,
        source: 'default',
        message: 'Using default about page - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 ABOUT SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        about: defaultAbout,
        source: 'default',
        message: 'Using default about page - Supabase client failed'
      })
    }

    // Fetch about page content from database
    console.log('🔍 Attempting to fetch about page from database...')
    
    // Look for a page with slug 'about'
    const { data: aboutPage, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'about')
      .not('published_at', 'is', null) // Only published pages
      .single()

    if (pageError || !aboutPage) {
      console.log('🔄 ABOUT SOURCE: DEFAULT (No about page found in CMS)')
      return NextResponse.json({ 
        about: defaultAbout,
        source: 'default',
        message: 'Using default about page - No about page found in CMS'
      })
    }

    // Fetch sections for the about page
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', aboutPage.id)
      .order('order', { ascending: true })

    console.log('📊 About page database query result:', {
      page: aboutPage,
      sections: sections,
      error: sectionsError,
      sectionsLength: sections ? sections.length : 0
    })

    if (sectionsError) {
      console.error('🔄 ABOUT SOURCE: DEFAULT (Sections error):', sectionsError.message)
      return NextResponse.json({ 
        about: defaultAbout,
        source: 'default',
        message: `Using default about page - Sections error: ${sectionsError.message}`
      })
    }

    if (!sections || sections.length === 0) {
      console.log('🔄 ABOUT SOURCE: DEFAULT (No sections found)')
      return NextResponse.json({ 
        about: defaultAbout,
        source: 'default',
        message: 'Using default about page - No sections found'
      })
    }

    // Transform sections to about content
    const aboutContent = buildAboutContent(sections)

    console.log('✅ ABOUT SOURCE: DATABASE')
    return NextResponse.json({
      about: aboutContent,
      source: 'database',
      message: 'About page loaded from database'
    })

  } catch (error) {
    console.error('About API error:', error)
    return NextResponse.json({ 
      about: defaultAbout,
      source: 'default',
      message: `Using default about page - API error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}

function buildAboutContent(sections: any[]): any {
  const content = { ...defaultAbout }

  sections.forEach(section => {
    switch (section.type) {
      case 'hero':
        content.hero = {
          first_line_text: section.props?.first_line_text || defaultAbout.hero.first_line_text,
          heading: section.props?.heading || defaultAbout.hero.heading,
          subheading: section.props?.subheading || defaultAbout.hero.subheading,
          background_image: section.props?.backgroundImage || defaultAbout.hero.background_image
        }
        break

      case 'our_story':
        content.our_story = {
          first_line: section.props?.first_line || defaultAbout.our_story.first_line,
          main_header: section.props?.main_header || defaultAbout.our_story.main_header,
          paragraph_text: section.props?.paragraph_text || defaultAbout.our_story.paragraph_text,
          media_url: section.props?.media_url || defaultAbout.our_story.media_url,
          media_type: section.props?.media_type || defaultAbout.our_story.media_type,
          button_text: section.props?.button_text || defaultAbout.our_story.button_text,
          button_link: section.props?.button_link || defaultAbout.our_story.button_link,
          button_style: section.props?.button_style || defaultAbout.our_story.button_style,
          ministry_highlights: section.props?.ministry_highlights || defaultAbout.our_story.ministry_highlights,
          community_impact: section.props?.community_impact || defaultAbout.our_story.community_impact
        }
        break

      case 'mission_vision':
        content.mission_vision = {
          section_title: section.props?.first_line || "Our Purpose",
          section_heading: section.props?.main_header || "Mission & Vision", 
          section_description: section.props?.subheader || "Our mission guides everything we do, and our vision inspires where we're going",
          mission: {
            title: section.props?.mission?.title || defaultAbout.mission_vision.mission.title,
            content: section.props?.mission?.description || defaultAbout.mission_vision.mission.content,
            items: section.props?.mission?.items || [],
            media_url: section.props?.mission?.media_url || ""
          },
          vision: {
            title: section.props?.vision?.title || defaultAbout.mission_vision.vision.title,
            content: section.props?.vision?.description || defaultAbout.mission_vision.vision.content,
            items: section.props?.vision?.items || [],
            media_url: section.props?.vision?.media_url || ""
          },
          values: section.props?.values || defaultAbout.mission_vision.values
        }
        break

      case 'leadership_team':
        // Transform CMS leadership structure to component structure
        const teamMembers = []
        
        // Add head pastor first
        if (section.props?.head_pastor) {
          teamMembers.push({
            name: section.props.head_pastor.name,
            position: section.props.head_pastor.role,
            bio: section.props.head_pastor.bio,
            image_url: section.props.head_pastor.media_url || "",
            social_links: [],
            // Handle areas_of_ministry from CMS
            areas_of_ministry: section.props.head_pastor.areas_of_ministry || []
          })
        }
        
        // Add other pastors
        if (section.props?.other_pastors && Array.isArray(section.props.other_pastors)) {
          section.props.other_pastors.forEach((pastor: any) => {
            teamMembers.push({
              name: pastor.name,
              position: pastor.role,
              bio: pastor.bio,
              image_url: pastor.media_url || "",
              social_links: [],
              // Handle areas_of_ministry from CMS
              areas_of_ministry: pastor.areas_of_ministry || []
            })
          })
        }
        
        content.leadership = {
          title: section.props?.main_header || defaultAbout.leadership.title,
          subtitle: section.props?.first_line || defaultAbout.leadership.subtitle,
          description: section.props?.subheader || defaultAbout.leadership.description,
          team_members: teamMembers.length > 0 ? teamMembers : defaultAbout.leadership.team_members
        }
        break
    }
  })

  return content
} 