'use client'

import { useHomepage } from '@/hooks/useHomepage'
import { useState, useRef } from 'react'

export function AboutSnapshot() {
  const { homepage, loading, error, source } = useHomepage()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Get our story content from CMS
  const ourStoryContent = homepage.our_story
  const ministryHighlights = ourStoryContent?.ministry_highlights || []
  const communityImpact = ourStoryContent?.community_impact

  // Combine video content for cycling
  const videoContent = [
    ...(ministryHighlights || []),
    ...(communityImpact ? [communityImpact] : [])
  ].filter(item => item?.video_url)

  // Function to handle video play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-pulse">
            <div>
              <div className="w-20 h-4 bg-gray-300 rounded mb-6"></div>
              <div className="h-16 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4 mb-12">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-[600px] bg-gray-300 rounded-3xl"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading our story: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const currentVideo = videoContent[currentVideoIndex]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-6">
              {ourStoryContent?.first_line || "Our Story"}
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
              {ourStoryContent?.main_header || "Building communities that transform lives."}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-12">
              {(ourStoryContent?.paragraph_text || "").split('\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Button */}
            {ourStoryContent?.button_text && (
              <div className="flex gap-4">
                <a
                  href="/about"
                  className={`px-8 py-4 font-semibold transition-all duration-300 ${
                    ourStoryContent.button_style === 'primary' 
                      ? "bg-black text-white hover:bg-gray-800" 
                      : "bg-transparent text-black hover:bg-gray-50 border-2 border-black"
                  }`}
                >
                  {ourStoryContent.button_text}
                </a>
              </div>
            )}
          </div>

          {/* Media Side - Video Players */}
          <div className="space-y-8">
            {/* Main Story Media */}
            {ourStoryContent?.media_url && (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {ourStoryContent.media_type === 'video' ? (
                  <div 
                    className="relative h-[350px] group cursor-pointer"
                    onClick={handleVideoClick}
                  >
                    <video
                      className="w-full h-full object-cover"
                      poster={ourStoryContent.media_url.replace(/\.(mp4|webm|ogg)$/i, '.jpg')}
                      ref={videoRef}
                      muted
                      loop
                      playsInline
                    >
                      <source src={ourStoryContent.media_url} type="video/mp4" />
                    </video>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={ourStoryContent.media_url}
                    alt={ourStoryContent.main_header}
                    className="w-full h-[350px] object-cover"
                  />
                )}
              </div>
            )}

            {/* Video Content from CMS (Ministry Highlights or Community Impact) */}
            {videoContent.length > 0 && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div 
                  className="relative h-[250px] group cursor-pointer"
                  onClick={handleVideoClick}
                >
                  {currentVideo?.video_url ? (
                    <video
                      className="w-full h-full object-cover"
                      poster={currentVideo.video_url.replace(/\.(mp4|webm|ogg)$/i, '.jpg')}
                      muted
                      loop
                      playsInline
                    >
                      <source src={currentVideo.video_url} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <p className="text-sm opacity-80">Video Coming Soon</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  {currentVideo?.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {currentVideo?.title || "Ministry Video"}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {currentVideo?.description || "Discover our community impact"}
                    </p>
                  </div>
                </div>

                {/* Video Navigation Indicators */}
                {videoContent.length > 1 && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    {videoContent.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentVideoIndex(index)
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentVideoIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 