import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Default homepage content - following same pattern as navigation
const defaultHomepage = {
  hero: {
    first_line: "We are passionate about the LORD JESUS and demonstrating HIM to the world!",
    title: "Demonstrating CHRIST to the World!",
    subtitle: "Every Sunday, An Impact.",
    description: "As a Christ-centered community, we craft meaningful experiences that engage, inspire, and leave a lasting impression on every heart we touch.",
    cta_primary: { text: "Get in touch", href: "/contact" },
    cta_secondary: { text: "Watch our story", href: "/media" }
  },
  events_carousel: {
    title: "Upcoming events & gatherings.",
    subtitle: "Join Us",
    description: "Connect, grow, and make lasting relationships through our community events, worship services, and fellowship opportunities.",
    show_events: true,
    events_limit: 4
  },
  testimonials: {
    title: "Members about our community.",
    subtitle: "Testimonials",
    featured_testimonials: [
      {
        name: "Sarah Johnson",
        role: "Church Member",
        quote: "Joining DOCM Church was a life-changing decision for our family. The community here brought our faith to life in a way that truly connected with our hearts and transformed our daily walk with Christ.",
        has_video: true,
        video_url: "https://sample-videos.com/zip/10/mp4/480/SampleVideo_360x240_1mb.mp4",
        image_url: "https://images.unsplash.com/photo-1594736797933-d0401ba8d8ed?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Pastor Michael",
        role: "Lead Pastor",
        quote: "Witnessing God's transformative power through our community outreach programs has been incredible. Lives are being changed, families restored, and hope renewed every single day.",
        has_video: true,
        video_url: "https://sample-videos.com/zip/10/mp4/480/SampleVideo_720x480_1mb.mp4",
        image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  our_story: {
    first_line: "Our Story",
    main_header: "Building communities that transform lives.",
    paragraph_text: "For over two decades, DOCM Church has been a beacon of hope and faith in our community. We are a family-oriented church that believes in the transformative power of God's love.\n\nOur mission is to make disciples of Jesus Christ by loving God, loving others, and serving our community with excellence, integrity, and unwavering compassion.",
    media_url: "",
    media_type: "video",
    button_text: "Learn More",
    button_link: "/about",
    button_style: "primary",
    stats: [
      { number: "500+", label: "Active Members", icon: "👥" },
      { number: "15", label: "Ministries", icon: "🤝" },
      { number: "20+", label: "Years Serving", icon: "⭐" }
    ],
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
  sermon_preview: {
    title: "Latest Message",
    subtitle: "Recent Teaching",
    featured_sermon: {
      title: "Finding Your Purpose in God's Plan",
      speaker: "Pastor Michael Johnson",
      date: "January 21, 2024",
      description: "Discover how God has a unique plan and purpose for your life, and learn practical steps to align your goals with His will."
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Environment check - SAME as navigation
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 HOMEPAGE SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        homepage: defaultHomepage,
        source: 'default',
        message: 'Using default homepage - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 HOMEPAGE SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        homepage: defaultHomepage,
        source: 'default',
        message: 'Using default homepage - Supabase client failed'
      })
    }

    // Fetch homepage content from database - SAME logging pattern
    console.log('🔍 Attempting to fetch homepage from database...')
    
    // Look for a page with slug 'home' or 'homepage'
    const { data: homePage, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .in('slug', ['home', 'homepage', 'index'])
      .not('published_at', 'is', null) // Only published pages (not null)
      .single()

    if (pageError || !homePage) {
      console.log('🔄 HOMEPAGE SOURCE: DEFAULT (No homepage found in CMS)')
      return NextResponse.json({ 
        homepage: defaultHomepage,
        source: 'default',
        message: 'Using default homepage - No homepage found in CMS'
      })
    }

    // Fetch sections for the homepage
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', homePage.id)
      .order('order', { ascending: true })

    console.log('📊 Database query result:', {
      page: homePage,
      sections: sections,
      error: sectionsError,
      sectionsLength: sections ? sections.length : 0
    })

    // Add detailed section logging
    if (sections && sections.length > 0) {
      console.log('🔍 Raw sections from database:')
      sections.forEach((section, index) => {
        console.log(`  Section ${index + 1}:`, {
          type: section.type,
          order: section.order,
          props_keys: section.props ? Object.keys(section.props) : 'no props',
          props: section.props
        })
      })
    }

    if (sectionsError) {
      console.error('🔄 HOMEPAGE SOURCE: DEFAULT (Sections error):', sectionsError.message)
      return NextResponse.json({ 
        homepage: defaultHomepage,
        source: 'default',
        message: `Using default homepage - Sections error: ${sectionsError.message}`
      })
    }

    if (!sections || sections.length === 0) {
      console.log('🔄 HOMEPAGE SOURCE: DEFAULT (No sections found)')
      return NextResponse.json({ 
        homepage: defaultHomepage,
        source: 'default',
        message: 'Using default homepage - No sections found'
      })
    }

    // Transform sections to homepage content - SAME pattern as navigation tree
    // First, check if we need to fetch get_involved data
    let getInvolvedTemplates: any[] = []
    const hasGetInvolvedSection = sections.some(section => section.type === 'get_involved')
    
    if (hasGetInvolvedSection) {
      try {
        const { data: templates, error: getInvolvedError } = await supabase
          .from('get_involved_templates')
          .select(`
            id,
            title,
            excerpt,
            description,
            featured_image,
            icon_emoji,
            gradient_colors,
            category,
            time_commitment,
            contact_person,
            custom_cta_text,
            custom_cta_url,
            priority_order,
            ministry_group_id,
            ministry_group:groups!ministry_group_id(
              name,
              type,
              image_url
            )
          `)
          .eq('status', 'published')
          .order('priority_order', { ascending: true })
          .limit(6)
      
        if (!getInvolvedError && templates && templates.length > 0) {
          // Get all groups to match by name when ministry_group_id is null
          const { data: allGroups } = await supabase
            .from('groups')
            .select('id, name, type, image_url')
            .eq('status', 'active')
          
          console.log('🔍 Available groups for matching:', allGroups?.map(g => ({name: g.name, hasImage: !!g.image_url})))
          
          // Use group image as fallback when template doesn't have featured_image
          const templatesWithImages = templates.map(template => {
            let groupImage = null
            
            // If template is linked to a group, use that group's image
            if ((template.ministry_group as any)?.image_url) {
              groupImage = (template.ministry_group as any).image_url
            } 
            // Otherwise, try to match by name with available groups
            else if (allGroups) {
              const matchingGroup = allGroups.find(group => 
                group.name.toLowerCase() === template.title.toLowerCase() ||
                group.name.toLowerCase().includes(template.title.toLowerCase()) ||
                template.title.toLowerCase().includes(group.name.toLowerCase())
              )
              if (matchingGroup) {
                console.log(`🎯 Matched template "${template.title}" with group "${matchingGroup.name}" (image: ${!!matchingGroup.image_url})`)
                groupImage = (matchingGroup as any).image_url
              } else {
                console.log(`❌ No group match found for template "${template.title}"`)
              }
            }
            
            return {
              ...template,
              featured_image: template.featured_image || groupImage || null
            }
          })
          getInvolvedTemplates = templatesWithImages
          console.log(`🎯 Get Involved: Loaded ${templates.length} templates from get_involved_templates with group image fallbacks`)
        } else {
          // Fallback to groups table if no get_involved_templates found
          console.log('🔄 Get Involved: No get_involved_templates found, trying groups table...')
          
          const { data: groups, error: groupsError } = await supabase
            .from('groups')
            .select(`
              id,
              name,
              description,
              type,
              status,
              image_url,
              created_at
            `)
            .eq('status', 'active')
            .order('created_at', { ascending: true })
            .limit(6)
          
          if (!groupsError && groups && groups.length > 0) {
            // Transform groups to match get_involved_templates structure
            getInvolvedTemplates = groups.map((group, index) => ({
              id: group.id,
              title: group.name,
              excerpt: group.description || `Join our ${group.name} and make a difference in our community.`,
              description: group.description || `Connect with our ${group.name} ministry.`,
              featured_image: (group as any).image_url || null, // Use the group's image
              icon_emoji: getGroupIcon(group.name, group.type),
              gradient_colors: getGroupGradient(index),
              category: group.type === 'ministry' ? 'ministry' : 'community',
              time_commitment: '2-3 hours per week',
              contact_person: 'Ministry Leader',
              custom_cta_text: 'Learn More',
              priority_order: index + 1
            }))
            console.log(`🎯 Get Involved: Loaded ${groups.length} templates from groups table with images`)
          } else {
            console.log('🔄 Get Involved: No groups found either, using default templates')
          }
        }
      } catch (error) {
        console.log('🔄 Get Involved: Using default templates (error)', error)
      }
    }

    const homepageContent = buildHomepageContent(sections, getInvolvedTemplates)
    
    console.log('✅ HOMEPAGE SOURCE: DATABASE (Successfully loaded from CMS)')
    return NextResponse.json({ 
      homepage: homepageContent,
      source: 'database',
      message: `Loaded homepage with ${sections.length} sections from CMS`
    })

  } catch (error) {
    console.error('🔄 HOMEPAGE SOURCE: DEFAULT (Unexpected error):', error)
    return NextResponse.json({ 
      homepage: defaultHomepage,
      source: 'default',
      message: 'Using default homepage - Unexpected error'
    })
  }
}

function buildHomepageContent(sections: any[], getInvolvedTemplates: any[]): any {
  const content: any = {}
  
  sections.forEach(section => {
    // Map section types to content structure
    switch (section.type) {
      case 'hero':
        // Map admin property names to homepage structure
        const ctaButtons = section.props?.ctaButtons || []
        const backgroundMedia = section.props?.backgroundImage
        
        // Detect if background media is video or image
        const isVideo = backgroundMedia && (
          backgroundMedia.includes('.mp4') || 
          backgroundMedia.includes('.webm') || 
          backgroundMedia.includes('.mov') || 
          backgroundMedia.includes('.avi')
        )
        
        content.hero = {
          first_line: section.props?.firstLine || defaultHomepage.hero.first_line,
          title: section.props?.heading || defaultHomepage.hero.title,
          subtitle: section.props?.subheading || defaultHomepage.hero.subtitle,
          description: section.props?.description || defaultHomepage.hero.description,
          cta_primary: ctaButtons[0] ? {
            text: ctaButtons[0].text,
            href: ctaButtons[0].link
          } : defaultHomepage.hero.cta_primary,
          cta_secondary: ctaButtons[1] ? {
            text: ctaButtons[1].text,
            href: ctaButtons[1].link
          } : defaultHomepage.hero.cta_secondary,
          background_video: isVideo ? backgroundMedia : section.props?.backgroundVideo,
          background_image: !isVideo ? backgroundMedia : section.props?.backgroundImage
        }
        break
        
      case 'event_carousel':
        content.events_carousel = {
          title: section.props?.title || defaultHomepage.events_carousel.title,
          subtitle: section.props?.subtitle || defaultHomepage.events_carousel.subtitle,
          description: section.props?.description || defaultHomepage.events_carousel.description,
          show_events: section.props?.show_events !== false,
          events_limit: section.props?.maxEvents || section.props?.events_limit || 4
        }
        break
        
      case 'testimonial_slider':
        // Map admin testimonials to frontend structure
        const adminTestimonials = section.props?.testimonials || []
        const mappedTestimonials = adminTestimonials.map((testimonial: any) => ({
          name: testimonial.name || "Community Member",
          role: testimonial.role || "Church Family",
          quote: testimonial.text || testimonial.quote || "Being part of this community has been a blessing.",
          has_video: Boolean(testimonial.video_url || testimonial.video || testimonial.has_video),
          video_url: testimonial.video_url || testimonial.video,
          image_url: testimonial.image_url || testimonial.image
        }))
        
        content.testimonials = {
          title: section.props?.title || defaultHomepage.testimonials.title,
          subtitle: section.props?.subtitle || defaultHomepage.testimonials.subtitle,
          featured_testimonials: mappedTestimonials.length > 0 ? mappedTestimonials : defaultHomepage.testimonials.featured_testimonials
        }
        break
        
      case 'our_story':
        content.our_story = {
          first_line: section.props?.first_line || defaultHomepage.our_story.first_line,
          main_header: section.props?.main_header || defaultHomepage.our_story.main_header,
          paragraph_text: section.props?.paragraph_text || defaultHomepage.our_story.paragraph_text,
          media_url: section.props?.media_url || defaultHomepage.our_story.media_url,
          media_type: section.props?.media_type || defaultHomepage.our_story.media_type,
          button_text: section.props?.button_text || defaultHomepage.our_story.button_text,
          button_link: section.props?.button_link || defaultHomepage.our_story.button_link,
          button_style: section.props?.button_style || defaultHomepage.our_story.button_style,
          // Map stats from CMS
          stats: section.props?.stats || defaultHomepage.our_story.stats,
          // Map ministry highlights from CMS
          ministry_highlights: section.props?.ministry_highlights || defaultHomepage.our_story.ministry_highlights,
          // Map community impact from CMS
          community_impact: section.props?.community_impact || defaultHomepage.our_story.community_impact
        }
        break
        
      case 'sermon_carousel':
        content.sermon_preview = {
          title: section.props?.title || defaultHomepage.sermon_preview.title,
          subtitle: section.props?.subtitle || defaultHomepage.sermon_preview.subtitle,
          featured_sermon: section.props?.featured_sermon || defaultHomepage.sermon_preview.featured_sermon
        }
        break
        
      case 'get_involved':
        content.get_involved = {
          title: section.props?.title || 'Get Involved',
          subtitle: section.props?.subtitle || 'Join Our Community',
          description: section.props?.description || 'Discover meaningful ways to connect, serve, and grow in your faith journey with us.',
          show_all_link: section.props?.show_all_link !== false,
          all_link_text: section.props?.all_link_text || 'View All Opportunities',
          all_link_url: section.props?.all_link_url || '/get-involved',
          max_items: section.props?.max_items || 6,
          filter_categories: section.props?.filter_categories || [],
          layout: section.props?.layout || 'grid',
          // Add the fetched templates
          templates: getInvolvedTemplates
        }
        break
        
      // Add more section types as needed
      default:
        content[section.type] = section.props || {}
    }
  })
  
  // Merge with defaults for any missing sections
  return {
    ...defaultHomepage,
    ...content
  }
}

// Helper functions for group transformation
function getGroupIcon(name: string, type: string): string {
  const nameLower = name.toLowerCase()
  if (nameLower.includes('prayer')) return '🙏'
  if (nameLower.includes('worship')) return '🎵'
  if (nameLower.includes('youth')) return '🏀'
  if (nameLower.includes('children')) return '👶'
  if (nameLower.includes('outreach') || nameLower.includes('community')) return '🤝'
  if (nameLower.includes('marriage') || nameLower.includes('counselling')) return '💒'
  if (type === 'ministry') return '✨'
  return '🤝'
}

function getGroupGradient(index: number): { from: string; to: string } {
  const gradients = [
    { from: 'blue-800', to: 'indigo-900' },
    { from: 'purple-800', to: 'pink-900' },
    { from: 'green-800', to: 'teal-900' },
    { from: 'orange-800', to: 'red-900' },
    { from: 'indigo-800', to: 'purple-900' },
    { from: 'teal-800', to: 'blue-900' }
  ]
  return gradients[index % gradients.length]
} 