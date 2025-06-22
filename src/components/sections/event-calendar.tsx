'use client'

import { useState } from 'react'

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const events = [
    { id: 1, date: '2023-12-15', title: 'Youth Night', time: '7:00 PM', type: 'youth' },
    { id: 2, date: '2023-12-16', title: 'Community Outreach', time: '10:00 AM', type: 'outreach' },
    { id: 3, date: '2023-12-17', title: 'Sunday Service', time: '9:00 AM', type: 'worship' },
    { id: 4, date: '2023-12-24', title: 'Christmas Eve Service', time: '6:00 PM', type: 'special' },
    { id: 5, date: '2023-12-31', title: 'New Year Prayer', time: '11:00 PM', type: 'prayer' }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "December 17, 2023",
      time: "9:00 AM",
      location: "Main Sanctuary",
      description: "Join us for worship, prayer, and fellowship",
      category: "Worship",
      gradient: "from-blue-600 to-indigo-700"
    },
    {
      id: 2,
      title: "Youth Night",
      date: "December 15, 2023",
      time: "7:00 PM",
      location: "Youth Center",
      description: "Games, music, and fellowship for teens",
      category: "Youth",
      gradient: "from-purple-600 to-pink-700"
    },
    {
      id: 3,
      title: "Christmas Eve Service",
      date: "December 24, 2023",
      time: "6:00 PM",
      location: "Main Sanctuary",
      description: "Special Christmas celebration service",
      category: "Special",
      gradient: "from-red-600 to-rose-700"
    }
  ]

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const hasEvent = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.some(event => event.date === dateString)
  }

  const getEventForDay = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.find(event => event.date === dateString)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Event Calendar
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Plan Your Visit
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay up to date with all our upcoming events and never miss an opportunity to connect
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day && (
                      <div className={`w-full h-full flex items-center justify-center rounded-lg text-sm relative group cursor-pointer transition-all duration-200 ${
                        hasEvent(day) 
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                          : 'hover:bg-gray-100'
                      }`}>
                        {day}
                        {hasEvent(day) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                        )}
                        
                        {/* Tooltip */}
                        {hasEvent(day) && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            {getEventForDay(day)?.title}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">This Week</h3>
            
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                {/* Event Header with Video Background */}
                <div className="relative h-32 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Simulated video pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="h-full w-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                          `,
                          backgroundSize: '20px 20px',
                          animation: `moveBackground ${15 + index * 2}s linear infinite`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {event.title}
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 text-sm inline-flex items-center gap-1">
                    Learn More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Add to Calendar CTA */}
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Stay Connected
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Add our events to your calendar and never miss a gathering
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition-colors duration-300 text-sm rounded-lg">
                Subscribe to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(20px) translateY(20px); }
        }
      `}</style>
    </section>
  )
} 