'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { VideoModal } from '@/components/ui/video-modal'
import { SermonsHero } from '@/components/sections/sermons-hero'

// Helper functions (reused from latest-sermons)
function formatDuration(duration?: number): string {
  if (!duration) return '0:00'
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

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

function getMediaType(sermon: any): 'video' | 'audio' {
  if (sermon.type) return sermon.type
  if (sermon.video_url || sermon.youtube_url) return 'video'
  if (sermon.audio_url) return 'audio'
  return 'video'
}

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

function getYouTubeThumbnail(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''
}

function getSermonThumbnail(sermon: any): string {
  if ('thumbnail_image' in sermon && sermon.thumbnail_image) {
    return sermon.thumbnail_image
  }
  if ('youtube_url' in sermon && sermon.youtube_url) {
    return getYouTubeThumbnail(sermon.youtube_url)
  }
  return ''
}

function getVideoUrl(sermon: any): string {
  if ('video_url' in sermon && sermon.video_url) {
    return sermon.video_url
  }
  if ('youtube_url' in sermon && sermon.youtube_url) {
    return sermon.youtube_url
  }
  return ''
}

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

interface Sermon {
  id: string
  title: string
  slug: string
  description: string
  speaker: string
  series?: string
  scripture_reference?: string
  sermon_date: string
  duration?: number
  video_type: 'upload' | 'youtube'
  video_url?: string
  youtube_url?: string
  youtube_id?: string
  audio_url?: string
  thumbnail_image?: string
  tags: string[]
  status: string
  view_count: number
}

export default function BrowseSermonsClient() {
  const router = useRouter()
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeries, setSelectedSeries] = useState<string>('all')
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalSermons, setTotalSermons] = useState(0)
  const [uniqueSeries, setUniqueSeries] = useState<string[]>([])
  const [uniqueSpeakers, setUniqueSpeakers] = useState<string[]>([])
  
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

  const SERMONS_PER_PAGE = 12

  // Fetch sermons with pagination and filters
  const fetchSermons = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: SERMONS_PER_PAGE.toString(),
        page: currentPage.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(selectedSeries !== 'all' && { series: selectedSeries }),
        ...(selectedSpeaker !== 'all' && { speaker: selectedSpeaker })
      })

      const response = await fetch(`/api/sermons/browse?${params}`)
      const data = await response.json()

      if (data.sermons) {
        setSermons(data.sermons)
        setTotalPages(Math.ceil(data.total / SERMONS_PER_PAGE))
        setTotalSermons(data.total)
        
        // Extract unique series and speakers for filters
        const series = new Set(data.allSermons?.map((s: any) => s.series).filter(Boolean))
        const speakers = new Set(data.allSermons?.map((s: any) => s.speaker).filter(Boolean))
        setUniqueSeries(Array.from(series) as string[])
        setUniqueSpeakers(Array.from(speakers) as string[])
      }
    } catch (error) {
      console.error('Error fetching sermons:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSermons()
  }, [currentPage, searchQuery, selectedSeries, selectedSpeaker])

  // Handle video play
  const handlePlay = (sermon: any) => {
    const videoUrl = getVideoUrl(sermon)
    if (videoUrl) {
      const isYouTube = isYouTubeUrl(videoUrl)
      setVideoModal({
        isOpen: true,
        videoUrl,
        title: sermon.title,
        isYouTube
      })
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

  // Handle sermon click - navigate to individual sermon page
  const handleSermonClick = (sermon: any) => {
    // Generate slug from title if not available
    const slug = sermon.slug || sermon.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    router.push(`/media/sermons/${slug}`)
  }

  // Transform sermons for display
  const transformedSermons = sermons.map((sermon, index) => {
    if ('sermon_date' in sermon) {
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
        thumbnail: getSermonThumbnail(sermon),
        playbackUrl: getVideoUrl(sermon)
      }
    }
    return sermon
  })

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedSeries('all')
    setSelectedSpeaker('all')
    setCurrentPage(1)
  }

  return (
    <>
      {/* Same Hero Section as Main Sermons Page */}
      <SermonsHero />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <nav className="mb-6">
                <Link href="/media/sermons" className="text-blue-600 hover:text-blue-500">
                  ← Back to Sermons
                </Link>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                All Sermons
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our complete library of biblical teachings, life-changing messages, and spiritual insights.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search sermons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="all">All Series</option>
                  {uniqueSeries.map(series => (
                    <option key={series} value={series}>{series}</option>
                  ))}
                </select>

                <select
                  value={selectedSpeaker}
                  onChange={(e) => setSelectedSpeaker(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="all">All Speakers</option>
                  {uniqueSpeakers.map(speaker => (
                    <option key={speaker} value={speaker}>{speaker}</option>
                  ))}
                </select>

                <button
                  onClick={resetFilters}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Results summary */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div>
                Showing {((currentPage - 1) * SERMONS_PER_PAGE) + 1}-{Math.min(currentPage * SERMONS_PER_PAGE, totalSermons)} of {totalSermons} sermons
              </div>
              {(searchQuery || selectedSeries !== 'all' || selectedSpeaker !== 'all') && (
                <div className="text-blue-600">
                  Filters applied
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : transformedSermons.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 8.25H9"/>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No sermons found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Sermons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {transformedSermons.map((sermon, index) => (
                  <div key={sermon.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer">
                    <div 
                      className="relative h-48 overflow-hidden"
                      onClick={() => handleSermonClick(sermon)}
                    >
                      {/* Thumbnail or Gradient Background */}
                      {sermon.thumbnail ? (
                        <img
                          src={sermon.thumbnail}
                          alt={sermon.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${sermon.gradient}`}>
                          <div className="absolute inset-0 bg-black/40"></div>
                          <div className="absolute inset-0 opacity-20">
                            <div 
                              className="h-full w-full"
                              style={{
                                backgroundImage: `
                                  linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                                  linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                                `,
                                backgroundSize: '20px 20px',
                                animation: `moveBackground ${20 + index * 2}s linear infinite`
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                          {sermon.duration}
                        </div>
                      </div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
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
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {sermon.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <span>{sermon.speaker}</span>
                        <span>•</span>
                        <span>{sermon.date}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {sermon.description}
                      </p>
                      
                      <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {sermon.series} Series
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 7) {
                        pageNum = i + 1
                      } else if (currentPage <= 4) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 3) {
                        pageNum = totalPages - 6 + i
                      } else {
                        pageNum = currentPage - 3 + i
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Custom animation keyframes */}
        <style jsx>{`
          @keyframes moveBackground {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(30px) translateY(30px); }
          }
        `}</style>
      </div>

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