'use client'

import { useState, useEffect } from 'react'

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

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface UseBlogsParams {
  page?: number
  limit?: number
  status?: string
  search?: string
  category?: string
}

interface UseBlogsResult {
  blogs: Blog[]
  pagination: Pagination
  loading: boolean
  error: string | null
  source: string
  refetch: () => void
  setPage: (page: number) => void
  setSearch: (search: string) => void
  setCategory: (category: string) => void
}

export function useBlogs(params: UseBlogsParams = {}): UseBlogsResult {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>('default')
  
  // Internal state for search params
  const [currentPage, setCurrentPage] = useState(params.page || 1)
  const [currentSearch, setCurrentSearch] = useState(params.search || '')
  const [currentCategory, setCurrentCategory] = useState(params.category || '')

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: (params.limit || 12).toString(),
        status: params.status || 'published'
      })
      
      if (currentSearch.trim()) {
        searchParams.append('search', currentSearch.trim())
      }
      
      if (currentCategory.trim()) {
        searchParams.append('category', currentCategory.trim())
      }
      
      const response = await fetch(`/api/blogs?${searchParams.toString()}`)
      const data = await response.json()
      
      setBlogs(data.blogs || [])
      setPagination(data.pagination || pagination)
      setSource(data.source || 'default')
      
    } catch (err) {
      console.error('Error fetching blogs:', err)
      setError('Failed to load blog posts')
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch blogs when dependencies change
  useEffect(() => {
    fetchBlogs()
  }, [currentPage, currentSearch, currentCategory, params.limit, params.status])

  const setPage = (page: number) => {
    setCurrentPage(page)
  }

  const setSearch = (search: string) => {
    setCurrentSearch(search)
    setCurrentPage(1) // Reset to first page when searching
  }

  const setCategory = (category: string) => {
    setCurrentCategory(category)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const refetch = () => {
    fetchBlogs()
  }

  return {
    blogs,
    pagination,
    loading,
    error,
    source,
    refetch,
    setPage,
    setSearch,
    setCategory
  }
} 