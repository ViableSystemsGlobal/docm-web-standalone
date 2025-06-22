import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export interface BlogPost {
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

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    console.log(`🔍 Fetching blog post with slug: ${slug}`)

    const supabase = createServerSupabaseClient()

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('❌ Error fetching blog post:', error)
      
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        )
      }
      
      throw error
    }

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    console.log(`✅ Successfully fetched blog post: ${blog.title}`)
    return NextResponse.json({
      blog,
      source: 'database'
    })

  } catch (error) {
    console.error('❌ Error in blog post API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
} 