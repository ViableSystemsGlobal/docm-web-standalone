import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Sermon interface for web app
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

// Default sermons fallback data
const defaultSermons: Sermon[] = [
  {
    id: 'default-1',
    title: 'Finding Your Purpose in God\'s Plan',
    slug: 'finding-purpose-gods-plan',
    description: 'Discover how God has a unique plan and purpose for your life, and learn practical steps to align your goals with His will.',
    speaker: 'Pastor Michael Johnson',
    series: 'Life Purpose',
    scripture_reference: 'Jeremiah 29:11',
    sermon_date: '2024-01-21',
    duration: 45,
    video_type: 'youtube',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    thumbnail_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    tags: ['purpose', 'calling', 'faith'],
    status: 'published',
    view_count: 245
  },
  {
    id: 'default-2',
    title: 'Walking in Faith',
    slug: 'walking-in-faith',
    description: 'Building unshakeable faith in uncertain times through trust in God\'s promises.',
    speaker: 'Pastor Sarah Johnson',
    series: 'Faith Foundations',
    scripture_reference: 'Hebrews 11:1',
    sermon_date: '2024-01-14',
    duration: 38,
    video_type: 'youtube',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    thumbnail_image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop',
    tags: ['faith', 'trust', 'hope'],
    status: 'published',
    view_count: 189
  },
  {
    id: 'default-3',
    title: 'Love in Action',
    slug: 'love-in-action',
    description: 'Demonstrating Christ\'s love through practical service and compassion.',
    speaker: 'Pastor Michael Chen',
    series: 'Living Love',
    scripture_reference: '1 John 3:18',
    sermon_date: '2024-01-07',
    duration: 42,
    video_type: 'youtube',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    thumbnail_image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
    tags: ['love', 'service', 'compassion'],
    status: 'published',
    view_count: 156
  }
]

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '3')
    const featured = searchParams.get('featured') === 'true'
    
    // Environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 SERMONS SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        sermons: defaultSermons.slice(0, limit),
        source: 'default',
        message: 'Using default sermons - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 SERMONS SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        sermons: defaultSermons.slice(0, limit),
        source: 'default',
        message: 'Using default sermons - Supabase client failed'
      })
    }

    console.log('🔍 Attempting to fetch sermons from database...')
    
    // Fetch sermons from database
    let query = supabase
      .from('sermons')
      .select('*')
      .eq('status', 'published')
      .order('sermon_date', { ascending: false })
      .limit(limit)

    const { data: sermons, error } = await query

    console.log('📊 Database query result:', {
      sermons: sermons,
      error: error,
      sermonsLength: sermons ? sermons.length : 0
    })

    if (error) {
      console.error('🔄 SERMONS SOURCE: DEFAULT (Database error):', error.message)
      return NextResponse.json({ 
        sermons: defaultSermons.slice(0, limit),
        source: 'default',
        message: `Using default sermons - Database error: ${error.message}`
      })
    }

    if (!sermons || sermons.length === 0) {
      console.log('🔄 SERMONS SOURCE: DEFAULT (No sermons found)')
      return NextResponse.json({ 
        sermons: defaultSermons.slice(0, limit),
        source: 'default',
        message: 'Using default sermons - No sermons found in database'
      })
    }

    console.log('✅ SERMONS SOURCE: DATABASE (Successfully loaded from CMS)')
    return NextResponse.json({ 
      sermons: sermons,
      source: 'database',
      message: `Loaded ${sermons.length} sermons from database`
    })

  } catch (error) {
    console.error('🔄 SERMONS SOURCE: DEFAULT (Unexpected error):', error)
    return NextResponse.json({ 
      sermons: defaultSermons.slice(0, 3),
      source: 'default',
      message: 'Using default sermons - Unexpected error'
    })
  }
} 