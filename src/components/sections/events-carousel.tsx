'use client'

import Link from 'next/link'
import { useHomepage } from '@/hooks/useHomepage'
import { useEvents } from '@/hooks/useEvents'
import { syncFormatters } from '@/lib/timezone-utils'

export function EventsCarousel() {
  const { homepage, loading: homepageLoading, error: homepageError, source: homepageSource } = useHomepage()
  const { events, loading: eventsLoading, error: eventsError, source: eventsSource } = useEvents()
  
  // Get events carousel content from CMS or defaults
  const eventsContent = homepage.events_carousel
  
  // Combine loading states
  const loading = homepageLoading || eventsLoading

  // Ensure we have enough events for display
  // Featured: events[0] (most upcoming)
  // Grid: events[1-4] (next 4 upcoming), fill with defaults if needed
  const getFeaturedEvent = () => events[0] || null
  const getGridEvents = () => {
    // Since user has enough events, just use the real ones
    return events.slice(1, 5) // Get events[1] through events[4] (up to 4 events for grid)
  }

  const featuredEvent = getFeaturedEvent()
  const gridEvents = getGridEvents()

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'worship':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )
      case 'study':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'youth':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  const formatEventDate = (dateString: string) => {
    try {
      return syncFormatters.eventDateTime(dateString)
    } catch {
      return 'Invalid date'
    }
  }

  const formatEventTime = (dateString: string) => {
    try {
      return syncFormatters.timeOnly(dateString)
    } catch {
      return 'Invalid time'
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {loading ? (
            // Loading skeleton
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-6"></div>
              <div className="h-16 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600 mb-6">
                {eventsContent.subtitle}
              </p>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
                {eventsContent.title.split('&')[0]}&{' '}
                <br />
                {eventsContent.title.split('&')[1]}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {eventsContent.description}
              </p>
            </>
          )}
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeleton for events
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl h-80 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            // Show events[1] through events[4] (skip the first one for featured section)
            gridEvents.map((event, index) => (
              <div key={event.id} className="group cursor-pointer">
                {/* Event Card */}
                <div className={`relative rounded-3xl overflow-hidden mb-6 group cursor-pointer ${
                  index % 2 === 0 ? 'h-80' : 'h-64'
                } ${index === 1 ? 'md:mt-8' : ''}`}>
                  
                  {/* Background - Event Image or Gradient */}
                  {event.primary_image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${event.primary_image.url})` }}
                    >
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient}`}>
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      {/* Simulated pattern for events without images */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px, 20px 20px',
                            animation: 'floatPattern 25s ease-in-out infinite'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Event Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium uppercase tracking-wider">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Event Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-1">{event.name}</h3>
                    <p className="text-gray-200 text-sm">
                      {formatEventDate(event.event_date)} • {formatEventTime(event.event_date)}
                    </p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="px-2">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Capacity: {event.capacity}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* CTA Button */}
                  <Link 
                    href={`/events/${event.id}/register`}
                    className="text-black font-semibold hover:text-gray-700 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    Register for Event
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Featured Event Section - Most Upcoming Event (events[0]) */}
        {!loading && featuredEvent && (
          <div className="mt-20 bg-gray-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Next Upcoming Event
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't miss our next special gathering that brings our community together in worship, service, and fellowship.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Featured Event (most upcoming - events[0]) */}
              <div className="lg:w-1/2">
                <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer">
                  {featuredEvent.primary_image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${featuredEvent.primary_image.url})` }}
                    >
                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuredEvent.gradient}`}>
                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                  )}
                  
                  {/* "Next Event" Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white text-sm font-semibold uppercase tracking-wider">
                        Next Event
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-2xl font-bold text-white mb-2">{featuredEvent.name}</h4>
                    <p className="text-gray-200">{formatEventDate(featuredEvent.event_date)}</p>
                  </div>
                </div>
              </div>
              
              {/* Featured Content */}
              <div className="lg:w-1/2">
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                    Coming Soon
                  </span>
                  <h4 className="text-2xl font-bold text-gray-900">{featuredEvent.name}</h4>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredEvent.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatEventDate(featuredEvent.event_date)} at {formatEventTime(featuredEvent.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{featuredEvent.location}</span>
                  </div>
                  {featuredEvent.capacity && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Capacity: {featuredEvent.capacity}</span>
                    </div>
                  )}
                </div>
                
                <Link 
                  href={`/events/${featuredEvent.id}/register`}
                  className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-block"
                >
                  Register for Next Event
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes floatPattern {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(10px) rotate(1deg); }
          50% { transform: translateY(0px) translateX(20px) rotate(0deg); }
          75% { transform: translateY(15px) translateX(10px) rotate(-1deg); }
        }
      `}</style>
    </section>
  )
} 