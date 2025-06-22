'use client'

import { useState, useEffect } from 'react'

interface BlogPageData {
  hero: {
    first_line_text: string
    heading: string
    subheading: string
    backgroundImage: string
    backgroundMedia?: {
      url: string
      type: 'image' | 'video'
      alt_text?: string
    }
    ctaButtons: Array<{
      text: string
      link: string
      style: 'primary' | 'secondary'
    }>
  }
  posts_section: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
  }
  newsletter: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
    placeholderText: string
    buttonText: string
  }
}

interface UseBlogPageResult {
  blogPage: BlogPageData
  loading: boolean
  error: string | null
  source: string
}

const defaultBlogPageData: BlogPageData = {
  hero: {
    first_line_text: "Blog",
    heading: "Words that inspire faith.",
    subheading: "Discover inspiring articles, personal testimonies, and thoughtful reflections that will encourage your faith journey and deepen your relationship with God.",
    backgroundImage: "",
    ctaButtons: [
      {
        text: "Read Articles",
        link: "#featured-posts",
        style: "primary"
      },
      {
        text: "Browse Topics",
        link: "#blog-categories",
        style: "secondary"
      }
    ]
  },
  posts_section: {
    sectionTitle: "Recent Articles",
    sectionHeading: "All Posts",
    sectionDescription: "Stay up to date with fresh insights, personal stories, and practical wisdom for your faith journey"
  },
  newsletter: {
    sectionTitle: "Stay Connected",
    sectionHeading: "Never miss an update",
    sectionDescription: "Subscribe to our newsletter and get the latest blog posts delivered straight to your inbox.",
    placeholderText: "Enter your email address",
    buttonText: "Subscribe"
  }
}

export function useBlogPage(): UseBlogPageResult {
  const [blogPage, setBlogPage] = useState<BlogPageData>(defaultBlogPageData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>('default')

  useEffect(() => {
    async function fetchBlogPage() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/blog-page')
        const data = await response.json()
        
        setBlogPage(data)
        setSource(data.source || 'default')
        
      } catch (err) {
        console.error('Error fetching blog page:', err)
        setError('Failed to load blog page content')
        setBlogPage(defaultBlogPageData)
        setSource('default')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPage()
  }, [])

  return {
    blogPage,
    loading,
    error,
    source
  }
} 