import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  author: string
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  tags: string[]
  seo_meta: {
    title?: string
    description?: string
    keywords?: string[]
  }
  created_at: string
  updated_at: string
}

export interface BlogsResponse {
  blogs: Blog[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  source: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const status = searchParams.get('status') || 'published'
    const searchQuery = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''

    console.log(`🔍 Fetching blogs - Page: ${page}, Limit: ${limit}, Status: ${status}`)

    const supabase = createServerSupabaseClient()

    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .eq('status', status)
      .order('published_at', { ascending: false })

    // Apply search filter if provided
    if (searchQuery.trim()) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`)
    }

    // Apply category filter (using tags array)
    if (category.trim()) {
      query = query.contains('tags', [category])
    }

    // Apply pagination
    const from = (page - 1) * limit
    query = query.range(from, from + limit - 1)

    const { data: blogs, error, count } = await query

    if (error) {
      console.error('❌ Error fetching blogs:', error)
      throw error
    }

    const total = count || 0
    const totalPages = Math.ceil(total / limit)

    const response: BlogsResponse = {
      blogs: blogs || [],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      source: 'database'
    }

    console.log(`✅ Successfully fetched ${blogs?.length || 0} blogs (${total} total)`)
    return NextResponse.json(response)

  } catch (error) {
    console.error('❌ Error in blogs API:', error)
    
    // Return fallback data
    const fallbackBlogs: Blog[] = [
      {
        id: '1',
        title: 'Walking with Purpose',
        slug: 'walking-with-purpose',
        content: 'Discovering God\'s unique calling for your life and stepping boldly into His purpose. In this journey of faith, we often find ourselves asking...',
        excerpt: 'Discovering God\'s unique calling for your life and stepping boldly into His purpose.',
        featured_image: '',
        author: 'Sarah Williams',
        status: 'published',
        published_at: '2023-12-15T00:00:00Z',
        tags: ['Purpose', 'Faith'],
        seo_meta: {},
        created_at: '2023-12-15T00:00:00Z',
        updated_at: '2023-12-15T00:00:00Z'
      },
      {
        id: '2',
        title: 'Grace in Everyday Moments',
        slug: 'grace-in-everyday-moments',
        content: 'How to recognize and embrace God\'s grace in the ordinary moments of daily life...',
        excerpt: 'How to recognize and embrace God\'s grace in the ordinary moments of daily life.',
        featured_image: '',
        author: 'Michael Johnson',
        status: 'published',
        published_at: '2023-12-14T00:00:00Z',
        tags: ['Grace', 'Daily Life'],
        seo_meta: {},
        created_at: '2023-12-14T00:00:00Z',
        updated_at: '2023-12-14T00:00:00Z'
      }
    ]

    const page = parseInt(new URL(request.url).searchParams.get('page') || '1')
    const limit = parseInt(new URL(request.url).searchParams.get('limit') || '12')

    return NextResponse.json({
      blogs: fallbackBlogs,
      pagination: {
        page,
        limit,
        total: fallbackBlogs.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      },
      source: 'fallback'
    })
  }
} 