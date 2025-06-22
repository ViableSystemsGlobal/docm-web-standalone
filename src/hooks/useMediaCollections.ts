'use client'

import { useState, useEffect } from 'react'

interface MediaCollection {
  id: string
  title: string
  category: string
  date: string
  description: string
  photoCount: number
  videoCount: number
  totalCount: number
  coverImage: string | null
  mediaUrls: string[]
  createdAt: string
  gradient: string
}

interface UseMediaCollectionsResult {
  collections: MediaCollection[]
  loading: boolean
  error: string | null
  source: 'database' | 'error' | 'loading'
}

export function useMediaCollections(type?: 'image' | 'video' | 'mixed', limit?: number): UseMediaCollectionsResult {
  const [collections, setCollections] = useState<MediaCollection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'database' | 'error' | 'loading'>('loading')

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true)
        setError(null)
        setSource('loading')
        
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (limit) params.append('limit', limit.toString())
        
        const response = await fetch(`/api/media-collections?${params.toString()}`)
        const data = await response.json()
        
        if (data.collections) {
          setCollections(data.collections)
          setSource(data.source || 'database')
        }
        
        if (data.message && data.collections.length === 0) {
          console.log('Media Collections:', data.message)
        }
        
      } catch (err) {
        console.error('Error fetching media collections:', err)
        setError('Failed to load media collections')
        setSource('error')
        setCollections([])
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [type, limit])

  return {
    collections,
    loading,
    error,
    source
  }
} 