import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

interface MediaItem {
  collection_name: string
  collection_category: string
  collection_date: string
  description: string
  type: string
  url: string
  uploaded_at: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'image', 'video', 'mixed'
    const limit = parseInt(searchParams.get('limit') || '20')

    const supabase = createServerSupabaseClient()

    // Base query to get collections grouped by collection_name
    let query = supabase
      .from('media_library')
      .select(`
        collection_name,
        collection_category,
        collection_date,
        description,
        type,
        url,
        uploaded_at
      `)
      .filter('collection_name', 'not.is', null)

    // Filter by media type
    if (type && type !== 'mixed') {
      query = query.eq('type', type)
    }

    const { data: mediaData, error } = await query
    
    if (error) {
      console.error('Error fetching media collections:', error)
      return NextResponse.json({ 
        collections: [],
        total: 0,
        source: 'error',
        message: 'Failed to fetch collections from database'
      })
    }

    // Return empty array if no data
    if (!mediaData || mediaData.length === 0) {
      return NextResponse.json({ 
        collections: [],
        total: 0,
        source: 'database',
        message: 'No collections found in database'
      })
    }

    // Group media by collection_name
    const collectionsMap = new Map()

    mediaData.forEach((item: MediaItem) => {
      const collectionName = item.collection_name
      
      if (!collectionsMap.has(collectionName)) {
        collectionsMap.set(collectionName, {
          id: collectionName.toLowerCase().replace(/\s+/g, '-'),
          title: collectionName,
          category: item.collection_category,
          date: item.collection_date,
          description: item.description,
          photoCount: 0,
          videoCount: 0,
          totalCount: 0,
          coverImage: null,
          mediaUrls: [],
          createdAt: item.uploaded_at,
          gradient: getRandomGradient() // For styling consistency
        })
      }

      const collection = collectionsMap.get(collectionName)
      
      // Count media types
      if (item.type === 'image') {
        collection.photoCount++
        // Use first image as cover if none set
        if (!collection.coverImage) {
          collection.coverImage = item.url
        }
      } else if (item.type === 'video') {
        collection.videoCount++
        // Use first video as cover if no image cover
        if (!collection.coverImage && collection.photoCount === 0) {
          collection.coverImage = item.url
        }
      }
      
      collection.totalCount = collection.photoCount + collection.videoCount
      collection.mediaUrls.push(item.url)
      
      // Update createdAt to be the latest upload date for sorting
      if (new Date(item.uploaded_at) > new Date(collection.createdAt)) {
        collection.createdAt = item.uploaded_at
      }
    })

    // Convert map to array and sort by date (newest first)
    let collections = Array.from(collectionsMap.values())
    collections.sort((a, b) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime())

    // Limit results
    collections = collections.slice(0, limit)

    return NextResponse.json({
      collections,
      total: collections.length,
      source: 'database',
      message: `Found ${collections.length} collections from database`
    })

  } catch (error) {
    console.error('Unhandled error in media collections API:', error)
    return NextResponse.json(
      { 
        collections: [],
        total: 0,
        source: 'error',
        message: 'Server error fetching collections'
      },
      { status: 500 }
    )
  }
}

// Helper function to generate random gradients for visual consistency
function getRandomGradient(): string {
  const gradients = [
    "from-blue-600 to-purple-700",
    "from-green-600 to-teal-700", 
    "from-orange-600 to-red-700",
    "from-purple-600 to-pink-700",
    "from-cyan-600 to-blue-700",
    "from-indigo-600 to-purple-700",
    "from-pink-600 to-purple-700",
    "from-yellow-600 to-orange-700"
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
} 