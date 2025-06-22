'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Clock, MapPin, Heart } from 'lucide-react'

interface GetInvolvedTemplate {
  id: string
  title: string
  excerpt: string
  icon_emoji: string
  category: string
  time_commitment?: string
  contact_person?: string
  custom_cta_text: string
  custom_cta_url?: string
  application_form_url?: string
  gradient_colors: {
    from: string
    to: string
  }
  ministry_group?: {
    name: string
    type: string
  }
}

interface GetInvolvedSectionProps {
  title?: string
  subtitle?: string
  description?: string
  show_all_link?: boolean
  all_link_text?: string
  all_link_url?: string
  max_items?: number
  filter_categories?: string[]
  layout?: 'grid' | 'list'
}

export function GetInvolvedSection({
  title = 'Get Involved',
  subtitle = 'Join Our Community',
  description = 'Discover meaningful ways to connect, serve, and grow in your faith journey with us.',
  show_all_link = true,
  all_link_text = 'View All Opportunities',
  all_link_url = '/get-involved',
  max_items = 6,
  filter_categories = [],
  layout = 'grid'
}: GetInvolvedSectionProps) {
  const [templates, setTemplates] = useState<GetInvolvedTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGetInvolvedTemplates()
  }, [])

  const fetchGetInvolvedTemplates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/get-involved')
      
      if (!response.ok) {
        throw new Error('Failed to fetch Get Involved templates')
      }
      
      const data = await response.json()
      let filteredTemplates = data.templates || []
      
      // Apply category filter if specified
      if (filter_categories.length > 0) {
        filteredTemplates = filteredTemplates.filter((template: GetInvolvedTemplate) => 
          filter_categories.includes(template.category)
        )
      }
      
      // Limit number of items
      filteredTemplates = filteredTemplates.slice(0, max_items)
      
      setTemplates(filteredTemplates)
    } catch (err) {
      console.error('Error fetching Get Involved templates:', err)
      setError(err instanceof Error ? err.message : 'Failed to load opportunities')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ministry': return '⛪'
      case 'volunteer': return '🤝'
      case 'community': return '🏘️'
      case 'discipleship': return '📖'
      case 'outreach': return '🌍'
      default: return '⭐'
    }
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

  if (error && templates.length === 0) {
    return null // Don't render section if there's an error and no fallback data
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4 tracking-wide uppercase">
            {subtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-10 bg-gray-200 rounded mt-6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : templates.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No opportunities available yet
            </h3>
            <p className="text-slate-600">
              Check back soon for ways to get involved in our community.
            </p>
          </div>
        ) : (
          // Content
          <>
            <div className={`grid gap-8 ${
              layout === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${template.gradient_colors.from} to-${template.gradient_colors.to} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br from-${template.gradient_colors.from} to-${template.gradient_colors.to} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {template.icon_emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {template.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                            <span>{getCategoryIcon(template.category)}</span>
                            {template.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {template.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="space-y-2 mb-6">
                      {template.time_commitment && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>{template.time_commitment}</span>
                        </div>
                      )}
                      {template.ministry_group && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="w-4 h-4" />
                          <span>{template.ministry_group.name}</span>
                        </div>
                      )}
                      {template.contact_person && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Heart className="w-4 h-4" />
                          <span>Contact: {template.contact_person}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={template.application_form_url || template.custom_cta_url || '#'}
                      className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-${template.gradient_colors.from} to-${template.gradient_colors.to} text-white font-semibold rounded-xl hover:shadow-lg transform transition-all duration-200 hover:scale-105`}
                    >
                      {template.custom_cta_text}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            {show_all_link && templates.length > 0 && (
              <div className="text-center mt-16">
                <Link
                  href={all_link_url}
                  className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {all_link_text}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
} 