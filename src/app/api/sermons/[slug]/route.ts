import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Utility function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 SERMON DETAIL SOURCE: DEFAULT (Supabase not configured)')
      
      // Return a default sermon for demo purposes
      const defaultSermon = {
        id: 'default-1',
        title: 'Finding Your Purpose in God\'s Plan',
        slug: 'finding-purpose-gods-plan',
        description: 'Discover how God has a unique plan and purpose for your life, and learn practical steps to align your goals with His will. In this powerful message, we explore the depths of God\'s calling on your life and how to walk confidently in His perfect timing.',
        speaker: 'Pastor Michael Johnson',
        series: 'Life Purpose',
        scripture_reference: 'Jeremiah 29:11',
        sermon_date: '2024-01-21',
        duration: 45,
        video_type: 'youtube',
        video_url: '',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        youtube_id: 'dQw4w9WgXcQ',
        audio_url: '',
        thumbnail_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        transcript: '',
        notes: 'Key Points:\n\n1. God has a unique plan for each person\n2. Trusting in His timing is essential\n3. Prayer and scripture study reveal His will\n4. Community helps us stay accountable\n\nReflection Questions:\n- How can I better align my goals with God\'s will?\n- What steps can I take to trust His timing more fully?',
        tags: ['purpose', 'calling', 'faith', 'planning', 'trust'],
        status: 'published',
        view_count: 245,
        seo_meta: {},
        created_at: '2024-01-21T10:00:00Z',
        updated_at: '2024-01-21T10:00:00Z'
      }
      
      return NextResponse.json({
        success: true,
        sermon: defaultSermon,
        source: 'default',
        message: 'Using default sermon - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 SERMON DETAIL SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    console.log('🔍 Attempting to fetch sermon by slug:', slug)

    // First try to find by exact slug match
    let { data: sermon, error } = await supabase
      .from('sermons')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    // If not found by slug, try to find by generated slug from title
    if (error && error.code === 'PGRST116') {
      console.log('🔍 Sermon not found by slug, searching by title...')
      
      const { data: sermons, error: searchError } = await supabase
        .from('sermons')
        .select('*')
        .eq('status', 'published')

      if (!searchError && sermons) {
        // Find sermon where generated slug matches the requested slug
        sermon = sermons.find(s => generateSlug(s.title) === slug) || null
        if (!sermon) {
          error = { code: 'PGRST116' } as any
        } else {
          error = null
        }
      }
    }

    if (error && error.code === 'PGRST116') {
      console.log('❌ Sermon not found:', slug)
      return NextResponse.json({ error: 'Sermon not found' }, { status: 404 })
    }

    if (error) {
      console.error('❌ Database error fetching sermon:', error)
      return NextResponse.json({ error: 'Failed to fetch sermon' }, { status: 500 })
    }

    if (!sermon) {
      return NextResponse.json({ error: 'Sermon not found' }, { status: 404 })
    }

    console.log('✅ SERMON DETAIL SOURCE: DATABASE (Successfully loaded from database)')
    console.log('📊 Sermon details:', {
      id: sermon.id,
      title: sermon.title,
      slug: sermon.slug,
      speaker: sermon.speaker,
      series: sermon.series
    })

    return NextResponse.json({
      success: true,
      sermon: {
        ...sermon,
        tags: sermon.tags || []
      },
      source: 'database'
    })

  } catch (error) {
    console.error('❌ Unexpected error in sermon detail API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 