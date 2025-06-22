'use client'

import Link from 'next/link'
import { useEventsPage } from '@/hooks/useEventsPage'

export function EventsHero() {
  const { eventsPage, loading, error, source, message } = useEventsPage()
  
  // Get hero content from CMS or defaults
  const heroContent = eventsPage.hero

  if (loading) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center animate-pulse">
            <div className="h-6 bg-white/20 rounded w-32 mx-auto mb-6"></div>
            <div className="h-20 bg-white/20 rounded w-3/4 mx-auto mb-8"></div>
            <div className="h-6 bg-white/20 rounded w-2/3 mx-auto mb-12"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-white/20 rounded w-32"></div>
              <div className="h-12 bg-white/20 rounded w-32"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {heroContent.background_image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroContent.background_image})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
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
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">
            {heroContent.first_line_text && (
              <p className="text-sm font-medium text-white uppercase tracking-wider mb-6">
                {heroContent.first_line_text}
              </p>
            )}
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              {heroContent.heading}
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
              {heroContent.subheading}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={heroContent.cta_primary_link || "#upcoming-events"}
                className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 text-center"
              >
                {heroContent.cta_primary}
              </Link>
              <Link 
                href={heroContent.cta_secondary_link || "/contact"}
                className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center flex items-center justify-center gap-3"
              >
                {heroContent.cta_secondary}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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