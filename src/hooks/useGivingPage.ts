'use client'

import { useState, useEffect } from 'react'

export interface FundDesignation {
  id: string
  name: string
  description: string
}

export interface GivingPageData {
  hero: {
    first_line_text: string
    heading: string
    subheading: string
    background_image?: string | null
    cta_primary: string
    cta_secondary: string
  }
  fund_designations: FundDesignation[]
  source: string
}

export function useGivingPage() {
  const [data, setData] = useState<GivingPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGivingPage = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/giving-page')
        
        if (!response.ok) {
          throw new Error('Failed to fetch giving page data')
        }

        const givingData = await response.json()
        setData(givingData)
      } catch (err) {
        console.error('Error fetching giving page:', err)
        setError(err instanceof Error ? err.message : 'Failed to load giving page')
        
        // Set fallback data
        setData({
          hero: {
            first_line_text: "Give",
            heading: "Your generosity changes lives.",
            subheading: "Through your faithful giving, we're able to serve our community, support missions, and further God's kingdom. Every gift, large or small, makes a meaningful difference.",
            cta_primary: "Make a Donation",
            cta_secondary: "Learn More"
          },
          fund_designations: [
            { id: 'general', name: 'General Fund', description: 'Supports overall church operations and ministries' },
            { id: 'building', name: 'Building Fund', description: 'Facility improvements and expansion projects' },
            { id: 'missions', name: 'Missions', description: 'Supporting missionaries and outreach efforts' },
            { id: 'youth', name: 'Youth Ministry', description: 'Programs and activities for young people' },
            { id: 'children', name: 'Children\'s Ministry', description: 'Kids programs and Sunday school' },
            { id: 'outreach', name: 'Community Outreach', description: 'Local community service and support' }
          ],
          source: 'fallback'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGivingPage()
  }, [])

  return { data, loading, error }
} 