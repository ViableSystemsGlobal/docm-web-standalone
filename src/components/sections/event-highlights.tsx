'use client'

export function EventHighlights() {
  const highlights = [
    {
      id: 1,
      title: "Community Food Drive Success",
      date: "November 2023",
      description: "Together we collected over 2,000 pounds of food for local families, demonstrating God's love through action.",
      stats: "2,000+ lbs collected",
      gradient: "from-green-700 to-emerald-800",
      testimonial: "Seeing our church come together to serve those in need was truly inspiring.",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Youth Camp Adventure",
      date: "August 2023",
      description: "50 young people experienced life-changing moments during our annual summer camp retreat.",
      stats: "50 youth attended",
      gradient: "from-purple-700 to-pink-800",
      testimonial: "This camp changed my perspective on faith and friendship forever.",
      author: "Michael Chen"
    },
    {
      id: 3,
      title: "Easter Celebration",
      date: "April 2023",
      description: "Our largest Easter service ever, celebrating the resurrection with joy and community.",
      stats: "800+ attendees",
      gradient: "from-orange-700 to-amber-800",
      testimonial: "The worship was powerful and the message touched my heart deeply.",
      author: "David Martinez"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Event Highlights
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Celebrating Moments Together
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Look back at some of the incredible moments we've shared as a church family
          </p>
        </div>

        <div className="space-y-16">
          {highlights.map((highlight, index) => (
            <div key={highlight.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Video/Image Container */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
                  {/* Video Background Placeholder */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient}`}>
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
                          backgroundSize: '35px 35px',
                          animation: `moveBackground ${18 + index * 4}s linear infinite`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Stats Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {highlight.stats}
                    </div>
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {highlight.date}
                    </div>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white">{highlight.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="max-w-lg">
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                    {highlight.date}
                  </div>
                  
                  <h3 className="text-4xl font-bold text-gray-900 mb-6">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {highlight.description}
                  </p>
                  
                  {/* Testimonial */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 italic mb-2">
                          "{highlight.testimonial}"
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          — {highlight.author}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2">
                      View Gallery
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 font-semibold hover:bg-gray-50 transition-all duration-300">
                      Share Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-20">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800">
              <div className="absolute inset-0 bg-black/50"></div>
              
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
                Be Part of Our Next Story
              </h3>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Every event is an opportunity to create new memories, build relationships, and experience God's love together.
              </p>
              <button className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3">
                Join Our Next Event
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
      `}</style>
    </section>
  )
} 