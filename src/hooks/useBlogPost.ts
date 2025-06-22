'use client'

import { useState, useEffect } from 'react'

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

interface UseBlogPostResult {
  blog: BlogPost | null
  loading: boolean
  error: string | null
  source: string
}

export function useBlogPost(slug: string): UseBlogPostResult {
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>('default')

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    async function fetchBlogPost() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found')
          }
          throw new Error('Failed to fetch blog post')
        }
        
        const data = await response.json()
        
        setBlog(data.blog)
        setSource(data.source || 'default')
        
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError(err instanceof Error ? err.message : 'Failed to load blog post')
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  return {
    blog,
    loading,
    error,
    source
  }
} 