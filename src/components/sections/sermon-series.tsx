'use client'

export function SermonSeries() {
  const series = [
    {
      id: 1,
      title: "Faith in Action",
      description: "Practical teachings on how to live out your faith in everyday situations and challenges.",
      sermonsCount: 8,
      duration: "6 weeks",
      gradient: "from-blue-700 to-indigo-800",
      status: "current",
      startDate: "November 2023"
    },
    {
      id: 2,
      title: "Grace & Truth",
      description: "Exploring the perfect balance of God's grace and truth in our lives and relationships.",
      sermonsCount: 6,
      duration: "4 weeks",
      gradient: "from-green-700 to-emerald-800",
      status: "completed",
      startDate: "October 2023"
    },
    {
      id: 3,
      title: "Love Like Jesus",
      description: "Learning to love unconditionally as Christ loved us, transforming hearts and communities.",
      sermonsCount: 10,
      duration: "8 weeks",
      gradient: "from-red-700 to-pink-800",
      status: "completed",
      startDate: "August 2023"
    },
    {
      id: 4,
      title: "Prayer Life",
      description: "Developing a deeper, more meaningful prayer life that connects you with God's heart.",
      sermonsCount: 5,
      duration: "5 weeks",
      gradient: "from-purple-700 to-indigo-800",
      status: "completed",
      startDate: "July 2023"
    },
    {
      id: 5,
      title: "Biblical Foundations",
      description: "Building strong foundations in Christian doctrine and understanding of Scripture.",
      sermonsCount: 12,
      duration: "10 weeks",
      gradient: "from-orange-700 to-red-800",
      status: "coming-soon",
      startDate: "January 2024"
    },
    {
      id: 6,
      title: "Kingdom Living",
      description: "Understanding what it means to live as citizens of God's kingdom in today's world.",
      sermonsCount: 7,
      duration: "6 weeks",
      gradient: "from-teal-700 to-cyan-800",
      status: "coming-soon",
      startDate: "February 2024"
    }
  ]

  const currentSeries = series.filter(s => s.status === 'current')
  const completedSeries = series.filter(s => s.status === 'completed')
  const upcomingSeries = series.filter(s => s.status === 'coming-soon')

  return (
    <section id="sermon-series" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Teaching Series
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Sermon Series
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dive deep into God's Word through our carefully crafted sermon series, designed to build your faith and transform your life
          </p>
        </div>

        {/* Current Series */}
        {currentSeries.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Current Series</h3>
              <p className="text-gray-600">Join us as we explore these life-changing truths together</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {currentSeries.map((series, index) => (
                <div key={series.id} className="bg-white rounded-3xl overflow-hidden shadow-sm group cursor-pointer">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Video Section */}
                    <div className="relative h-80 lg:h-auto overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${series.gradient}`}>
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
                              animation: `moveBackground ${30 + index * 5}s linear infinite`
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
                      
                      {/* Status Badge */}
                      <div className="absolute top-6 left-6">
                        <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          Current Series
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h4 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                        {series.title}
                      </h4>
                      
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        {series.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-900">{series.sermonsCount}</div>
                          <div className="text-sm text-gray-600">Messages</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-900">{series.duration}</div>
                          <div className="text-sm text-gray-600">Duration</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Watch Series
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-3 font-semibold hover:bg-gray-50 transition-all duration-300">
                          View All Messages
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Series */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Completed Series</h3>
            <p className="text-gray-600">Explore our library of powerful teaching series</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {completedSeries.map((series, index) => (
              <div key={series.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  {/* Video Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${series.gradient}`}>
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
                          animation: `moveBackground ${25 + index * 3}s linear infinite`
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
                  
                  {/* Series Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{series.title}</h4>
                        <p className="text-gray-200 text-sm">{series.sermonsCount} Messages • {series.duration}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                        Complete
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {series.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {series.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    Started {series.startDate}
                  </div>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-2">
                    Explore Series
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Series */}
        {upcomingSeries.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-gray-600">Get excited for these upcoming teaching series</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingSeries.map((series, index) => (
                <div key={series.id} className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-200 text-center group hover:border-gray-300 transition-colors duration-300">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{series.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-6">{series.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{series.sermonsCount}</div>
                      <div className="text-xs text-gray-600">Messages</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{series.duration}</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                  </div>
                  
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Starting {series.startDate}
                  </div>
                  
                  <div>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
                      Get Notified
                    </button>
                  </div>
                </div>
              ))}
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