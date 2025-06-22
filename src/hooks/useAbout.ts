import { useState, useEffect } from 'react'

export type AboutContent = {
  hero: {
    first_line_text: string
    heading: string
    subheading: string
    background_image: string
  }
  our_story: {
    first_line: string
    main_header: string
    paragraph_text: string
    media_url: string
    media_type: 'image' | 'video'
    button_text: string
    button_link: string
    button_style: 'primary' | 'secondary'
    ministry_highlights: Array<{
      title: string
      video_url: string
      description: string
    }>
    community_impact: {
      title: string
      video_url: string
      description: string
    }
  }
  mission_vision: {
    section_title: string
    section_heading: string
    section_description: string
    mission: {
      title: string
      content: string
      items: string[]
      media_url?: string
    }
    vision: {
      title: string
      content: string
      items: string[]
      media_url?: string
    }
    values: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  leadership: {
    title: string
    subtitle: string
    description: string
    team_members: Array<{
      name: string
      position: string
      bio: string
      image_url: string
      social_links: Array<{
        platform: string
        url: string
      }>
      areas_of_ministry?: string[]
    }>
  }
  join_us: {
    title: string
    subtitle: string
    description: string
    cta_primary: {
      text: string
      href: string
    }
    cta_secondary: {
      text: string
      href: string
    }
  }
}

export function useAbout() {
  const [about, setAbout] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'default' | 'database'>('default')

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/about', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('📦 About data received:', {
          source: data.source,
          message: data.message,
          sectionsAvailable: Object.keys(data.about || {})
        })

        setAbout(data.about)
        setSource(data.source)
        setError(null)
      } catch (err) {
        console.error('❌ About fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch about page')
        // Don't set about to null on error, let it stay as the default
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  return { 
    about, 
    loading, 
    error, 
    source,
    refresh: () => {
      setLoading(true)
      setError(null)
      // Re-trigger the effect by calling fetchAbout again
    }
  }
} 