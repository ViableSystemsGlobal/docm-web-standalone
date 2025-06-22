'use client'

export function AboutStats() {
  const stats = [
    { 
      number: "500+", 
      label: "Active Members", 
      description: "Growing congregation of faithful believers",
      gradient: "from-blue-800 to-indigo-900"
    },
    { 
      number: "15", 
      label: "Ministries", 
      description: "Diverse programs serving our community",
      gradient: "from-purple-800 to-pink-900"
    },
    { 
      number: "20+", 
      label: "Years Serving", 
      description: "Two decades of faithful ministry",
      gradient: "from-green-800 to-emerald-900"
    },
    { 
      number: "1000+", 
      label: "Lives Touched", 
      description: "Individuals impacted through our outreach",
      gradient: "from-orange-800 to-red-900"
    },
    { 
      number: "50+", 
      label: "Volunteers", 
      description: "Dedicated servants making a difference",
      gradient: "from-teal-800 to-cyan-900"
    },
    { 
      number: "5", 
      label: "Countries", 
      description: "International mission partnerships",
      gradient: "from-pink-800 to-rose-900"
    }
  ]

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-400 mb-6">
            Our Impact
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
            By the numbers
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Two decades of faithful service, community building, and life transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-80 rounded-3xl overflow-hidden">
                {/* Video Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`}>
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
                        animation: `moveBackground ${20 + index * 3}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Play Button */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Stats Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                  <div className="text-6xl md:text-7xl font-bold text-white mb-4 opacity-90">
                    {stat.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">
                    {stat.label}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Be Part of Our Story
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join a community where your life can make an impact and where together 
              we can continue to transform lives and strengthen our neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300">
                Join Our Community
              </button>
              <button className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Learn More
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