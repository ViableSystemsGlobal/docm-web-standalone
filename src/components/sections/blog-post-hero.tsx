'use client'

import Link from 'next/link'
import { useBlogPage } from '@/hooks/useBlogPage'
import { BlogPost } from '@/hooks/useBlogPost'

interface BlogPostHeroProps {
  blog: BlogPost
  source: string
}

export function BlogPostHero({ blog, source }: BlogPostHeroProps) {
  const { blogPage } = useBlogPage()
  
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

  // Use blog featured image or fallback to blog page background
  const backgroundImage = blog.featured_image || blogPage.hero.backgroundImage
  const isVideo = blogPage.hero.backgroundMedia?.type === 'video'

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          // Use blog featured image or CMS background media if available
          isVideo && !blog.featured_image ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={backgroundImage} type="video/mp4" />
            </video>
          ) : (
            <img
              src={backgroundImage}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          // Default gradient background
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Simulated background pattern */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="h-full w-full animate-pulse"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                    linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                  `,
                  backgroundSize: '60px 60px',
                  animation: 'moveBackground 25s linear infinite'
                }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Link 
                href="/media/blog" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-sm text-gray-300">Article</span>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center justify-center gap-2 mb-6">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {blog.title}
            </h1>
            
            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8 max-w-3xl mx-auto">
                {blog.excerpt}
              </p>
            )}
            
            {/* Author & Date */}
            <div className="flex items-center justify-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(blog.published_at)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/media/blog"
                className="px-8 py-4 font-semibold transition-all duration-300 text-center border border-white text-white hover:bg-white hover:text-gray-900 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
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
                className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Article
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(60px) translateY(60px); }
        }
      `}</style>
    </section>
  )
} 