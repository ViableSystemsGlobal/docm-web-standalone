'use client'

import { useState, useEffect } from 'react'
import { Camera, Video, Play, ChevronRight } from 'lucide-react'

interface MediaCollection {
  id: string
  title: string
  category: string
  date: string
  description: string
  photo_count: number
  video_count: number
  cover_image: string
  media_urls: string[]
  created_at: string
}

interface MediaGallerySectionProps {
  title?: string
  subtitle?: string
  type?: 'photos' | 'videos' | 'mixed'
  collections_to_show?: number
  show_category_badges?: boolean
  layout?: 'grid' | 'masonry' | 'carousel'
}

const gradientColors = [
  'from-blue-600 via-purple-600 to-purple-700',
  'from-green-600 via-emerald-600 to-teal-700', 
  'from-red-600 via-orange-600 to-red-700',
  'from-purple-600 via-violet-600 to-purple-700',
  'from-cyan-600 via-blue-600 to-indigo-700',
  'from-pink-600 via-purple-600 to-indigo-700',
  'from-amber-600 via-orange-600 to-red-600',
  'from-teal-600 via-green-600 to-emerald-700'
]

export function MediaGallerySection({
  title = "Photo Gallery",
  subtitle = "Capturing moments from our services and programs",
  type = 'photos',
  collections_to_show = 4,
  show_category_badges = true,
  layout = 'grid'
}: MediaGallerySectionProps) {
  const [collections, setCollections] = useState<MediaCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [type, collections_to_show])

  const fetchCollections = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        limit: collections_to_show.toString(),
        sort: 'newest'
      })
      
      // Filter by type if specified
      if (type === 'photos') {
        params.append('type', 'image')
      } else if (type === 'videos') {
        params.append('type', 'video')
      }

      const response = await fetch(`/api/media/collections?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setCollections(data.collections)
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDuration = (videoCount: number) => {
    // Estimate duration based on video count (rough estimate)
    const estimatedMinutes = videoCount * 8 // Assume 8 minutes per video average
    const hours = Math.floor(estimatedMinutes / 60)
    const minutes = estimatedMinutes % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(collections_to_show)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-xl mb-6"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          
          {collections.length > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              Showing latest {collections.length} {type === 'videos' ? 'video' : 'photo'} collections from our services and programs
            </p>
          )}
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-20">
            {type === 'videos' ? (
              <Video className="mx-auto h-20 w-20 text-gray-300 mb-6" />
            ) : (
              <Camera className="mx-auto h-20 w-20 text-gray-300 mb-6" />
            )}
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">No Collections Found</h3>
            <p className="text-gray-600 text-lg">
              Check back soon for new {type === 'videos' ? 'video' : 'photo'} collections from our services and programs!
            </p>
          </div>
        ) : (
          <>
            {/* Collections Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${
              collections_to_show <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'
            } gap-8 mb-12`}>
              {collections.map((collection, index) => {
                const gradientClass = gradientColors[index % gradientColors.length]
                const isVideo = type === 'videos' || collection.video_count > collection.photo_count
                const mediaCount = isVideo ? collection.video_count : collection.photo_count
                const mediaLabel = isVideo ? 'videos' : 'photos'
                
                return (
                  <div key={collection.id} className="group cursor-pointer">
                    {/* Large Gradient Card */}
                    <div className={`relative aspect-video rounded-xl bg-gradient-to-br ${gradientClass} p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}>
                      {/* Category Badge */}
                      {show_category_badges && collection.category && (
                        <div className="self-start">
                          <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {collection.category}
                          </div>
                        </div>
                      )}
                      
                      {/* Media Count Badge */}
                      <div className="self-end">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {mediaCount} {mediaLabel}
                          {isVideo && collection.video_count > 0 && (
                            <span className="block text-xs opacity-90">
                              {formatDuration(collection.video_count)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Center Icon */}
                      <div className="flex items-center justify-center flex-1">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
                          {isVideo ? (
                            <Play className="h-8 w-8 text-white ml-1" />
                          ) : (
                            <Camera className="h-8 w-8 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Collection Info */}
                      <div className="text-white">
                        <h3 className="text-lg font-bold mb-1 line-clamp-2">{collection.title}</h3>
                        <p className="text-white text-opacity-90 text-sm">
                          {formatDate(collection.date || collection.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Summary Info Below */}
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {collection.title}
                        </h4>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm group/btn">
                          {isVideo ? 'Watch' : 'View'}
                          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm">
                        {mediaCount} {mediaLabel}
                        {isVideo && collection.video_count > 0 && (
                          <span> • {formatDuration(collection.video_count)}</span>
                        )}
                      </p>
                      
                      {collection.description && (
                        <p className="text-gray-500 text-xs line-clamp-2 mt-2">
                          {collection.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* View All Link */}
            <div className="text-center">
              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All {type === 'videos' ? 'Video' : 'Photo'} Collections
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
} 