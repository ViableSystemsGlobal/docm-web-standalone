'use client'

export function EventCategories() {
  const categories = [
    {
      id: 1,
      title: "Worship Services",
      description: "Join us for inspiring worship experiences that lift your spirit and deepen your faith.",
      icon: "🙏",
      gradient: "from-blue-800 to-indigo-900",
      events: ["Sunday Service", "Midweek Prayer", "Special Services"]
    },
    {
      id: 2,
      title: "Youth & Children",
      description: "Fun and engaging activities designed to help young people grow in faith and friendship.",
      icon: "👥",
      gradient: "from-purple-800 to-pink-900",
      events: ["Youth Night", "Kids Club", "Summer Camp"]
    },
    {
      id: 3,
      title: "Community Outreach",
      description: "Making a difference in our community through service, love, and compassionate action.",
      icon: "❤️",
      gradient: "from-green-800 to-emerald-900",
      events: ["Food Bank", "Community Clean-up", "Volunteer Days"]
    },
    {
      id: 4,
      title: "Educational",
      description: "Opportunities to learn, grow, and deepen your understanding of faith and scripture.",
      icon: "📖",
      gradient: "from-orange-800 to-amber-900",
      events: ["Bible Study", "Life Groups", "Seminars"]
    },
    {
      id: 5,
      title: "Fellowship",
      description: "Building meaningful relationships and connections within our church family.",
      icon: "🤝",
      gradient: "from-teal-800 to-cyan-900",
      events: ["Coffee Hour", "Potluck Dinners", "Game Nights"]
    },
    {
      id: 6,
      title: "Special Events",
      description: "Celebrating life's special moments and seasons throughout the year.",
      icon: "🎉",
      gradient: "from-red-800 to-rose-900",
      events: ["Christmas", "Easter", "Anniversary"]
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Event Categories
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Something for Everyone
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the variety of events and activities that make our church community vibrant and welcoming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative h-80 rounded-3xl overflow-hidden mb-6">
                {/* Video Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}>
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
                        backgroundSize: '30px 30px',
                        animation: `moveBackground ${20 + index * 2}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Category Icon */}
                <div className="absolute top-6 left-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                </div>
                
                {/* Category Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.events.map((event, eventIndex) => (
                      <span key={eventIndex} className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {category.description}
                </p>
                
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-2">
                  Explore Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Find Your Community
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're looking for spiritual growth, community service, or fellowship, 
              there's a place for you in our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300">
                Join an Event
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(30px) translateY(30px); }
        }
      `}</style>
    </section>
  )
} 