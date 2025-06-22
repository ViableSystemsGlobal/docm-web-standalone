'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Calendar, 
  User, 
  BookOpen, 
  Eye, 
  Share2,
  Download,
  Heart,
  ExternalLink
} from 'lucide-react'

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
  transcript?: string
  notes?: string
  tags: string[]
  status: string
  view_count: number
  seo_meta?: any
  created_at: string
  updated_at: string
}

interface SermonDetailClientProps {
  slug: string
}

export default function SermonDetailClient({ slug }: SermonDetailClientProps) {
  const [sermon, setSermon] = useState<Sermon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchSermon()
    }
  }, [slug])

  const fetchSermon = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/sermons/${slug}`)
      
      if (!response.ok) {
        throw new Error('Sermon not found')
      }
      
      const data = await response.json()
      setSermon(data.sermon)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sermon')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'Duration not available'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getVideoUrl = (sermon: Sermon): string | undefined => {
    if (sermon.youtube_url) return sermon.youtube_url
    if (sermon.youtube_id) return `https://www.youtube.com/watch?v=${sermon.youtube_id}`
    if (sermon.video_url) return sermon.video_url
    return undefined
  }

  const getEmbedUrl = (sermon: Sermon): string | undefined => {
    if (sermon.youtube_id) {
      return `https://www.youtube.com/embed/${sermon.youtube_id}?autoplay=${isPlaying ? 1 : 0}`
    }
    return undefined
  }

  const getThumbnail = (sermon: Sermon) => {
    if (sermon.thumbnail_image) return sermon.thumbnail_image
    if (sermon.youtube_id) return `https://img.youtube.com/vi/${sermon.youtube_id}/maxresdefault.jpg`
    return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: sermon?.title,
          text: sermon?.description,
          url: window.location.href,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleExternalPlay = () => {
    if (!sermon) return
    const videoUrl = getVideoUrl(sermon)
    if (videoUrl) {
      window.open(videoUrl, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sermon...</p>
        </div>
      </div>
    )
  }

  if (error || !sermon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sermon not found</h3>
          <p className="text-gray-500 mb-6">{error || 'The sermon you\'re looking for doesn\'t exist.'}</p>
          <Link 
            href="/media/sermons/browse"
            className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="inline mr-2 h-4 w-4" />
            Back to Sermons
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/media/sermons/browse"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Sermons
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {sermon.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{sermon.speaker}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(sermon.sermon_date)}</span>
                </div>
                {sermon.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(sermon.duration)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{sermon.view_count.toLocaleString()} views</span>
                </div>
              </div>

              {sermon.series && (
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {sermon.series} Series
                </div>
              )}

              {sermon.scripture_reference && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">{sermon.scripture_reference}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleShare}
              className="ml-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
              <div className="relative aspect-video bg-gray-900">
                {isPlaying && getEmbedUrl(sermon) ? (
                  <iframe
                    src={getEmbedUrl(sermon)}
                    title={sermon.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={getThumbnail(sermon)}
                      alt={sermon.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={handlePlay}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                      >
                        <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video Controls */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {getVideoUrl(sermon) && (
                    <button
                      onClick={handleExternalPlay}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Watch on {sermon.video_type === 'youtube' ? 'YouTube' : 'External Site'}
                    </button>
                  )}
                  
                  {sermon.audio_url && (
                    <a
                      href={sermon.audio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Audio
                    </a>
                  )}
                  
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Message</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {sermon.description}
              </p>
            </div>

            {/* Notes & Transcript */}
            {(sermon.notes || sermon.transcript) && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    {sermon.notes && (
                      <button className="border-b-2 border-black py-2 px-1 text-sm font-medium text-gray-900">
                        Sermon Notes
                      </button>
                    )}
                    {sermon.transcript && (
                      <button className="border-transparent border-b-2 py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Transcript
                      </button>
                    )}
                  </nav>
                </div>
                
                <div className="prose max-w-none">
                  {sermon.notes && (
                    <div className="whitespace-pre-wrap text-gray-700">
                      {sermon.notes}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tags */}
            {sermon.tags.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {sermon.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Sermons */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">More from this Series</h3>
              <div className="text-gray-500 text-sm">
                Related sermons will be shown here
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Share This Message</h3>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Sermon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 