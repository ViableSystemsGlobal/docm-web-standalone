'use client'

import Link from 'next/link'
import { useBlogPage } from '@/hooks/useBlogPage'

export function BlogHero() {
  const { blogPage, loading, source } = useBlogPage()
  
  if (loading) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    )
  }

  const { hero } = blogPage

  // Check for background image/media from CMS - support both properties
  const backgroundImage = hero.backgroundImage || hero.backgroundMedia?.url
  const isVideo = hero.backgroundMedia?.type === 'video'

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          // Use CMS background media if available
          isVideo ? (
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
              alt={hero.backgroundMedia?.alt_text || 'Blog background'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          // Default gradient background
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
            {/* Video overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Simulated video background with moving pattern */}
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
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">
            {hero.first_line_text && (
              <p className="text-sm font-medium text-white uppercase tracking-wider mb-6">
                {hero.first_line_text}
              </p>
            )}
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              {hero.heading}
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
              {hero.subheading}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hero.ctaButtons.map((button, index) => (
                <Link 
                  key={index}
                  href={button.link}
                  className={`px-8 py-4 font-semibold transition-all duration-300 text-center ${
                    button.style === 'primary'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'border border-white text-white hover:bg-white hover:text-gray-900 flex items-center justify-center gap-3'
                  }`}
                >
                  {button.style === 'secondary' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  )}
                  {button.text}
                </Link>
              ))}
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