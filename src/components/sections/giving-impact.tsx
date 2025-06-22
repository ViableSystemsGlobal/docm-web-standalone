'use client'

export function GivingImpact() {
  const impactStats = [
    {
      number: "1,247",
      description: "Families served through food pantry",
      period: "This year",
      icon: "family",
      color: "blue"
    },
    {
      number: "43",
      description: "Local community projects completed",
      period: "Past 12 months",
      icon: "community",
      color: "green"
    },
    {
      number: "$127K",
      description: "Given to global missions",
      period: "This year",
      icon: "missions",
      color: "purple"
    },
    {
      number: "156",
      description: "Youth and children impacted",
      period: "Weekly programs",
      icon: "youth",
      color: "orange"
    }
  ]

  const impactStories = [
    {
      id: 1,
      title: "Local Food Pantry",
      description: "Your gifts help us provide groceries and essentials to families facing food insecurity in our community.",
      amount: "$50",
      impact: "Feeds a family of four for one week",
      category: "Community Outreach",
      gradient: "from-blue-600 to-cyan-700"
    },
    {
      id: 2,
      title: "Global Missions",
      description: "Supporting missionaries and church planting initiatives across Southeast Asia and Africa.",
      amount: "$100",
      impact: "Sponsors a missionary family for one month",
      category: "Missions",
      gradient: "from-green-600 to-emerald-700"
    },
    {
      id: 3,
      title: "Youth Ministry",
      description: "Empowering the next generation through camps, programs, and mentorship opportunities.",
      amount: "$25",
      impact: "Sends one child to summer camp",
      category: "Youth Programs",
      gradient: "from-purple-600 to-pink-700"
    },
    {
      id: 4,
      title: "Building Fund",
      description: "Improving our facilities to better serve our growing congregation and community programs.",
      amount: "$200",
      impact: "Supports facility improvements",
      category: "Infrastructure",
      gradient: "from-orange-600 to-red-700"
    }
  ]

  const testimonials = [
    {
      id: 1,
      text: "Because of the church's food pantry, our family made it through a difficult season. The love and support we received was incredible.",
      author: "Sarah M.",
      category: "Community Recipient"
    },
    {
      id: 2,
      text: "Serving in Kenya for the past two years has been possible because of your faithful giving. Lives are being transformed daily.",
      author: "Pastor James K.",
      category: "Missionary Partner"
    },
    {
      id: 3,
      text: "The youth camp changed my life. I came to know Jesus personally and now I'm leading a small group at school.",
      author: "Michael, Age 16",
      category: "Youth Ministry"
    }
  ]

  const getIcon = (iconType: string, color: string) => {
    const colorClasses = {
      blue: "text-blue-600",
      green: "text-green-600", 
      purple: "text-purple-600",
      orange: "text-orange-600"
    }

    switch (iconType) {
      case 'family':
        return (
          <svg className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'community':
        return (
          <svg className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'missions':
        return (
          <svg className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'youth':
        return (
          <svg className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section id="giving-impact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Making a Difference
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Your Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how your generous giving is transforming lives and communities, both locally and around the world
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div className={`w-16 h-16 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                {getIcon(stat.icon, stat.color)}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 mb-1">{stat.description}</div>
              <div className="text-sm text-gray-500">{stat.period}</div>
            </div>
          ))}
        </div>

        {/* Impact Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {impactStories.map((story) => (
            <div key={story.id} className="group">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient}`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '40px 40px',
                        animation: `moveBackground ${25 + story.id * 3}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">{story.amount}</div>
                    <div className="text-sm opacity-80">{story.impact}</div>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {story.category}
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed">{story.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Lives Changed</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear directly from those whose lives have been touched by your generosity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-center">
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Year in Review */}
        <div className="mt-20 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="absolute inset-0 opacity-20">
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                    linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                  `,
                  backgroundSize: '60px 60px',
                  animation: 'moveBackground 35s linear infinite'
                }}
              ></div>
            </div>
          </div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                2023 Year in Review
              </h3>
              <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
                Together, we've accomplished incredible things this year. Thank you for your faithful partnership in ministry.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">$485K</div>
                  <div className="text-gray-300">Total Given</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">2,847</div>
                  <div className="text-gray-300">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">23</div>
                  <div className="text-gray-300">Mission Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">67</div>
                  <div className="text-gray-300">New Believers</div>
                </div>
              </div>
              
              <button className="bg-white text-gray-900 px-8 py-4 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download Full Report
              </button>
            </div>
          </div>
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