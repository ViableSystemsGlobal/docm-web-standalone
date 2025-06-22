'use client'

import { useMediaCollections } from '@/hooks/useMediaCollections'
import { useGalleryPage } from '@/hooks/useGalleryPage'
import Link from 'next/link'

export function PhotoGalleries() {
  const { galleryPage } = useGalleryPage()
  const { collections, loading, error, source } = useMediaCollections('image', 12)

  // Fallback data for when database is empty
  const fallbackGalleries = [
    {
      id: "sunday-worship",
      title: "Sunday Worship",
      photoCount: 28,
      videoCount: 0,
      totalCount: 28,
      date: "December 2023",
      gradient: "from-blue-600 to-purple-700",
      coverImage: null,
      category: "Sunday Service",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "community-outreach",
      title: "Community Outreach",
      photoCount: 42,
      videoCount: 0,
      totalCount: 42,
      date: "November 2023",
      gradient: "from-green-600 to-teal-700",
      coverImage: null,
      category: "Community Outreach",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "youth-activities",
      title: "Youth Activities",
      photoCount: 65,
      videoCount: 0,
      totalCount: 65,
      date: "October 2023",
      gradient: "from-orange-600 to-red-700",
      coverImage: null,
      category: "Youth Ministry",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "church-fellowship",
      title: "Church Fellowship",
      photoCount: 35,
      videoCount: 0,
      totalCount: 35,
      date: "September 2023",
      gradient: "from-purple-600 to-pink-700",
      coverImage: null,
      category: "Fellowship",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "baptism-ceremony",
      title: "Baptism Ceremony",
      photoCount: 18,
      videoCount: 0,
      totalCount: 18,
      date: "August 2023",
      gradient: "from-cyan-600 to-blue-700",
      coverImage: null,
      category: "Baptisms",
      description: "",
      mediaUrls: [],
      createdAt: ""
    },
    {
      id: "special-events",
      title: "Special Events",
      photoCount: 52,
      videoCount: 0,
      totalCount: 52,
      date: "July 2023",
      gradient: "from-indigo-600 to-purple-700",
      coverImage: null,
      category: "Special Events",
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

  return (
    <section id="photo-galleries" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {galleryPage.photo_galleries.sectionTitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            {galleryPage.photo_galleries.sectionHeading}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {galleryPage.photo_galleries.sectionDescription}
          </p>
          
          {source === 'database' && collections.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Showing {collections.length} photo collections from database
            </p>
          )}
          
          {source !== 'database' && (
            <p className="text-sm text-amber-600 mt-2">
              Showing sample collections - Add collections in the admin panel to see real data
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-2xl mb-6"></div>
                <div className="bg-white rounded-2xl p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCollections.map((gallery, index) => (
              <div key={gallery.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
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
                            backgroundSize: '25px 25px',
                            animation: `moveBackground ${20 + index * 2}s linear infinite`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {gallery.photoCount || gallery.totalCount || 0} photos
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg font-bold text-white">{gallery.title}</h3>
                    <p className="text-gray-200 text-sm">{formatDate(gallery.date)}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {gallery.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {gallery.photoCount || gallery.totalCount || 0} photos
                    </span>
                    <Link href={`/media/gallery/${gallery.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
                      View Photos
                    </Link>
                  </div>
                  {gallery.category && (
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
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
            <p className="text-red-600 mb-2">Error loading photo collections</p>
            <p className="text-gray-500 text-sm">Showing sample data instead</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(25px) translateY(25px); }
        }
      `}</style>
    </section>
  )
} 