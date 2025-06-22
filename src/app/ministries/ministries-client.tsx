'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Clock, Heart, ArrowRight } from 'lucide-react'

interface Ministry {
  id: string
  title: string
  excerpt: string
  icon_emoji: string
  category: string
  time_commitment?: string
  contact_person?: string
  featured_image?: string
  gradient_colors: {
    from: string
    to: string
  }
}

export default function MinistriesPageClient() {
  const [ministries, setMinistries] = useState<Ministry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMinistries()
  }, [])

  const fetchMinistries = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/homepage')
      
      if (!response.ok) {
        throw new Error('Failed to fetch ministries')
      }
      
      const data = await response.json()
      const getInvolvedTemplates = data.homepage?.get_involved?.templates || []
      setMinistries(getInvolvedTemplates)
    } catch (err) {
      console.error('Error fetching ministries:', err)
      setError(err instanceof Error ? err.message : 'Failed to load ministries')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ministry': return 'bg-blue-100 text-blue-800'
      case 'volunteer': return 'bg-green-100 text-green-800'
      case 'community': return 'bg-purple-100 text-purple-800'
      case 'discipleship': return 'bg-amber-100 text-amber-800'
      case 'outreach': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-300 rounded-2xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Unable to load ministries
            </h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Ministries
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover meaningful ways to connect, serve, and grow in your faith journey with us. 
              Each ministry offers unique opportunities to make a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Ministries Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ministries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No ministries available yet
              </h3>
              <p className="text-gray-600">
                Check back soon for ways to get involved in our community.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => (
                <Link
                  key={ministry.id}
                  href={`/ministries/${generateSlug(ministry.title)}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Hero Image or Gradient */}
                  <div className="relative h-48">
                    {ministry.featured_image ? (
                      <>
                        <img 
                          src={ministry.featured_image} 
                          alt={ministry.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                      </>
                    ) : (
                      <div className={`h-full bg-gradient-to-br from-${ministry.gradient_colors.from} to-${ministry.gradient_colors.to}`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                    )}
                    
                    {/* Ministry Icon */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-2xl">{ministry.icon_emoji}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(ministry.category)}`}>
                        {ministry.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {ministry.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {ministry.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="space-y-2 mb-6">
                      {ministry.time_commitment && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{ministry.time_commitment}</span>
                        </div>
                      )}
                      {ministry.contact_person && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Heart className="w-4 h-4" />
                          <span>Contact: {ministry.contact_person}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Call to Action */}
          {ministries.length > 0 && (
            <div className="text-center mt-16 bg-white rounded-2xl shadow-lg p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Get Involved?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you're new to faith or have been walking with Christ for years, 
                there's a place for you to serve and grow in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/"
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 