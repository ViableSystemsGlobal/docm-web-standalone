'use client'

import Link from 'next/link'
import { useContactPage } from '@/hooks/useContactPage'

export function ContactHero() {
  const { contactPage, loading, error, source } = useContactPage()

  // Use CMS data or fallback to defaults
  const heroContent = loading ? {
    first_line_text: "Contact",
    heading: "Let's connect and start a conversation.",
    subheading: "We'd Love to Hear from You",
    description: "Whether you have questions about faith, want to learn more about our church, or need prayer, we're here to listen and support you on your journey.",
    backgroundImage: "",
    backgroundMedia: null,
    ctaButtons: [
      { text: "Send a Message", link: "#contact-form", style: "primary" as const },
      { text: "Visit Us", link: "#office-hours", style: "secondary" as const }
    ]
  } : contactPage.hero

  // Get background image from CMS data
  const backgroundImage = heroContent.backgroundImage || heroContent.backgroundMedia?.url
  
  // Fallback to about page image if contact image doesn't work
  const workingBackgroundImage = backgroundImage === "https://ufjfafcfkalaasdhgcbi.supabase.co/storage/v1/object/public/uploadmedia/contact-hero-bg.jpg" 
    ? "https://ufjfafcfkalaasdhgcbi.supabase.co/storage/v1/object/public/uploadmedia/58080f65-7f4b-4a42-8200-7f9695a7d3ca.webp"
    : backgroundImage

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
    console.warn('Contact Hero: Using fallback content due to error:', error)
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
      {/* Background */}
      <div className="absolute inset-0">
        {workingBackgroundImage ? (
          <div className="absolute inset-0">
            <img 
              src={workingBackgroundImage} 
              alt="Contact Hero Background"
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
            {(heroContent.first_line_text || heroContent.firstLine) && (
              <p className="text-sm font-medium text-white uppercase tracking-wider mb-6">
                {heroContent.first_line_text || heroContent.firstLine}
              </p>
            )}
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              {heroContent.heading}
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
              {heroContent.subheading}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {heroContent.ctaButtons.map((button, index) => (
                <Link 
                  key={index}
                  href={button.link}
                  className={`px-8 py-4 font-semibold transition-all duration-300 text-center ${
                    button.style === 'primary'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'border border-white text-white hover:bg-white hover:text-gray-900'
                  } ${button.style === 'secondary' ? 'flex items-center justify-center gap-3' : ''}`}
                >
                  {button.text}
                  {button.style === 'secondary' && (
                    <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
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