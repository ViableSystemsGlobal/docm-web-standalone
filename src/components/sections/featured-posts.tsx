'use client'

export function FeaturedPosts() {
  const featuredPosts = [
    {
      id: 1,
      title: "Finding Hope in Difficult Times",
      excerpt: "Discover how God's promises provide comfort and strength when life feels overwhelming and uncertain.",
      author: "Pastor Sarah Williams",
      date: "December 12, 2023",
      readTime: "5 min read",
      category: "Faith & Hope",
      gradient: "from-blue-600 to-indigo-700",
      featured: true
    },
    {
      id: 2,
      title: "The Power of Community",
      excerpt: "Why authentic Christian fellowship is essential for spiritual growth and personal transformation.",
      author: "Michael Johnson",
      date: "December 8, 2023",
      readTime: "7 min read",
      category: "Community",
      gradient: "from-green-600 to-emerald-700"
    },
    {
      id: 3,
      title: "Prayer That Changes Everything",
      excerpt: "Practical insights into developing a prayer life that truly connects you with God's heart.",
      author: "David Chen",
      date: "December 5, 2023",
      readTime: "6 min read",
      category: "Prayer",
      gradient: "from-purple-600 to-pink-700"
    }
  ]

  const featuredPost = featuredPosts.find(post => post.featured)
  const regularPosts = featuredPosts.filter(post => !post.featured)

  return (
    <section id="featured-posts" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Editor's Choice
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Featured Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Thoughtfully curated articles that speak to the heart of faith, community, and spiritual growth
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                Featured Article
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{featuredPost.readTime}</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              
              <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
                {featuredPost.category}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
                <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient}`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  
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
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.readTime}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{featuredPost.title}</h3>
                  <p className="text-gray-200">{featuredPost.author} • {featuredPost.date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularPosts.map((post, index) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '25px 25px',
                        animation: `moveBackground ${25 + index * 3}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.readTime}
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(40px) translateY(40px); }
        }
      `}</style>
    </section>
  )
} 