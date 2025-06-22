'use client'

import { useSermonsPage } from '@/hooks/useSermonsPage'
import { useSermons } from '@/hooks/useSermons'
import { useState } from 'react'
import { VideoModal } from '@/components/ui/video-modal'
import Link from 'next/link'

// Helper to format duration from seconds to MM:SS
function formatDuration(duration?: number): string {
  if (!duration) return '0:00'
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Helper to format date
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Helper to determine media type from sermon data
function getMediaType(sermon: any): 'video' | 'audio' {
  if (sermon.type) return sermon.type // Mock data
  if (sermon.video_url || sermon.youtube_url) return 'video'
  if (sermon.audio_url) return 'audio'
  return 'video' // Default
}

// Helper to get a gradient for visual variety (fallback only)
function getGradient(index: number): string {
  const gradients = [
    'from-blue-700 to-indigo-800',
    'from-purple-700 to-pink-800', 
    'from-green-700 to-emerald-800',
    'from-orange-700 to-red-800',
    'from-teal-700 to-cyan-800',
    'from-rose-700 to-pink-800'
  ]
  return gradients[index % gradients.length]
}

// Helper to get YouTube thumbnail
function getYouTubeThumbnail(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''
}

// Helper to get sermon thumbnail
function getSermonThumbnail(sermon: any): string {
  // Database sermon
  if ('thumbnail_image' in sermon && sermon.thumbnail_image) {
    return sermon.thumbnail_image
  }
  if ('youtube_url' in sermon && sermon.youtube_url) {
    return getYouTubeThumbnail(sermon.youtube_url)
  }
  // Mock data fallback
  return ''
}

// Helper to get video URL for playback
function getVideoUrl(sermon: any): string {
  if ('video_url' in sermon && sermon.video_url) {
    return sermon.video_url
  }
  if ('youtube_url' in sermon && sermon.youtube_url) {
    return sermon.youtube_url
  }
  return ''
}

// Helper to check if URL is YouTube
function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

export function LatestSermons() {
  const { sermonsPage, loading: cmsLoading, source: cmsSource } = useSermonsPage()
  const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons()
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean
    videoUrl: string
    title: string
    isYouTube: boolean
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
    isYouTube: false
  })

  if (cmsLoading || sermonsLoading) {
    return (
      <section id="latest-sermons" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading sermons...</div>
          </div>
        </div>
      </section>
    )
  }

  const { latest_sermons } = sermonsPage

  // Use actual sermons from database, with fallback to mock data
  // Fetch more sermons to ensure we get the requested maxSermons
  const actualSermons = sermons && sermons.length > 0 ? sermons : [
    {
      id: 1,
      title: "Walking in Faith",
      speaker: "Pastor Michael Johnson",
      date: "December 10, 2023",
      duration: "42:15",
      description: "Discover what it means to trust God completely and walk by faith in every area of your life.",
      series: "Faith in Action",
      gradient: "from-blue-700 to-indigo-800",
      type: "video",
      featured: true
    },
    {
      id: 2,
      title: "The Power of Prayer",
      speaker: "Pastor Sarah Williams",
      date: "December 3, 2023",
      duration: "38:22",
      description: "Learn how to develop a powerful prayer life that transforms both you and your circumstances.",
      series: "Prayer Life",
      gradient: "from-purple-700 to-pink-800",
      type: "audio"
    },
    {
      id: 3,
      title: "God's Grace in Trials",
      speaker: "Pastor Michael Johnson",
      date: "November 26, 2023",
      duration: "45:30",
      description: "Finding hope and strength in God's sufficient grace during life's most difficult moments.",
      series: "Grace & Truth",
      gradient: "from-green-700 to-emerald-800",
      type: "video"
    },
    {
      id: 4,
      title: "Love in Action",
      speaker: "Pastor David Chen",
      date: "November 19, 2023",
      duration: "40:18",
      description: "Practical ways to demonstrate Christ's love through our words, actions, and daily choices.",
      series: "Love Like Jesus",
      gradient: "from-orange-700 to-red-800",
      type: "audio"
    }
  ]

  // Transform database sermons to match expected format and limit to maxSermons
  const transformedSermons = actualSermons.slice(0, latest_sermons.maxSermons).map((sermon, index) => {
    if ('sermon_date' in sermon) {
      // Database sermon - transform to expected format
      return {
        id: sermon.id,
        title: sermon.title,
        speaker: sermon.speaker,
        date: formatDate(sermon.sermon_date),
        duration: formatDuration(sermon.duration),
        description: sermon.description,
        series: sermon.series || 'General',
        gradient: getGradient(index),
        type: getMediaType(sermon),
        featured: index === 0, // Make first sermon featured if coming from database
        thumbnail: getSermonThumbnail(sermon),
        video_url: sermon.video_url,
        youtube_url: sermon.youtube_url,
        audio_url: sermon.audio_url,
        playbackUrl: getVideoUrl(sermon)
      }
    } else {
      // Mock data - use as-is
      return {
        ...sermon,
        thumbnail: '',
        playbackUrl: ''
      }
    }
  })

  const featuredSermon = latest_sermons.showFeatured ? transformedSermons.find(sermon => sermon.featured) || transformedSermons[0] : null
  const regularSermons = latest_sermons.showFeatured ? transformedSermons.filter(sermon => !sermon.featured) : transformedSermons

  // Handle video play
  const handlePlay = (sermon: any) => {
    if (sermon.playbackUrl) {
      const isYouTube = isYouTubeUrl(sermon.playbackUrl)
      setVideoModal({
        isOpen: true,
        videoUrl: sermon.playbackUrl,
        title: sermon.title,
        isYouTube
      })
    } else {
      console.log('No video URL available for:', sermon.title)
    }
  }

  // Close video modal
  const closeVideoModal = () => {
    setVideoModal({
      isOpen: false,
      videoUrl: '',
      title: '',
      isYouTube: false
    })
  }

  return (
    <>
      <section id="latest-sermons" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-gray-600 mb-6">
              {latest_sermons.sectionTitle}
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
              {latest_sermons.sectionHeading}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {latest_sermons.sectionDescription}
            </p>
          </div>

          {/* Featured Sermon */}
          {featuredSermon && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  Featured Message
                </div>
                
                <h3 className="text-4xl font-bold text-gray-900 mb-4">{featuredSermon.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{featuredSermon.speaker}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{featuredSermon.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{featuredSermon.duration}</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {featuredSermon.description}
                </p>
                
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
                  {featuredSermon.series} Series
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handlePlay(featuredSermon)}
                    className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Play {featuredSermon.type === 'video' ? 'Video' : 'Audio'}
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={() => handlePlay(featuredSermon)}
                >
                  {/* Actual Thumbnail or Gradient Background */}
                  {featuredSermon.thumbnail ? (
                    <img
                      src={featuredSermon.thumbnail}
                      alt={featuredSermon.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuredSermon.gradient}`}>
                      <div className="absolute inset-0 bg-black/30"></div>
                      {/* Simulated video pattern for fallback */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                            `,
                            backgroundSize: '40px 40px',
                            animation: 'moveBackground 30s linear infinite'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      {featuredSermon.type === 'video' ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      )}
                      {featuredSermon.type}
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredSermon.duration}
                    </div>
                  </div>
                  
                  {/* Sermon Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2">{featuredSermon.title}</h3>
                    <p className="text-gray-200">{featuredSermon.speaker} • {featuredSermon.date}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Sermons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularSermons.map((sermon, index) => (
              <div key={sermon.id} className="group cursor-pointer">
                <div 
                  className="relative h-64 rounded-2xl overflow-hidden mb-6"
                  onClick={() => handlePlay(sermon)}
                >
                  {/* Actual Thumbnail or Gradient Background */}
                  {sermon.thumbnail ? (
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${sermon.gradient}`}>
                      <div className="absolute inset-0 bg-black/40"></div>
                      {/* Simulated video pattern for fallback */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                            `,
                            backgroundSize: '25px 25px',
                            animation: `moveBackground ${25 + index * 3}s linear infinite`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {sermon.type === 'video' ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      )}
                      {sermon.type}
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {sermon.duration}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {sermon.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <span>{sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {sermon.description}
                  </p>
                  
                  <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {sermon.series} Series
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Sermons CTA */}
          <div className="text-center mt-16">
            <div className="bg-gray-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Our Complete Library
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Access hundreds of sermons, teachings, and biblical insights from our extensive archive spanning multiple years.
              </p>
              <div className="flex justify-center">
                <Link 
                  href="/media/sermons/browse"
                  className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                  Browse All Sermons
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Custom animation keyframes */}
        <style jsx>{`
          @keyframes moveBackground {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(40px) translateY(40px); }
          }
        `}</style>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={closeVideoModal}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
        isYouTube={videoModal.isYouTube}
      />
    </>
  )
} 