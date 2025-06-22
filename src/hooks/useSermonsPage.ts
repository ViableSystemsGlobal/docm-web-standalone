'use client'

import { useState, useEffect } from 'react'

// Define the expected section types for sermons page
export interface SermonsPageData {
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

interface UseSermonsPageReturn {
  sermonsPage: SermonsPageData
  loading: boolean
  error: string | null
  source: 'database' | 'default'
}

// Default fallback data
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

export function useSermonsPage(): UseSermonsPageReturn {
  const [sermonsPage, setSermonsPage] = useState<SermonsPageData>(defaultSermonsPageData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'database' | 'default'>('default')

  useEffect(() => {
    const fetchSermonsPage = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/sermons-page', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.sermonsPage) {
          setSermonsPage(data.sermonsPage)
          setSource(data.source || 'default')
        } else {
          console.warn('No sermons page data received, using defaults')
          setSermonsPage(defaultSermonsPageData)
          setSource('default')
        }
      } catch (err) {
        console.error('Error fetching sermons page:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setSermonsPage(defaultSermonsPageData)
        setSource('default')
      } finally {
        setLoading(false)
      }
    }

    fetchSermonsPage()
  }, [])

  return {
    sermonsPage,
    loading,
    error,
    source
  }
} 