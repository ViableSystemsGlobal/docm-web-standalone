'use client'

export function LatestPosts() {
  const latestPosts = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: [
      "Walking with Purpose",
      "Grace in Everyday Moments", 
      "Building Strong Foundations",
      "The Heart of Worship",
      "Finding Peace in Chaos",
      "Love That Transforms"
    ][i],
    excerpt: [
      "Discovering God's unique calling for your life and stepping boldly into His purpose.",
      "How to recognize and embrace God's grace in the ordinary moments of daily life.",
      "Essential practices for establishing a solid foundation in your Christian faith.",
      "Understanding what true worship means and how it transforms our hearts.",
      "Biblical strategies for maintaining peace during life's most challenging seasons.",
      "Exploring how God's love changes everything about how we see ourselves and others."
    ][i],
    author: ["Sarah Williams", "Michael Johnson", "David Chen", "Lisa Anderson", "James Parker", "Rebecca Smith"][i],
    date: [`December ${15 - i}, 2023`, `December ${14 - i}, 2023`, `December ${13 - i}, 2023`, `December ${12 - i}, 2023`, `December ${11 - i}, 2023`, `December ${10 - i}, 2023`][i],
    readTime: ["4 min read", "6 min read", "5 min read", "7 min read", "3 min read", "8 min read"][i],
    category: ["Purpose", "Grace", "Faith", "Worship", "Peace", "Love"][i],
    gradient: [
      "from-blue-600 to-purple-700",
      "from-green-600 to-teal-700", 
      "from-orange-600 to-red-700",
      "from-purple-600 to-pink-700",
      "from-cyan-600 to-blue-700",
      "from-indigo-600 to-purple-700"
    ][i]
  }))

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Recent Articles
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Latest Posts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay up to date with fresh insights, personal stories, and practical wisdom for your faith journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '25px 25px',
                        animation: `moveBackground ${20 + index * 2}s linear infinite`
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
              
              <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-1">
                    Read More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More CTA */}
        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 mr-4">
            Load More Articles
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300">
            View All Posts
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(25px) translateY(25px); }
        }
      `}</style>
    </section>
  )
} 