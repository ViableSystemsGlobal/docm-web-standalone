'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, Clock, MapPin, Heart, Mail, Phone, Calendar, CheckCircle, ExternalLink } from 'lucide-react'

interface MinistryData {
  id: string
  title: string
  description: string
  excerpt: string
  featured_image?: string
  icon_emoji: string
  category: string
  time_commitment?: string
  contact_person?: string
  contact_email?: string
  contact_phone?: string
  requirements?: string[]
  benefits?: string[]
  gradient_colors: {
    from: string
    to: string
  }
  ministry_group?: {
    id: string
    name: string
    type: string
  }
  location?: string
  meeting_times?: string[]
}

export default function MinistryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [ministry, setMinistry] = useState<MinistryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchMinistryData(slug)
    }
  }, [slug])

  const fetchMinistryData = async (slug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ministries/${encodeURIComponent(slug)}`)
      
      if (!response.ok) {
        throw new Error('Ministry not found')
      }
      
      const data = await response.json()
      setMinistry(data.ministry)
    } catch (err) {
      console.error('Error fetching ministry:', err)
      setError(err instanceof Error ? err.message : 'Failed to load ministry')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ministry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Ministry Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              The ministry you're looking for could not be found.
            </p>
            <Link 
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[50vh] min-h-[400px]">
        {ministry.featured_image ? (
          <>
            <div className="absolute inset-0">
              <img 
                src={ministry.featured_image} 
                alt={ministry.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          </>
        ) : (
          <div className={`bg-gradient-to-br from-${ministry.gradient_colors.from} to-${ministry.gradient_colors.to}`}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/#get-involved"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Get Involved
            </Link>
          </div>

          {/* Hero Content - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-6">{ministry.icon_emoji}</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {ministry.title}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                {ministry.excerpt}
              </p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
              {ministry.time_commitment && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span>{ministry.time_commitment}</span>
                </div>
              )}
              {ministry.category && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="capitalize">{ministry.category}</span>
                </div>
              )}
              {ministry.contact_person && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Heart className="w-5 h-5" />
                  <span>{ministry.contact_person}</span>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Ministry</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{ministry.description}</p>
                </div>
              </div>

              {/* Requirements */}
              {ministry.requirements && ministry.requirements.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What We're Looking For</h3>
                  <ul className="space-y-3">
                    {ministry.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {ministry.benefits && ministry.benefits.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Gain</h3>
                  <ul className="space-y-3">
                    {ministry.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                
                {ministry.contact_person && (
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{ministry.contact_person}</span>
                  </div>
                )}
                
                {ministry.contact_email && (
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a 
                      href={`mailto:${ministry.contact_email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {ministry.contact_email}
                    </a>
                  </div>
                )}
                
                {ministry.contact_phone && (
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <a 
                      href={`tel:${ministry.contact_phone}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {ministry.contact_phone}
                    </a>
                  </div>
                )}

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className={`block w-full text-center bg-gradient-to-r from-${ministry.gradient_colors.from} to-${ministry.gradient_colors.to} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200`}
                  >
                    Join This Ministry
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Ask Questions
                  </Link>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Serve?</h3>
                <p className="text-gray-700 mb-6">
                  Join hundreds of others who are making a difference in our community through ministry and service.
                </p>
                <div className="flex items-center gap-2 text-blue-600">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Start anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 