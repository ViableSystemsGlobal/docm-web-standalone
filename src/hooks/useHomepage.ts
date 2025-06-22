import { useState, useEffect } from 'react'

interface HomepageContent {
  hero: {
    first_line?: string
    title: string
    subtitle: string
    description: string
    cta_primary: { text: string; href: string }
    cta_secondary: { text: string; href: string }
    background_video?: string
    background_image?: string
  }
  events_carousel: {
    title: string
    subtitle: string
    description: string
    show_events: boolean
    events_limit: number
  }
  testimonials: {
    title: string
    subtitle: string
    featured_testimonials: Array<{
      name: string
      role: string
      quote: string
      has_video: boolean
      video_url?: string
      image_url?: string
    }>
  }
  our_story: {
    first_line: string
    main_header: string
    paragraph_text: string
    media_url?: string
    media_type: string
    button_text?: string
    button_link?: string
    button_style?: string
    stats: Array<{
      number: string
      label: string
      icon?: string
    }>
    ministry_highlights: Array<{
      title: string
      video_url?: string
      description: string
    }>
    community_impact: {
      title: string
      video_url?: string
      description: string
    }
  }
  sermon_preview: {
    title: string
    subtitle: string
    featured_sermon: {
      title: string
      speaker: string
      date: string
      description: string
    }
  }
}

interface HomepageResponse {
  homepage: HomepageContent
  source: 'database' | 'default'
  message: string
}

// Default homepage content - SAME pattern as navigation
const defaultHomepage: HomepageContent = {
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
    first_line: "First Line of Our Story",
    main_header: "Main Header of Our Story",
    paragraph_text: "Paragraph text of our story",
    media_url: "https://example.com/story-media.mp4",
    media_type: "video",
    button_text: "Read More",
    button_link: "/our-story",
    button_style: "primary",
    stats: [
      { number: "100", label: "Members", icon: "👥" },
      { number: "50", label: "Events", icon: "📅" },
      { number: "20", label: "Years", icon: "📅" }
    ],
    ministry_highlights: [
      { title: "Ministry Highlight 1", video_url: "https://example.com/highlight1.mp4", description: "Description of Ministry Highlight 1" },
      { title: "Ministry Highlight 2", video_url: "https://example.com/highlight2.mp4", description: "Description of Ministry Highlight 2" }
    ],
    community_impact: {
      title: "Community Impact",
      video_url: "https://example.com/impact.mp4",
      description: "Description of community impact"
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

export function useHomepage() {
  // SAME state structure as navigation
  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepage)
  const [loading, setLoading] = useState(false) // Start with false since we have default data
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'default' | 'database'>('default')
  const [message, setMessage] = useState<string>('Using default homepage')

  useEffect(() => {
    async function fetchHomepage() {
      setLoading(true)
      
      try {
        const response = await fetch('/api/homepage', {
          cache: 'no-store' // SAME cache strategy as navigation
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data: HomepageResponse = await response.json()
        
        if (data.homepage) {
          setHomepage(data.homepage)
          setSource(data.source || 'default')
          setMessage(data.message || 'Homepage loaded')
          setError(null) // Clear any previous errors
          
          // SAME console logging as navigation
          console.log(`🎯 Homepage Source: ${data.source?.toUpperCase()} - ${data.message}`)
        } else {
          // SAME fallback logic as navigation
          console.log('No homepage found, using default homepage')
          setHomepage(defaultHomepage)
          setSource('default')
          setMessage('Using default homepage - No content found')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load homepage'
        setError(errorMessage)
        console.log('Homepage fetch failed, using default homepage:', errorMessage)
        
        // SAME error handling as navigation
        setHomepage(defaultHomepage)
        setSource('default')
        setMessage('Using default homepage - Fetch failed')
      } finally {
        setLoading(false)
      }
    }

    fetchHomepage()
  }, [])

  return { homepage, loading, error, source, message }
} 