'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCollectionDetail } from '@/hooks/useCollectionDetail'
import Link from 'next/link'

export default function CollectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const collectionId = params.collectionId as string
  
  const { collection, photos, videos, loading, error } = useCollectionDetail(collectionId)
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent'
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
      })
    } catch {
      return dateString
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <>
        {/* Loading Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="animate-pulse">
                <div className="h-4 bg-white/20 rounded w-32 mx-auto mb-6"></div>
                <div className="h-16 bg-white/20 rounded w-3/4 mx-auto mb-8"></div>
                <div className="h-6 bg-white/20 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="min-h-screen bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-300 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error || !collection) {
    return (
      <>
        {/* Error Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center text-white">
              <nav className="flex items-center justify-center space-x-2 text-sm text-gray-300 mb-6">
                <Link href="/media/gallery" className="hover:text-white transition-colors duration-300">
                  Gallery
                </Link>
                <span>›</span>
                <span className="text-white">Not Found</span>
              </nav>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
                Collection Not Found
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8 max-w-3xl mx-auto">
                {error || 'The requested collection could not be found.'}
              </p>
            </div>
          </div>
        </section>
        
        <div className="min-h-screen bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/media/gallery"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Determine which tab to show by default
  const defaultTab = photos.length > 0 ? 'photos' : 'videos'
  const currentTab = activeTab === 'photos' && photos.length === 0 ? 'videos' : activeTab

  return (
    <>
      {/* Collection Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {collection && photos.length > 0 ? (
            // Use first photo as background
            <img
              src={photos[0].url}
              alt={collection.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // Default gradient background
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
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
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-white">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center space-x-2 text-sm text-gray-300 mb-6">
                <Link href="/media/gallery" className="hover:text-white transition-colors duration-300">
                  Gallery
                </Link>
                <span>›</span>
                <span className="text-white">{collection?.name || 'Collection'}</span>
              </nav>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-gray-300">
                  {collection?.category || 'Media Collection'}
                </p>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
                {collection?.name || 'Loading...'}
              </h1>
              
              {collection?.description && (
                <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8 max-w-3xl mx-auto">
                  {collection.description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{collection?.photoCount || 0} photos</span>
                </div>
                {collection && collection.videoCount > 0 && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>{collection.videoCount} videos</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(collection?.date || '')}</span>
                </div>
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

      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          {photos.length > 0 && videos.length > 0 && (
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      currentTab === 'photos'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Photos ({photos.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('videos')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      currentTab === 'videos'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Videos ({videos.length})
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* Photos Grid */}
          {(currentTab === 'photos' && photos.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedImage(photo.url)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.alt_text || photo.collection_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 truncate">{photo.alt_text || 'Photo'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Grid */}
          {(currentTab === 'videos' && videos.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedVideo(video.url)}
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-900">
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 truncate">{video.alt_text || 'Video'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {photos.length === 0 && videos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-500">This collection doesn't contain any media items yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage}
              alt="Selected image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-6xl max-h-full w-full">
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="max-w-full max-h-full w-full"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
} 