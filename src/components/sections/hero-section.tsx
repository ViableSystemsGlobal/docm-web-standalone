'use client'

import Link from 'next/link'
import { useHomepage } from '@/hooks/useHomepage'

export function HeroSection() {
  const { homepage, loading, error, source } = useHomepage()
  
  // Get hero content from CMS or defaults
  const heroContent = homepage.hero

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Background - Video, Image, or Gradient */}
        {heroContent.background_video ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.error('Video failed to load:', e)
            }}
            onLoadStart={() => {
              console.log('Video loading started:', heroContent.background_video)
            }}
          >
            <source src={heroContent.background_video} type="video/mp4" />
            {/* Fallback message */}
            Your browser does not support the video tag.
          </video>
        ) : heroContent.background_image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroContent.background_image})` }}
          ></div>
        ) : (
          /* Fallback gradient background */
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        )}
        
        {/* Video/Image overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Simulated video background with moving pattern - only if no video/image */}
        {!heroContent.background_video && !heroContent.background_image && (
          <div className="absolute inset-0 opacity-30">
            <div 
              className="h-full w-full animate-pulse"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                  linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                `,
                backgroundSize: '60px 60px',
                animation: 'moveBackground 20s linear infinite'
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Loading state - preserving design */}
          {loading ? (
            <div className="text-white animate-pulse">
              <div className="h-6 bg-white/20 rounded w-48 mx-auto mb-6"></div>
              <div className="h-20 bg-white/20 rounded w-full mb-8"></div>
              <div className="h-6 bg-white/20 rounded w-3/4 mx-auto mb-12"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-14 bg-white/20 rounded w-32"></div>
                <div className="h-14 bg-white/20 rounded w-32"></div>
              </div>
            </div>
          ) : (
            /* CMS Content */
            <div className="text-white">
              {heroContent.first_line && (
                <p className="text-sm font-medium text-white uppercase tracking-wider mb-6">
                  {heroContent.first_line}
                </p>
              )}
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
                {heroContent.title}
              </h1>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
                {heroContent.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={heroContent.cta_primary.href}
                  className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 text-center"
                >
                  {heroContent.cta_primary.text}
                </Link>
                <Link 
                  href={heroContent.cta_secondary.href}
                  className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center flex items-center justify-center gap-3"
                >
                  {heroContent.cta_secondary.text}
                  <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          )}
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