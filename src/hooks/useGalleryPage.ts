'use client'

import { useState, useEffect } from 'react'

interface GalleryPageHero {
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

interface GalleryPageSection {
  sectionTitle: string
  sectionHeading: string
  sectionDescription: string
}

interface GalleryPageContent {
  hero: GalleryPageHero
  photo_galleries: GalleryPageSection
  video_galleries: GalleryPageSection
}

interface UseGalleryPageResult {
  galleryPage: GalleryPageContent
  loading: boolean
  error: string | null
  source: 'database' | 'default'
}

export function useGalleryPage(): UseGalleryPageResult {
  const [galleryPage, setGalleryPage] = useState<GalleryPageContent>({
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
  })
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'database' | 'default'>('default')

  useEffect(() => {
    async function fetchGalleryPage() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/gallery-page')
        const data = await response.json()
        
        if (data.galleryPage) {
          setGalleryPage(data.galleryPage)
          setSource(data.source || 'default')
        }
        
        if (data.error) {
          setError(data.error)
        }
      } catch (err) {
        console.error('Error fetching gallery page:', err)
        setError('Failed to load gallery page content')
        setSource('default')
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryPage()
  }, [])

  return {
    galleryPage,
    loading,
    error,
    source
  }
} 