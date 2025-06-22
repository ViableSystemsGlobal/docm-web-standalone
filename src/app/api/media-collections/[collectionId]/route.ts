import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

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

export async function GET(
  request: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    const { collectionId } = params
    
    const supabase = createServerSupabaseClient()

    // Try multiple collection name formats to find a match
    const possibleNames = [
      collectionId,
      collectionId.charAt(0).toUpperCase() + collectionId.slice(1),
      collectionId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ]

    // Query to find collections with the correct field names
    const { data: mediaItems, error } = await supabase
      .from('media_library')
      .select('id, collection_name, collection_category, collection_date, description, type, url, uploaded_at, alt_text')
      .in('collection_name', possibleNames)
      .order('uploaded_at', { ascending: true })

    if (error) {
      console.error('Error fetching collection media:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch collection media',
        collection: null,
        mediaItems: []
      }, { status: 500 })
    }

    if (!mediaItems || mediaItems.length === 0) {
      return NextResponse.json({ 
        error: 'Collection not found',
        collection: null,
        mediaItems: []
      }, { status: 404 })
    }

    // Get collection info from first item
    const firstItem = mediaItems[0]
    const collection = {
      id: collectionId,
      name: firstItem.collection_name,
      category: firstItem.collection_category || 'Uncategorized',
      date: firstItem.collection_date || '',
      description: firstItem.description || '',
      totalItems: mediaItems.length,
      photoCount: mediaItems.filter(item => item.type === 'image').length,
      videoCount: mediaItems.filter(item => item.type === 'video').length
    }

    // Group media by type for easier handling
    const photos = mediaItems.filter(item => item.type === 'image')
    const videos = mediaItems.filter(item => item.type === 'video')

    return NextResponse.json({
      collection,
      mediaItems,
      photos,
      videos,
      source: 'database'
    })

  } catch (error) {
    console.error('Unhandled error in collection detail API:', error)
    return NextResponse.json(
      { 
        error: 'Server error fetching collection details',
        collection: null,
        mediaItems: []
      },
      { status: 500 }
    )
  }
} 