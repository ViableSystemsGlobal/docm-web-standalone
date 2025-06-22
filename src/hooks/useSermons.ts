import { useState, useEffect } from 'react'

interface Sermon {
  id: string
  title: string
  slug: string
  description: string
  speaker: string
  series?: string
  scripture_reference?: string
  sermon_date: string
  duration?: number
  video_type: 'upload' | 'youtube'
  video_url?: string
  youtube_url?: string
  youtube_id?: string
  audio_url?: string
  thumbnail_image?: string
  tags: string[]
  status: string
  view_count: number
}

interface UseSermonsResult {
  sermons: Sermon[]
  loading: boolean
  error: string | null
  source: 'database' | 'default'
  featuredSermon: Sermon | null
  recentSermons: Sermon[]
}

export function useSermons(limit: number = 10): UseSermonsResult {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'database' | 'default'>('default')

  useEffect(() => {
    async function fetchSermons() {
      try {
        setLoading(true)
        const response = await fetch(`/api/sermons?limit=${limit}`, {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.sermons) {
          setSermons(data.sermons)
          setSource(data.source || 'default')
          setError(null)
          
          console.log(`🎯 Sermons Source: ${data.source?.toUpperCase()} - ${data.message}`)
        } else {
          console.log('No sermons found, using empty array')
          setSermons([])
          setSource('default')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load sermons'
        setError(errorMessage)
        console.log('Sermons fetch failed:', errorMessage)
        
        setSermons([])
        setSource('default')
      } finally {
        setLoading(false)
      }
    }

    fetchSermons()
  }, [limit])

  // Get featured sermon (first one) and recent sermons (rest)
  const featuredSermon = sermons.length > 0 ? sermons[0] : null
  const recentSermons = sermons.length > 1 ? sermons.slice(1) : []

  return { 
    sermons, 
    loading, 
    error, 
    source, 
    featuredSermon,
    recentSermons
  }
} 