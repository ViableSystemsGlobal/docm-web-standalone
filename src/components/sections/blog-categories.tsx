'use client'

export function BlogCategories() {
  const categories = [
    { id: 1, title: "Faith & Hope", count: 24, icon: "✝️", gradient: "from-blue-600 to-indigo-700" },
    { id: 2, title: "Prayer & Worship", count: 18, icon: "🙏", gradient: "from-purple-600 to-pink-700" },
    { id: 3, title: "Community", count: 22, icon: "🤝", gradient: "from-green-600 to-emerald-700" },
    { id: 4, title: "Life & Purpose", count: 19, icon: "🎯", gradient: "from-orange-600 to-red-700" },
    { id: 5, title: "Love & Grace", count: 16, icon: "❤️", gradient: "from-red-600 to-rose-700" },
    { id: 6, title: "Growth & Wisdom", count: 21, icon: "📚", gradient: "from-teal-600 to-cyan-700" }
  ]

  return (
    <section id="blog-categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Browse by Topic</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find articles that speak to your heart by exploring our organized topic categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  <div className="absolute inset-0 opacity-10">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
                        backgroundSize: '25px 25px',
                        animation: `moveBackground ${18 + index * 2}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">{category.icon}</span>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {category.count} articles
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600">{category.count} articles</p>
              </div>
            </div>
          ))}
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