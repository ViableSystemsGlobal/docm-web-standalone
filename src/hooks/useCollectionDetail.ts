'use client'

import { useState, useEffect } from 'react'

interface MediaItem {
  id: string
  collection_name: string
  collection_category: string
  collection_date: string | null
  description: string | null
  type: string
  url: string
  uploaded_at: string
  alt_text: string
}

interface Collection {
  id: string
  name: string
  category: string
  date: string
  description: string
  totalItems: number
  photoCount: number
  videoCount: number
}

interface UseCollectionDetailResult {
  collection: Collection | null
  mediaItems: MediaItem[]
  photos: MediaItem[]
  videos: MediaItem[]
  loading: boolean
  error: string | null
}

export function useCollectionDetail(collectionId: string): UseCollectionDetailResult {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [photos, setPhotos] = useState<MediaItem[]>([])
  const [videos, setVideos] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollectionDetail() {
      if (!collectionId) return

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/media-collections/${encodeURIComponent(collectionId)}`)
        const data = await response.json()
        
        if (response.ok && data.collection) {
          setCollection(data.collection)
          setMediaItems(data.mediaItems || [])
          setPhotos(data.photos || [])
          setVideos(data.videos || [])
        } else {
          setError(data.error || 'Collection not found')
        }
        
      } catch (err) {
        console.error('Error fetching collection detail:', err)
        setError('Failed to load collection details')
      } finally {
        setLoading(false)
      }
    }

    fetchCollectionDetail()
  }, [collectionId])

  return {
    collection,
    mediaItems,
    photos,
    videos,
    loading,
    error
  }
} 