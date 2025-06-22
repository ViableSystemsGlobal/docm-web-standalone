'use client'

export function GalleryCategories() {
  const categories = [
    { id: 1, title: "Worship Services", count: 45, icon: "🙏", gradient: "from-blue-600 to-indigo-700" },
    { id: 2, title: "Special Events", count: 32, icon: "🎉", gradient: "from-purple-600 to-pink-700" },
    { id: 3, title: "Community Outreach", count: 28, icon: "❤️", gradient: "from-green-600 to-emerald-700" },
    { id: 4, title: "Youth Activities", count: 38, icon: "👥", gradient: "from-orange-600 to-red-700" },
    { id: 5, title: "Baptisms", count: 12, icon: "💧", gradient: "from-cyan-600 to-blue-700" },
    { id: 6, title: "Fellowship", count: 25, icon: "🤝", gradient: "from-teal-600 to-green-700" }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for by exploring our organized gallery categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  <div className="absolute inset-0 opacity-10">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
                        backgroundSize: '20px 20px',
                        animation: `moveBackground ${15 + index}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                
                <div className="absolute bottom-2 right-2">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    {category.count}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(20px) translateY(20px); }
        }
      `}</style>
    </section>
  )
} 