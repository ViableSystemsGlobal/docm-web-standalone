import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: eventId } = await params

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching event with ID:', eventId)

    const supabase = createServerSupabaseClient()
    
    // First try simple query without joins
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error) {
      console.error('❌ Error fetching event:', error)
      return NextResponse.json(
        { error: 'Event not found', details: error.message },
        { status: 404 }
      )
    }

    if (!event) {
      console.log('❌ No event found with ID:', eventId)
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    console.log('✅ Event fetched successfully:', event.name)

    // Try to get images separately
    const { data: images } = await supabase
      .from('event_images')
      .select('*')
      .eq('event_id', eventId)

    console.log('📸 Images found:', images ? images.length : 0)

    // Set primary image (first image with lowest sort_order, or first image if no sort_order)
    let primaryImage = null
    if (images && images.length > 0) {
      // Sort by sort_order if available, otherwise use the first image
      const sortedImages = images.sort((a, b) => {
        if (a.sort_order !== null && b.sort_order !== null) {
          return a.sort_order - b.sort_order
        }
        if (a.sort_order !== null) return -1
        if (b.sort_order !== null) return 1
        return 0
      })
      primaryImage = sortedImages[0]
    }

    return NextResponse.json({
      success: true,
      event: {
        ...event,
        images: images || [],
        primary_image: primaryImage
      }
    })

  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 