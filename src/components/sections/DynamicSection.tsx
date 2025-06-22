'use client'

import Link from 'next/link'
import { Play, ChevronRight } from 'lucide-react'
import { OurStory } from './our-story'
import { MissionVisionSection } from './mission-vision-section'
import { LeadershipTeamSection } from './leadership-team-section'
import { MediaGallerySection } from './media-gallery-section'
import { TeamHighlightsSection } from './team-highlights-section'

interface DynamicSectionProps {
  type: string
  props: Record<string, any>
}

// Helper function to determine if a URL is a video
const isVideoUrl = (url: string) => {
  return url?.match(/\.(mp4|webm|ogg|avi|mov|wmv)(\?.*)?$/i)
}

// Hero Section Component
function HeroSection({ props }: { props: Record<string, any> }) {
  const { firstLine, heading, subheading, backgroundImage, ctaButtons = [] } = props

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          isVideoUrl(backgroundImage) ? (
            // Video Background
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                onError={(e) => {
                  console.error('Video failed to load:', backgroundImage)
                  // Fallback to gradient background
                  const target = e.target as HTMLVideoElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>'
                  }
                }}
              >
                <source src={backgroundImage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Video overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ) : (
            // Image Background
            <div className="absolute inset-0">
              <img
                src={backgroundImage}
                alt="Hero background"
                className="h-full w-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', backgroundImage)
                  // Fallback to gradient background
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>'
                  }
                }}
              />
              {/* Image overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          )
        ) : (
          // Fallback gradient background
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Video overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
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
                  animation: 'moveBackground 20s linear infinite'
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
            {firstLine && (
              <p className="text-sm font-medium text-white uppercase tracking-wider mb-4">
                {firstLine}
              </p>
            )}
            
            {heading && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
                {heading}
              </h1>
            )}
            
            {subheading && (
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
            
            {ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {ctaButtons.map((button: any, index: number) => (
                  <Link
                    key={index}
                    href={button.link || '#'}
                    className={`px-8 py-4 font-semibold transition-all duration-300 text-center flex items-center justify-center gap-3 ${
                      button.style === 'primary'
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : button.style === 'outline'
                        ? 'border border-white text-white hover:bg-white hover:text-gray-900'
                        : button.style === 'link'
                        ? 'text-white hover:text-gray-300 underline'
                        : 'border border-white text-white hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {button.text || 'Learn More'}
                    {button.style === 'link' ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : button.text?.toLowerCase().includes('watch') || button.text?.toLowerCase().includes('video') ? (
                      <Play className="h-4 w-4" />
                    ) : null}
                  </Link>
                ))}
              </div>
            )}
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

// Call to Action Section Component
function CallToActionSection({ props }: { props: Record<string, any> }) {
  const { heading, text, buttonText, buttonLink, backgroundImage } = props

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Media */}
          <div className="absolute inset-0">
            {backgroundImage ? (
              isVideoUrl(backgroundImage) ? (
                // Video Background
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src={backgroundImage} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              ) : (
                // Image Background
                <div className="absolute inset-0">
                  <img
                    src={backgroundImage}
                    alt="CTA background"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              )
            ) : (
              // Fallback gradient background
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center py-16 px-8">
            <div className="max-w-3xl mx-auto">
              {heading && (
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {heading}
                </h2>
              )}
              
              {text && (
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  {text}
                </p>
              )}
              
              {buttonText && buttonLink && (
                <Link
                  href={buttonLink}
                  className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  {buttonText}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Placeholder component for unsupported section types
function UnsupportedSection({ type }: { type: string }) {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Section Type: {type}
          </h2>
          <p className="text-gray-600">
            This section type is not yet supported in the frontend renderer.
            Please check back later or contact your developer.
          </p>
        </div>
      </div>
    </section>
  )
}

// Main Dynamic Section Component
export function DynamicSection({ type, props }: DynamicSectionProps) {
  switch (type) {
    case 'hero':
      return <HeroSection props={props} />
    
    case 'call_to_action':
      return <CallToActionSection props={props} />
    
    case 'our_story':
      return <OurStory {...props} />
    
    case 'mission_vision':
      return <MissionVisionSection {...props} />
    
    case 'leadership_team':
      return <LeadershipTeamSection {...props} />
    
    case 'media_sections':
      return <MediaGallerySection {...props} />
    
    case 'team_highlights':
      return <TeamHighlightsSection {...props} />
    
    default:
      return <UnsupportedSection type={type} />
  }
} 