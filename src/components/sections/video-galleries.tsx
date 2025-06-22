'use client'

import { useMediaCollections } from '@/hooks/useMediaCollections'
import { useGalleryPage } from '@/hooks/useGalleryPage'
import Link from 'next/link'

export function VideoGalleries() {
  const { galleryPage } = useGalleryPage()
  const { collections, loading, error, source } = useMediaCollections('video', 8)

  // Fallback data for when database is empty
  const fallbackGalleries = [
    {
      id: "worship-highlights",
      title: "Worship Highlights",
      photoCount: 0,
      videoCount: 15,
      totalCount: 15,
      totalDuration: "2h 45m",
      date: "December 2023",
      gradient: "from-purple-600 to-blue-700",
      coverImage: null,
      category: "Sunday Service",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "testimonies",
      title: "Testimonies",
      photoCount: 0,
      videoCount: 8,
      totalCount: 8,
      totalDuration: "1h 20m",
      date: "November 2023",
      gradient: "from-green-600 to-teal-700",
      coverImage: null,
      category: "Special Events",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "event-recaps",
      title: "Event Recaps",
      photoCount: 0,
      videoCount: 12,
      totalCount: 12,
      totalDuration: "3h 15m",
      date: "October 2023",
      gradient: "from-orange-600 to-red-700",
      coverImage: null,
      category: "Special Events",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "behind-the-scenes",
      title: "Behind the Scenes",
      photoCount: 0,
      videoCount: 6,
      totalCount: 6,
      totalDuration: "45m",
      date: "September 2023",
      gradient: "from-pink-600 to-purple-700",
      coverImage: null,
      category: "Fellowship",
      description: "",
      mediaUrls: [],
      createdAt: ""
    }
  ]

  // Use database collections if available, otherwise fall back to static data
  const displayCollections = collections.length > 0 ? collections : fallbackGalleries

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent'
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      })
    } catch {
      return dateString
    }
  }

  // Calculate estimated duration for database collections
  const calculateDuration = (videoCount: number) => {
    const avgDurationMinutes = 8 // Assume 8 minutes average per video
    const totalMinutes = videoCount * avgDurationMinutes
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <section id="video-galleries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {galleryPage.video_galleries.sectionTitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            {galleryPage.video_galleries.sectionHeading}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {galleryPage.video_galleries.sectionDescription}
          </p>
          
          {source === 'database' && collections.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Showing {collections.length} video collections from database
            </p>
          )}
          
          {source !== 'database' && (
            <p className="text-sm text-amber-600 mt-2">
              Showing sample collections - Add collections in the admin panel to see real data
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-80 bg-gray-300 rounded-2xl mb-6"></div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayCollections.map((gallery, index) => (
              <div key={gallery.id} className="group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  {gallery.coverImage ? (
                    <img 
                      src={gallery.coverImage} 
                      alt={gallery.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gallery.gradient}`}>
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                            `,
                            backgroundSize: '30px 30px',
                            animation: `moveBackground ${25 + index * 3}s linear infinite`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {gallery.videoCount || gallery.totalCount || 0} videos
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {(gallery as any).totalDuration || calculateDuration(gallery.videoCount || gallery.totalCount || 0)}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{gallery.title}</h3>
                    <p className="text-gray-200 text-sm">{formatDate(gallery.date)}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 group-hover:shadow-lg group-hover:bg-white transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {gallery.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {gallery.videoCount || gallery.totalCount || 0} videos • {(gallery as any).totalDuration || calculateDuration(gallery.videoCount || gallery.totalCount || 0)}
                    </div>
                    <Link href={`/media/gallery/${gallery.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-1">
                      Watch
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </Link>
                  </div>
                  {gallery.category && (
                    <div className="mt-3">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {gallery.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-2">Error loading video collections</p>
            <p className="text-gray-500 text-sm">Showing sample data instead</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(30px) translateY(30px); }
        }
      `}</style>
    </section>
  )
} 