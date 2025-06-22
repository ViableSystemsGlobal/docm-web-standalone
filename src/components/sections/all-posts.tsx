'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBlogPage } from '@/hooks/useBlogPage'
import { useBlogs } from '@/hooks/useBlogs'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  hasNext: boolean
  hasPrev: boolean
}

function Pagination({ currentPage, totalPages, onPageChange, hasNext, hasPrev }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Previous
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Next
      </button>
    </div>
  )
}

export function AllPosts() {
  const { blogPage } = useBlogPage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const { blogs, pagination, loading, error, source, setPage, setSearch, setCategory } = useBlogs({
    limit: 12
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchTerm)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCategory(category)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Recent'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Recent'
    }
  }

  const extractImageFromContent = (content: string) => {
    // Try to extract first image from content if no featured image
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i)
    return imgMatch ? imgMatch[1] : null
  }

  // Get unique categories from blogs
  const categories = Array.from(
    new Set(blogs.flatMap(blog => blog.tags || []))
  ).filter(Boolean)

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {blogPage.posts_section.sectionTitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            {blogPage.posts_section.sectionHeading}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {blogPage.posts_section.sectionDescription}
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            {categories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            )}
          </div>

          {/* Results info */}
          <div className="mt-6 text-sm text-gray-500">
            {loading ? (
              'Loading posts...'
            ) : (
              `Showing ${blogs.length} of ${pagination.total} posts`
            )}
            
            {source === 'database' && blogs.length > 0 && (
              <span className="text-green-600 ml-2">
                ✓ Live from database
              </span>
            )}
            
            {source !== 'database' && (
              <span className="text-amber-600 ml-2">
                Sample data - Add posts in admin panel
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-2xl mb-6"></div>
                <div className="bg-white rounded-2xl p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-2">Error loading blog posts</p>
            <p className="text-gray-500 text-sm">Showing sample data instead</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((post, index) => {
                  const displayImage = post.featured_image || extractImageFromContent(post.content)
                  const gradients = [
                    "from-blue-600 to-purple-700",
                    "from-green-600 to-teal-700", 
                    "from-orange-600 to-red-700",
                    "from-purple-600 to-pink-700",
                    "from-cyan-600 to-blue-700",
                    "from-indigo-600 to-purple-700"
                  ]
                  const gradient = gradients[index % gradients.length]

                  return (
                    <div key={post.id} className="group cursor-pointer">
                      <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                        {displayImage ? (
                          <img
                            src={displayImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
                            <div className="absolute inset-0 bg-black/30"></div>
                            
                            <div className="absolute inset-0 opacity-20">
                              <div 
                                className="h-full w-full"
                                style={{
                                  backgroundImage: `
                                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                                  `,
                                  backgroundSize: '25px 25px',
                                  animation: `moveBackground ${20 + index * 2}s linear infinite`
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </div>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="absolute top-4 left-4">
                            <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                              {post.tags[0]}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {post.tags && post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-1"
                          >
                            Read More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
            />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(25px) translateY(25px); }
        }
      `}</style>
    </section>
  )
} 