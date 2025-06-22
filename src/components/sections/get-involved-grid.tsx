'use client'

import Link from 'next/link'
import { useHomepage } from '@/hooks/useHomepage'

interface GetInvolvedGridProps {
  className?: string
}

// Helper function to generate ministry URL
function getMinistryUrl(template: any): string {
  // Generate slug from title
  const slug = template.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
  
  return `/ministries/${slug}`
}

export function GetInvolvedGrid({ className = '' }: GetInvolvedGridProps) {
  const { homepage, loading, error, source } = useHomepage()

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-gray-600 mb-6">
              Get Involved
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
              Find your place in{' '}
              <br />
              our church family.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover opportunities to serve, grow, and make a lasting impact in our community and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-80 rounded-3xl mb-6"></div>
                <div className="px-2">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    console.log('🔴 Get Involved Error:', error)
  }

  // Get templates from homepage data or use defaults
  const getInvolvedSection = (homepage as any)?.get_involved
  const templates = getInvolvedSection?.templates || []

  // Use default templates if no database templates
  const defaultTemplates = [
    {
      id: 'default-1',
      title: "Children's Ministry",
      excerpt: "Help shape the next generation through fun, engaging programs that build faith foundations.",
      icon_emoji: "👶",
      gradient_colors: { from: "blue-800", to: "indigo-900" },
      time_commitment: "2-3 hours per week",
      contact_person: "Sarah Wilson",
      custom_cta_text: "Learn More"
    },
    {
      id: 'default-2',
      title: "Youth Ministry",
      excerpt: "Mentor teenagers and help them develop their faith, character, and purpose.",
      icon_emoji: "🏀",
      gradient_colors: { from: "purple-800", to: "pink-900" },
      time_commitment: "3-4 hours per week",
      contact_person: "David Chen",
      custom_cta_text: "Learn More"
    },
    {
      id: 'default-3',
      title: "Worship Team",
      excerpt: "Use your musical talents to lead our congregation in powerful worship experiences.",
      icon_emoji: "🎵",
      gradient_colors: { from: "green-800", to: "teal-900" },
      time_commitment: "4-5 hours per week",
      contact_person: "Maria Rodriguez",
      custom_cta_text: "Learn More"
    },
    {
      id: 'default-4',
      title: "Community Outreach",
      excerpt: "Serve our local community through various outreach programs and initiatives.",
      icon_emoji: "🤝",
      gradient_colors: { from: "orange-800", to: "red-900" },
      time_commitment: "2-3 hours per week",
      contact_person: "James Thompson",
      custom_cta_text: "Learn More"
    }
  ]

  const displayTemplates = templates.length > 0 ? templates.slice(0, 4) : defaultTemplates

  return (
    <section id="get-involved" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Get Involved
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
            Find your place in{' '}
            <br />
            our church family.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover opportunities to serve, grow, and make a lasting impact in our community and beyond.
          </p>
        </div>
        
        {/* Ministry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTemplates.map((template: any, index: number) => (
            <Link key={template.id} href={getMinistryUrl(template)} className="group cursor-pointer block">
              {/* Image Card */}
              <div className="relative h-80 rounded-3xl overflow-hidden mb-6 group cursor-pointer">
                {template.featured_image ? (
                  <>
                    {/* Actual Image Background */}
                    <img 
                      src={template.featured_image} 
                      alt={template.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  </>
                ) : (
                  <>
                    {/* Fallback Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${template.gradient_colors.from} to-${template.gradient_colors.to}`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      
                      {/* Simulated pattern for fallback */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                            `,
                            backgroundSize: '30px 30px',
                            animation: `moveBackground${index + 1} ${20 + index * 5}s linear infinite`
                          }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Play Button - Only show for fallback gradient backgrounds, not for actual images */}
                {!template.featured_image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Ministry Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-4xl mb-2">{template.icon_emoji || '🤝'}</div>
                  <h3 className="text-xl font-bold text-white">{template.title}</h3>
                  {template.time_commitment && (
                    <p className="text-white/80 text-sm mt-1">{template.time_commitment}</p>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="px-2">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {template.excerpt || template.description}
                </p>
                {template.contact_person && (
                  <p className="text-sm text-gray-500 mb-4">
                    Contact: {template.contact_person}
                  </p>
                )}
                <div className="text-black font-semibold hover:text-gray-700 transition-colors duration-300 inline-flex items-center gap-2 group">
                  {template.custom_cta_text || 'Learn More'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gray-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to make a difference?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're new to faith or have been walking with Christ for years, 
            there's a place for you to serve and grow in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300">
              Join a Ministry
            </a>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes for each ministry */}
      <style jsx>{`
        @keyframes moveBackground1 {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(30px) translateY(30px); }
        }
        @keyframes moveBackground2 {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(35px) translateY(35px); }
        }
        @keyframes moveBackground3 {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(40px) translateY(40px); }
        }
        @keyframes moveBackground4 {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(45px) translateY(45px); }
        }
      `}</style>
    </section>
  )
} 