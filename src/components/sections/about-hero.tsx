'use client'

import Link from 'next/link'
import { useAbout } from '@/hooks/useAbout'

export function AboutHero() {
  const { about, loading, error, source } = useAbout()
  const heroContent = about?.hero

  if (loading) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center animate-pulse">
            <div className="w-24 h-4 bg-white/20 rounded mx-auto mb-6"></div>
            <div className="h-20 bg-white/20 rounded mb-8"></div>
            <div className="space-y-4 mb-12">
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="w-32 h-12 bg-white/20 rounded"></div>
              <div className="w-32 h-12 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"></div>
        <div className="relative z-10 text-center text-white">
          <p className="text-red-400">Error loading hero section: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        {heroContent?.background_image ? (
          <div className="absolute inset-0">
            <img 
              src={heroContent.background_image} 
              alt="About Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ) : (
          <>
            {/* Default gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
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
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="text-white">
            {heroContent?.first_line_text && (
              <p className="text-sm font-medium text-white uppercase tracking-wider mb-6">
                {heroContent.first_line_text}
              </p>
            )}
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              {heroContent?.heading || "Building community that transforms lives."}
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
              {heroContent?.subheading || "For over two decades, DOCM Church has been a beacon of hope and faith in our community. We are a family-oriented church that believes in the transformative power of God's love, building disciples and changing lives one person at a time."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 text-center"
              >
                Visit Us
              </Link>
              <Link 
                href="#our-story"
                className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center flex items-center justify-center gap-3"
              >
                Our Story
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </Link>
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