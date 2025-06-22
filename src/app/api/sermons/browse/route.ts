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

// Default sermons fallback data for browse page
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
  },
  {
    id: 'default-4',
    title: 'The Power of Prayer',
    slug: 'power-of-prayer',
    description: 'Learn how to develop a powerful prayer life that transforms both you and your circumstances.',
    speaker: 'Pastor Sarah Williams',
    series: 'Prayer Life',
    scripture_reference: 'Matthew 6:9-13',
    sermon_date: '2023-12-31',
    duration: 35,
    video_type: 'youtube',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    thumbnail_image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=600&fit=crop',
    tags: ['prayer', 'spiritual discipline', 'communion'],
    status: 'published',
    view_count: 203
  },
  {
    id: 'default-5',
    title: 'God\'s Grace in Trials',
    slug: 'gods-grace-trials',
    description: 'Finding hope and strength in God\'s sufficient grace during life\'s most difficult moments.',
    speaker: 'Pastor Michael Johnson',
    series: 'Grace & Truth',
    scripture_reference: '2 Corinthians 12:9',
    sermon_date: '2023-12-24',
    duration: 40,
    video_type: 'youtube',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    thumbnail_image: 'https://images.unsplash.com/photo-1500479694472-551d1fb19407?w=800&h=600&fit=crop',
    tags: ['grace', 'trials', 'perseverance'],
    status: 'published',
    view_count: 134
  },
  {
    id: 'default-6',
    title: 'Building Community',
    slug: 'building-community',
    description: 'Creating authentic relationships and fostering genuine fellowship within the church family.',
    speaker: 'Pastor David Chen',
    series: 'Community Life',
    scripture_reference: 'Acts 2:42-47',
    sermon_date: '2023-12-17',
    duration: 33,
    video_type: 'youtube',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    thumbnail_image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop',
    tags: ['community', 'fellowship', 'relationships'],
    status: 'published',
    view_count: 167
  }
]

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const searchQuery = searchParams.get('search') || ''
    const seriesFilter = searchParams.get('series') || ''
    const speakerFilter = searchParams.get('speaker') || ''
    
    // Environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 SERMONS BROWSE SOURCE: DEFAULT (Supabase not configured)')
      
      // Apply filters to default data
      let filteredSermons = defaultSermons
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredSermons = filteredSermons.filter(sermon =>
          sermon.title.toLowerCase().includes(query) ||
          sermon.description.toLowerCase().includes(query) ||
          sermon.speaker.toLowerCase().includes(query) ||
          sermon.series?.toLowerCase().includes(query)
        )
      }
      
      if (seriesFilter) {
        filteredSermons = filteredSermons.filter(sermon => sermon.series === seriesFilter)
      }
      
      if (speakerFilter) {
        filteredSermons = filteredSermons.filter(sermon => sermon.speaker === speakerFilter)
      }
      
      // Pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedSermons = filteredSermons.slice(startIndex, endIndex)
      
      return NextResponse.json({ 
        sermons: paginatedSermons,
        total: filteredSermons.length,
        page,
        limit,
        allSermons: defaultSermons, // For filter options
        source: 'default',
        message: 'Using default sermons - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 SERMONS BROWSE SOURCE: DEFAULT (Supabase client creation failed)')
      
      // Apply basic filtering to default data
      let filteredSermons = defaultSermons
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedSermons = filteredSermons.slice(startIndex, endIndex)
      
      return NextResponse.json({ 
        sermons: paginatedSermons,
        total: filteredSermons.length,
        page,
        limit,
        allSermons: defaultSermons,
        source: 'default',
        message: 'Using default sermons - Supabase client failed'
      })
    }

    console.log('🔍 Attempting to fetch all sermons from database for browsing...')
    
    // First, get all sermons for filter options (without pagination)
    const { data: allSermons, error: allError } = await supabase
      .from('sermons')
      .select('series, speaker')
      .eq('status', 'published')

    if (allError) {
      console.error('Error fetching all sermons for filters:', allError)
    }

    // Build the main query with filters
    let query = supabase
      .from('sermons')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('sermon_date', { ascending: false })

    // Apply search filter
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,speaker.ilike.%${searchQuery}%,series.ilike.%${searchQuery}%`)
    }

    // Apply series filter
    if (seriesFilter) {
      query = query.eq('series', seriesFilter)
    }

    // Apply speaker filter
    if (speakerFilter) {
      query = query.eq('speaker', speakerFilter)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    query = query.range(startIndex, startIndex + limit - 1)

    const { data: sermons, error, count } = await query

    console.log('📊 Sermons browse database query result:', {
      sermons: sermons,
      error: error,
      count: count,
      sermonsLength: sermons ? sermons.length : 0,
      page,
      limit,
      searchQuery,
      seriesFilter,
      speakerFilter
    })

    if (error) {
      console.error('🔄 SERMONS BROWSE SOURCE: DEFAULT (Database error):', error.message)
      
      // Apply basic filtering to default data
      let filteredSermons = defaultSermons
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedSermons = filteredSermons.slice(startIndex, endIndex)
      
      return NextResponse.json({ 
        sermons: paginatedSermons,
        total: filteredSermons.length,
        page,
        limit,
        allSermons: defaultSermons,
        source: 'default',
        message: `Using default sermons - Database error: ${error.message}`
      })
    }

    if (!sermons || sermons.length === 0) {
      console.log('🔄 No sermons found with current filters')
      return NextResponse.json({ 
        sermons: [],
        total: 0,
        page,
        limit,
        allSermons: allSermons || [],
        source: 'database',
        message: 'No sermons found with current filters'
      })
    }

    console.log('✅ SERMONS BROWSE SOURCE: DATABASE (Successfully loaded from database)')
    return NextResponse.json({ 
      sermons: sermons,
      total: count || 0,
      page,
      limit,
      allSermons: allSermons || [],
      source: 'database',
      message: `Loaded ${sermons.length} sermons from database (page ${page})`
    })

  } catch (error) {
    console.error('🔄 SERMONS BROWSE SOURCE: DEFAULT (Unexpected error):', error)
    
    // Fallback to default data with basic pagination
    const page = parseInt(new URL(request.url).searchParams.get('page') || '1')
    const limit = parseInt(new URL(request.url).searchParams.get('limit') || '12')
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedSermons = defaultSermons.slice(startIndex, endIndex)
    
    return NextResponse.json({ 
      sermons: paginatedSermons,
      total: defaultSermons.length,
      page,
      limit,
      allSermons: defaultSermons,
      source: 'default',
      message: 'Using default sermons - Unexpected error'
    })
  }
} 