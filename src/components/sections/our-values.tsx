'use client'

export function OurValues() {
  const values = [
    {
      title: "Faith",
      description: "We believe in the life-changing power of Jesus Christ and His love for all people.",
      icon: "🙏",
      gradient: "from-blue-800 to-indigo-900"
    },
    {
      title: "Community",
      description: "We foster authentic relationships and create a place where everyone belongs.",
      icon: "🤝",
      gradient: "from-purple-800 to-pink-900"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, honoring God with our best efforts.",
      icon: "⭐",
      gradient: "from-green-800 to-emerald-900"
    },
    {
      title: "Compassion",
      description: "We serve others with love, kindness, and genuine care for their wellbeing.",
      icon: "❤️",
      gradient: "from-red-800 to-rose-900"
    },
    {
      title: "Growth",
      description: "We encourage personal and spiritual growth through learning and discipleship.",
      icon: "🌱",
      gradient: "from-teal-800 to-cyan-900"
    },
    {
      title: "Integrity",
      description: "We live with honesty, transparency, and unwavering moral principles.",
      icon: "🛡️",
      gradient: "from-orange-800 to-amber-900"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            What Drives Us
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These fundamental beliefs shape our character, guide our decisions, and define who we are as a church family
          </p>
        </div>

        {/* Featured Value with Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="text-6xl mb-6">{values[0].icon}</div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{values[0].title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Faith is the foundation of everything we do. We believe that through Jesus Christ, 
              lives are transformed, hope is restored, and communities are renewed. Our faith 
              drives us to love boldly, serve selflessly, and trust completely in God's plan.
            </p>
            
            <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3">
              Explore Our Values
              <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </button>
          </div>
          
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
              {/* Video Background Placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${values[0].gradient}`}>
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
                      backgroundSize: '50px 50px',
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
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">Faith in Action</h3>
                <p className="text-gray-200">See how faith transforms our community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.slice(1).map((value, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                {/* Video Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient}`}>
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
                        backgroundSize: '25px 25px',
                        animation: `moveBackground ${25 + index * 5}s linear infinite`
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
                
                {/* Icon Overlay */}
                <div className="absolute top-6 left-6">
                  <div className="text-4xl">{value.icon}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Our Values in Action
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us for worship, connect with our community, and discover how these values 
              come to life in everything we do together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300">
                Visit This Sunday
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300">
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
          100% { transform: translateX(50px) translateY(50px); }
        }
      `}</style>
    </section>
  )
} 