'use client'

export function FeaturedGalleries() {
  const featuredGalleries = [
    {
      id: 1,
      title: "Christmas Celebration 2023",
      description: "Beautiful moments from our Christmas Eve service and community celebration",
      imageCount: 45,
      videoCount: 8,
      date: "December 24, 2023",
      category: "Special Events",
      gradient: "from-red-700 to-green-700",
      featured: true
    },
    {
      id: 2,
      title: "Community Baptisms",
      description: "Powerful testimonies and joyful moments from recent baptism ceremonies",
      imageCount: 32,
      videoCount: 12,
      date: "November 2023",
      category: "Baptisms",
      gradient: "from-blue-600 to-cyan-700"
    },
    {
      id: 3,
      title: "Youth Summer Camp",
      description: "Adventures, growth, and unforgettable memories from our annual youth retreat",
      imageCount: 150,
      videoCount: 25,
      date: "August 2023",
      category: "Youth",
      gradient: "from-purple-600 to-pink-700"
    }
  ]

  const featuredGallery = featuredGalleries.find(gallery => gallery.featured)
  const regularGalleries = featuredGalleries.filter(gallery => !gallery.featured)

  return (
    <section id="featured-galleries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Highlighted Collections
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Featured Galleries
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our most cherished moments through carefully curated photo and video galleries
          </p>
        </div>

        {/* Featured Gallery */}
        {featuredGallery && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                Featured Gallery
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-4">{featuredGallery.title}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{featuredGallery.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{featuredGallery.imageCount} Photos</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                  <span className="font-medium">{featuredGallery.videoCount} Videos</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {featuredGallery.description}
              </p>
              
              <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
                {featuredGallery.category}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Gallery
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
                {/* Video Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${featuredGallery.gradient}`}>
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
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Gallery Stats */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredGallery.imageCount} photos
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredGallery.videoCount} videos
                  </div>
                </div>
                
                {/* Gallery Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{featuredGallery.title}</h3>
                  <p className="text-gray-200">{featuredGallery.category} • {featuredGallery.date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Galleries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularGalleries.map((gallery, index) => (
            <div key={gallery.id} className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                {/* Video Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gallery.gradient}`}>
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
                        backgroundSize: '35px 35px',
                        animation: `moveBackground ${25 + index * 3}s linear infinite`
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
                
                {/* Gallery Stats */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    {gallery.imageCount} photos
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    {gallery.videoCount} videos
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {gallery.category}
                  </div>
                </div>
                
                {/* Gallery Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">{gallery.title}</h3>
                  <p className="text-gray-200 text-sm">{gallery.date}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {gallery.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                    <span>{gallery.date}</span>
                    <span>•</span>
                    <span>{gallery.imageCount + gallery.videoCount} items</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {gallery.description}
                </p>
                
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-2">
                  View Gallery
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Galleries CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Explore All Galleries
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover hundreds of photos and videos documenting our church family's journey, 
              celebrations, and meaningful moments throughout the years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300">
                Browse All Collections
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300">
                Submit Your Photos
              </button>
            </div>
          </div>
        </div>
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