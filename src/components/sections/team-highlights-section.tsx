'use client'

import { Award, Star, Trophy } from 'lucide-react'

interface TeamHighlight {
  name: string
  role: string
  achievement: string
  description: string
  image_url?: string
  video_url?: string
  media_type: 'image' | 'video'
  highlight_type: 'achievement' | 'recognition' | 'milestone'
}

interface TeamHighlightsSectionProps {
  title?: string
  subtitle?: string
  description?: string
  highlights?: TeamHighlight[]
  layout?: 'grid' | 'carousel'
  background_color?: 'white' | 'gray' | 'blue'
  show_icons?: boolean
}

const getHighlightIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return <Trophy className="h-8 w-8 text-yellow-500" />
    case 'recognition':
      return <Award className="h-8 w-8 text-blue-500" />
    case 'milestone':
      return <Star className="h-8 w-8 text-purple-500" />
    default:
      return <Award className="h-8 w-8 text-blue-500" />
  }
}

const getBackgroundClass = (color: string) => {
  switch (color) {
    case 'gray':
      return 'bg-gray-50'
    case 'blue':
      return 'bg-blue-50'
    default:
      return 'bg-white'
  }
}

export function TeamHighlightsSection({
  title = "Team Highlights",
  subtitle = "Celebrating Excellence",
  description = "Recognizing the outstanding achievements and contributions of our dedicated team members",
  highlights = [],
  layout = 'grid',
  background_color = 'white',
  show_icons = true
}: TeamHighlightsSectionProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <section className={`py-20 ${getBackgroundClass(background_color)}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600">No team highlights to display yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 ${getBackgroundClass(background_color)}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">{subtitle}</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Highlights Grid */}
        <div className={`grid ${
          layout === 'carousel' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        } gap-8`}>
          {highlights.map((highlight, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Media */}
                {highlight.image_url || highlight.video_url ? (
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {highlight.media_type === 'video' && highlight.video_url ? (
                      <video
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        controls
                        preload="metadata"
                      >
                        <source src={highlight.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : highlight.image_url ? (
                      <img
                        src={highlight.image_url}
                        alt={highlight.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold">
                      {highlight.name.charAt(0)}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Icon and Achievement */}
                  <div className="flex items-start gap-4 mb-4">
                    {show_icons && (
                      <div className="flex-shrink-0">
                        {getHighlightIcon(highlight.highlight_type)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{highlight.name}</h4>
                      <p className="text-blue-600 font-semibold mb-2">{highlight.role}</p>
                      <h5 className="text-lg font-semibold text-gray-800 mb-3">{highlight.achievement}</h5>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">{highlight.description}</p>

                  {/* Highlight Type Badge */}
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      highlight.highlight_type === 'achievement' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : highlight.highlight_type === 'recognition'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {highlight.highlight_type.charAt(0).toUpperCase() + highlight.highlight_type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 