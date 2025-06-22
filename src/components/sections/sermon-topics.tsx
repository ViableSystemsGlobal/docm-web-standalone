'use client'

export function SermonTopics() {
  const topics = [
    {
      id: 1,
      title: "Faith & Trust",
      description: "Building unshakeable faith in God's promises and character",
      sermonsCount: 24,
      gradient: "from-blue-600 to-indigo-700",
      icon: "✝️"
    },
    {
      id: 2,
      title: "Prayer & Worship",
      description: "Deepening your relationship with God through prayer and worship",
      sermonsCount: 18,
      gradient: "from-purple-600 to-pink-700",
      icon: "🙏"
    },
    {
      id: 3,
      title: "Love & Relationships",
      description: "Biblical principles for healthy relationships and loving others",
      sermonsCount: 22,
      gradient: "from-red-600 to-rose-700",
      icon: "❤️"
    },
    {
      id: 4,
      title: "Purpose & Calling",
      description: "Discovering God's unique plan and purpose for your life",
      sermonsCount: 16,
      gradient: "from-green-600 to-emerald-700",
      icon: "🎯"
    },
    {
      id: 5,
      title: "Hope & Healing",
      description: "Finding comfort and restoration in God's healing power",
      sermonsCount: 20,
      gradient: "from-teal-600 to-cyan-700",
      icon: "🌟"
    },
    {
      id: 6,
      title: "Wisdom & Growth",
      description: "Growing in spiritual maturity and biblical wisdom",
      sermonsCount: 26,
      gradient: "from-orange-600 to-amber-700",
      icon: "📚"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Browse by Topic
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Sermon Topics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore messages organized by life topics and biblical themes to find exactly what you need for your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div key={topic.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                {/* Video Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient}`}>
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
                        backgroundSize: '30px 30px',
                        animation: `moveBackground ${20 + index * 2}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Topic Icon */}
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-xl">{topic.icon}</span>
                  </div>
                </div>
                
                {/* Sermon Count Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {topic.sermonsCount} sermons
                  </div>
                </div>
                
                {/* Topic Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 group-hover:shadow-lg group-hover:bg-white transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {topic.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{topic.sermonsCount} messages available</span>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-1">
                    Browse
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
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
                    backgroundSize: '50px 50px',
                    animation: 'moveBackground 35s linear infinite'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="relative z-10 py-20 px-8">
              <h3 className="text-4xl font-bold text-white mb-6">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Our sermon library contains hundreds of messages covering every aspect of Christian living. 
                Use our search feature to find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search All Sermons
                </button>
                <button className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Request a Topic
                </button>
              </div>
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