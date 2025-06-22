'use client'

import Link from 'next/link'
import { useEventsPage } from '@/hooks/useEventsPage'
import { useEvents } from '@/hooks/useEvents'
import { syncFormatters } from '@/lib/timezone-utils'

export function UpcomingEvents() {
  const { eventsPage, loading: eventsPageLoading, error: eventsPageError, source: eventsPageSource } = useEventsPage()
  const { events, loading: eventsLoading, error: eventsError, source: eventsSource } = useEvents()
  
  // Get section content from CMS or defaults
  const sectionContent = eventsPage.upcoming_events
  
  // Combine loading states
  const loading = eventsPageLoading || eventsLoading

  // Format events data for display - use real events from database
  const formatEventTime = (dateString: string) => {
    try {
      return syncFormatters.timeOnly(dateString)
    } catch {
      return 'Invalid time'
    }
  }

  const formatEventDate = (dateString: string) => {
    try {
      return syncFormatters.displayDate(dateString)
    } catch {
      return 'Invalid date'
    }
  }

  // Get featured event (first upcoming event)
  const featuredEvent = events[0] || null
  
  // Get regular events (next 4 events)
  const regularEvents = events.slice(1, 5)

  return (
    <section id="upcoming-events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {loading ? (
            // Loading skeleton
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-6"></div>
              <div className="h-16 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600 mb-6">
                {sectionContent.section_title}
              </p>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
                {sectionContent.section_heading}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {sectionContent.section_description}
              </p>
            </>
          )}
        </div>

        {/* Featured Event */}
        {featuredEvent && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Event
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">{featuredEvent.name}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{formatEventDate(featuredEvent.event_date)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{formatEventTime(featuredEvent.event_date)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{featuredEvent.location}</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {featuredEvent.description}
              </p>
              
              <Link 
                href={`/events/${featuredEvent.id}/register`}
                className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3"
              >
                Register for This Event
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
                {/* Event Image Background */}
                {featuredEvent.primary_image?.url ? (
                  <div className="absolute inset-0">
                    <img 
                      src={featuredEvent.primary_image.url}
                      alt={featuredEvent.primary_image.alt_text || featuredEvent.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredEvent.gradient}`}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Simulated video pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="h-full w-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                            linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                          `,
                          backgroundSize: '40px 40px',
                          animation: 'moveBackground 30s linear infinite'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Event Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{featuredEvent.name}</h3>
                  <p className="text-gray-200">{formatEventDate(featuredEvent.event_date)} • {formatEventTime(featuredEvent.event_date)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading skeleton for featured event */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 animate-pulse">
            <div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-20 bg-gray-200 rounded mb-8"></div>
              <div className="h-12 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-[500px] bg-gray-200 rounded-3xl"></div>
          </div>
        )}

        {/* Regular Events Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regularEvents.map((event, index) => (
              <Link key={event.id} href={`/events/${event.id}/register`} className="group cursor-pointer block">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  {/* Event Image Background */}
                  {event.primary_image?.url ? (
                    <div className="absolute inset-0">
                      <img 
                        src={event.primary_image.url}
                        alt={event.primary_image.alt_text || event.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient}`}>
                      <div className="absolute inset-0 bg-black/40"></div>
                      
                      {/* Simulated video pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="h-full w-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                            `,
                            backgroundSize: '25px 25px',
                            animation: `moveBackground ${25 + index * 3}s linear infinite`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <span>{formatEventDate(event.event_date)}</span>
                      <span>•</span>
                      <span>{formatEventTime(event.event_date)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {event.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Loading skeleton for events grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-64 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="space-y-4">
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {!loading && (
          <div className="text-center mt-16">
            <div className="bg-gray-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Join Us for Worship
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We'd love to welcome you to our church family. Plan your visit ahead of time so we can make sure you feel at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/events/plan-visit"
                  className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Plan Your Visit
                </Link>
                <Link 
                  href="/contact"
                  className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(40px) translateY(40px); }
        }
      `}</style>
    </section>
  )
} 