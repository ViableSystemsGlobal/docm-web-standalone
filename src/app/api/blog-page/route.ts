import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Define the interface for blog page structure
interface BlogPageData {
  hero: {
    first_line_text: string
    heading: string
    subheading: string
    backgroundImage: string
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
  posts_section: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
  }
  newsletter: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
    placeholderText: string
    buttonText: string
  }
}

// Default fallback data
const defaultBlogPageData: BlogPageData = {
  hero: {
    first_line_text: "Blog",
    heading: "Words that inspire faith.",
    subheading: "Discover inspiring articles, personal testimonies, and thoughtful reflections that will encourage your faith journey and deepen your relationship with God.",
    backgroundImage: "",
    ctaButtons: [
      {
        text: "Read Articles",
        link: "#featured-posts",
        style: "primary"
      },
      {
        text: "Browse Topics",
        link: "#blog-categories",
        style: "secondary"
      }
    ]
  },
  posts_section: {
    sectionTitle: "Recent Articles",
    sectionHeading: "All Posts",
    sectionDescription: "Stay up to date with fresh insights, personal stories, and practical wisdom for your faith journey"
  },
  newsletter: {
    sectionTitle: "Stay Connected",
    sectionHeading: "Never miss an update",
    sectionDescription: "Subscribe to our newsletter and get the latest blog posts delivered straight to your inbox.",
    placeholderText: "Enter your email address",
    buttonText: "Subscribe"
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Attempting to fetch blog page from database...')
    
    const supabase = createServerSupabaseClient()

    // Fetch blog page content
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .select('id, slug, title, seo_meta, published_at, created_at, updated_at')
      .eq('slug', 'blog')
      .not('published_at', 'is', null)
      .single()

    if (pageError || !pageData) {
      console.log('⚠️ Blog page not found in database, using defaults')
      console.log('Page error:', pageError)
      return NextResponse.json({
        ...defaultBlogPageData,
        source: 'default'
      })
    }

    // Fetch blog page sections
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('page_sections')
      .select('id, type, order, props')
      .eq('page_id', pageData.id)
      .order('order', { ascending: true })

    if (sectionsError) {
      console.error('❌ Error fetching blog page sections:', sectionsError)
      return NextResponse.json({
        ...defaultBlogPageData,
        source: 'default'
      })
    }

    console.log(`📊 Blog page database query result:`, {
      page: pageData,
      sections: sectionsData,
      error: null,
      sectionsLength: sectionsData?.length || 0
    })

    // Transform the database sections into our blog page structure
    const blogPageData: BlogPageData = { ...defaultBlogPageData }

    sectionsData?.forEach(section => {
      console.log(`🔍 Raw section props:`)
      console.log(`  Section ${section.order} (${section.type}):`, section.props)

      switch (section.type) {
        case 'hero':
          blogPageData.hero = {
            first_line_text: section.props.first_line_text || defaultBlogPageData.hero.first_line_text,
            heading: section.props.heading || defaultBlogPageData.hero.heading,
            subheading: section.props.subheading || defaultBlogPageData.hero.subheading,
            backgroundImage: section.props.backgroundImage || section.props.backgroundMedia?.url || "",
            backgroundMedia: section.props.backgroundMedia,
            ctaButtons: section.props.ctaButtons || defaultBlogPageData.hero.ctaButtons
          }
          break
        case 'posts_section':
          blogPageData.posts_section = {
            sectionTitle: section.props.sectionTitle || defaultBlogPageData.posts_section.sectionTitle,
            sectionHeading: section.props.sectionHeading || defaultBlogPageData.posts_section.sectionHeading,
            sectionDescription: section.props.sectionDescription || defaultBlogPageData.posts_section.sectionDescription
          }
          break
        case 'newsletter':
          blogPageData.newsletter = {
            sectionTitle: section.props.sectionTitle || defaultBlogPageData.newsletter.sectionTitle,
            sectionHeading: section.props.sectionHeading || defaultBlogPageData.newsletter.sectionHeading,
            sectionDescription: section.props.sectionDescription || defaultBlogPageData.newsletter.sectionDescription,
            placeholderText: section.props.placeholderText || defaultBlogPageData.newsletter.placeholderText,
            buttonText: section.props.buttonText || defaultBlogPageData.newsletter.buttonText
          }
          break
      }
    })

    console.log('✅ BLOG SOURCE: DATABASE')
    return NextResponse.json({
      ...blogPageData,
      source: 'database'
    })

  } catch (error) {
    console.error('❌ Error in blog page API:', error)
    return NextResponse.json({
      ...defaultBlogPageData,
      source: 'default'
    })
  }
} 