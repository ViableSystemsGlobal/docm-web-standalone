'use client'

import { BlogPostHero } from '@/components/sections/blog-post-hero'
import { useBlogPost } from '@/hooks/useBlogPost'
import Link from 'next/link'

interface BlogPostClientProps {
  slug: string
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const { blog, loading, error, source } = useBlogPost(slug)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </section>
        
        {/* Loading Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.636 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/media/blog" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  if (!blog) {
    return null
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

  return (
    <>
      {/* Hero Section */}
      <BlogPostHero blog={blog} source={source} />
      
      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Meta */}
          <div className="border-b border-gray-200 pb-8 mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(blog.published_at)}</span>
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div className="flex gap-2">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-none text-lg leading-relaxed text-gray-700">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: blog.content
                  .split('\n\n')
                  .map(paragraph => `<p class="mb-6">${paragraph.trim()}</p>`)
                  .join('')
              }} 
            />
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{blog.author}</h4>
                  <p className="text-gray-600 text-sm">Author</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Share this article:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.excerpt || '',
                          url: window.location.href
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                      }
                    }}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                    title="Share"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link 
              href="/media/blog"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </article>

    </>
  )
} 