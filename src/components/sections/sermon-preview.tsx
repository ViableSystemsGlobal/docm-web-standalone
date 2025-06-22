'use client'

import { useSermons } from '@/hooks/useSermons'
import { useHomepage } from '@/hooks/useHomepage'
import { useState, useRef } from 'react'

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper function to get video URL based on type
function getVideoUrl(sermon: any): string | null {
  if (sermon.video_type === 'youtube') {
    return sermon.youtube_url || `https://www.youtube.com/watch?v=${sermon.youtube_id}`
  }
  return sermon.video_url || null
}

// Helper function to get embed URL for videos
function getEmbedUrl(sermon: any): string | null {
  if (sermon.video_type === 'youtube' && sermon.youtube_id) {
    return `https://www.youtube.com/embed/${sermon.youtube_id}`
  }
  return sermon.video_url || null
}

export function SermonPreview() {
  const { homepage, loading: homepageLoading } = useHomepage()
  const { sermons, loading: sermonsLoading, error, source, featuredSermon, recentSermons } = useSermons(3)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [showVideoPlayer, setShowVideoPlayer] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Get sermon preview content from CMS
  const sermonPreviewContent = homepage.sermon_preview
  
  const loading = homepageLoading || sermonsLoading

  // Function to handle video play
  const handleVideoClick = (sermon: any) => {
    if (sermon.video_type === 'youtube') {
      // For YouTube videos, show embedded player
      setShowVideoPlayer(sermon.id)
      setPlayingVideo(sermon.id)
    } else if (sermon.video_url) {
      // For uploaded videos, toggle play/pause
      if (playingVideo === sermon.id) {
        setPlayingVideo(null)
        if (videoRef.current) {
          videoRef.current.pause()
        }
      } else {
        setPlayingVideo(sermon.id)
        setShowVideoPlayer(sermon.id)
        // Video will autoplay when rendered
      }
    } else {
      // Fallback: open external link if available
      const videoUrl = getVideoUrl(sermon)
      if (videoUrl) {
        window.open(videoUrl, '_blank')
      }
    }
  }

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (sermon: any): string | null => {
    if (sermon.video_type === 'youtube' && sermon.youtube_id) {
      return `https://www.youtube.com/embed/${sermon.youtube_id}?autoplay=1&rel=0`
    }
    return null
  }

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="w-24 h-4 bg-gray-300 rounded mx-auto mb-6"></div>
            <div className="h-16 bg-gray-300 rounded w-3/4 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">
            <div className="lg:col-span-2">
              <div className="h-[500px] bg-gray-300 rounded-3xl mb-8"></div>
              <div className="bg-gray-300 rounded-2xl h-48"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-gray-300 rounded-2xl h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading sermons: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!featuredSermon) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">No sermons available at this time.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {sermonPreviewContent?.subtitle || "Latest Message"}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
            {sermonPreviewContent?.title || featuredSermon.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured Sermon Video */}
          <div className="lg:col-span-2">
            <div className="relative h-[500px] rounded-3xl overflow-hidden group mb-8">
              
              {/* Show video player when playing */}
              {showVideoPlayer === featuredSermon.id ? (
                <>
                  {featuredSermon.video_type === 'youtube' && getYouTubeEmbedUrl(featuredSermon) ? (
                    // YouTube embedded player
                    <iframe
                      src={getYouTubeEmbedUrl(featuredSermon)!}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={featuredSermon.title}
                    />
                  ) : featuredSermon.video_url ? (
                    // Uploaded video player
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      autoPlay
                      poster={featuredSermon.thumbnail_image}
                    >
                      <source src={featuredSermon.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                  
                  {/* Close/minimize button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowVideoPlayer(null)
                      setPlayingVideo(null)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 z-10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                // Thumbnail/poster view
                <>
                  {/* Video/Thumbnail Background */}
                  {featuredSermon.thumbnail_image ? (
                    <img 
                      src={featuredSermon.thumbnail_image}
                      alt={featuredSermon.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-blue-900 to-indigo-900">
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      {/* Simulated video pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                            `,
                            backgroundSize: '50px 50px',
                            animation: 'moveBackground 30s linear infinite'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {/* Play Button - clickable */}
                  <button
                    onClick={() => handleVideoClick(featuredSermon)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </button>
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <h3 className="text-3xl font-bold text-white mb-2">{featuredSermon.title}</h3>
                    <p className="text-gray-200 text-lg">
                      {featuredSermon.speaker} • {formatDate(featuredSermon.sermon_date)}
                      {featuredSermon.duration && ` • ${featuredSermon.duration} min`}
                    </p>
                    {featuredSermon.scripture_reference && (
                      <p className="text-gray-300 text-sm mt-1">{featuredSermon.scripture_reference}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Sermon Description */}
            <div className="bg-white rounded-2xl p-8">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {featuredSermon.description}
              </p>
              
              {featuredSermon.series && (
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  {featuredSermon.series} Series
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                {getVideoUrl(featuredSermon) && (
                  <a 
                    href={getVideoUrl(featuredSermon)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    Watch Full Sermon
                  </a>
                )}
                {featuredSermon.audio_url && (
                  <a 
                    href={featuredSermon.audio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 text-gray-700 px-6 py-3 font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Download Audio
                  </a>
                )}
                <button className="border border-gray-300 text-gray-700 px-6 py-3 font-semibold hover:bg-gray-50 transition-all duration-300">
                  View Notes
                </button>
              </div>
            </div>
          </div>
          
          {/* Recent Sermons */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Messages</h3>
            
            <div className="space-y-6">
              {recentSermons.map((sermon, index) => (
                <div 
                  key={sermon.id}
                  className="bg-white rounded-2xl p-6 cursor-pointer group hover:shadow-lg transition-all duration-300"
                  onClick={() => handleVideoClick(sermon)}
                >
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4 group">
                    {sermon.thumbnail_image ? (
                      <img 
                        src={sermon.thumbnail_image}
                        alt={sermon.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        index === 0 ? 'from-purple-800 to-pink-900' : 'from-green-800 to-teal-900'
                      }`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{sermon.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {sermon.speaker} • {formatDate(sermon.sermon_date)}
                    {sermon.duration && ` • ${sermon.duration} min`}
                  </p>
                  {sermon.scripture_reference && (
                    <p className="text-xs text-gray-500 mb-2">{sermon.scripture_reference}</p>
                  )}
                  <p className="text-sm text-gray-500 line-clamp-2">{sermon.description}</p>
                  {sermon.series && (
                    <div className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium mt-2">
                      {sermon.series} Series
                    </div>
                  )}
                </div>
              ))}
              
              {/* View All Link */}
              <div className="pt-4">
                <a 
                  href="/media/sermons"
                  className="text-black font-semibold hover:text-gray-700 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  View All Sermons
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
      `}</style>
    </section>
  )
} 